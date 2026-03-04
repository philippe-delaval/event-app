"use client";

import React, { useState } from 'react';
import { Calendar, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white backdrop-blur-md z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Calendar className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">EventPro</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/explore" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Explorer</Link>
          <Link href="/tarifs" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Tarifs</Link>
          <Link href="/contact" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Aide</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/login">
            <button className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2">
              Se connecter
            </button>
          </Link>
          <Link href="/dashboard">
            <button className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-900/10">
              Créer un événement
            </button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-600">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 p-6 space-y-4 animate-in slide-in-from-top-5">
          <Link href="/explore" className="block text-slate-600 font-medium" onClick={() => setIsOpen(false)}>Explorer</Link>
          <Link href="/tarifs" className="block text-slate-600 font-medium" onClick={() => setIsOpen(false)}>Tarifs</Link>
          <hr className="border-slate-100" />
          <Link href="/login" className="w-full" onClick={() => setIsOpen(false)}>
            <button className="w-full text-left font-medium text-slate-900">Se connecter</button>
          </Link>
          <Link href="/dashboard" className="w-full" onClick={() => setIsOpen(false)}>
            <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium">Créer un événement</button>
          </Link>
        </div>
      )}
    </nav>
  );
}
