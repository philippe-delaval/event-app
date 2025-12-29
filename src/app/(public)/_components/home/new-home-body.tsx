"use client";

import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Music, 
  Briefcase, 
  Coffee, 
  Camera, 
  ArrowRight,
  Star,
} from 'lucide-react';
import Link from 'next/link';

// --- Données Simulées ---

const categories = [
  { id: 'music', name: 'Musique', icon: Music, color: 'bg-rose-100 text-rose-600' },
  { id: 'business', name: 'Business', icon: Briefcase, color: 'bg-blue-100 text-blue-600' },
  { id: 'food', name: 'Gastronomie', icon: Coffee, color: 'bg-amber-100 text-amber-600' },
  { id: 'arts', name: 'Arts & Culture', icon: Camera, color: 'bg-purple-100 text-purple-600' },
];

const featuredEvents = [
  {
    id: 1,
    title: "Neon Festival 2024",
    date: "15 Juil",
    location: "Paris",
    price: "45€",
    image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=1000",
    category: "Musique",
    organizer: "Live Nation"
  },
  {
    id: 2,
    title: "Tech Summit Europe",
    date: "22 Sep",
    location: "Lyon",
    price: "150€",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000",
    category: "Business",
    organizer: "TechWorld"
  },
  {
    id: 3,
    title: "Atelier Photographie Urbaine",
    date: "05 Oct",
    location: "Marseille",
    price: "30€",
    image: "https://images.unsplash.com/photo-1552168324-d612d77725e3?auto=format&fit=crop&q=80&w=1000",
    category: "Arts",
    organizer: "Photo Club"
  },
  {
    id: 4,
    title: "Dégustation Vins & Fromages",
    date: "12 Nov",
    location: "Bordeaux",
    price: "60€",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=1000",
    category: "Gastronomie",
    organizer: "Le Vignoble"
  }
];

// --- Composants ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EventCard = ({ event }: { event: any }) => (
  <div className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
    <div className="relative h-48 overflow-hidden shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src={event.image} 
        alt={event.title} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-3 py-1 rounded-lg text-sm font-bold text-slate-900 shadow-sm">
        {event.date}
      </div>
      <button className="absolute top-3 right-3 p-2 bg-black/20 hover:bg-white text-white hover:text-rose-500 rounded-full backdrop-blur-sm transition-all">
        <Star size={16} />
      </button>
    </div>
    <div className="p-5 flex flex-col flex-1">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
          {event.title}
        </h3>
      </div>
      <p className="text-slate-500 text-sm mb-4 flex items-center gap-1">
        <MapPin size={14} /> {event.location} • Par {event.organizer}
      </p>
      <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
        <span className="font-bold text-slate-900 text-lg">{event.price}</span>
        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group/btn">
          Réserver <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  </div>
);

export function NewHomeBody() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-slate-50 font-sans text-slate-900">
      
      {/* --- HERO SECTION --- */}
      <div className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold mb-6 tracking-wide uppercase border border-indigo-100">
            La plateforme n°1 des créateurs
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            Vivez des moments <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">inoubliables.</span>
          </h1>
          <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Rejoignez des millions de passionnés. Découvrez des concerts, conférences, ateliers et plus encore, ou lancez votre propre événement en quelques clics.
          </p>

          {/* Search Bar */}
          <div className="bg-white p-2 rounded-2xl shadow-xl shadow-indigo-100/50 max-w-2xl mx-auto flex flex-col md:flex-row gap-2 border border-slate-100">
            <div className="flex-1 flex items-center px-4 h-12 border-b md:border-b-0 md:border-r border-slate-100">
              <Search className="text-slate-400 w-5 h-5 mr-3" />
              <input 
                type="text" 
                placeholder="Concert, Yoga, Tech..." 
                className="w-full bg-transparent border-0 focus:ring-0 px-0 text-slate-800 placeholder:text-slate-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex-1 flex items-center px-4 h-12">
              <MapPin className="text-slate-400 w-5 h-5 mr-3" />
              <input 
                type="text" 
                placeholder="Lieu (ex: Paris)" 
                className="w-full bg-transparent border-0 focus:ring-0 px-0 text-slate-800 placeholder:text-slate-400"
              />
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 h-12 rounded-xl font-bold transition-all shadow-lg shadow-indigo-200">
              Rechercher
            </button>
          </div>
        </div>
      </div>

      {/* --- CATEGORIES --- */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Explorer par catégorie</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              href="/explore"
              className="p-6 rounded-2xl bg-white border border-slate-100 hover:border-indigo-100 hover:shadow-lg transition-all group text-left block"
            >
              <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <cat.icon size={24} />
              </div>
              <span className="font-bold text-slate-800 block">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* --- FEATURED EVENTS --- */}
      <div className="bg-white py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Populaires en ce moment</h2>
              <p className="text-slate-500">Les événements qui font bouger votre ville.</p>
            </div>
            <Link href="/explore" className="text-indigo-600 font-bold hover:text-indigo-800 flex items-center gap-1 group">
              Tout voir <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>

      {/* --- ORGANIZER CTA --- */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-16 text-center md:text-left relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Créez votre propre événement
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              De la billetterie à l&apos;accueil le jour J, nous vous offrons tous les outils pour réussir. Gratuit pour les événements gratuits.
            </p>
            <Link href="/dashboard" className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-indigo-50 transition-colors inline-flex items-center gap-2">
              Commencer maintenant <ArrowRight size={20} />
            </Link>
          </div>
          
          {/* Visual element representing organizer dashboard */}
          <div className="relative z-10 w-full md:w-1/2 bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="flex items-center justify-between mb-6">
               <div className="space-y-2">
                  <div className="h-2 w-20 bg-slate-600 rounded"></div>
                  <div className="h-4 w-32 bg-slate-500 rounded"></div>
               </div>
               <div className="h-10 w-10 bg-indigo-500 rounded-full flex items-center justify-center font-bold text-white">42</div>
            </div>
            <div className="space-y-4">
              <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-emerald-500"></div>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Billets vendus</span>
                <span className="text-white">75%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
