import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Circle, useMapEvents, useMap } from 'react-leaflet';
import { useParams, useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FORM_MAP } from './ReviewForms';
import { supabase } from './supabaseClient';
import { useAuth } from './AuthContext';

// ----- Constant icons & styles (defined once) -----
const userLocationIcon = L.divIcon({
  html: `<div class="blinking-dot"></div>`,
  className: '',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const newSpotIcon = L.icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#9cd2b6" stroke="#174d38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7z"/>
      <circle cx="12" cy="9" r="2.5"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function MapClickHandler({ onClick }) {
  useMapEvents({ click: (e) => onClick(e.latlng) });
  return null;
}

// Fly to user location when coordinates are available
function FitMapToUser({ userLocation }) {
  const map = useMap();
  useEffect(() => {
    if (userLocation) {
      map.flyTo(userLocation, 15, { animate: true });
    }
  }, [userLocation, map]);
  return null;
}

export default function ReviewPage() {
  const { categoryKey } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState(null);
  const [newSpotCoords, setNewSpotCoords] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const FormComponent = FORM_MAP[categoryKey];
  if (!FormComponent) {
    return (
      <div className="min-h-screen bg-[#111412] text-white flex items-center justify-center">
        <p>Unknown category.</p>
      </div>
    );
  }

  // Inject CSS only once
  useEffect(() => {
    if (!document.getElementById('blinking-dot-style')) {
      const style = document.createElement('style');
      style.id = 'blinking-dot-style';
      style.textContent = `
        .blinking-dot {
          width: 20px; height: 20px; background: #00aaff; border: 2px solid white;
          border-radius: 50%; box-shadow: 0 0 10px #00aaff; animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
        () => console.log('Location access denied'),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const handleMapClick = (latlng) => {
    setNewSpotCoords([latlng.lat, latlng.lng]);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setNewSpotCoords(null);
  };

  const handleSubmitSuccess = async (formPayload) => {
    if (!user) {
      alert('You must be logged in to submit a review.');
      return;
    }
    if (!newSpotCoords) {
      alert('Please click on the map to set the location.');
      return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      alert('Your session has expired. Please log in again.');
      navigate('/login');
      return;
    }

    const userId = session.user.id;
    setSubmitting(true);

    const dbPayload = {
      user_id: userId,
      category: categoryKey,
      spot_name:
        formPayload.spotName ||
        formPayload.restaurantName ||
        formPayload.cafeName ||
        formPayload.hostelName ||
        formPayload.hotelName ||
        formPayload.listingTitle ||
        formPayload.spotName ||
        'Unnamed Spot',
      location:
        formPayload.location ||
        formPayload.outletLocation ||
        formPayload.cityAddress ||
        formPayload.locationCoordinates ||
        '',
      coordinates: `POINT(${newSpotCoords[1]} ${newSpotCoords[0]})`,
      ratings: formPayload.ratings || {},
      overall_rating: parseFloat(formPayload.overallRatingAverage || 0),
      review_comment: formPayload.reviewComment || '',
      metadata: {
        dishes_eaten: formPayload.dishesEaten || null,
        wifi_speed: formPayload.wifiSpeed || null,
        drink_name: formPayload.drinkName || null,
        room_type: formPayload.roomType || null,
        room_category: formPayload.roomCategory || null,
        property_type: formPayload.propertyType || null,
        spot_category: formPayload.spotCategory || null,
      },
    };

    const { error } = await supabase.from('reviews').insert(dbPayload);

    setSubmitting(false);

    if (error) {
      console.error('Insert error:', error);
      alert('Failed to save review: ' + error.message);
    } else {
      alert('Review saved successfully!');
      handleCloseForm();
    }
  };

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full bg-[#111412] text-[#e1e3df] font-sans overflow-hidden flex flex-col">
      {/* Map */}
      <div className="absolute inset-0 z-0">
        <MapContainer
          center={userLocation || [51.505, -0.09]}
          zoom={13}
          zoomControl={false}
          className="w-full h-full"
          dragging={!showForm}
          scrollWheelZoom={!showForm}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          <MapClickHandler onClick={handleMapClick} />
          <FitMapToUser userLocation={userLocation} />
          {userLocation && (
            <>
              <Marker position={userLocation} icon={userLocationIcon} />
              <Circle
                center={userLocation}
                radius={500}
                pathOptions={{
                  color: '#00aaff',
                  fillColor: '#00aaff',
                  fillOpacity: 0.1,
                  weight: 1,
                }}
              />
            </>
          )}
          {newSpotCoords && <Marker position={newSpotCoords} icon={newSpotIcon} />}
        </MapContainer>
      </div>

      {/* Floating instruction – higher on mobile, unchanged on large */}
      {!showForm && (
        <div className="absolute bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <div className="bg-[#191c1a]/80 backdrop-blur-lg border border-white/10 rounded-full px-5 py-2.5 text-xs text-[#c0c9c2] shadow-lg text-center max-w-[90vw]">
            <span className="material-symbols-outlined text-sm align-middle mr-1.5">touch_app</span>
            Tap on the map to pin your exact location and fill the review form
          </div>
        </div>
      )}

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full md:max-w-2xl lg:max-w-3xl max-h-[90vh] bg-[#111412] border-t border-white/10 rounded-t-3xl shadow-2xl flex flex-col overflow-y-auto animate-in slide-in-from-bottom duration-300">
            <div className="pt-3 pb-1 flex justify-center">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>
            <FormComponent
              onSubmitSuccess={handleSubmitSuccess}
              onClose={handleCloseForm}
            />
          </div>
        </div>
      )}
    </div>
  );
}