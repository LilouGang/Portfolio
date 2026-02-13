"use client";
import React from 'react';

export default function Legend({ viewMode }) {
  if (viewMode === 'classic') return null;

  const legends = {
    job: [
      { label: 'Agriculture', color: 'bg-lime-500' },
      { label: 'Industrie/Mines', color: 'bg-slate-500' },
      { label: 'Artisanat', color: 'bg-orange-500' },
      { label: 'Transport', color: 'bg-indigo-500' },
      { label: 'Administration', color: 'bg-pink-500' },
      { label: 'Armée/Droit', color: 'bg-blue-800' },
      { label: 'Journalier', color: 'bg-stone-400' },
      { label: 'Études', color: 'bg-teal-500' },
    ],
    location: [
      { label: 'Vosges (88)', color: 'bg-emerald-500' },
      { label: 'Yonne (89)', color: 'bg-amber-500' },
      { label: 'Franche-Comté', color: 'bg-violet-500' },
      { label: 'Nord (59)', color: 'bg-cyan-500' },
      { label: 'Île-de-France', color: 'bg-blue-600' },
      { label: 'Étranger', color: 'bg-fuchsia-500' },
    ],
    age: [
      { label: 'Vivant', color: 'bg-sky-400' },       
      { label: '< 60 ans', color: 'bg-red-400' },      // Prématuré
      { label: '60-80 ans', color: 'bg-orange-400' },  // Moyen
      { label: '80-90 ans', color: 'bg-teal-400' },    // Bon âge
      { label: 'Doyen (90+)', color: 'bg-yellow-400' }, // Longévité
    ]
  };

  const currentLegend = legends[viewMode] || [];

  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-8 z-50 
                    bg-white/40 backdrop-blur-xs
                    p-3 rounded-full border border-white/50 shadow-sm 
                    transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
      
      <div className="flex items-center gap-4 px-2">
        {currentLegend.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${item.color} shadow-sm`} />
            <span className="text-xs font-medium text-slate-700">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}