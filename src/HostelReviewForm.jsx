import React, { useState } from 'react';

const HOSTEL_CRITERIA = [
  { id: 'bed_comfort', label: 'Bed & Privacy Curtains', desc: 'Mattress support, clean linens, personal curtain/light' },
  { id: 'dorm_hygiene', label: 'Dorm Cleanliness & Maintenance', desc: 'Daily floor cleaning and trash clearance in dorms' },
  { id: 'bathroom', label: 'Shared Bathroom Hygiene', desc: 'Hot water availability, pressure, and frequent cleaning' },
  { id: 'security', label: 'Lockers & Safety', desc: 'Secure luggage lockers, keycard doors, and safe environment' },
  { id: 'community', label: 'Common Room Vibe & Socials', desc: 'Ease of meeting fellow travelers and solo travelers' },
  { id: 'wifi', label: 'Dorm & Lounge Wi-Fi', desc: 'Connectivity strength inside dorm beds and lounges' },
  { id: 'kitchen', label: 'Kitchen & Laundry Access', desc: 'Availability of shared fridge, microwave, and washer' },
  { id: 'location', label: 'Location & Public Transit Access', desc: 'Proximity to metro stations, city spots, and food markets' },
  { id: 'staff', label: 'Hostel Staff & Tour Advice', desc: 'Helpfulness with local guidance, maps, and travel recommendations' },
  { id: 'cost_value', label: 'Nightly Rate Value', desc: 'Affordability vs inclusions (free breakfast/tours)' },
];

export default function HostelReviewForm({ onSubmitSuccess, onClose }) {
  const [hostelName, setHostelName] = useState('');
  const [location, setLocation] = useState('');
  const [roomType, setRoomType] = useState('6-Bed Mixed Dorm');
  const [reviewComment, setReviewComment] = useState('');
  const [ratings, setRatings] = useState(HOSTEL_CRITERIA.reduce((acc, c) => ({ ...acc, [c.id]: 8 }), {}));

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      category: 'hostel',
      hostelName: hostelName.trim(),
      location: location.trim(),
      roomType,
      ratings,
      overallRatingAverage: (Object.values(ratings).reduce((a, b) => a + b, 0) / HOSTEL_CRITERIA.length).toFixed(1),
      reviewComment: reviewComment.trim(),
      createdAt: new Date().toISOString(),
    };
    if (onSubmitSuccess) onSubmitSuccess(payload);
    alert('Hostel review submitted!');
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#161a17]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 text-[#e1e3df] shadow-2xl">
      <div className="flex justify-between items-start pb-6 mb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#9cd2b6] flex items-center gap-1.5 mb-1">
            <span className="material-symbols-outlined text-base">single_bed</span>
            Backpacker & Budget Hostel Review
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Rate Your Hostel Stay</h2>
        </div>
        {onClose && (
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5 bg-white/5 rounded-2xl border border-white/5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#c0c9c2] mb-1.5">Hostel Name *</label>
            <input type="text" required placeholder="e.g. Backpacker Hostel Skardu, Zostel" value={hostelName} onChange={(e) => setHostelName(e.target.value)} className="w-full bg-[#111412] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#9cd2b6]" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#c0c9c2] mb-1.5">City & Neighborhood *</label>
            <input type="text" required placeholder="e.g. Hunza Valley, Lahore Old City" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-[#111412] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#9cd2b6]" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#c0c9c2] mb-1.5">Room Type Stayed In *</label>
            <select value={roomType} onChange={(e) => setRoomType(e.target.value)} className="w-full bg-[#111412] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#9cd2b6]">
              <option value="4-Bed Dorm">4-Bed Dorm</option>
              <option value="6-Bed Mixed Dorm">6-Bed Mixed Dorm</option>
              <option value="Female Only Dorm">Female Only Dorm</option>
              <option value="Private Hostel Room">Private Hostel Room</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="border-b border-white/10 pb-2">
            <h3 className="text-lg font-bold text-white">Backpacker Evaluation (10 Stars)</h3>
            <p className="text-xs text-[#c0c9c2]">Rate safety, hygiene, and social community factors.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {HOSTEL_CRITERIA.map((criterion) => (
              <div key={criterion.id} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-semibold text-white">{criterion.label}</h4>
                    <p className="text-[11px] text-[#c0c9c2]">{criterion.desc}</p>
                  </div>
                  <span className="text-sm font-bold bg-[#174d38] text-[#9cd2b6] px-2.5 py-1 rounded-lg border border-[#9cd2b6]/30 shrink-0">{ratings[criterion.id]} / 10</span>
                </div>
                <div className="flex items-center gap-1 mt-1 overflow-x-auto pb-1">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <button key={i + 1} type="button" onClick={() => setRatings(prev => ({ ...prev, [criterion.id]: i + 1 }))} className={`p-0.5 rounded cursor-pointer ${i + 1 <= ratings[criterion.id] ? 'text-amber-400' : 'text-gray-600'}`}>
                      <span className="material-symbols-outlined text-lg">star</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#c0c9c2]">Detailed Hostel Experience (10-12 Lines) *</label>
          <textarea required rows={11} value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} placeholder="Share your experience staying here: Is it quiet enough to sleep past 11 PM or is it a party hostel? How big are the security lockers (do they fit a 60L backpack)? How reliable is hot water in winters? Are solo female travelers comfortable here?" className="w-full bg-[#111412] border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-[#9cd2b6] leading-relaxed resize-y" />
        </div>

        <button type="submit" className="w-full py-4 rounded-2xl bg-[#174d38] border border-[#9cd2b6] text-white font-bold hover:bg-[#1a5a42]">Submit Hostel Review</button>
      </form>
    </div>
  );
}