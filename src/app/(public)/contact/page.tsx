"use client";

import React, { useState } from 'react';
import { 
  Search, 
  User, 
  Briefcase, 
  Ticket, 
  CreditCard, 
  Shield, 
  FileText, 
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Calendar,
  Mail,
  ArrowRight,
  Smartphone
} from 'lucide-react';

// --- Données ---

const CATEGORIES = {
  attendee: [
    { id: 'tickets', label: 'Billets & Commandes', icon: Ticket, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: 'payments', label: 'Paiements & Factures', icon: CreditCard, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'account', label: 'Mon Compte', icon: User, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'refunds', label: 'Remboursements', icon: Shield, color: 'text-rose-600', bg: 'bg-rose-50' },
  ],
  organizer: [
    { id: 'creation', label: 'Créer un événement', icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 'finance', label: 'Virements & Tarifs', icon: CreditCard, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'tools', label: 'Outils & Scan', icon: Smartphone, color: 'text-orange-600', bg: 'bg-orange-50' },
    { id: 'legal', label: 'Juridique', icon: FileText, color: 'text-slate-600', bg: 'bg-slate-50' },
  ]
};

const FAQ_ARTICLES = {
  attendee: [
    {
      question: "Je n'ai pas reçu mon billet par email",
      answer: "Vérifiez d'abord vos spams. Si vous ne trouvez rien, connectez-vous à votre compte dans la section 'Mes Billets' pour le télécharger directement. L'email peut mettre jusqu'à 15 minutes à arriver."
    },
    {
      question: "Puis-je me faire rembourser ?",
      answer: "La politique de remboursement dépend de l'organisateur. Vous pouvez demander un remboursement depuis votre espace commande. Si l'événement est annulé, le remboursement est automatique."
    },
    {
      question: "Dois-je imprimer mon billet ?",
      answer: "Non, la plupart des événements acceptent les billets sur smartphone. Assurez-vous simplement que le QR code est bien lisible et que la luminosité de votre écran est au maximum."
    },
    {
      question: "Comment revendre ma place ?",
      answer: "Pour éviter les fraudes, nous proposons une bourse d'échange officielle sécurisée. Allez sur votre billet et cliquez sur 'Revendre' pour le remettre en circulation."
    }
  ],
  organizer: [
    {
      question: "Quand reçois-je mes revenus ?",
      answer: "Les fonds sont virés 3 jours ouvrés après la fin de l'événement. Vous pouvez suivre l'état des virements dans votre tableau de bord financier."
    },
    {
      question: "Comment scanner les billets à l'entrée ?",
      answer: "Téléchargez notre application 'EventPro Scan' (iOS/Android). Connectez-vous avec vos identifiants organisateur et sélectionnez votre événement pour commencer à scanner."
    },
    {
      question: "Puis-je modifier un événement publié ?",
      answer: "Oui, mais certaines informations critiques (date, lieu) ne peuvent être modifiées si des billets ont déjà été vendus, pour protéger les acheteurs. Contactez le support en cas d'urgence."
    }
  ]
};

// --- Composants ---
// Navbar removed as user requested

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AccordionItem = ({ item }: { item: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-indigo-200 transition-colors">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left"
      >
        <span className="font-bold text-slate-800">{item.question}</span>
        {isOpen ? <ChevronUp className="text-indigo-600 shrink-0 ml-4" /> : <ChevronDown className="text-slate-400 shrink-0 ml-4" />}
      </button>
      <div 
        className={`px-6 text-slate-600 text-sm leading-relaxed transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {item.answer}
      </div>
    </div>
  );
};

export default function HelpCenterPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userType, setUserType] = useState<'attendee' | 'organizer'>('attendee'); 
  const [searchQuery, setSearchQuery] = useState('');

  const currentCategories = CATEGORIES[userType];
  const currentFaqs = FAQ_ARTICLES[userType];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navbar handled by layout */}

      {/* --- HERO SEARCH --- */}
      <div className="bg-slate-900 py-32 px-6 text-center relative overflow-hidden"> 
      {/* Increased padding-top for fixed navbar */}
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500 rounded-full mix-blend-screen filter blur-3xl"></div>
          <div className="absolute top-1/2 -right-24 w-64 h-64 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Comment pouvons-nous vous aider ?
          </h1>
          
          <div className="relative mb-8">
            <Search className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder={userType === 'attendee' ? "Ex: Où est mon billet ?" : "Ex: Comment configurer les taxes ?"}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border-none outline-none focus:ring-4 focus:ring-indigo-500/30 text-slate-900 placeholder:text-slate-400 shadow-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Type Switcher */}
          <div className="inline-flex bg-slate-800 p-1 rounded-full">
            <button 
              onClick={() => setUserType('attendee')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
                userType === 'attendee' 
                  ? 'bg-white text-slate-900 shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User size={16} /> Participant
            </button>
            <button 
              onClick={() => setUserType('organizer')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
                userType === 'organizer' 
                  ? 'bg-white text-slate-900 shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Briefcase size={16} /> Organisateur
            </button>
          </div>
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      <main className="max-w-4xl mx-auto px-6 -mt-10 relative z-20 pb-20">
        
        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {currentCategories.map((cat) => (
            <button 
              key={cat.id}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all text-left group"
            >
              <div className={`w-10 h-10 rounded-lg ${cat.bg} ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <cat.icon size={20} />
              </div>
              <span className="font-bold text-slate-800 text-sm">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Popular Articles */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Questions fréquentes</h2>
          <div className="space-y-4">
            {currentFaqs.map((faq, idx) => (
              <AccordionItem key={idx} item={faq} />
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="text-indigo-600 font-bold hover:underline flex items-center justify-center gap-2">
              Voir tous les articles <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-indigo-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <MessageCircle size={48} className="mx-auto mb-4 text-indigo-200" />
            <h2 className="text-2xl font-bold mb-3">Vous ne trouvez pas la réponse ?</h2>
            <p className="text-indigo-100 mb-8 max-w-lg mx-auto">
              Notre équipe est disponible 7j/7 pour vous aider à résoudre vos problèmes, petits ou grands.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2">
                <MessageCircle size={18} /> Chat en direct
              </button>
              <button className="bg-indigo-700 text-white border border-indigo-500 px-6 py-3 rounded-xl font-bold hover:bg-indigo-800 transition-colors flex items-center justify-center gap-2">
                <Mail size={18} /> Envoyer un email
              </button>
            </div>
          </div>
          
          {/* Decorative Circles */}
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white opacity-5 rounded-full"></div>
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white opacity-5 rounded-full"></div>
        </div>

      </main>

      {/* Footer has been removed as user requested */}

    </div>
  );
}
