

#  Chai, Charger & Channay

> **Location-Aware Workspace & Spot Discovery Platform**  
> *Find the best cafes, quiet workspaces, hostels, and hidden spots around you based on real amenity requirements.*

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://chai-charger-channay.vercel.app/)


---

##  Overview

**Chai, Charger & Channay** is a full-stack, geospatial discovery web application built for remote workers, digital nomads, students, and travelers. Unlike traditional review platforms, it focuses on functional needs—such as Wi-Fi speeds, available power outlets, noise levels, and ergonomic seating. 

The application utilizes **PostGIS spatial indexing** to compute real-time distances between the user's GPS coordinates and nearby spots, offering interactive map visualization and category-specific filtering.

---

##  Key Features

- **Interactive Geospatial Mapping:** Custom Leaflet dark-theme map rendering user location, distance circles, and real-time interactive pins.
- **Marker Clustering (`use-supercluster`):** Dynamic spatial clustering algorithm that groups hundreds of nearby locations smoothly without causing UI frame drops.
- **Requirement-Based Filtering:** Filter workspaces, hotels, hostels, airbnbs, and hidden gems by specific criteria (e.g., Wi-Fi, Outlets, Quietness, Hygiene) via custom PostgreSQL RPC functions.
- **Fuzzy & Full-Text Search:** Search food and beverage spots using PostgreSQL Trigram (`pg_trgm`) and vector search (`search_reviews_text`).
- **Adaptive Floating Drawer & Modals:** Desktop and mobile-optimized side drawers and bottom sheets for seamless spot inspection.

---

## 🛠️ Technical Skills & Stack

### **Frontend Engineering**
- **React.js & React Router DOM:** Single-page app architecture, route param management (`useParams`), custom hooks, and state lifecycle management.
- **Tailwind CSS:** Responsive glassmorphism styling, dark-mode color palettes, and fluid UI components.
- **Leaflet & React-Leaflet:** Dynamic map rendering, custom HTML/CSS map markers, spatial bounding box calculation.
- **Client-Side Optimization:** Marker clustering (`use-supercluster`), debounced backend calls, and non-blocking state updates.

### **Database & Backend Engineering**
- **PostgreSQL & PostGIS:** Spatial database schema design, bounding box queries (`ST_DWithin`), and distance calculations (`ST_Distance`).
- **PL/pgSQL (Stored Procedures & RPCs):** Custom PostgreSQL database functions (`filter_reviews_by_criteria`, `search_reviews_text`) executed directly via RPC calls.
- **Database Optimization:** List-based table partitioning by category, GiST spatial indexing, and Trigram fuzzy search indexes.
- **Supabase BaaS & RLS:** Realtime database connectivity and Row-Level Security policies.

---

##  Getting Started

### Prerequisites
- **Node.js** (v18.0 or higher)
- **npm** or **yarn**
- A **Supabase** project with PostGIS enabled

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/abdulrehmanakapablo/chai-charger-channay.git](https://github.com/abdulrehmanakapablo/chai-charger-channay.git)
   cd chai-charger-channay
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**  
   Create a `.env.local` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```


##  Live Application
- **Production URL:** [https://chai-charger-channay.vercel.app/](https://chai-charger-channay.vercel.app/)
- **GitHub Repository:** [https://github.com/abdulrehmanakapablo/chai-charger-channay](https://github.com/abdulrehmanakapablo/chai-charger-channay)