"use client";
import React from 'react';

export default function Legend({ viewMode }) {
  if (viewMode === 'classic') return null;

  const legends = {
    job: [
      { label: 'Agriculture', color: 'bg-green-500' },
      { label: 'Artisanat', color: 'bg-orange-500' },
      { label: 'Santé', color: 'bg-rose-500' },
      { label: 'Tech', color: 'bg-indigo-500' },
      { label: 'Droit/Armée', color: 'bg-blue-800' },
      { label: 'Commerce', color: 'bg-yellow-500' },
    ],
    location: [
      { label: 'Bretagne', color: 'bg-teal-500' },
      { label: 'Île-de-France', color: 'bg-blue-500' },
      { label: 'Rhône-Alpes', color: 'bg-red-500' },
      { label: 'PACA', color: 'bg-yellow-500' },
      { label: 'Nord', color: 'bg-sky-500' },
    ],
    age: [
      { label: '< 40 ans', color: 'bg-red-400' },
      { label: '40-70 ans', color: 'bg-orange-300' },
      { label: '70-90 ans', color: 'bg-emerald-400' },
      { label: 'Doyen (90+)', color: 'bg-amber-400' },
    ]
  };

  const currentLegend = legends[viewMode] || [];

  return (
    // MODIFICATION ICI : Centrage horizontal + Style "Verre" discret
    <div className="fixed left-1/2 -translate-x-1/2 bottom-8 z-50 
                    bg-white/40 backdrop-blur-xs
                    p-3 rounded-full border border-white/50 shadow-sm 
                    transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
      
      <div className="flex items-center gap-4 px-2">
        {/* Titre optionnel très discret ou supprimé pour le minimalisme */}
        {currentLegend.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${item.color} shadow-sm`} />
            <span className="text-xs font-medium text-slate-600/80">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}