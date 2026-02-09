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

// --- 1. COMPOSANT LIEN PERSONNALISÉ ---
function CustomEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, markerEnd, data }) {
  const { type } = data || {};
  const isConjugal = ['married', 'couple', 'divorced'].includes(type);

  // Trajet du lien : Droit pour les couples, Courbé pour le sang
  const [edgePath, labelX, labelY] = isConjugal
    ? getStraightPath({ sourceX, sourceY, targetX, targetY })
    : getSmoothStepPath({ 
        sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, 
        borderRadius: 8,
        offset: 20
      });

  // Icônes pour les liens conjugaux
  let Icon = null;
  let colorClass = "";

  if (type === 'married') { Icon = Infinity; colorClass = "text-amber-600 border-amber-200 bg-amber-50"; }
  else if (type === 'couple') { Icon = Heart; colorClass = "text-rose-600 border-rose-200 bg-rose-50"; }
  else if (type === 'divorced') { Icon = Link2Off; colorClass = "text-slate-500 border-slate-200 bg-slate-50"; }

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
            <div className={`flex items-center justify-center w-6 h-6 rounded-full shadow-sm border ${colorClass}`}>
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

  const defaultEdgeOptions = {
    type: 'custom',         
    sourceHandle: 'top',    
    targetHandle: 'bottom', 
    animated: false,
  };

  // --- LOGIQUE HIGHLIGHT (Descendance Stricte) ---
  const getDescendants = (nodeId, allEdges) => {
    const descendants = new Set();
    const edgesToHighlight = new Set();
    const queue = [nodeId];
    
    descendants.add(nodeId);

    // Optionnel : Ajouter le conjoint de la personne cliquée (niveau 0)
    // Si tu veux VRAIMENT juste "ceux en dessous", tu peux commenter ce bloc.
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

      // IMPORTANT : Selon ta logique (FamilyLayout), les liens de sang remontent (Enfant -> Parent).
      // Donc pour descendre, on cherche les liens où la Target est le parent actuel.
      const childrenEdges = allEdges.filter(e => 
        e.target === currentId && e.data?.type === 'blood'
      );

      childrenEdges.forEach(edge => {
        edgesToHighlight.add(edge.id);
        const childId = edge.source; // L'enfant est la SOURCE du lien

        if (!descendants.has(childId)) {
             descendants.add(childId);
             queue.push(childId);

             // On allume aussi les conjoints des enfants (pour voir les couples complets en dessous)
             const childSpouseEdges = allEdges.filter(e => 
                (e.source === childId || e.target === childId) && ['married', 'couple', 'divorced'].includes(e.data?.type)
             );
             childSpouseEdges.forEach(spouseEdge => {
                edgesToHighlight.add(spouseEdge.id);
                const spouseId = spouseEdge.source === childId ? spouseEdge.target : spouseEdge.source;
                descendants.add(spouseId);
             });
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

  // Injection des props dans les noeuds
  const nodesWithProps = nodes.map(node => ({
    ...node,
    data: { 
      ...node.data, 
      viewMode,
      isDimmed: selectedNodeId && highlightData && !highlightData.nodes.has(node.id) 
    }
  }));

  // --- STYLES DES LIENS (COULEURS RETABLIES) ---
  const edgesWithStyle = edges.map(edge => {
    const type = edge.data?.type;
    const isConjugal = ['married', 'couple', 'divorced'].includes(type);
    const isDimmed = selectedNodeId && highlightData && !highlightData.edges.has(edge.id);

    // COULEUR PAR DÉFAUT (Sang)
    let strokeColor = '#cbd5e1'; // Gris clair (Slate 300)

    // COULEURS SPÉCIFIQUES (REMISES EN PLACE)
    if (type === 'married') strokeColor = '#d97706'; // Amber-600 (Plus foncé)
    else if (type === 'couple') strokeColor = '#e11d48'; // Rose-600
    else if (type === 'divorced') strokeColor = '#64748b'; // Slate-500

    // Couleurs selon le mode de vue (si pas conjugal)
    if (!isConjugal) {
      if (viewMode === 'job') strokeColor = '#93c5fd'; // Bleu pastel
      if (viewMode === 'location') strokeColor = '#6ee7b7'; // Vert pastel
    }

    return { 
      ...edge, 
      style: { 
        ...edge.style, 
        stroke: strokeColor,
        strokeWidth: isConjugal ? 2 : 2, // Epaisseur
        strokeDasharray: isConjugal ? '5,5' : '0', // Pointillés pour mariage
        opacity: isDimmed ? 0.1 : 1, 
        transition: 'all 0.5s ease',
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
        <Background 
          variant="dots" 
          gap={20}           /* Points un peu plus rapprochés */
          size={1}           /* Points plus petits et fins */
          color="#e2e8f0"    /* Gris très pâle (Slate 200) pour ne pas agresser l'œil */
          style={{ backgroundColor: '#ffffff' }} /* Fond BLANC PUR pour faire péter les couleurs */
        />
      </ReactFlow>
    </div>
  );
}