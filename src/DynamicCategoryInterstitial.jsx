import React from 'react';
import { useParams } from 'react-router-dom';

const CATEGORIES_DATA = {
  workspaces: {
    badge: "Work Environments",
    icon: "laptop_mac",
    title: "Workspaces & Hubs",
    description: "What are you looking to do today? Share your remote workspace insights or find the ideal laptop-friendly location.",
    card1: {
      title: "Do you want to review a Workspace?",
      desc: "Share details on Wi-Fi speeds, noise levels, seating comfort, and outlet availability.",
      btnText: "Submit Review",
      color: "tertiary"
    },
    card2: {
      title: "Are you looking for Workspace recommendations?",
      desc: "Browse quiet coffee shops, public libraries, and co-working spaces built for productivity.",
      btnText: "Explore Workspaces",
      color: "primary"
    }
  },
  food: {
    badge: "Food Options",
    icon: "restaurant",
    title: "Food Options",
    description: "What are you looking to do today? Share your culinary experiences or discover new favorites in your area.",
    card1: {
      title: "Do you want to review a Food Spot?",
      desc: "Share your latest dining experience. Help the community discover hidden gems or know what to avoid.",
      btnText: "Write a Review",
      color: "tertiary"
    },
    card2: {
      title: "Are you looking for Food recommendations?",
      desc: "Discover highly-rated cafes, local dining spots, and Karahi options nearby.",
      btnText: "Explore Food Spots",
      color: "primary"
    }
  },
  beverages: {
    badge: "Beverages & Cafes",
    icon: "local_cafe",
    title: "Beverages & Cafes",
    description: "Craving a warm cup of Karak Chai or specialized coffee? Rate local spots or discover new cafes.",
    card1: {
      title: "Do you want to review a Beverage Spot?",
      desc: "Rate the coffee quality, tea strength, bakery selection, and seating vibe of a spot you visited.",
      btnText: "Write a Review",
      color: "tertiary"
    },
    card2: {
      title: "Are you looking for Beverage recommendations?",
      desc: "Find top-rated espresso bars, traditional chai dhabas, and late-night tea hubs.",
      btnText: "Explore Cafes & Chai",
      color: "primary"
    }
  },
  hotels: {
    badge: "Hotels & Premium Stays",
    icon: "bed",
    title: "Hotels & Stays",
    description: "Looking to book or leave feedback? Share your lodging experience or find reliable luxury stays.",
    card1: {
      title: "Do you want to review a Hotel?",
      desc: "Log your thoughts on hospitality, room quality, location convenience, and amenities.",
      btnText: "Submit Hotel Review",
      color: "tertiary"
    },
    card2: {
      title: "Are you looking for Hotel recommendations?",
      desc: "Explore top-tier hotels, business lodging, and boutique stays suited for your journey.",
      btnText: "Explore Stays",
      color: "primary"
    }
  },
  hostels: {
    badge: "Hostels & Social Stays",
    icon: "hotel_class",
    title: "Hostels & Budget Stays",
    description: "Connect with fellow travelers. Review budget accommodations or find social hostels in the area.",
    card1: {
      title: "Do you want to review a Hostel?",
      desc: "Rate the community atmosphere, cleanliness, safety, and workspace facilities.",
      btnText: "Write Hostel Review",
      color: "tertiary"
    },
    card2: {
      title: "Are you looking for Hostel recommendations?",
      desc: "Discover social, budget-friendly hostels and communal spaces nearby.",
      btnText: "Explore Hostels",
      color: "primary"
    }
  },
  airbnbs: {
    badge: "Unique Homes & Condos",
    icon: "vpn_key",
    title: "Airbnbs & Homes",
    description: "Share your rental experience or search for verified private homes and condos.",
    card1: {
      title: "Do you want to review an Airbnb?",
      desc: "Share your stay experience, host communication, check-in process, and neighborhood vibe.",
      btnText: "Submit Airbnb Review",
      color: "tertiary"
    },
    card2: {
      title: "Are you looking for Airbnb recommendations?",
      desc: "Find curated private apartments, studio spaces, and scenic vacation homes.",
      btnText: "Explore Airbnbs",
      color: "primary"
    }
  },
  hidden_gems: {
    badge: "Secret Spots & Offbeat Locations",
    icon: "auto_awesome",
    title: "Hidden Gem Spots",
    description: "Uncover quiet retreats, off-the-beaten-path overlooks, and uncrowded spots in your city.",
    card1: {
      title: "Do you want to report a Hidden Gem Spot?",
      desc: "Share secret scenic spots, quiet parks, or uncrowded local hangouts with the community.",
      btnText: "Submit Hidden Gem",
      color: "tertiary"
    },
    card2: {
      title: "Are you looking for Hidden Gem Spots?",
      desc: "Discover secret viewpoints, peaceful escapes, and obscure spots off the tourist path.",
      btnText: "Explore Hidden Gems",
      color: "primary"
    }
  }
};

export default function DynamicCategoryInterstitial({ 
  initialCategory, 
  onSelectAction 
}) {
  const { categoryId } = useParams();
  const selectedCategory = initialCategory || categoryId || "workspaces";
  const activeData = CATEGORIES_DATA[selectedCategory] || CATEGORIES_DATA.workspaces;

  return (
    <div className="bg-[#111412] text-[#e1e3df] min-h-screen w-full flex flex-col items-center justify-center relative px-4 md:px-12 py-8 selection:bg-[#174d38] selection:text-[#87bda2]">
      
      {/* Background Atmospheric Lighting */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-container opacity-20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-tertiary-container opacity-20 blur-[150px]"></div>
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-4xl mx-auto flex flex-col justify-center items-center my-auto py-4">
        
        {/* Dynamic Category Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 mt-2">
          <h1 className="text-3xl md:text-5xl font-bold text-[#e1e3df] mb-3 tracking-tight">
            {activeData.title}
          </h1>
          <p className="text-sm md:text-base text-[#c0c9c2] leading-relaxed">
            {activeData.description}
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          
          {/* Card 1: Review Action */}
          <div
            onClick={() => onSelectAction && onSelectAction(selectedCategory, 'review')}
            className="group relative rounded-[28px] p-8 md:p-10 flex flex-col items-center text-center transition-all duration-500 cursor-pointer h-full overflow-hidden
                       bg-white/[0.03] backdrop-blur-2xl border border-white/[0.12] 
                       hover:bg-white/[0.07] hover:border-white/[0.25] hover:-translate-y-1.5
                       shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-[0_20px_50px_rgba(254,180,177,0.15)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#693534]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="w-20 h-20 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-6 shadow-2xl group-hover:scale-110 transition-all duration-300 group-hover:border-[#feb4b1]/30 group-hover:shadow-[0_0_30px_rgba(254,180,177,0.3)]">
              <span className="material-symbols-outlined text-4xl text-[#feb4b1]">
                rate_review
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-[#e1e3df] mb-3 group-hover:text-white transition-colors">
              {activeData.card1.title}
            </h2>
            <p className="text-sm text-[#c0c9c2] mb-8 flex-grow leading-relaxed">
              {activeData.card1.desc}
            </p>

            <div className="inline-flex items-center gap-2 text-[#feb4b1] text-sm font-semibold group-hover:gap-3 transition-all duration-300">
              {activeData.card1.btnText}
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </div>
          </div>

          {/* Card 2: Explore Action */}
          <div
            onClick={() => onSelectAction && onSelectAction(selectedCategory, 'explore')}
            className="group relative rounded-[28px] p-8 md:p-10 flex flex-col items-center text-center transition-all duration-500 cursor-pointer h-full overflow-hidden
                       bg-white/[0.03] backdrop-blur-2xl border border-white/[0.12] 
                       hover:bg-white/[0.07] hover:border-white/[0.25] hover:-translate-y-1.5
                       shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-[0_20px_50px_rgba(156,210,182,0.15)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#174d38]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="w-20 h-20 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-6 shadow-2xl group-hover:scale-110 transition-all duration-300 group-hover:border-[#9cd2b6]/30 group-hover:shadow-[0_0_30px_rgba(156,210,182,0.3)]">
              <span className="material-symbols-outlined text-4xl text-[#9cd2b6]">
                travel_explore
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-[#e1e3df] mb-3 group-hover:text-white transition-colors">
              {activeData.card2.title}
            </h2>
            <p className="text-sm text-[#c0c9c2] mb-8 flex-grow leading-relaxed">
              {activeData.card2.desc}
            </p>

            <div className="inline-flex items-center gap-2 text-[#9cd2b6] text-sm font-semibold group-hover:gap-3 transition-all duration-300">
              {activeData.card2.btnText}
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}