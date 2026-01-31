"use client";
import { User, Briefcase, MapPin, Hourglass } from 'lucide-react';

export default function SidebarStats({ viewMode, setViewMode }) {
  const modes = [
    { 
      id: 'classic', 
      icon: <User size={20} />, 
      label: 'Identité', 
      // ACTIF : Bleu Électrique + Néon adouci
      activeClass: 'bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]',
      // HOVER : Fond Pastel Bleu + Icone Bleue
      hoverClass: 'hover:bg-blue-100 hover:text-blue-600'
    },
    { 
      id: 'job', 
      icon: <Briefcase size={20} />, 
      label: 'Métiers', 
      // ACTIF : Rose Vif
      activeClass: 'bg-rose-600 shadow-[0_0_15px_rgba(225,29,72,0.5)]', 
      // HOVER : Fond Pastel Rose + Icone Rose
      hoverClass: 'hover:bg-rose-100 hover:text-rose-600'
    },
    { 
      id: 'location', 
      icon: <MapPin size={20} />, 
      label: 'Lieux', 
      // ACTIF : Teal
      activeClass: 'bg-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.5)]', 
      // HOVER : Fond Pastel Teal + Icone Teal
      hoverClass: 'hover:bg-teal-100 hover:text-teal-600'
    },
    { 
      id: 'age', 
      icon: <Hourglass size={20} />, 
      label: 'Âge', 
      // ACTIF : Ambre
      activeClass: 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]', 
      // HOVER : Fond Pastel Ambre + Icone Ambre
      hoverClass: 'hover:bg-amber-100 hover:text-amber-600'
    },
  ];

  return (
    <aside className="fixed left-10 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-5">
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => setViewMode(mode.id)}
          className={`
            group flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300
            ${viewMode === mode.id 
              ? `${mode.activeClass} text-white scale-110` // État Actif (Couleur vive)
              : `bg-white/80 backdrop-blur-sm text-slate-400 shadow-sm hover:scale-110 ${mode.hoverClass}` // État Inactif (Pastel au survol)
            }
          `}
          title={mode.label}
        >
          {mode.icon}
        </button>
      ))}
    </aside>
  );
}