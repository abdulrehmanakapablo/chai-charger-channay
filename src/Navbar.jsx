import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './assets/logo.png';
import { useAuth } from './AuthContext';
import { supabase } from './supabaseClient';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This cannot be undone.')) return;

    try {
      const { error } = await supabase.rpc('delete_current_user');
      if (error) {
        alert('Deletion failed: ' + error.message);
        return;
      }
      logout();
      navigate('/');
    } catch (err) {
      console.error('Delete account error:', err);
      alert('An error occurred. Please try again.');
    }
  };

  const displayName = user?.username || user?.first_name || 'User';

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-[#0d1117]/95 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 z-50 shadow-lg">
      {/* Left: Logo + Name */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="h-9 w-9 rounded-full" />
        <span className="hidden sm:inline text-white font-bold text-lg tracking-tight">
          chai, charger and channay
        </span>
        <span className="sm:hidden text-white font-bold text-lg">CCC</span>
      </div>

      {/* Center: Dashboard button – absolutely centered but responsive */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition whitespace-nowrap"
        >
          {/* Icon always visible */}
          <span className="material-symbols-outlined text-lg">home</span>
          {/* Text only on sm+ */}
          <span className="hidden sm:inline">Back To Dashboard</span>
        </button>
      </div>

      {/* Right: Username + dropdown arrow */}
      <div className="relative flex items-center">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white text-sm transition"
        >
          <span className="truncate max-w-[80px] sm:max-w-[120px]">{displayName}</span>
          <span className="material-symbols-outlined text-lg">
            {dropdownOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
          </span>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-[#1a1e24] border border-white/10 rounded-xl shadow-xl py-1 z-50">
            <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 flex items-center gap-2">
              <span className="material-symbols-outlined text-base">logout</span>
              Logout
            </button>
            <button onClick={handleDeleteAccount} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/10 flex items-center gap-2">
              <span className="material-symbols-outlined text-base">delete_forever</span>
              Delete Account
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}