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
      { label: 'Vivant', color: 'bg-sky-400' },       // Bleu Ciel
      { label: '< 40 ans', color: 'bg-red-400' },      // Rouge
      { label: '40-70 ans', color: 'bg-orange-400' },  // Orange
      { label: '70-90 ans', color: 'bg-teal-400' },    // Teal
      { label: 'Doyen (90+)', color: 'bg-amber-400' }, // Jaune
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