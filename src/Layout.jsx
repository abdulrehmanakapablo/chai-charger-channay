import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#111412] text-[#e1e3df]">
      <Navbar />
      <main className="pt-16"> {/* 64px offset for fixed navbar */}
        <Outlet />
      </main>
    </div>
  );
}