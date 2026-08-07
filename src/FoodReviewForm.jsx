import React, { useState } from 'react';

const RATING_CRITERIA = [
  { id: 'overall', label: 'Overall Experience', desc: 'General satisfaction with your visit' },
  { id: 'staff', label: 'Staff Treatment & Courtesy', desc: 'How welcoming and attentive the staff was' },
  { id: 'cleanliness', label: 'Cleanliness & Hygiene', desc: 'Table, floor, and cutlery cleanliness' },
  { id: 'ambiance', label: 'Ambiance & Atmosphere', desc: 'Lighting, music, vibe, and decor' },
  { id: 'taste', label: 'Food Taste & Flavor', desc: 'Freshness, seasoning, and authentic taste' },
  { id: 'portion', label: 'Portion Size & Quantity', desc: 'Sufficiency of food relative to serving' },
  { id: 'value', label: 'Value for Money', desc: 'Reasonableness of PKR pricing vs quality' },
  { id: 'speed', label: 'Serving Speed', desc: 'Time taken for food to arrive at your table' },
  { id: 'comfort', label: 'Seating & AC Cooling', desc: 'Comfortable chairs, space, and temperature' },
  { id: 'parking', label: 'Parking & Accessibility', desc: 'Ease of parking car/bike outside the outlet' },
];

export default function FoodReviewForm({ onSubmitSuccess, onClose }) {
  const [restaurantName, setRestaurantName] = useState('');
  const [outletLocation, setOutletLocation] = useState('');
  const [dishesEaten, setDishesEaten] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  // Store ratings for all 10 criteria (default 8/10)
  const [ratings, setRatings] = useState(
    RATING_CRITERIA.reduce((acc, c) => ({ ...acc, [c.id]: 8 }), {})
  );

  const handleRatingChange = (id, score) => {
    setRatings((prev) => ({ ...prev, [id]: score }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // DB Payload structure ready for Recommendation Page filtering & search
    const reviewPayload = {
      category: 'food',
      restaurantName: restaurantName.trim(),
      outletLocation: outletLocation.trim(),
      dishesEaten: dishesEaten.trim().split(',').map((d) => d.trim()),
      ratings,
      overallRatingAverage: (
        Object.values(ratings).reduce((a, b) => a + b, 0) / RATING_CRITERIA.length
      ).toFixed(1),
      reviewComment: reviewComment.trim(),
      createdAt: new Date().toISOString(),
    };

    console.log('Food Review Submitted to DB:', reviewPayload);
    if (onSubmitSuccess) onSubmitSuccess(reviewPayload);
    alert('Food review submitted successfully!');
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#161a17]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 text-[#e1e3df] shadow-2xl">
      {/* Header */}
      <div className="flex justify-between items-start pb-6 mb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#9cd2b6] flex items-center gap-1.5 mb-1">
            <span className="material-symbols-outlined text-base">restaurant</span>
            Detailed Food Review
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Share Your Dining Experience</h2>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {/* SECTION 1: OUTLET & DISH DETAILS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5 bg-white/5 rounded-2xl border border-white/5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#c0c9c2] mb-1.5">
              Restaurant / Franchise *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Savour Foods, Monal, Tehzeeb"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              className="w-full bg-[#111412] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#9cd2b6]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#c0c9c2] mb-1.5">
              Outlet Branch & City *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Blue Area Islamabad, Gulberg III Lahore"
              value={outletLocation}
              onChange={(e) => setOutletLocation(e.target.value)}
              className="w-full bg-[#111412] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#9cd2b6]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#c0c9c2] mb-1.5">
              What Did You Eat? *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Chicken Karahi, Zinger Burger, Garlic Naan"
              value={dishesEaten}
              onChange={(e) => setDishesEaten(e.target.value)}
              className="w-full bg-[#111412] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#9cd2b6]"
            />
          </div>
        </div>

        {/* SECTION 2: 10-STAR RATING BARS (10 CRITERIA) */}
        <div className="flex flex-col gap-6">
          <div className="border-b border-white/10 pb-2">
            <h3 className="text-lg font-bold text-white">Detailed Ratings (10-Star Scale)</h3>
            <p className="text-xs text-[#c0c9c2]">Rate each aspect of your visit from 1 to 10 stars.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {RATING_CRITERIA.map((criterion) => {
              const currentScore = ratings[criterion.id];
              return (
                <div key={criterion.id} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-semibold text-white">{criterion.label}</h4>
                      <p className="text-[11px] text-[#c0c9c2]">{criterion.desc}</p>
                    </div>
                    <span className="text-sm font-bold bg-[#174d38] text-[#9cd2b6] px-2.5 py-1 rounded-lg border border-[#9cd2b6]/30 shrink-0">
                      {currentScore} / 10
                    </span>
                  </div>

                  {/* 10 Star Rating Bar */}
                  <div className="flex items-center gap-1 mt-1 overflow-x-auto pb-1">
                    {Array.from({ length: 10 }).map((_, index) => {
                      const starValue = index + 1;
                      const isFilled = starValue <= currentScore;
                      return (
                        <button
                          key={starValue}
                          type="button"
                          onClick={() => handleRatingChange(criterion.id, starValue)}
                          className={`p-0.5 rounded transition transform active:scale-95 cursor-pointer ${
                            isFilled ? 'text-amber-400' : 'text-gray-600 hover:text-amber-300'
                          }`}
                        >
                          <span className="material-symbols-outlined text-lg leading-none">
                            {isFilled ? 'star' : 'star'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: 10-12 LINE DETAILED REVIEW TEXTAREA */}
        <div className="flex flex-col gap-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#c0c9c2]">
            Detailed Written Review (Stored for Recommendation Searches) *
          </label>
          <textarea
            required
            rows={11}
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            placeholder="Write a comprehensive review describing your visit in detail (10-12 lines). Include details like peak rush hours, best dishes, taste consistency, family environment, parking availability, or specific staff behavior that others searching for food recommendations would find helpful..."
            className="w-full bg-[#111412] border border-white/10 rounded-2xl p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#9cd2b6] leading-relaxed resize-y"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-[#174d38] border border-[#9cd2b6] text-white font-bold text-base hover:bg-[#1a5a42] transition shadow-xl cursor-pointer"
        >
          Submit Food Review
        </button>
      </form>
    </div>
  );
}