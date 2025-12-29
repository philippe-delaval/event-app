"use client";

import React, { useState } from 'react';
import { 
  Check, 
  Minus,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Award
} from 'lucide-react';

// --- Données ---

const PLANS = [
  {
    name: "Gratuit",
    tagline: "Pour démarrer",
    price: "0€",
    description: "Idéal pour les événements gratuits ou associatifs.",
    features: [
      "Nombre d'événements illimité",
      "Billetterie basique",
      "Application de scan (Check-in)",
      "Page d'événement personnalisable"
    ],
    notIncluded: [
      "Paiements en ligne",
      "Outils marketing",
      "Support prioritaire"
    ],
    cta: "Commencer gratuitement",
    highlight: false,
    color: "bg-slate-50 border-slate-200"
  },
  {
    name: "Starter",
    tagline: "Petits paniers",
    price: "6%",
    subPrice: "Aucun frais fixe",
    description: "La solution flexible pour les billets à petit prix (moins de 22€).",
    features: [
      "Tout ce qui est inclus dans Gratuit",
      "Paiements en ligne sécurisés",
      "Frais absorbés par l'organisateur",
      "Rapports financiers simples",
      "Codes promo"
    ],
    notIncluded: [
      "Marque blanche",
      "Account Manager"
    ],
    cta: "Choisir Starter",
    highlight: false,
    color: "bg-white border-slate-200 hover:border-emerald-300 hover:shadow-lg hover:-translate-y-1 transition-all"
  },
  {
    name: "Performance",
    tagline: "Volume & Pro",
    price: "1.5%",
    subPrice: "+ 0.99€ par billet",
    description: "Rentabilité maximale pour les événements établis et billets > 22€.",
    features: [
      "Tout ce qui est inclus dans Starter",
      "Outils marketing & CRM avancés",
      "Support prioritaire 7j/7",
      "Analyses détaillées",
      "Invitations illimitées"
    ],
    notIncluded: [
      "API personnalisée"
    ],
    cta: "Choisir Performance",
    highlight: true,
    color: "bg-white border-indigo-200 ring-2 ring-indigo-600 shadow-xl relative"
  }
];

const FAQS = [
  {
    question: "Les frais sont-ils à ma charge ?",
    answer: "Oui, pour simplifier l'achat pour vos participants, les frais sont automatiquement déduits de vos revenus. Vous affichez un prix 'tout compris'."
  },
  {
    question: "Puis-je changer de formule ?",
    answer: "Absolument. Vous pouvez choisir la formule la plus adaptée événement par événement. Si vous organisez un petit atelier à 10€ (Starter) et un gala à 50€ (Performance), c'est possible."
  },
  {
    question: "Quand reçois-je l'argent ?",
    answer: "Les fonds sont sécurisés et virés sur votre compte bancaire 3 jours après la fin de l'événement."
  }
];

// --- Composants ---
// Navbar removed as requested by user

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FaqItem = ({ item }: { item: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:text-indigo-600 transition-colors"
      >
        <span className="font-bold text-slate-900 text-lg">{item.question}</span>
        {isOpen ? <ChevronUp className="text-indigo-600" /> : <ChevronDown className="text-slate-400" />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 pb-6' : 'max-h-0'}`}>
        <p className="text-slate-600 leading-relaxed">{item.answer}</p>
      </div>
    </div>
  );
};

export default function PricingPage() {
  const [ticketPrice, setTicketPrice] = useState(22); // Default start at the pivot point
  
  // Calculs des frais (Organizer absorbs logic)
  // Starter: 6% flat
  const feesStarter = ticketPrice * 0.06;
  const netStarter = ticketPrice - feesStarter;

  // Performance: 1.5% + 0.99€
  const feesPerformance = (ticketPrice * 0.015) + 0.99;
  const netPerformance = ticketPrice - feesPerformance;

  // Détermination du gagnant
  const winner = netStarter > netPerformance ? 'starter' : 'performance';
  const diff = Math.abs(netStarter - netPerformance).toFixed(2);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navbar handled by layout */}

      {/* --- HERO --- */}
      <div className="pt-32 pb-16 px-6 text-center max-w-4xl mx-auto"> 
        {/* Increased padding-top to account for fixed navbar */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
          Deux offres simples. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Maximisez vos revenus.
          </span>
        </h1>
        <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto">
          C&apos;est vous qui régalez : les frais sont absorbés dans le prix du billet. <br/>
          Choisissez la formule qui optimise votre marge selon le prix de vos places.
        </p>
        
        {/* --- SIMULATOR --- */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 md:p-8 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="mb-8">
            <div className="flex justify-between items-end mb-4">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                Prix de votre billet
              </label>
              <span className="text-3xl font-extrabold text-indigo-600 bg-indigo-50 px-4 py-1 rounded-lg">
                {ticketPrice}€
              </span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="100" 
              step="1"
              value={ticketPrice}
              onChange={(e) => setTicketPrice(parseInt(e.target.value))}
              className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-500 transition-all"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
              <span>5€ (Petit événement)</span>
              <span>100€ (Gala / Festival)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card Starter Result */}
            <div className={`p-5 rounded-xl border-2 transition-all duration-300 flex flex-col justify-between ${winner === 'starter' ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-100 bg-slate-50 opacity-60'}`}>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-700">Formule Starter</span>
                  {winner === 'starter' && <span className="text-xs bg-emerald-100 text-emerald-700 font-bold px-2 py-1 rounded-full flex items-center gap-1"><TrendingUp size={12}/> Meilleure offre</span>}
                </div>
                <div className="text-sm text-slate-500 mb-1">Frais : {feesStarter.toFixed(2)}€ (6%)</div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200/50">
                <span className="text-xs text-slate-500 block mb-1">Vous recevez net :</span>
                <span className={`text-3xl font-bold ${winner === 'starter' ? 'text-emerald-700' : 'text-slate-400'}`}>
                  {netStarter.toFixed(2)}€
                </span>
              </div>
            </div>

            {/* Card Performance Result */}
            <div className={`p-5 rounded-xl border-2 transition-all duration-300 flex flex-col justify-between ${winner === 'performance' ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-100 bg-slate-50 opacity-60'}`}>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-700">Formule Performance</span>
                  {winner === 'performance' && <span className="text-xs bg-indigo-100 text-indigo-700 font-bold px-2 py-1 rounded-full flex items-center gap-1"><TrendingUp size={12}/> Meilleure offre</span>}
                </div>
                <div className="text-sm text-slate-500 mb-1">Frais : {feesPerformance.toFixed(2)}€ (1.5% + 0.99€)</div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200/50">
                <span className="text-xs text-slate-500 block mb-1">Vous recevez net :</span>
                <span className={`text-3xl font-bold ${winner === 'performance' ? 'text-indigo-700' : 'text-slate-400'}`}>
                  {netPerformance.toFixed(2)}€
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Avec l&apos;offre <span className="font-bold text-slate-900">{winner === 'starter' ? 'Starter' : 'Performance'}</span>, vous gagnez <span className="font-bold text-emerald-600">+{diff}€</span> supplémentaires par billet.
            </p>
          </div>
        </div>
      </div>

      {/* --- PRICING CARDS --- */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {PLANS.map((plan, index) => (
            <div 
              key={index} 
              className={`rounded-3xl p-8 transition-transform hover:-translate-y-2 duration-300 ${plan.color} ${plan.highlight ? 'z-10 md:-mt-4' : 'border'}`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg flex items-center gap-2">
                  <Award size={14} /> Recommandé
                </div>
              )}

              <div className="mb-4">
                <span className={`text-xs font-bold uppercase tracking-wider ${plan.highlight ? 'text-indigo-600' : 'text-slate-400'}`}>
                  {plan.tagline}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{plan.name}</h3>
              </div>
              
              <div className="mb-6 pb-6 border-b border-slate-100">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                  {plan.subPrice && <span className="text-sm text-slate-500 font-medium">{plan.subPrice}</span>}
                </div>
                <p className="text-slate-500 mt-3 text-sm leading-relaxed">{plan.description}</p>
              </div>
              
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={`mt-0.5 p-0.5 rounded-full ${plan.highlight ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="text-sm text-slate-700 font-medium">{feature}</span>
                  </div>
                ))}
                
                {plan.notIncluded.length > 0 && (
                  <div className="pt-2 space-y-3">
                     {plan.notIncluded.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 opacity-60">
                        <Minus size={16} className="text-slate-400 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-500">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button className={`w-full py-3.5 rounded-xl font-bold transition-all ${
                plan.highlight 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200' 
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* --- FAQ SECTION --- */}
      <div className="max-w-3xl mx-auto px-6 py-20 bg-white rounded-3xl border border-slate-100 shadow-sm mb-20">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Questions fréquentes</h2>
        <div>
          {FAQS.map((faq, idx) => (
            <FaqItem key={idx} item={faq} />
          ))}
        </div>
      </div>

      {/* --- FOOTER CTA --- */}
      <div className="bg-slate-900 py-20 px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Prêt à organiser ?</h2>
        <p className="text-slate-400 mb-10 max-w-xl mx-auto">
          Rejoignez la plateforme qui s&apos;adapte à votre croissance.
        </p>
        <button className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition-colors text-lg">
          Lancer mon événement
        </button>
      </div>

    </div>
  );
}
