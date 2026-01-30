"use client";
import React, { useEffect, useCallback } from 'react';
import { useReactFlow } from 'reactflow'; // On importe juste ça
import { Layout, Columns } from 'lucide-react';

const layouts = [
  { id: 'TB', label: 'Vertical', bg: 'bg-purple-200', color: 'text-purple-600', shadow: 'shadow-[0_15px_40px_-5px_rgba(168,85,247,0.5)]', icon: <Layout size={24} /> },
  { id: 'LR', label: 'Horizontal', bg: 'bg-orange-200', color: 'text-orange-600', shadow: 'shadow-[0_15px_40px_-5px_rgba(249,115,22,0.5)]', icon: <Columns size={24} /> },
];

export default function SidebarLayout({ nodes, edges, setNodes }) {
  const { fitView } = useReactFlow(); // On récupère la fonction ici

  const calculateLayout = useCallback((direction) => {
    const isVertical = direction === 'TB';
    const gap = 300; 
    const genGap = 250; 

    let newPositions = {};

    newPositions['gp1'] = { x: 0, y: 0 };
    newPositions['gp2'] = { x: gap, y: 0 };
    newPositions['p1'] = { x: (newPositions['gp1'].x + newPositions['gp2'].x) / 2, y: genGap };
    newPositions['p2'] = { x: newPositions['p1'].x + gap, y: genGap };
    newPositions['1'] = { x: (newPositions['p1'].x + newPositions['p2'].x) / 2, y: genGap * 2 };

    setNodes((nds) => nds.map((node) => ({
      ...node,
      position: newPositions[node.id] || { x: 0, y: 0 },
      style: { transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }
    })));

    // --- AJOUT ICI : On force le dézoom pour voir tout l'arbre ---
    setTimeout(() => {
        fitView({ padding: 0.4, duration: 800 });
    }, 50); 
  }, [setNodes, fitView]);

  useEffect(() => {
    const timer = setTimeout(() => calculateLayout('TB'), 100);
    return () => clearTimeout(timer);
  }, [calculateLayout]);

  return (
    <aside className="fixed right-10 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6 items-end">
      {layouts.map((l) => (
        <div key={l.id} className="group flex items-center cursor-pointer" onClick={() => calculateLayout(l.id)}>
          <div className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 mr-4">
            <span className="whitespace-nowrap text-xl font-semibold text-slate-700">{l.label}</span>
          </div>
          <button className={`w-14 h-14 flex items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 ${l.bg} ${l.color} ${l.shadow}`}>
            {l.icon}
          </button>
        </div>
      ))}
    </aside>
  );
}