"use client";
import { useState } from 'react';
import { useNodesState, useEdgesState, ReactFlowProvider } from 'reactflow';
import { initialPeople, initialLinks } from '@/lib/arbreData';
import SidebarStats from './components/SidebarStats';
import SidebarLayout from './components/SidebarLayout';
import TreeCanvas from './components/TreeCanvas';

export default function ArbrePage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialPeople);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialLinks);
  const [viewMode, setViewMode] = useState('classic');

  return (
    <div className="h-screen w-full bg-[#f8f8f7] text-slate-800 relative overflow-hidden">
      {/* On enveloppe tout ici */}
      <ReactFlowProvider>
        <SidebarStats viewMode={viewMode} setViewMode={setViewMode} />
        
        <div className="w-full h-full relative z-10">
          <TreeCanvas 
            nodes={nodes} 
            edges={edges} 
            onNodesChange={onNodesChange} 
            onEdgesChange={onEdgesChange}
            viewMode={viewMode}
          />
        </div>

        <SidebarLayout nodes={nodes} edges={edges} setNodes={setNodes} />
      </ReactFlowProvider>
    </div>
  );
}