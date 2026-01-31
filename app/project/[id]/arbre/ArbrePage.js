"use client";
import { useState, useEffect } from 'react';
import { 
  ReactFlowProvider, 
  useNodesState, 
  useEdgesState, 
  useReactFlow 
} from 'reactflow';
import { initialPeople, initialLinks } from '@/lib/arbreData';

// Composants de l'interface
import SidebarStats from './components/SidebarStats'; // Gauche
import SidebarLayout from './components/SidebarLayout'; // Droite (C'est lui qu'on garde !)
import TreeCanvas from './components/TreeCanvas';
import Legend from './components/Legend';

// --- 1. COMPOSANT POUR LE ZOOM AUTOMATIQUE ---
function AutoZoom() {
  const { fitView } = useReactFlow();

  useEffect(() => {
    // Petit délai pour laisser le temps au moteur de charger
    const timer = setTimeout(() => {
      fitView({ padding: 0.2, duration: 800 });
    }, 100);
    return () => clearTimeout(timer);
  }, [fitView]);

  return null;
}

// --- 2. OUTIL DE DEBUG (LOG POSITIONS) ---
function PositionLogger({ nodes }) {
  const logCurrentPositions = () => {
    const cleanNodes = nodes.map(n => ({
      id: n.id,
      type: n.type,
      position: { 
        x: Math.round(n.position.x), 
        y: Math.round(n.position.y) 
      },
      data: n.data 
    }));
    
    console.log("👇 COPIE CE JSON DANS TON FICHIER arbreData.js 👇");
    console.log(JSON.stringify(cleanNodes, null, 2));
    alert("Positions affichées dans la console (F12) !");
  };

  return (
    <div className="absolute top-4 right-16 z-50"> {/* Décalé un peu à gauche pour laisser la place aux boutons layout */}
      <button 
        onClick={logCurrentPositions}
        className="bg-slate-800 text-white px-4 py-2 rounded shadow hover:bg-slate-700 font-bold text-sm flex items-center gap-2"
      >
        <span>🖨️</span> LOG
      </button>
    </div>
  );
}

// --- 3. PAGE PRINCIPALE ---
export default function ArbrePage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialPeople);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialLinks);
  
  // États de l'interface
  const [viewMode, setViewMode] = useState('classic'); // Pour la Sidebar de Gauche
  const [layoutDirection, setLayoutDirection] = useState('TB'); // Pour la Sidebar de Droite

  // Fonction pour gérer le clic sur les boutons de droite
  const handleLayoutChange = (direction) => {
    setLayoutDirection(direction);
    // Pour l'instant, ça ne fait que changer l'état du bouton.
    // Plus tard, tu pourras ajouter ici : 
    // if (direction === 'LR') { ... }
    console.log(`Changement de mode d'affichage vers : ${direction}`);
  };

  return (
    <div className="h-screen w-full bg-[#fdfbf7] text-slate-800 relative overflow-hidden font-sans">
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none mix-blend-multiply" 
           style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/natural-paper.png')` }}>
      </div>

      <ReactFlowProvider>
        <AutoZoom />

        {/* Panneau Gauche */}
        <SidebarStats viewMode={viewMode} setViewMode={setViewMode} />
        
        {/* Panneau Droite (Restauré) */}
        <SidebarLayout 
          currentLayout={layoutDirection} 
          onLayoutChange={handleLayoutChange} 
        />
        
        <Legend viewMode={viewMode} />
        
        {/* Bouton temporaire pour sauvegarder tes positions manuelles */}
        <PositionLogger nodes={nodes} />

        <div className="w-full h-full relative z-10">
          <TreeCanvas 
            nodes={nodes} 
            edges={edges} 
            onNodesChange={onNodesChange} 
            onEdgesChange={onEdgesChange}
            viewMode={viewMode}
          />
        </div>
      </ReactFlowProvider>
    </div>
  );
}