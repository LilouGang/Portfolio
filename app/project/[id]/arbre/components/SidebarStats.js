"use client";
import React from 'react';
import { User, Briefcase, MapPin } from 'lucide-react';

export default function SidebarStats({ viewMode, setViewMode }) {
  const modes = [
    { 
      id: 'classic', 
      label: 'Standard', 
      bg: 'bg-slate-200', 
      color: 'text-slate-600', 
      shadow: 'shadow-[0_15px_40px_-5px_rgba(148,163,184,0.6)]', 
      icon: <User size={24} /> 
    },
    { 
      id: 'job', 
      label: 'Métiers', 
      bg: 'bg-blue-200', 
      color: 'text-blue-600', 
      shadow: 'shadow-[0_15px_40px_-5px_rgba(59,130,246,0.5)]', 
      icon: <Briefcase size={24} /> 
    },
    { 
      id: 'location', 
      label: 'Lieux', 
      bg: 'bg-emerald-200', 
      color: 'text-emerald-600', 
      shadow: 'shadow-[0_15px_40px_-5px_rgba(16,185,129,0.5)]', 
      icon: <MapPin size={24} /> 
    },
  ];

  return (
    <aside className="fixed left-10 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6">
      {modes.map((m) => (
        <div key={m.id} className="group flex items-center cursor-pointer" onClick={() => setViewMode(m.id)}>
          <button className={`w-14 h-14 flex items-center justify-center rounded-2xl transition-all duration-300 
              group-hover:scale-110 active:scale-95 ${m.bg} ${m.color} ${m.shadow}`}>
            {m.icon}
          </button>
          <div className="grid grid-cols-[0fr] group-hover:grid-cols-[1fr] transition-[grid-template-columns] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ml-4">
            <span className="overflow-hidden whitespace-nowrap text-xl font-semibold text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
              {m.label}
            </span>
          </div>
        </div>
      ))}
    </aside>
  );
}