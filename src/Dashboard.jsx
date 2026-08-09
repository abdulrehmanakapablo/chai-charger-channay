import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  const requestLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationAllowed(true);
          setShowBanner(false);
          localStorage.setItem('locationAllowed', 'true');
        },
        (error) => {
          setShowBanner(true);
        }
      );
    }
  };

  useEffect(() => {
    const isAllowed = localStorage.getItem('locationAllowed') === 'true';
    if (isAllowed) {
      setLocationAllowed(true);
      setShowBanner(false);
    } else {
      setShowBanner(true);
      requestLocation();
    }
  }, []);

  useEffect(() => {
    if (locationAllowed) return;

    const interval = setInterval(() => {
      const isAllowed = localStorage.getItem('locationAllowed') === 'true';
      if (!isAllowed) {
        setShowBanner(true);
        requestLocation();
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [locationAllowed]);

  const handleCategoryClick = (categoryKey) => {
    navigate(`/category/${categoryKey}`);
  };

  const ultraGlassStyle =
    "backdrop-blur-md bg-white/[0.08] dark:bg-black/[0.25] border border-white/20 shadow-[0_16px_40px_0_rgba(0,0,0,0.45)] hover:border-primary/50 hover:bg-white/[0.14] transition-[transform,opacity,border-color,background-color] duration-300 transform-gpu cursor-pointer";

  return (
    <div className="relative h-[calc(100vh-4rem)] overflow-y-auto bg-surface text-on-surface selection:bg-primary-container selection:text-on-primary-container">
      {/* Ambient Background Glows */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-container opacity-25 blur-3xl transform-gpu"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-tertiary-container opacity-25 blur-3xl transform-gpu"></div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-container-max mx-auto px-4 md:px-6 py-6 lg:py-8">
        {/* Location Banner */}
        {showBanner && !locationAllowed && (
          <div
            id="location-banner"
            className={`rounded-2xl p-4 md:p-6 mb-4 lg:mb-6 flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden ${ultraGlassStyle}`}
          >
            <div className="absolute inset-0 bg-primary-container/10 pointer-events-none"></div>
            <div className="relative z-10 flex items-start md:items-center gap-4">
              <div className="p-3 bg-primary text-on-primary rounded-full shadow-lg">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  my_location
                </span>
              </div>
              <div>
                <h2 className="font-title-md text-title-md text-on-surface mb-1 font-bold">Enable Live Location</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Allow location access for real-time spot recommendations nearby.
                </p>
              </div>
            </div>
            <div className="relative z-10 flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
              <button
                className="flex-1 md:flex-none btn-secondary px-6 py-2.5 rounded-xl font-label-md text-label-md bg-white/10 border border-white/15 hover:bg-white/20 transition-colors cursor-pointer"
                onClick={() => setShowBanner(false)}
              >
                Not Now
              </button>
              <button
                className="flex-1 md:flex-none btn-primary px-6 py-2.5 rounded-xl font-label-md text-label-md shadow-lg cursor-pointer"
                onClick={requestLocation}
              >
                Allow
              </button>
            </div>
          </div>
        )}

        {/* Page Header – left on mobile, center on large */}
        <div className="mb-4 lg:mb-6 text-left lg:text-center">
          <h1 className="font-display-lg text-display-lg md:text-[56px] text-[32px] text-on-surface mb-2 font-bold tracking-tight">
            Explore Your Vibe
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Find the perfect spot to work, dine, or unwind.
          </p>
        </div>

        {/* Cards – first row (3 large) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Card 1: Workspaces */}
          <div onClick={() => handleCategoryClick('workspaces')} className={`rounded-[28px] p-6 h-[320px] flex flex-col justify-end relative overflow-hidden group ${ultraGlassStyle}`}>
            <div className="absolute inset-0 z-0">
              <div className="bg-cover bg-center w-full h-full opacity-50 group-hover:opacity-85 group-hover:scale-105 transition-[transform,opacity] duration-500 transform-gpu"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=1200&q=80')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            </div>
            <div className="relative z-10 transform group-hover:-translate-y-2 transition-transform duration-300 transform-gpu">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-4 text-primary border border-white/25 shadow-inner">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>laptop_mac</span>
              </div>
              <h3 className="font-headline-lg text-[28px] font-bold text-white mb-1 drop-shadow-md">Workspaces</h3>
              <p className="font-body-md text-white/80 text-sm drop-shadow-sm">Remote &amp; Public Hubs</p>
            </div>
          </div>

          {/* Card 2: Food */}
          <div onClick={() => handleCategoryClick('food')} className={`rounded-[28px] p-6 h-[320px] flex flex-col justify-end relative overflow-hidden group ${ultraGlassStyle}`}>
            <div className="absolute inset-0 z-0">
              <div className="bg-cover bg-center w-full h-full opacity-50 group-hover:opacity-85 group-hover:scale-105 transition-[transform,opacity] duration-500 transform-gpu"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            </div>
            <div className="relative z-10 transform group-hover:-translate-y-2 transition-transform duration-300 transform-gpu">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-4 text-tertiary border border-white/25 shadow-inner">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant</span>
              </div>
              <h3 className="font-headline-lg text-[28px] font-bold text-white mb-1 drop-shadow-md">Food</h3>
              <p className="font-body-md text-white/80 text-sm drop-shadow-sm">Local Dining &amp; Karahi</p>
            </div>
          </div>

          {/* Card 3: Beverages */}
          <div onClick={() => handleCategoryClick('beverages')} className={`rounded-[28px] p-6 h-[320px] flex flex-col justify-end relative overflow-hidden group ${ultraGlassStyle}`}>
            <div className="absolute inset-0 z-0">
              <div className="bg-cover bg-center w-full h-full opacity-50 group-hover:opacity-85 group-hover:scale-105 transition-[transform,opacity] duration-500 transform-gpu"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            </div>
            <div className="relative z-10 transform group-hover:-translate-y-2 transition-transform duration-300 transform-gpu">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-4 text-secondary border border-white/25 shadow-inner">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>local_cafe</span>
              </div>
              <h3 className="font-headline-lg text-[28px] font-bold text-white mb-1 drop-shadow-md">Beverages</h3>
              <p className="font-body-md text-white/80 text-sm drop-shadow-sm">Coffee, Chai &amp; Cakes</p>
            </div>
          </div>
        </div>

        {/* Second row (3 slightly smaller) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mt-4 lg:mt-6">
          {/* Card 4: Hotels */}
          <div onClick={() => handleCategoryClick('hotels')} className={`rounded-[28px] p-5 h-[260px] flex flex-col justify-end relative overflow-hidden group ${ultraGlassStyle}`}>
            <div className="absolute inset-0 z-0">
              <div className="bg-cover bg-center w-full h-full opacity-50 group-hover:opacity-85 group-hover:scale-105 transition-[transform,opacity] duration-500 transform-gpu"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            </div>
            <div className="relative z-10 transform group-hover:-translate-y-2 transition-transform duration-300 transform-gpu">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center mb-3 text-primary border border-white/25 shadow-inner">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>bed</span>
              </div>
              <h3 className="font-headline-lg text-[24px] font-bold text-white mb-1 drop-shadow-md">Hotels</h3>
              <p className="font-body-md text-white/80 text-xs drop-shadow-sm">Premium Stays</p>
            </div>
          </div>

          {/* Card 5: Hostels */}
          <div onClick={() => handleCategoryClick('hostels')} className={`rounded-[28px] p-5 h-[260px] flex flex-col justify-end relative overflow-hidden group ${ultraGlassStyle}`}>
            <div className="absolute inset-0 z-0">
              <div className="bg-cover bg-center w-full h-full opacity-50 group-hover:opacity-85 group-hover:scale-105 transition-[transform,opacity] duration-500 transform-gpu"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            </div>
            <div className="relative z-10 transform group-hover:-translate-y-2 transition-transform duration-300 transform-gpu">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center mb-3 text-yellow-300 border border-white/25 shadow-inner">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>hotel_class</span>
              </div>
              <h3 className="font-headline-lg text-[24px] font-bold text-white mb-1 drop-shadow-md">Hostels</h3>
              <p className="font-body-md text-white/80 text-xs drop-shadow-sm">Social &amp; Budget Stays</p>
            </div>
          </div>

          {/* Card 6: Airbnbs */}
          <div onClick={() => handleCategoryClick('airbnbs')} className={`rounded-[28px] p-5 h-[260px] flex flex-col justify-end relative overflow-hidden group ${ultraGlassStyle}`}>
            <div className="absolute inset-0 z-0">
              <div className="bg-cover bg-center w-full h-full opacity-50 group-hover:opacity-85 group-hover:scale-105 transition-[transform,opacity] duration-500 transform-gpu"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            </div>
            <div className="relative z-10 transform group-hover:-translate-y-2 transition-transform duration-300 transform-gpu">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center mb-3 text-primary border border-white/25 shadow-inner">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>vpn_key</span>
              </div>
              <h3 className="font-headline-lg text-[24px] font-bold text-white mb-1 drop-shadow-md">Airbnbs</h3>
              <p className="font-body-md text-white/80 text-xs drop-shadow-sm">Unique Homes &amp; Condos</p>
            </div>
          </div>
        </div>

        {/* Third row (single card centered) */}
        <div className="flex justify-center mt-4 lg:mt-6">
          <div onClick={() => handleCategoryClick('hidden_gems')} className={`rounded-[28px] p-5 h-[260px] w-full lg:w-1/2 flex flex-col justify-end relative overflow-hidden group ${ultraGlassStyle}`}>
            <div className="absolute inset-0 z-0">
              <div className="bg-cover bg-center w-full h-full opacity-50 group-hover:opacity-85 group-hover:scale-105 transition-[transform,opacity] duration-500 transform-gpu"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            </div>
            <div className="relative z-10 transform group-hover:-translate-y-2 transition-transform duration-300 transform-gpu">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center mb-3 text-emerald-300 border border-white/25 shadow-inner">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              </div>
              <h3 className="font-headline-lg text-[24px] font-bold text-white mb-1 drop-shadow-md">Hidden Gem Spots</h3>
              <p className="font-body-md text-white/80 text-xs drop-shadow-sm">Secret Spots &amp; Offbeat Locations</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}