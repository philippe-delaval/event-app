"use client";

import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Share2, 
  Heart, 
  ShieldCheck,
  Minus,
  Plus
} from 'lucide-react';

// --- Mock Data ---

const EVENT = {
  id: 1,
  title: "Neon Festival 2024 : L'Expérience Immersive",
  date: "Samedi 15 Juillet 2024",
  rawDate: "2024-07-15",
  time: "18:00 - 04:00",
  location: "La Grande Halle, Paris",
  address: "211 Avenue Jean Jaurès, 75019 Paris",
  description: `Préparez-vous pour la nuit la plus électrique de l'année. Le Neon Festival revient pour sa 5ème édition avec une programmation exclusive mêlant électro, synthwave et arts numériques.\n\nAu programme : 3 scènes, des installations lumineuses interactives, et une expérience culinaire "Street Food" revisitée. Ne manquez pas le show final à minuit qui promet d'être spectaculaire.`,
  image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=1200",
  organizer: {
    name: "Live Nation France",
    followers: "12k",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100"
  },
  tags: ["Musique", "Electro", "Festival", "Nuit"],
  tickets: [
    { id: 't1', name: 'Early Bird', price: 35, remaining: 0, type: 'soldout' },
    { id: 't2', name: 'Entrée Standard', price: 45, remaining: 150, type: 'available', description: "Accès à toutes les scènes + 1 boisson offerte." },
    { id: 't3', name: 'VIP Expérience', price: 120, remaining: 20, type: 'available', description: "Accès coupe-file, Zone VIP surélevée, Bar privé, Parking inclus." }
  ]
};

// --- Composants ---
// Navbar removed as user requested

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TicketCounter = ({ ticket, count, onChange }: { ticket: any, count: number, onChange: (val: number) => void }) => {
  if (ticket.type === 'soldout') {
    return (
      <div className="py-4 flex justify-between items-center opacity-60 grayscale">
        <div>
          <h4 className="font-bold text-slate-700">{ticket.name}</h4>
          <span className="text-sm font-medium text-slate-500">Épuisé</span>
        </div>
        <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded text-sm font-bold">Complet</span>
      </div>
    );
  }

  return (
    <div className="py-4 border-b border-slate-100 last:border-0">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-bold text-slate-900">{ticket.name}</h4>
          <span className="text-lg font-bold text-indigo-600">{ticket.price}€</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onChange(Math.max(0, count - 1))}
            disabled={count === 0}
            className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors ${count === 0 ? 'border-slate-200 text-slate-300' : 'border-indigo-200 text-indigo-600 hover:bg-indigo-50'}`}
          >
            <Minus size={16} />
          </button>
          <span className="w-6 text-center font-bold text-slate-900">{count}</span>
          <button 
            onClick={() => onChange(Math.min(10, count + 1))}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-indigo-200 text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
      {ticket.description && (
        <p className="text-xs text-slate-500 leading-relaxed max-w-[85%]">{ticket.description}</p>
      )}
    </div>
  );
};

export default function EventDetailPage() {
  const [ticketCounts, setTicketCounts] = useState<{ [key: string]: number }>({ t2: 0, t3: 0 });
  
  const totalAmount = EVENT.tickets.reduce((acc, ticket) => {
    return acc + (ticket.price * (ticketCounts[ticket.id] || 0));
  }, 0);

  const totalTickets = Object.values(ticketCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-24 md:pb-12">
      {/* Navbar handled by layout */}

      {/* --- HERO IMAGE --- */}
      <div className="relative h-64 md:h-96 w-full bg-slate-900 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={EVENT.image} 
          alt={EVENT.title} 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
        
        {/* Date Badge (Desktop) */}
        <div className="absolute bottom-6 left-6 md:left-auto md:right-6 md:bottom-auto md:top-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center hidden md:block">
           <span className="block text-sm uppercase font-bold text-indigo-300">Juillet</span>
           <span className="block text-3xl font-extrabold text-white">15</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-16 md:-mt-24 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN: CONTENT --- */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Header Card */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
            <div className="flex flex-wrap gap-2 mb-4">
              {EVENT.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wide rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
              {EVENT.title}
            </h1>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-slate-600 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                  <Calendar className="text-indigo-600 w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Date & Heure</p>
                  <p className="text-sm">{EVENT.date} • {EVENT.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                  <MapPin className="text-indigo-600 w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Lieu</p>
                  <p className="text-sm">{EVENT.location}</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <h3 className="font-bold text-lg mb-3">À propos</h3>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {EVENT.description}
              </p>
            </div>
            
            {/* Added Share interactions from removed Navbar */}
            <div className="pt-6 flex gap-4">
               <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                 <Share2 size={16} /> Partager
               </button>
               <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:text-rose-600 hover:border-rose-200 transition-colors text-slate-600">
                 <Heart size={16} /> Ajouter aux favoris
               </button>
            </div>

          </div>

          {/* Organizer Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={EVENT.organizer.avatar} alt="Organizer" className="w-16 h-16 rounded-full object-cover border-2 border-slate-100" />
            <div className="flex-1">
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wide">Organisé par</p>
              <h3 className="text-lg font-bold text-slate-900">{EVENT.organizer.name}</h3>
              <p className="text-sm text-slate-500">{EVENT.organizer.followers} abonnés</p>
            </div>
            <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
              Suivre
            </button>
          </div>

          {/* Map Placeholder */}
          <div className="bg-slate-200 rounded-2xl h-64 w-full flex items-center justify-center relative overflow-hidden group cursor-pointer">
             <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/2.39,48.89,14,0/800x400?access_token=YOUR_TOKEN')] bg-cover bg-center opacity-50 grayscale group-hover:grayscale-0 transition-all"></div>
             <div className="relative bg-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 font-bold text-slate-900">
               <MapPin className="text-rose-500" size={18} />
               Voir sur la carte
             </div>
          </div>

        </div>

        {/* --- RIGHT COLUMN: TICKETS (Sticky on Desktop) --- */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-2xl shadow-xl border border-indigo-100 overflow-hidden">
            <div className="p-6 bg-slate-50 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-lg">Billetterie</h3>
              <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                <ShieldCheck size={14} className="text-emerald-600" /> Paiement 100% sécurisé
              </p>
            </div>
            
            <div className="p-6">
              {EVENT.tickets.map(ticket => (
                <TicketCounter 
                  key={ticket.id} 
                  ticket={ticket} 
                  count={ticketCounts[ticket.id] || 0}
                  onChange={(val) => setTicketCounts(prev => ({...prev, [ticket.id]: val}))}
                />
              ))}
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100">
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-600 font-medium">Total</span>
                <span className="text-2xl font-extrabold text-slate-900">{totalAmount}€</span>
              </div>
              <button 
                disabled={totalTickets === 0}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                  totalTickets > 0 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:-translate-y-1' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {totalTickets > 0 ? `Commander (${totalTickets})` : 'Sélectionnez un billet'}
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* --- MOBILE FIXED BOTTOM BAR --- */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 lg:hidden z-50 flex items-center justify-between shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        <div>
          <p className="text-xs text-slate-500 uppercase font-bold">À partir de</p>
          <p className="text-xl font-extrabold text-indigo-600">35€</p>
        </div>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} // Simple scroll to top for demo
          className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200"
        >
          Acheter un billet
        </button>
      </div>

    </div>
  );
}
