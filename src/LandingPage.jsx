import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from './assets/logo.png';

export default function LandingPage({ isAuthenticated }) {
  const navigate = useNavigate();

  const handleAction = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="bg-background text-on-background min-h-screen lg:h-screen flex flex-col font-body-md text-body-md antialiased relative overflow-y-auto lg:overflow-hidden">
      {/* Background Decorators */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-container opacity-20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-tertiary-container opacity-20 blur-[150px]"></div>
      </div>

      {/* Main Content Container */}
      <main className="flex-grow flex flex-col justify-between items-center relative z-10 px-margin-mobile md:px-margin-desktop pt-4 md:pt-6 pb-8 lg:pb-12 max-w-container-max mx-auto w-full h-full">
        
        {/* Top: Logo Section */}
        <header className="w-full flex justify-center mt-2">
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-52 lg:h-52 rounded-[20px] overflow-hidden shadow-[0px_10px_30px_rgba(0,0,0,0.65)] border border-white/10 bg-surface-container-low transition-transform duration-500 hover:scale-105 flex items-center justify-center p-3">
            <img 
              alt="Chai, Charger &amp; Channay Logo" 
              className="w-full h-full object-contain rounded-[14px]" 
              src={logoImg} 
            />
          </div>
        </header>

        {/* Middle: Mission Statement */}
        <section className="w-full max-w-2xl text-center my-auto py-2">
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-2xl md:text-3xl font-bold text-primary tracking-tight mb-3">
            An Organic Crowd-Sourced Space For You.
          </h1>
          
          <div className="glass-card p-4 md:p-6 shadow-[0px_10px_30px_rgba(0,0,0,0.4)]">
            <p className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed text-left">
              Welcome to Chai, Charger &amp; Channay—the ultimate compass for the modern nomad and remote professional. 
              We believe your workspace should inspire, energize, and nourish. 
              <br /><br />
              Our mission is to help you discover hidden gems that offer blazing-fast Wi-Fi, abundant power outlets, and the perfect atmosphere for deep focus. 
              But work is only half the journey; we also guide you to the finest local culinary experiences—from a comforting bowl of authentic Karahi or Channay to that perfect, steaming cup of artisanal Chai. 
              <br /><br />
              Join a community of remote workers who refuse to compromise on productivity or flavor. Let’s find your spot.
            </p>
          </div>
        </section>

        {/* Bottom: Call to Action */}
        <footer className="w-full mb-6 lg:mb-8 max-w-2xl">
          <button 
            onClick={handleAction}
            className="w-full bg-primary-container text-on-surface font-title-md text-title-md py-3 px-gutter rounded-full shadow-lg hover:brightness-110 active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] border border-primary/20 flex items-center justify-center gap-unit cursor-pointer"
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Login'}
            <span 
              className="material-symbols-outlined" 
              style={{ fontVariationSettings: "'FILL' 1, 'wght' 600" }}
            >
              arrow_forward
            </span>
          </button>
        </footer>

      </main>
    </div>
  );
}