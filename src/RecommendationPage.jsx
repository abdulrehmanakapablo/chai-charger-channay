import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import useSupercluster from 'use-supercluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { supabase } from './supabaseClient';

// ==================== Category-specific filter options ====================
const CATEGORY_CRITERIA = {
  workspaces: [
    { id: 'wifi', label: 'Wi-Fi Speed' },
    { id: 'outlets', label: 'Power Outlets' },
    { id: 'noise', label: 'Quietness' },
    { id: 'ergonomics', label: 'Ergonomics' },
    { id: 'lighting', label: 'Lighting' },
    { id: 'coffee', label: 'Coffee & Snacks' },
    { id: 'climate', label: 'AC & Climate' },
    { id: 'washroom', label: 'Washroom' },
    { id: 'hospitality', label: 'Laptop Policy' },
    { id: 'crowd', label: 'Professional Vibe' },
  ],
  hotels: [
    { id: 'cleanliness', label: 'Cleanliness' },
    { id: 'sleep_quality', label: 'Sleep Quality' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'room_service', label: 'Room Service' },
    { id: 'checkin', label: 'Check-in' },
    { id: 'ac_heating', label: 'Climate Control' },
    { id: 'soundproofing', label: 'Noise Insulation' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'parking', label: 'Parking' },
    { id: 'value', label: 'Value' },
  ],
  hostels: [
    { id: 'bed_comfort', label: 'Bed Comfort' },
    { id: 'dorm_hygiene', label: 'Dorm Hygiene' },
    { id: 'bathroom', label: 'Bathroom' },
    { id: 'security', label: 'Security' },
    { id: 'community', label: 'Social Vibe' },
    { id: 'wifi', label: 'Wi-Fi' },
    { id: 'kitchen', label: 'Kitchen' },
    { id: 'location', label: 'Location' },
    { id: 'staff', label: 'Staff' },
    { id: 'cost_value', label: 'Cost Value' },
  ],
  airbnbs: [
    { id: 'accuracy', label: 'Accuracy' },
    { id: 'communication', label: 'Communication' },
    { id: 'cleanliness', label: 'Cleanliness' },
    { id: 'kitchen_equipment', label: 'Kitchen' },
    { id: 'bed_comfort', label: 'Bed Comfort' },
    { id: 'neighborhood', label: 'Neighborhood' },
    { id: 'wifi', label: 'Wi-Fi' },
    { id: 'power_backup', label: 'Power Backup' },
    { id: 'privacy', label: 'Privacy' },
    { id: 'value', label: 'Value' },
  ],
  hidden_gems: [
    { id: 'uniqueness', label: 'Uniqueness' },
    { id: 'crowd', label: 'Quietness' },
    { id: 'access', label: 'Access' },
    { id: 'safety', label: 'Safety' },
    { id: 'photo_spots', label: 'Photo Spots' },
    { id: 'cleanliness', label: 'Cleanliness' },
    { id: 'amenities', label: 'Nearby Facilities' },
    { id: 'best_timing', label: 'Season Suitability' },
    { id: 'cost', label: 'Affordability' },
    { id: 'wow_factor', label: 'Wow Factor' },
  ],
};

const SEARCH_CATEGORIES = ['food', 'beverages'];

// ==================== Map Icons ====================
const createClusterIcon = (count) =>
  L.divIcon({
    html: `<div style="background:#174d38;color:#fff;border:2px solid #9cd2b6;border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:13px;box-shadow:0 4px 12px rgba(0,0,0,0.5)">${count}</div>`,
    className: 'custom-cluster-icon',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });

const createPinIcon = () =>
  L.divIcon({
    html: `<div style="background:#174d38;border:2px solid #9cd2b6;border-radius:50%;width:18px;height:18px;box-shadow:0 2px 8px rgba(0,0,0,0.5)"></div>`,
    className: 'custom-pin-icon',
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });

// ==================== Cluster Markers ====================
function ClusterMarkers({ spots, onSelectSpot }) {
  const map = useMap();
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(map.getZoom());

  function updateMapState() {
    const b = map.getBounds();
    setBounds([b.getWest(), b.getSouth(), b.getEast(), b.getNorth()]);
    setZoom(map.getZoom());
  }

  useEffect(() => {
    updateMapState();
  }, []);

  useEffect(() => {
    map.on('moveend zoomend', updateMapState);
    return () => map.off('moveend zoomend', updateMapState);
  }, [map]);

  const points = spots.map((spot) => ({
    type: 'Feature',
    properties: { cluster: false, spotId: spot.id, spot },
    geometry: {
      type: 'Point',
      coordinates: [spot.longitude, spot.latitude],
    },
  }));

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 17 },
  });

  return (
    <>
      {clusters.map((cluster) => {
        const [lng, lat] = cluster.geometry.coordinates;
        if (cluster.properties.cluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              position={[lat, lng]}
              icon={createClusterIcon(cluster.properties.point_count)}
              eventHandlers={{
                click: () => {
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    17
                  );
                  map.setView([lat, lng], expansionZoom, { animate: true });
                },
              }}
            />
          );
        }
        return (
          <Marker
            key={`spot-${cluster.properties.spotId}`}
            position={[lat, lng]}
            icon={createPinIcon()}
            eventHandlers={{
              click: () => onSelectSpot(cluster.properties.spot),
            }}
          />
        );
      })}
    </>
  );
}

// ==================== Main Component ====================
export default function RecommendationPage() {
  const { categoryKey } = useParams();
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilterKey, setSelectedFilterKey] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(false);

  const isSearchCategory = SEARCH_CATEGORIES.includes(categoryKey);
  const filterOptions = CATEGORY_CRITERIA[categoryKey] || [];

  // Get user location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
        () => console.log('Location access denied'),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // Perform search/filter when criteria changes
  useEffect(() => {
    if (!userLocation) return;

    const fetchSpots = async () => {
      setLoading(true);
      try {
        if (isSearchCategory && searchQuery.trim()) {
          const { data, error } = await supabase.rpc('search_reviews_text', {
            p_category: categoryKey,
            p_query: searchQuery.trim(),
            p_lat: userLocation[0],
            p_lng: userLocation[1],
            p_radius_meters: 20000, // 20 km
          });
          if (!error) setSpots(data);
          else console.error(error);
        } else if (!isSearchCategory && selectedFilterKey) {
          const criteria = { [selectedFilterKey]: 8 }; // Minimum rating of 8
          const { data, error } = await supabase.rpc('filter_reviews_by_criteria', {
            p_category: categoryKey,
            p_lat: userLocation[0],
            p_lng: userLocation[1],
            p_radius_meters: 20000,
            p_criteria: criteria,
          });
          if (!error) setSpots(data);
          else console.error(error);
        } else {
          // No criteria set -> clear results
          setSpots([]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Debounce for search
    const handler = setTimeout(() => {
      fetchSpots();
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery, selectedFilterKey, userLocation, categoryKey, isSearchCategory]);

  const defaultCenter = userLocation || [51.505, -0.09];

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full bg-[#111412] text-[#e1e3df] font-sans overflow-hidden flex flex-col">
      {/* Map Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <MapContainer
          center={defaultCenter}
          zoom={13}
          zoomControl={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          <ClusterMarkers spots={spots} onSelectSpot={(spot) => {
            setIsListOpen(true);
            setSelectedSpot(spot);
          }} />
        </MapContainer>
      </div>

      {/* Top Bar: Search or Filter */}
      <div className="absolute top-4 left-0 right-0 z-30 pointer-events-none flex justify-center items-center">
        <div className="relative pointer-events-auto">
          <div className="bg-[#191c1a]/80 backdrop-blur-xl border border-white/10 rounded-full p-1.5 flex items-center gap-2 shadow-2xl">
            {isSearchCategory ? (
              <div className="flex items-center gap-2 px-2">
                <span className="material-symbols-outlined text-base text-[#c0c9c2]">search</span>
                <input
                  type="text"
                  placeholder={`Search ${categoryKey}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-sm text-white placeholder-[#c0c9c2] focus:outline-none w-48"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="text-[#c0c9c2] hover:text-white">
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs font-medium text-[#c0c9c2] transition active:scale-95 whitespace-nowrap"
                >
                  <span className="material-symbols-outlined text-base">filter_list</span>
                  <span>Filter by Requirement</span>
                  <span className="material-symbols-outlined text-sm ml-1">
                    {isDropdownOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                  </span>
                </button>
                {selectedFilterKey && (
                  <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#174d38] border border-[#9cd2b6] text-[#9cd2b6] text-xs font-medium whitespace-nowrap">
                    <span>{filterOptions.find(f => f.id === selectedFilterKey)?.label}</span>
                    <button onClick={() => setSelectedFilterKey(null)} className="ml-1 hover:text-white">
                      <span className="material-symbols-outlined text-xs">close</span>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Filter Dropdown (only for non-search categories) */}
          {!isSearchCategory && isDropdownOpen && (
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-60 bg-[#191c1a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 shadow-2xl z-40 flex flex-col gap-1 max-h-64 overflow-y-auto">
              {filterOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    setSelectedFilterKey(option.id);
                    setIsDropdownOpen(false);
                    setIsListOpen(true);
                  }}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition text-left ${
                    selectedFilterKey === option.id
                      ? 'bg-[#174d38] text-[#9cd2b6]'
                      : 'text-[#c0c9c2] hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Side Floating Drawer (Spots List) */}
      {isListOpen && (
        <div className="absolute bottom-0 left-0 right-0 md:bottom-auto md:top-20 md:right-6 md:left-auto md:w-[400px] md:h-[calc(100vh-100px)] z-20 pointer-events-none flex flex-col justify-end md:justify-start">
          <div className="bg-[#191c1a]/90 backdrop-blur-2xl w-full h-[550px] md:h-full rounded-t-3xl md:rounded-2xl border border-white/10 shadow-2xl pointer-events-auto flex flex-col overflow-hidden">
            <div className="px-5 py-4 border-b border-white/10 flex justify-between items-center shrink-0">
              <div>
                <h2 className="text-xl font-bold text-white capitalize">{categoryKey} Nearby</h2>
                <p className="text-xs text-[#c0c9c2] mt-0.5">
                  {spots.length} spot{spots.length !== 1 && 's'} found
                </p>
              </div>
              <button onClick={() => setIsListOpen(false)} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {loading ? (
                <p className="text-center text-xs text-[#c0c9c2]">Loading...</p>
              ) : spots.length === 0 ? (
                <p className="text-center text-xs text-[#c0c9c2]">No spots match your criteria.</p>
              ) : (
                spots.map((spot) => (
                  <div
                    key={spot.id}
                    onClick={() => setSelectedSpot(spot)}
                    className={`p-4 rounded-xl border transition cursor-pointer ${
                      selectedSpot?.id === spot.id
                        ? 'bg-[#174d38]/40 border-[#9cd2b6]'
                        : 'bg-white/5 border-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-white text-base leading-snug">{spot.spot_name}</h3>
                      <div className="flex items-center gap-1 text-xs font-bold bg-black/40 px-2 py-0.5 rounded text-[#9cd2b6]">
                        <span className="material-symbols-outlined text-xs">star</span>
                        <span>{spot.overall_rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-[#c0c9c2] mt-1">{spot.location}</p>
                    <p className="text-xs text-[#c0c9c2]">{(spot.distance_meters / 1000).toFixed(1)} km away</p>
                    {spot.review_comment && (
                      <p className="text-xs text-[#c0c9c2] mt-1 line-clamp-2">{spot.review_comment}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Sheet Detail Modal (unchanged, but data from DB) */}
      {selectedSpot && (
        <div className="fixed inset-0 z-50 pointer-events-auto flex items-end justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full md:w-[480px] max-h-[85vh] bg-[#111412] border-t border-white/10 rounded-t-3xl shadow-2xl flex flex-col overflow-y-auto">
            <div className="pt-3 pb-1 flex justify-center shrink-0">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>
            <div className="sticky top-0 bg-[#111412]/90 backdrop-blur-md px-6 py-4 border-b border-white/10 flex items-center justify-between z-10">
              <span className="text-xs font-bold uppercase text-[#9cd2b6]">{categoryKey}</span>
              <button onClick={() => setSelectedSpot(null)} className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 flex flex-col gap-6">
              <h1 className="text-2xl font-bold text-white">{selectedSpot.spot_name}</h1>
              {selectedSpot.location && (
                <p className="text-sm text-[#c0c9c2] flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">location_on</span>
                  {selectedSpot.location}
                </p>
              )}
              <div className="flex items-center gap-4 py-3 px-4 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-amber-400">star</span>
                  <span className="text-lg font-bold text-white">{selectedSpot.overall_rating}</span>
                </div>
                <div className="w-px h-6 bg-white/10" />
                <span className="text-xs text-[#9cd2b6]">{(selectedSpot.distance_meters / 1000).toFixed(1)} km</span>
              </div>
              <p className="text-sm text-[#c0c9c2] leading-relaxed">{selectedSpot.review_comment}</p>
              {/* Show ratings if needed */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}