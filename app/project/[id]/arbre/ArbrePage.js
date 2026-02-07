"use client";
import { useState, useEffect, useMemo } from 'react';
import { 
  ReactFlowProvider, 
  useNodesState, 
  useEdgesState, 
  useReactFlow 
} from 'reactflow';
import { initialPeople, initialLinks } from '../../../../lib/arbreData';
import { getLayoutedElements } from './components/FamilyLayout';
import SidebarStats from './components/SidebarStats'; 
import SidebarLayout from './components/SidebarLayout'; 
import TreeCanvas from './components/TreeCanvas';
import Legend from './components/Legend';

function AutoZoom() {
  const { fitView } = useReactFlow();

  useEffect(() => {
    const timer = setTimeout(() => {
      fitView({ padding: 0.2, duration: 800 });
    }, 100);
    return () => clearTimeout(timer);
  }, [fitView]);

  return null;
}

export default function ArbrePage() {
  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(() => 
    getLayoutedElements(initialPeople, initialLinks), 
    []
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  
  const [viewMode, setViewMode] = useState('classic'); 
  const [layoutDirection, setLayoutDirection] = useState('TB'); 

  const handleLayoutChange = (direction) => {
    setLayoutDirection(direction);
  };

  return (
    <div className="h-screen w-full bg-[#fdfbf7] text-slate-800 relative overflow-hidden font-sans">
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none mix-blend-multiply" 
           style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/natural-paper.png')` }}>
      </div>

      <ReactFlowProvider>
        <AutoZoom />

        <SidebarStats viewMode={viewMode} setViewMode={setViewMode} />
        
        <SidebarLayout 
          currentLayout={layoutDirection} 
          onLayoutChange={handleLayoutChange} 
        />
        
        <Legend viewMode={viewMode} />
        
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