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

// --- 1. DÉFINITION DU LIEN CUSTOM ---
function CustomEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, markerEnd, data }) {
  const { type } = data || {};
  const isConjugal = ['married', 'couple', 'divorced'].includes(type);

  const [edgePath, labelX, labelY] = isConjugal
    ? getStraightPath({ sourceX, sourceY, targetX, targetY })
    : getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });

  let Icon = null;
  let colorClass = "";

  if (type === 'married') { Icon = Infinity; colorClass = "text-amber-500"; }
  else if (type === 'couple') { Icon = Heart; colorClass = "text-rose-500"; }
  else if (type === 'divorced') { Icon = Link2Off; colorClass = "text-slate-400"; }

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
            <div className={`flex items-center justify-center w-7 h-7 bg-white rounded-full shadow-sm border border-slate-100 ${colorClass}`}>
              <Icon size={14} strokeWidth={2.5} />
            </div>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

const nodeTypes = { personNode: PersonNode };
const edgeTypes = { custom: CustomEdge };

// --- 2. LE COMPOSANT PRINCIPAL ---
export default function TreeCanvas({ nodes, edges, onNodesChange, onEdgesChange, viewMode }) {
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  // --- ALGORITHME DE DESCENDANCE COMPLET ---
  const getDescendants = (nodeId, allEdges) => {
    const descendants = new Set();
    const edgesToHighlight = new Set();
    const queue = [nodeId];
    
    // On s'ajoute soi-même
    descendants.add(nodeId);

    // On ajoute immédiatement le conjoint du nœud sélectionné (pour ne pas séparer le couple racine)
    const rootSpouseEdges = allEdges.filter(e => 
      (e.source === nodeId || e.target === nodeId) && ['married', 'couple'].includes(e.data?.type)
    );
    rootSpouseEdges.forEach(edge => {
      edgesToHighlight.add(edge.id);
      const spouseId = edge.source === nodeId ? edge.target : edge.source;
      descendants.add(spouseId);
    });

    // Parcours en largeur (BFS)
    while (queue.length > 0) {
      const currentId = queue.shift();

      // 1. Trouver les enfants (Liens de sang sortants)
      const childrenEdges = allEdges.filter(
        e => e.source === currentId && e.data?.type === 'blood'
      );

      childrenEdges.forEach(edge => {
        edgesToHighlight.add(edge.id); // Allumer le trait
        
        if (!descendants.has(edge.target)) {
          descendants.add(edge.target); // Allumer l'enfant
          queue.push(edge.target);      // Ajouter à la file
        }

        // 2. Trouver le conjoint de cet enfant
        const childSpouseEdges = allEdges.filter(e => 
          (e.source === edge.target || e.target === edge.target) && ['married', 'couple'].includes(e.data?.type)
        );

        childSpouseEdges.forEach(spouseEdge => {
          edgesToHighlight.add(spouseEdge.id); 
          const spouseId = spouseEdge.source === edge.target ? spouseEdge.target : spouseEdge.source;
          descendants.add(spouseId); 
        });
      });
    }

    return { nodes: descendants, edges: edgesToHighlight };
  };

  // --- GESTION DU CLIC ---
  const onNodeClick = useCallback((_, node) => {
    // Si on clique sur le même, on désélectionne, sinon on sélectionne
    setSelectedNodeId(prev => prev === node.id ? null : node.id);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  // Calcul des données à mettre en surbrillance
  const highlightData = selectedNodeId ? getDescendants(selectedNodeId, edges) : null;

  // Injection des props "isDimmed" dans les Nœuds
  const nodesWithProps = nodes.map(node => ({
    ...node,
    data: { 
      ...node.data, 
      viewMode,
      // Si une sélection est active, est-ce que je suis dedans ? Sinon je m'éteins.
      isDimmed: selectedNodeId && highlightData && !highlightData.nodes.has(node.id) 
    }
  }));

  // Injection des styles "isDimmed" dans les Liens
  const edgesWithStyle = edges.map(edge => {
    const isConjugal = ['married', 'couple', 'divorced'].includes(edge.data?.type);
    const isDimmed = selectedNodeId && highlightData && !highlightData.edges.has(edge.id);

    let strokeColor = isConjugal ? '#94a3b8' : '#cbd5e1'; 
    if (!isConjugal) {
      if (viewMode === 'job') strokeColor = '#3b82f6';
      if (viewMode === 'location') strokeColor = '#10b981';
    }

    return { 
      ...edge, 
      type: 'custom', 
      sourceHandle: isConjugal ? 'right' : 'bottom', 
      targetHandle: isConjugal ? 'left' : 'top',
      style: { 
        stroke: strokeColor,
        strokeWidth: 2,
        strokeDasharray: isConjugal ? '5,5' : '0',
        transition: 'opacity 0.5s ease-in-out, stroke 0.5s ease', 
        opacity: isDimmed ? 0.1 : 1, 
      },
      data: { ...edge.data }
    };
  });

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodesWithProps}
        edges={edgesWithStyle}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        minZoom={0.1}
        maxZoom={1.5}
      >
        <Background variant="dots" gap={30} size={1.5} color="#c4c2be" style={{ opacity: 1 }} />
      </ReactFlow>
    </div>
  );
}