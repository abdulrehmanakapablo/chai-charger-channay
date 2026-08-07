import React, { useState } from 'react';

const BEVERAGE_CRITERIA = [
  { id: 'flavor', label: 'Flavor Balance & Taste', desc: 'Richness, sweetness control, and authentic recipe profile' },
  { id: 'temperature', label: 'Temperature & Ice Ratio', desc: 'Proper serving temp without watered-down ice diluting flavor' },
  { id: 'customization', label: 'Milk & Sugar Customization', desc: 'Options for oat/almond milk, sugar syrup adjustments' },
  { id: 'presentation', label: 'Presentation & Cup Quality', desc: 'Visual aesthetics, sturdy cup materials, lid sealing' },
  { id: 'milk_texture', label: 'Milk Steam & Foam Texture', desc: 'Microfoam quality for hot lattes or creamer blend for boba' },
  { id: 'bean_brew', label: 'Bean & Brew Freshness', desc: 'Espresso extraction quality without burnt notes or excessive sourness' },
  { id: 'value', label: 'Price vs Drink Quantity', desc: 'Reasonableness of PKR pricing for cup size' },
  { id: 'speed', label: 'Barista Service Speed', desc: 'Queue processing efficiency during peak drink orders' },
  { id: 'menu_variety', label: 'Menu & Seasonal Variety', desc: 'Range of specialty drinks, matcha, teas, and cold brews' },
  { id: 'consistency', label: 'Batch Consistency', desc: 'Tastes identical across multiple repeat orders' },
];

export default function BeverageReviewForm({ onSubmitSuccess, onClose }) {
  const [cafeName, setCafeName] = useState('');
  const [location, setLocation] = useState('');
  const [drinkName, setDrinkName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [ratings, setRatings] = useState(BEVERAGE_CRITERIA.reduce((acc, c) => ({ ...acc, [c.id]: 8 }), {}));

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      category: 'beverage',
      cafeName: cafeName.trim(),
      location: location.trim(),
      drinkName: drinkName.trim(),
      ratings,
      overallRatingAverage: (Object.values(ratings).reduce((a, b) => a + b, 0) / BEVERAGE_CRITERIA.length).toFixed(1),
      reviewComment: reviewComment.trim(),
      createdAt: new Date().toISOString(),
    };
    if (onSubmitSuccess) onSubmitSuccess(payload);
    alert('Beverage review submitted!');
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#161a17]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 text-[#e1e3df] shadow-2xl">
      <div className="flex justify-between items-start pb-6 mb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#9cd2b6] flex items-center gap-1.5 mb-1">
            <span className="material-symbols-outlined text-base">local_cafe</span>
            Beverage & Specialty Drink Review
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Rate Your Coffee, Matcha or Tea</h2>
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
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#c0c9c2] mb-1.5">Cafe / Outlet Name *</label>
            <input type="text" required placeholder="e.g. Burning Brownie, Third Wave Coffee" value={cafeName} onChange={(e) => setCafeName(e.target.value)} className="w-full bg-[#111412] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#9cd2b6]" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#c0c9c2] mb-1.5">Branch Location *</label>
            <input type="text" required placeholder="e.g. Beverly Centre Islamabad" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-[#111412] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#9cd2b6]" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#c0c9c2] mb-1.5">Specific Drink Ordered *</label>
            <input type="text" required placeholder="e.g. Spanish Latte, Iced Ceremonial Matcha" value={drinkName} onChange={(e) => setDrinkName(e.target.value)} className="w-full bg-[#111412] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#9cd2b6]" />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="border-b border-white/10 pb-2">
            <h3 className="text-lg font-bold text-white">Drink Evaluation (10 Stars)</h3>
            <p className="text-xs text-[#c0c9c2]">Rate drink taste, quality, and service execution.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {BEVERAGE_CRITERIA.map((criterion) => (
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
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#c0c9c2]">Detailed Drink Review (10-12 Lines) *</label>
          <textarea required rows={11} value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} placeholder="Describe the beverage in detail: Did the espresso have a balanced acidity or bitter roast profile? Was the matcha grade earthy or sweet? Did they charge extra for dairy alternatives? How is the cup sealing for takeaway orders?" className="w-full bg-[#111412] border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-[#9cd2b6] leading-relaxed resize-y" />
        </div>

        <button type="submit" className="w-full py-4 rounded-2xl bg-[#174d38] border border-[#9cd2b6] text-white font-bold hover:bg-[#1a5a42]">Submit Drink Review</button>
      </form>
    </div>
  );
}