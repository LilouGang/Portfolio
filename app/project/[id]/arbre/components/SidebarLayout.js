"use client";
import React from 'react';
import { Layout, Columns } from 'lucide-react';

const layouts = [
  { 
    id: 'TB', 
    label: 'Vertical',
    activeClass: 'bg-violet-700 shadow-[0_0_15px_rgba(109,40,217,0.5)]',
    hoverClass: 'hover:bg-violet-100 hover:text-violet-700',
    textGroupHover: 'group-hover:text-violet-700',
    icon: <Layout size={20} />
  },
  { 
    id: 'LR', 
    label: 'Horizontal', 
    activeClass: 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]', 
    hoverClass: 'hover:bg-emerald-100 hover:text-emerald-600',
    textGroupHover: 'group-hover:text-emerald-600',
    icon: <Columns size={20} /> 
  },
];

export default function SidebarLayout({ onLayoutChange, currentLayout }) {
  return (
    <aside className="fixed right-10 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6 items-end">
      {layouts.map((l) => {
        const isActive = currentLayout === l.id;

        return (
          <div 
            key={l.id} 
            className="group flex items-center cursor-pointer" 
            onClick={() => onLayoutChange(l.id)}
          >
            {/* Label (Slide-in au survol) */}
            <div className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 mr-4">
              <span className={`
                whitespace-nowrap text-sm font-semibold transition-colors duration-300
                ${isActive ? 'text-slate-800' : `text-slate-400 ${l.textGroupHover}`}
              `}>
                {l.label}
              </span>
            </div>

            {/* Le Bouton */}
            <button className={`
              w-12 h-12 flex items-center justify-center rounded-xl 
              transition-all duration-300 border border-transparent
              ${isActive 
                ? `${l.activeClass} text-white scale-105` 
                : `bg-white/80 backdrop-blur-sm text-slate-300 shadow-sm border-white/50 hover:scale-105 ${l.hoverClass}`
              }
            `}>
              {l.icon}
            </button>
          </div>
        );
      })}
    </aside>
  );
}