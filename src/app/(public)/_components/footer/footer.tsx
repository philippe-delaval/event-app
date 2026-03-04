"use client";

import React from "react";
import { Calendar } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center">
              <Calendar className="text-white w-3 h-3" />
            </div>
            <span className="font-bold text-slate-900">EventPro</span>
          </div>
          <p className="text-slate-500">
            La solution complète pour organiser et découvrir des événements
            incroyables.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-slate-900 mb-4">Découvrir</h3>
          <ul className="space-y-3 text-slate-500">
            <li>
              <Link href="#" className="hover:text-indigo-600">
                Concerts
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-indigo-600">
                Conférences
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-indigo-600">
                Sport
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-indigo-600">
                Gratuit
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-slate-900 mb-4">Organisateurs</h3>
          <ul className="space-y-3 text-slate-500">
            <li>
              <Link href="/dashboard" className="hover:text-indigo-600">
                Créer un événement
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-indigo-600">
                Tarifs
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-indigo-600">
                Ressources
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-slate-900 mb-4">Légal</h3>
          <ul className="space-y-3 text-slate-500">
            <li>
              <Link href="#" className="hover:text-indigo-600">
                Confidentialité
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-indigo-600">
                CGU
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-indigo-600">
                Mentions légales
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
