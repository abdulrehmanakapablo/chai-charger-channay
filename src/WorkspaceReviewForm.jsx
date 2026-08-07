import React, { useState } from 'react';

const WORKSPACE_CRITERIA = [
  { id: 'wifi', label: 'Wi-Fi Speed & Stability', desc: 'Sufficient speed for video calls and heavy downloads' },
  { id: 'outlets', label: 'Power Outlets & Backup', desc: 'Availability of desk sockets and UPS/generator' },
  { id: 'noise', label: 'Noise Level & Quietness', desc: 'Work-friendly environment without loud background music' },
  { id: 'ergonomics', label: 'Seating & Desk Ergonomics', desc: 'Comfortable chairs and proper table heights for long work hours' },
  { id: 'lighting', label: 'Lighting & Workspace Vibe', desc: 'Natural daylight, glare-free lighting, and focused ambience' },
  { id: 'coffee', label: 'Coffee & Snack Quality', desc: 'Quality of fuel (caffeine/snacks) available on-site' },
  { id: 'climate', label: 'AC & Climate Control', desc: 'Optimal room temperature and ventilation' },
  { id: 'washroom', label: 'Washroom Cleanliness', desc: 'Hygiene and maintenance of restrooms' },
  { id: 'hospitality', label: 'Staff Laptop Policy', desc: 'Staff welcoming long stays with laptops without pushing' },
  { id: 'crowd', label: 'Professional Community', desc: 'Vibe of fellow patrons working vs social gathering' },
];

export default function WorkspaceReviewForm({ onSubmitSuccess, onClose }) {
  const [spotName, setSpotName] = useState('');
  const [location, setLocation] = useState('');
  const [wifiSpeed, setWifiSpeed] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [ratings, setRatings] = useState(WORKSPACE_CRITERIA.reduce((acc, c) => ({ ...acc, [c.id]: 8 }), {}));

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      category: 'workspace',
      spotName: spotName.trim(),
      location: location.trim(),
      wifiSpeed: wifiSpeed.trim(),
      ratings,
      overallRatingAverage: (Object.values(ratings).reduce((a, b) => a + b, 0) / WORKSPACE_CRITERIA.length).toFixed(1),
      reviewComment: reviewComment.trim(),
      createdAt: new Date().toISOString(),
    };
    if (onSubmitSuccess) onSubmitSuccess(payload);
    alert('Workspace review submitted!');
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#161a17]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 text-[#e1e3df] shadow-2xl">
      <div className="flex justify-between items-start pb-6 mb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#9cd2b6] flex items-center gap-1.5 mb-1">
            <span className="material-symbols-outlined text-base">laptop_mac</span>
            Workspace & Co-Working Review
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Rate This Remote Spot</h2>
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
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#c0c9c2] mb-1.5">Spot / Cafe Name *</label>
            <input type="text" required placeholder="e.g. Roasters Cafe, Kickstart Co-working" value={spotName} onChange={(e) => setSpotName(e.target.value)} className="w-full bg-[#111412] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#9cd2b6]" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#c0c9c2] mb-1.5">City & Sector/Area *</label>
            <input type="text" required placeholder="e.g. F-7 Markaz Islamabad" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-[#111412] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#9cd2b6]" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#c0c9c2] mb-1.5">Tested Speed / ISP *</label>
            <input type="text" required placeholder="e.g. 50 Mbps Fiber / Nayatel" value={wifiSpeed} onChange={(e) => setWifiSpeed(e.target.value)} className="w-full bg-[#111412] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#9cd2b6]" />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="border-b border-white/10 pb-2">
            <h3 className="text-lg font-bold text-white">Work Productivity Ratings (10 Stars)</h3>
            <p className="text-xs text-[#c0c9c2]">Rate key remote-work essentials.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {WORKSPACE_CRITERIA.map((criterion) => (
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
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#c0c9c2]">Detailed Work Review (10-12 Lines) *</label>
          <textarea required rows={11} value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} placeholder="Detail the remote work conditions: Are there dedicated quiet zones for Zoom calls? How long does the generator backup kick in during power outages? Are socket ports available at every table or just along walls? Is there a minimum spending requirement per hour?" className="w-full bg-[#111412] border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-[#9cd2b6] leading-relaxed resize-y" />
        </div>

        <button type="submit" className="w-full py-4 rounded-2xl bg-[#174d38] border border-[#9cd2b6] text-white font-bold hover:bg-[#1a5a42]">Submit Workspace Review</button>
      </form>
    </div>
  );
}