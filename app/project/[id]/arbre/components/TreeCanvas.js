"use client";
import React from 'react';
import ReactFlow, { Background, useReactFlow } from 'reactflow';
import PersonNode from './PersonNode';
import 'reactflow/dist/style.css';

const nodeTypes = { personNode: PersonNode };

export default function TreeCanvas({ nodes, edges, onNodesChange, onEdgesChange, viewMode }) {
  // Styles dynamiques des liens
  const edgesWithStyle = edges.map(edge => {
    const isConjugal = ['married', 'couple', 'divorced'].includes(edge.data?.type);
    
    // Définition de l'icône centrale
    let relationIcon = "";
    if (edge.data?.type === 'married') relationIcon = "💍";
    if (edge.data?.type === 'couple') relationIcon = "❤️";
    if (edge.data?.type === 'divorced') relationIcon = "💔";

    // Couleur de ligne selon le mode
    let strokeColor = '#cbd5e1'; // Gris par défaut
    if (!isConjugal) {
      if (viewMode === 'job') strokeColor = '#3b82f6'; // Bleu
      if (viewMode === 'location') strokeColor = '#10b981'; // Vert
    } else {
      strokeColor = '#94a3b8'; // Gris plus foncé pour les couples
    }

    return { 
      ...edge, 
      label: relationIcon,
      // On force les points d'ancrage (Handles)
      sourceHandle: isConjugal ? 'right' : 'bottom', 
      targetHandle: isConjugal ? 'left' : 'top',
      type: isConjugal ? 'straight' : 'smoothstep', 
      style: { 
        stroke: strokeColor,
        strokeWidth: 2,
        strokeDasharray: isConjugal ? '5,5' : '0', // Pointillés pour couples
      },
      labelStyle: { fontSize: 16 },
      labelBgStyle: { fill: '#fbfbf9', fillOpacity: 0.9 },
      labelBgPadding: [6, 4],
    };
  });

  // Injection du viewMode dans chaque nœud
  const nodesWithMode = nodes.map(node => ({
    ...node,
    data: { ...node.data, viewMode }
  }));

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodesWithMode}
        edges={edgesWithStyle}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.2}
        maxZoom={1.2}
        fitViewOptions={{ padding: 0.4 }}
      >
        <Background 
          variant="lines" 
          gap={35} 
          size={1} 
          color="rgba(210, 210, 200, 0.3)" 
        />
      </ReactFlow>
    </div>
  );
}