import React, { useState } from 'react';

const HOTEL_CRITERIA = [
  { id: 'cleanliness', label: 'Room Cleanliness & Housekeeping', desc: 'Bedsheet freshness, bathroom sanitation, towel quality' },
  { id: 'sleep_quality', label: 'Bed Comfort & Sleep Quality', desc: 'Mattress support, pillow options, window blackout curtains' },
  { id: 'amenities', label: 'Bathroom Amenities & Hot Water', desc: 'Water pressure, toiletries provided, instant hot water' },
  { id: 'room_service', label: 'Room Service & Breakfast Buffet', desc: 'Quality, variety, and temperature of hotel breakfast/dining' },
  { id: 'checkin', label: 'Front Desk & Check-in Efficiency', desc: 'Staff professionalism, check-in speed, smooth luggage handling' },
  { id: 'ac_heating', label: 'Climate Control & HVAC', desc: 'AC cooling efficiency, silent operation, winter room heating' },
  { id: 'soundproofing', label: 'Noise Insulation', desc: 'Wall soundproofing from hallway noise and outdoor traffic' },
  { id: 'facilities', label: 'Hotel Facilities (Gym/Pool)', desc: 'Maintenance of lobby, elevator, swimming pool, or gym' },
  { id: 'parking', label: 'Parking & Valet Security', desc: 'Secure vehicle parking and valet service promptness' },
  { id: 'value', label: 'Nightly Rate Value', desc: 'Overall luxury and service delivery relative to price paid' },
];

export default function HotelReviewForm({ onSubmitSuccess, onClose }) {
  const [hotelName, setHotelName] = useState('');
  const [cityAddress, setCityAddress] = useState('');
  const [roomCategory, setRoomCategory] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [ratings, setRatings] = useState(HOTEL_CRITERIA.reduce((acc, c) => ({ ...acc, [c.id]: 8 }), {}));

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      category: 'hotel',
      hotelName: hotelName.trim(),
      cityAddress: cityAddress.trim(),
      roomCategory: roomCategory.trim(),
      ratings,
      overallRatingAverage: (Object.values(ratings).reduce((a, b) => a + b, 0) / HOTEL_CRITERIA.length).toFixed(1),
      reviewComment: reviewComment.trim(),
      createdAt: new Date().toISOString(),
    };
    if (onSubmitSuccess) onSubmitSuccess(payload);
    alert('Hotel review submitted!');
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#161a17]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 text-[#e1e3df] shadow-2xl">
      <div className="flex justify-between items-start pb-6 mb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#9cd2b6] flex items-center gap-1.5 mb-1">
            <span className="material-symbols-outlined text-base">hotel</span>
            Hotel Stay & Service Review
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Rate Hotel Quality & Hospitality</h2>
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
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#c0c9c2] mb-1.5">Hotel Name *</label>
            <input type="text" required placeholder="e.g. Serena Hotel, Pearl Continental" value={hotelName} onChange={(e) => setHotelName(e.target.value)} className="w-full bg-[#111412] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#9cd2b6]" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#c0c9c2] mb-1.5">City & Street Address *</label>
            <input type="text" required placeholder="e.g. Khayaban-e-Suhrawardy Islamabad" value={cityAddress} onChange={(e) => setCityAddress(e.target.value)} className="w-full bg-[#111412] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#9cd2b6]" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#c0c9c2] mb-1.5">Room Category Booked *</label>
            <input type="text" required placeholder="e.g. Deluxe King Room, Executive Suite" value={roomCategory} onChange={(e) => setRoomCategory(e.target.value)} className="w-full bg-[#111412] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#9cd2b6]" />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="border-b border-white/10 pb-2">
            <h3 className="text-lg font-bold text-white">Hospitality Standards (10 Stars)</h3>
            <p className="text-xs text-[#c0c9c2]">Rate room comforts, dining, and hotel operations.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {HOTEL_CRITERIA.map((criterion) => (
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
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#c0c9c2]">Detailed Hotel Review (10-12 Lines) *</label>
          <textarea required rows={11} value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} placeholder="Provide full details about your stay: How smooth was check-in/check-out? Did the room look exactly like photos? How was the breakfast spread quality and staff service? Were there any hidden service charges or deposit surprises?" className="w-full bg-[#111412] border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-[#9cd2b6] leading-relaxed resize-y" />
        </div>

        <button type="submit" className="w-full py-4 rounded-2xl bg-[#174d38] border border-[#9cd2b6] text-white font-bold hover:bg-[#1a5a42]">Submit Hotel Review</button>
      </form>
    </div>
  );
}