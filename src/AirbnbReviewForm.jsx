import React, { useState } from 'react';

const AIRBNB_CRITERIA = [
  { id: 'accuracy', label: 'Listing Description Accuracy', desc: 'Property matched photos, amenities list, and size' },
  { id: 'communication', label: 'Host Communication & Self Check-in', desc: 'Host response time, check-in codes, clear instructions' },
  { id: 'cleanliness', label: 'Property Cleanliness & Hygiene', desc: 'Clean kitchen, dust-free furniture, fresh bed sheets' },
  { id: 'kitchen_equipment', label: 'Kitchen Utensils & Appliances', desc: 'Pots, stove, microwave, fridge, and basic spices setup' },
  { id: 'bed_comfort', label: 'Bed Comfort & Linens', desc: 'Quality mattress, pillows, and extra blankets provided' },
  { id: 'neighborhood', label: 'Neighborhood Safety & Peace', desc: 'Safe street, quiet night environment, secure building door' },
  { id: 'wifi', label: 'Dedicated Wi-Fi & Smart TV', desc: 'Private fast Wi-Fi and working smart TV/Netflix' },
  { id: 'power_backup', label: 'UPS / Generator Power Backup', desc: 'Automatic power backup for lights, fans, and routers' },
  { id: 'privacy', label: 'Privacy & Host Autonomy', desc: 'Undisturbed private entry without unnecessary host intrusions' },
  { id: 'value', label: 'Value for Money', desc: 'Nightly rate plus cleaning fee vs overall comfort' },
];

export default function AirbnbReviewForm({ onSubmitSuccess, onClose }) {
  const [listingTitle, setListingTitle] = useState('');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('Entire Studio Apartment');
  const [reviewComment, setReviewComment] = useState('');
  const [ratings, setRatings] = useState(AIRBNB_CRITERIA.reduce((acc, c) => ({ ...acc, [c.id]: 8 }), {}));

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      category: 'airbnb',
      listingTitle: listingTitle.trim(),
      location: location.trim(),
      propertyType,
      ratings,
      overallRatingAverage: (Object.values(ratings).reduce((a, b) => a + b, 0) / AIRBNB_CRITERIA.length).toFixed(1),
      reviewComment: reviewComment.trim(),
      createdAt: new Date().toISOString(),
    };
    if (onSubmitSuccess) onSubmitSuccess(payload);
    alert('Airbnb review submitted!');
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#161a17]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 text-[#e1e3df] shadow-2xl">
      <div className="flex justify-between items-start pb-6 mb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#9cd2b6] flex items-center gap-1.5 mb-1">
            <span className="material-symbols-outlined text-base">home_pin</span>
            Airbnb & Short-Term Rental Review
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Rate Property & Host Experience</h2>
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
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#c0c9c2] mb-1.5">Airbnb Title / Host Name *</label>
            <input type="text" required placeholder="e.g. Modern Studio in E-11, Host Ali" value={listingTitle} onChange={(e) => setListingTitle(e.target.value)} className="w-full bg-[#111412] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#9cd2b6]" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#c0c9c2] mb-1.5">City & Building/Area *</label>
            <input type="text" required placeholder="e.g. Sector F-10/3 Islamabad" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-[#111412] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#9cd2b6]" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#c0c9c2] mb-1.5">Property Type *</label>
            <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="w-full bg-[#111412] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#9cd2b6]">
              <option value="Entire Studio Apartment">Entire Studio Apartment</option>
              <option value="2-Bedroom Flat">2-Bedroom Flat</option>
              <option value="Private Room in Villa">Private Room in Villa</option>
              <option value="Mountain Cabin / Cottage">Mountain Cabin / Cottage</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="border-b border-white/10 pb-2">
            <h3 className="text-lg font-bold text-white">Rental Metrics (10 Stars)</h3>
            <p className="text-xs text-[#c0c9c2]">Rate accuracy, host assistance, and apartment setup.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {AIRBNB_CRITERIA.map((criterion) => (
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
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#c0c9c2]">Detailed Airbnb Review (10-12 Lines) *</label>
          <textarea required rows={11} value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} placeholder="Review the space: How straightforward was self check-in via lockbox or digital code? Was the kitchen stocked with clean pans and microwave? How was water pressure and heater performance? Did the host respect privacy while being accessible?" className="w-full bg-[#111412] border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-[#9cd2b6] leading-relaxed resize-y" />
        </div>

        <button type="submit" className="w-full py-4 rounded-2xl bg-[#174d38] border border-[#9cd2b6] text-white font-bold hover:bg-[#1a5a42]">Submit Airbnb Review</button>
      </form>
    </div>
  );
}