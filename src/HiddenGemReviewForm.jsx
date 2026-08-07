import React, { useState } from 'react';

const HIDDEN_GEM_CRITERIA = [
  { id: 'uniqueness', label: 'Visual Beauty & Uniqueness', desc: 'Breathtaking scenery, historic charm, or unique vibe' },
  { id: 'crowd', label: 'Low Crowdedness (Quietness)', desc: 'Peaceful environment away from commercial tourist crowds' },
  { id: 'access', label: 'Ease of Access & Road Condition', desc: 'Navigable roads or reasonable hiking trek required' },
  { id: 'safety', label: 'Safety & Friendly Local Community', desc: 'Safe for families, solo travelers, and car parking' },
  { id: 'photo_spots', label: 'Photography & Golden Hour Spots', desc: 'Great angles for landscape photography and portraits' },
  { id: 'cleanliness', label: 'Natural Cleanliness & Littering', desc: 'Litter-free environment preserved by visitors' },
  { id: 'amenities', label: 'Nearby Chai/Restroom Facilities', desc: 'Availability of local tea stalls, fresh snacks, or restrooms' },
  { id: 'best_timing', label: 'Season / Weather Suitability', desc: 'Year-round appeal or ideal seasonal climate conditions' },
  { id: 'cost', label: 'Affordability & Zero Entry Fees', desc: 'Free access or fair entry/parking ticket pricing' },
  { id: 'wow_factor', label: 'Overall Surprise & Discovery Factor', desc: 'Exceeds expectations as an undiscovered local gem' },
];

export default function HiddenGemReviewForm({ onSubmitSuccess, onClose }) {
  const [spotName, setSpotName] = useState('');
  const [locationCoordinates, setLocationCoordinates] = useState('');
  const [spotCategory, setSpotCategory] = useState('Secret Scenic Viewpoint');
  const [reviewComment, setReviewComment] = useState('');
  const [ratings, setRatings] = useState(HIDDEN_GEM_CRITERIA.reduce((acc, c) => ({ ...acc, [c.id]: 8 }), {}));

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      category: 'hidden_gem',
      spotName: spotName.trim(),
      locationCoordinates: locationCoordinates.trim(),
      spotCategory,
      ratings,
      overallRatingAverage: (Object.values(ratings).reduce((a, b) => a + b, 0) / HIDDEN_GEM_CRITERIA.length).toFixed(1),
      reviewComment: reviewComment.trim(),
      createdAt: new Date().toISOString(),
    };
    if (onSubmitSuccess) onSubmitSuccess(payload);
    alert('Hidden gem review submitted!');
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#161a17]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 text-[#e1e3df] shadow-2xl">
      <div className="flex justify-between items-start pb-6 mb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#9cd2b6] flex items-center gap-1.5 mb-1">
            <span className="material-symbols-outlined text-base">explore</span>
            Hidden Gem & Offbeat Spot Review
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Share an Undiscovered Place</h2>
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
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#c0c9c2] mb-1.5">Spot / Destination Name *</label>
            <input type="text" required placeholder="e.g. Pharilla Trail Viewpoint, Shah Allah Ditta Caves" value={spotName} onChange={(e) => setSpotName(e.target.value)} className="w-full bg-[#111412] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#9cd2b6]" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#c0c9c2] mb-1.5">Location / Landmarks *</label>
            <input type="text" required placeholder="e.g. Margalla Hills Behind Monal, Islamabad" value={locationCoordinates} onChange={(e) => setLocationCoordinates(e.target.value)} className="w-full bg-[#111412] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#9cd2b6]" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#c0c9c2] mb-1.5">Gem Category *</label>
            <select value={spotCategory} onChange={(e) => setSpotCategory(e.target.value)} className="w-full bg-[#111412] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#9cd2b6]">
              <option value="Secret Scenic Viewpoint">Secret Scenic Viewpoint</option>
              <option value="Quiet Hiking Trail / Stream">Quiet Hiking Trail / Stream</option>
              <option value="Historical Heritage / Ruin">Historical Heritage / Ruin</option>
              <option value="Offbeat Food / Tea Stall">Offbeat Food / Tea Stall</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="border-b border-white/10 pb-2">
            <h3 className="text-lg font-bold text-white">Discovery Assessment (10 Stars)</h3>
            <p className="text-xs text-[#c0c9c2]">Rate serenity, accessibility, and visual charm.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {HIDDEN_GEM_CRITERIA.map((criterion) => (
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
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#c0c9c2]">Detailed Hidden Gem Guide (10-12 Lines) *</label>
          <textarea required rows={11} value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} placeholder="Provide detailed directions for visitors: What is the exact best time of day/sunset to visit? Can a standard sedan car reach the location or is a 4x4/hiking required? Are there any local tea spots nearby? Any safety advice for late evening visits?" className="w-full bg-[#111412] border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-[#9cd2b6] leading-relaxed resize-y" />
        </div>

        <button type="submit" className="w-full py-4 rounded-2xl bg-[#174d38] border border-[#9cd2b6] text-white font-bold hover:bg-[#1a5a42]">Submit Hidden Gem Review</button>
      </form>
    </div>
  );
}