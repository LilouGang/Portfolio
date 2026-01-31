"use client";
import React, { useState, useCallback } from 'react';
import ReactFlow, { 
  Background, 
  BaseEdge, 
  EdgeLabelRenderer, 
  getSmoothStepPath, 
  getStraightPath 
} from 'reactflow';
import { Heart, Infinity, Link2Off } from 'lucide-react'; 
import PersonNode from './PersonNode';
import 'reactflow/dist/style.css';

// --- 1. LIEN CUSTOM ---
function CustomEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, markerEnd, data }) {
  const { type } = data || {};
  const isConjugal = ['married', 'couple', 'divorced'].includes(type);

  // LOGIQUE DU TRACÉ :
  // Conjugal = Droit
  // Sang = SmoothStep avec un PETIT arrondi (8px) pour casser l'angle droit strict
  const [edgePath, labelX, labelY] = isConjugal
    ? getStraightPath({ sourceX, sourceY, targetX, targetY })
    : getSmoothStepPath({ 
        sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, 
        borderRadius: 8, // <--- 8px : Arrondi léger (ni carré, ni trop rond)
        offset: 20
      });

  let Icon = null;
  let colorClass = "";

  if (type === 'married') { Icon = Infinity; colorClass = "text-amber-500 border-amber-200"; }
  else if (type === 'couple') { Icon = Heart; colorClass = "text-rose-500 border-rose-200"; }
  else if (type === 'divorced') { Icon = Link2Off; colorClass = "text-slate-400 border-slate-200"; }

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      {isConjugal && Icon && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
            }}
            className="nopan"
          >
            <div className={`flex items-center justify-center w-6 h-6 bg-white rounded-full shadow-sm border ${colorClass}`}>
              <Icon size={12} strokeWidth={3} />
            </div>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

const nodeTypes = { personNode: PersonNode };
const edgeTypes = { custom: CustomEdge };

// --- 2. COMPOSANT PRINCIPAL ---
export default function TreeCanvas({ nodes, edges, onNodesChange, onEdgesChange, viewMode }) {
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  // --- CONFIGURATION PAR DÉFAUT ---
  const defaultEdgeOptions = {
    type: 'custom',         
    sourceHandle: 'top',    
    targetHandle: 'bottom', 
    animated: false,
  };

  // --- ALGORITHME HIGHLIGHT ---
  const getDescendants = (nodeId, allEdges) => {
    const descendants = new Set();
    const edgesToHighlight = new Set();
    const queue = [nodeId];
    
    descendants.add(nodeId);

    const rootSpouseEdges = allEdges.filter(e => 
      (e.source === nodeId || e.target === nodeId) && ['married', 'couple', 'divorced'].includes(e.data?.type)
    );
    rootSpouseEdges.forEach(edge => {
      edgesToHighlight.add(edge.id);
      const spouseId = edge.source === nodeId ? edge.target : edge.source;
      descendants.add(spouseId);
    });

    while (queue.length > 0) {
      const currentId = queue.shift();
      const relatedEdges = allEdges.filter(e => 
        (e.source === currentId || e.target === currentId) && e.data?.type === 'blood'
      );
      relatedEdges.forEach(edge => {
        edgesToHighlight.add(edge.id);
        const otherPersonId = edge.source === currentId ? edge.target : edge.source;
        if (!descendants.has(otherPersonId)) {
             descendants.add(otherPersonId);
             queue.push(otherPersonId);
        }
      });
    }
    return { nodes: descendants, edges: edgesToHighlight };
  };

  const onNodeClick = useCallback((_, node) => {
    setSelectedNodeId(prev => prev === node.id ? null : node.id);
  }, []);

  const onPaneClick = useCallback(() => setSelectedNodeId(null), []);

  const highlightData = selectedNodeId ? getDescendants(selectedNodeId, edges) : null;

  const nodesWithProps = nodes.map(node => ({
    ...node,
    data: { 
      ...node.data, 
      viewMode,
      isDimmed: selectedNodeId && highlightData && !highlightData.nodes.has(node.id) 
    }
  }));

  // --- STYLES DES LIENS ---
  const edgesWithStyle = edges.map(edge => {
    const isConjugal = ['married', 'couple', 'divorced'].includes(edge.data?.type);
    const isDimmed = selectedNodeId && highlightData && !highlightData.edges.has(edge.id);

    // COULEUR : On utilise du gris clair partout (#cbd5e1 = Slate 300)
    let strokeColor = '#cbd5e1'; 
    
    // Sauf si on est en mode couleur spécifique
    if (!isConjugal) {
      if (viewMode === 'job') strokeColor = '#93c5fd'; // Bleu pastel
      if (viewMode === 'location') strokeColor = '#6ee7b7'; // Vert pastel
    }

    return { 
      ...edge, 
      style: { 
        ...edge.style, 
        stroke: strokeColor,
        strokeWidth: 2, // Toujours épais
        strokeDasharray: isConjugal ? '6,6' : '0',
        opacity: isDimmed ? 0.2 : 1, 
        transition: 'all 0.3s ease',
      },
      data: { ...edge.data }
    };
  });

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodesWithProps}
        edges={edgesWithStyle}
        defaultEdgeOptions={defaultEdgeOptions}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        minZoom={0.1}
        maxZoom={1.5}
      >
        <Background variant="dots" gap={25} size={2} color="#cbd5e1" />
      </ReactFlow>
    </div>
  );
}