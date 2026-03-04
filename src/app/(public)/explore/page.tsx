"use client";

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Filter, 
  ChevronDown, 
  SlidersHorizontal,
  Heart,
  Music,
  Briefcase,
  Coffee,
  Camera,
  ArrowRight,
  Activity // Nouvelle icône pour la catégorie santé/bien-être
} from 'lucide-react';
import Link from 'next/link';

// --- Configuration des Styles par Catégorie ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CATEGORY_STYLES: Record<string, { label: string; icon: any; color: string; bg: string; border: string }> = {
  music: { 
    label: 'Musique', 
    icon: Music, 
    color: 'text-rose-600', 
    bg: 'bg-rose-50', 
    border: 'border-l-rose-500' 
  },
  business: { 
    label: 'Business', 
    icon: Briefcase, 
    color: 'text-blue-600', 
    bg: 'bg-blue-50', 
    border: 'border-l-blue-500'
  },
  food: { 
    label: 'Gastronomie', 
    icon: Coffee, 
    color: 'text-amber-600', 
    bg: 'bg-amber-50', 
    border: 'border-l-amber-500'
  },
  arts: { 
    label: 'Arts & Culture', 
    icon: Camera, 
    color: 'text-purple-600', 
    bg: 'bg-purple-50', 
    border: 'border-l-purple-500'
  },
  health: { 
    label: 'Bien-être', 
    icon: Activity, 
    color: 'text-emerald-600', 
    bg: 'bg-emerald-50', 
    border: 'border-l-emerald-500'
  },
  // Fallback
  default: { 
    label: 'Événement', 
    icon: Calendar, 
    color: 'text-slate-600', 
    bg: 'bg-slate-50', 
    border: 'border-l-slate-400'
  }
};

const CATEGORIES = [
  { id: 'all', name: 'Tout', icon: null },
  { id: 'music', name: 'Musique', icon: Music },
  { id: 'business', name: 'Business', icon: Briefcase },
  { id: 'food', name: 'Gastronomie', icon: Coffee },
  { id: 'arts', name: 'Arts & Culture', icon: Camera },
  { id: 'health', name: 'Bien-être', icon: Activity },
];

const MOCK_EVENTS = [
  {
    id: 1,
    title: "Neon Festival 2024",
    date: "2024-07-15",
    time: "18:00",
    location: "Paris, France",
    price: 45,
    category: "music",
    image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=1000",
    organizer: "Live Nation",
    tags: ["Populaire"]
  },
  {
    id: 2,
    title: "Tech Summit Europe",
    date: "2024-09-22",
    time: "09:00",
    location: "Lyon, France",
    price: 150,
    category: "business",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000",
    organizer: "TechWorld",
    tags: []
  },
  {
    id: 3,
    title: "Atelier Photographie Urbaine",
    date: "2024-10-05",
    time: "14:00",
    location: "Marseille, France",
    price: 30,
    category: "arts",
    image: "https://images.unsplash.com/photo-1552168324-d612d77725e3?auto=format&fit=crop&q=80&w=1000",
    organizer: "Photo Club",
    tags: ["Places limitées"]
  },
  {
    id: 4,
    title: "Dégustation Vins & Fromages",
    date: "2024-11-12",
    time: "19:30",
    location: "Bordeaux, France",
    price: 60,
    category: "food",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=1000",
    organizer: "Le Vignoble",
    tags: []
  },
  {
    id: 5,
    title: "Yoga au lever du soleil",
    date: "2024-08-10",
    time: "06:00",
    location: "Nice, France",
    price: 15,
    category: "health",
    image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&q=80&w=1000",
    organizer: "Zen Spirit",
    tags: ["Bien-être"]
  },
  {
    id: 6,
    title: "Conférence Startup Growth",
    date: "2024-09-01",
    time: "10:00",
    location: "Paris, France",
    price: 0,
    category: "business",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1000",
    organizer: "Station F",
    tags: ["Gratuit"]
  },
  {
    id: 7,
    title: "Exposition Art Moderne",
    date: "2024-07-20",
    time: "10:00",
    location: "Paris, France",
    price: 25,
    category: "arts",
    image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&q=80&w=1000",
    organizer: "Musée d'Orsay",
    tags: []
  },
  {
    id: 8,
    title: "Concert Jazz Underground",
    date: "2024-08-15",
    time: "21:00",
    location: "Lyon, France",
    price: 35,
    category: "music",
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&q=80&w=1000",
    organizer: "Blue Note",
    tags: ["Ce soir"]
  },
  {
    id: 9,
    title: "Masterclass Cuisine Italienne",
    date: "2024-09-18",
    time: "18:30",
    location: "Nice, France",
    price: 55,
    category: "food",
    image: "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?auto=format&fit=crop&q=80&w=1000",
    organizer: "Chef Giovanni",
    tags: []
  },
  {
    id: 10,
    title: "Méditation Pleine Conscience",
    date: "2024-08-05",
    time: "08:00",
    location: "Paris, France",
    price: 20,
    category: "health",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1000",
    organizer: "Mindful Life",
    tags: ["Relaxation"]
  },
  {
    id: 11,
    title: "Rock Band Live",
    date: "2024-10-30",
    time: "20:00",
    location: "Lille, France",
    price: 40,
    category: "music",
    image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&q=80&w=1000",
    organizer: "Rock Events",
    tags: []
  },
  {
    id: 12,
    title: "Salon de l'Entrepreneuriat",
    date: "2024-11-20",
    time: "09:00",
    location: "Bordeaux, France",
    price: 10,
    category: "business",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1000",
    organizer: "Chambre Commerce",
    tags: []
  },
  {
    id: 13,
    title: "Festival Film Indépendant",
    date: "2024-10-12",
    time: "14:00",
    location: "Cannes, France",
    price: 15,
    category: "arts",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=1000",
    organizer: "Ciné Art",
    tags: []
  },
  {
    id: 14,
    title: "Brunch Bio & Local",
    date: "2024-09-08",
    time: "11:00",
    location: "Nantes, France",
    price: 28,
    category: "food",
    image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&q=80&w=1000",
    organizer: "Green Eats",
    tags: ["Bio"]
  },
  {
    id: 15,
    title: "Pilates en Plein Air",
    date: "2024-07-25",
    time: "09:00",
    location: "Toulouse, France",
    price: 12,
    category: "health",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=1000",
    organizer: "Fit Park",
    tags: []
  },
  {
    id: 16,
    title: "Electro Night",
    date: "2024-12-31",
    time: "23:00",
    location: "Montpellier, France",
    price: 60,
    category: "music",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=80&w=1000",
    organizer: "Night Vibes",
    tags: ["Nouvel An"]
  },
  {
    id: 17,
    title: "Conférence IA & Futur",
    date: "2024-11-05",
    time: "14:30",
    location: "Paris, France",
    price: 200,
    category: "business",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000",
    organizer: "Future Tech",
    tags: []
  },
  {
    id: 18,
    title: "Street Art Tour",
    date: "2024-08-20",
    time: "16:00",
    location: "Berlin, Allemagne",
    price: 20,
    category: "arts",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=1000",
    organizer: "Urban Guide",
    tags: []
  },
  {
    id: 19,
    title: "Cours de Pâtisserie",
    date: "2024-10-15",
    time: "15:00",
    location: "Lyon, France",
    price: 70,
    category: "food",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1000",
    organizer: "Sweet School",
    tags: ["Débutant"]
  },
  {
    id: 20,
    title: "Retraite Yoga & Silence",
    date: "2024-09-20",
    time: "10:00",
    location: "Bali, Indonésie",
    price: 1200,
    category: "health",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=1000",
    organizer: "Spirit Travel",
    tags: ["Exclusif"]
  }
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EventCard = ({ event }: { event: any }) => {
  const style = CATEGORY_STYLES[event.category] || CATEGORY_STYLES.default;
  const CategoryIcon = style.icon;

  return (
    <Link href={`/event/${event.id}`} className={`bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full border-l-4 ${style.border} block`}>
      <div className="relative h-48 overflow-hidden rounded-t-xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 rounded-t-xl"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <div className="bg-white/95 backdrop-blur px-2.5 py-1 rounded-md text-xs font-bold text-slate-900 shadow-sm uppercase tracking-wider">
            {new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
          </div>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {event.tags.map((tag: any) => (
            <div key={tag} className="bg-indigo-600/90 backdrop-blur px-2.5 py-1 rounded-md text-xs font-bold text-white shadow-sm">
              {tag}
            </div>
          ))}
        </div>
        <button className="absolute top-3 right-3 p-2 bg-black/20 hover:bg-white text-white hover:text-rose-500 rounded-full backdrop-blur-sm transition-all">
          <Heart size={16} fill={event.isFavorite ? "currentColor" : "none"} />
        </button>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        {/* En-tête de catégorie visuel */}
        <div className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-2 ${style.color}`}>
          <CategoryIcon size={14} />
          {style.label}
        </div>

        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2">
            {event.title}
          </h3>
        </div>
        
        <div className="space-y-2 mb-4 flex-1">
          <p className="text-slate-500 text-sm flex items-center gap-2">
            <MapPin size={14} className="text-indigo-500 shrink-0" /> 
            <span className="truncate">{event.location}</span>
          </p>
          <p className="text-slate-500 text-sm flex items-center gap-2">
            <Calendar size={14} className="text-indigo-500 shrink-0" /> 
            {new Date(event.date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
          <div>
            <span className="text-xs text-slate-400 block">À partir de</span>
            <span className="font-bold text-slate-900 text-lg">
              {event.price === 0 ? 'Gratuit' : `${event.price}€`}
            </span>
          </div>
          <button className={`p-2 rounded-full hover:${style.bg} ${style.color} transition-colors`}>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(200);
  const [showFilters, setShowFilters] = useState(false); 
  const [selectedDate, setSelectedDate] = useState('any');

  const filteredEvents = useMemo(() => {
    return MOCK_EVENTS.filter(event => {
      const matchCategory = activeCategory === 'all' || event.category === activeCategory;
      const matchPrice = event.price <= priceRange;
      return matchCategory && matchPrice;
    });
  }, [activeCategory, priceRange]);

  // Sidebar specific category processing
  // Helper to get sidebar item styles
  const getSidebarItemStyle = (catId: string, isActive: boolean) => {
    if (catId === 'all') {
      return isActive 
        ? 'bg-indigo-50 text-indigo-700' 
        : 'text-slate-600 hover:bg-slate-100';
    }
    const style = CATEGORY_STYLES[catId];
    if (!style) return 'text-slate-600 hover:bg-slate-100';

    return isActive
      ? `${style.bg} ${style.color}` // Active: specific bg and text color
      : `text-slate-600 hover:${style.bg} hover:${style.color}`; // Inactive: hover matches category color
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Reset page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [activeCategory, priceRange]);

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 pt-24">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Explorer les événements</h1>
            <p className="text-slate-500">Découvrez ce qui se passe autour de vous.</p>
          </div>

          {/* Search Bar */}
          <div className="relative group w-full max-w-md">
            <Search className="absolute left-3 top-2.5 text-slate-400 w-5 h-5 group-focus-within:text-indigo-600 transition-colors" />
            <input 
                type="text" 
                placeholder="Rechercher un événement, un artiste..." 
                className="w-full bg-white border border-slate-200 text-slate-900 text-sm rounded-full pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- SIDEBAR FILTERS (Desktop) --- */}
          <aside className={`lg:w-64 shrink-0 space-y-8 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            
            {/* Filter: Categories */}
            <div>
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <SlidersHorizontal size={18} /> Catégories
              </h3>
              <div className="space-y-2">
                {CATEGORIES.map(cat => {
                   // Determine custom colors for sidebar items
                   const isActive = activeCategory === cat.id;
                   const styleClass = getSidebarItemStyle(cat.id, isActive);
                   const catData = CATEGORY_STYLES[cat.id]; // Can be undefined for 'all'

                   return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${styleClass}`}
                    >
                      <span className="flex items-center gap-2">
                        {cat.icon && <cat.icon size={16} className={!isActive && cat.id !== 'all' && catData ? catData.color : ''} />} 
                        {/* Apply color to icon even when inactive if available */}
                        {cat.name}
                      </span>
                      {isActive && (
                        <div className={`w-1.5 h-1.5 rounded-full ${cat.id === 'all' ? 'bg-indigo-600' : 'bg-current'}`}></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Filter: Price */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-900">Prix Max</h3>
                <span className="text-sm font-medium text-indigo-600">{priceRange}€</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="200" 
                step="5"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-2">
                <span>Gratuit</span>
                <span>200€+</span>
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Filter: Date */}
            <div>
              <h3 className="font-bold text-slate-900 mb-4">Date</h3>
              <div className="space-y-2">
                {['any', 'today', 'tomorrow', 'weekend'].map((date) => (
                  <label key={date} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${selectedDate === date ? 'border-indigo-600' : 'border-slate-300 group-hover:border-indigo-400'}`}>
                      {selectedDate === date && <div className="w-2 h-2 rounded-full bg-indigo-600" />}
                    </div>
                    <span className="text-sm text-slate-600 capitalize">
                      {date === 'any' ? 'Peu importe' : 
                       date === 'today' ? "Aujourd'hui" :
                       date === 'tomorrow' ? 'Demain' : 'Ce week-end'}
                    </span>
                    <input 
                      type="radio" 
                      name="date" 
                      className="hidden" 
                      checked={selectedDate === date} 
                      onChange={() => setSelectedDate(date)}
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Filter: Location (Simple Input) */}
            <div className="pt-4">
               <div className="relative">
                 <MapPin size={16} className="absolute left-3 top-3 text-slate-400" />
                 <input 
                   type="text" 
                   placeholder="Ville ou code postal" 
                   className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors"
                 />
               </div>
            </div>
          </aside>

          {/* --- RESULTS GRID --- */}
          <div className="flex-1">
            
            {/* Toolbar (Mobile Filters + Count) */}
            <div className="flex items-center justify-between mb-6">
              <p className="font-medium text-slate-700">
                {filteredEvents.length} événements trouvés
              </p>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700"
                >
                  <Filter size={16} /> Filtres
                </button>
                <div className="relative group hidden sm:block">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:border-indigo-300 transition-colors">
                    Trier par: Pertinence <ChevronDown size={14} />
                  </button>
                  {/* Dropdown (Visual only) */}
                </div>
              </div>
            </div>

            {/* Grid */}
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {paginatedEvents.map((event: any) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <Search size={32} className="text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Aucun résultat trouvé</h3>
                <p className="text-slate-500 text-center max-w-sm mb-6">
                  Essayez d&apos;ajuster vos filtres de recherche ou changez de localisation.
                </p>
                <button 
                  onClick={() => { setActiveCategory('all'); setPriceRange(200); }}
                  className="text-indigo-600 font-medium hover:underline"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-2">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Précédent
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg text-sm font-bold flex items-center justify-center transition-colors ${
                      currentPage === page 
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                        : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Suivant
                </button>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
