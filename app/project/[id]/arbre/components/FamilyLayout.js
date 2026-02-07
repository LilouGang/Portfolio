// components/FamilyLayout.js

// --- CONFIGURATION ---
const NODE_WIDTH = 140;

// Espaces
const GAP_COUPLE_TIGHT = 30;  // Couple collé (si pas de risque de croisement)
const GAP_COUPLE_WIDE = 180;  // Couple écarté (SI les deux ont des parents -> Laisse passer les traits)
const GAP_SIBLING = 50;       // Frères/Sœurs
const GAP_COUSIN = 80;        // Cousins / Membres éloignés du groupe
const GAP_UNRELATED = 300;    // Séparation nette entre familles différentes

const GAP_Y = 350;            // Hauteur des étages

export const getLayoutedElements = (nodes, edges) => {
  const generations = {};
  let maxGen = 0;
  let minGen = 100;

  // 1. CLASSEMENT PAR GÉNÉRATION
  nodes.forEach(node => {
    const match = node.id.match(/g(\d+)/);
    const genNum = match ? parseInt(match[1]) : 0;
    if (genNum > maxGen) maxGen = genNum;
    if (genNum < minGen) minGen = genNum;
    if (!generations[genNum]) generations[genNum] = [];
    generations[genNum].push(node);
  });

  const layoutedNodes = [];
  const nodePositions = {}; // Mémorise les positions X finales

  // --- FONCTIONS ---

  // Retrouve les parents d'un noeud
  const getParents = (nodeId) => {
    return edges
      .filter(e => e.source === nodeId && e.data?.type === 'blood')
      .map(e => e.target);
  };

  // Retrouve les enfants d'un noeud (Pour l'alignement)
  const getChildren = (nodeId) => {
    return edges
      .filter(e => e.target === nodeId && e.data?.type === 'blood')
      .map(e => e.source);
  };

  const areConnected = (nodeA, nodeB) => {
    // Mariage
    const married = edges.some(e => 
      ['married', 'couple', 'divorced'].includes(e.data?.type) &&
      ((e.source === nodeA.id && e.target === nodeB.id) || (e.target === nodeA.id && e.source === nodeB.id))
    );
    if (married) return 'married';

    // Fratrie (Parent commun)
    const parentsA = getParents(nodeA.id);
    const parentsB = getParents(nodeB.id);
    const siblings = parentsA.some(p => parentsB.includes(p));
    if (siblings) return 'sibling';
    
    return false;
  };

  // 2. BOUCLE PRINCIPALE : BOTTOM-UP (Du bas vers le haut)
  // On place les enfants (G0), puis on place les parents (G1) au-dessus, etc.
  const sortedGens = Object.keys(generations).map(Number).sort((a, b) => a - b); // 0, 1, 2...

  sortedGens.forEach(genNum => {
    const people = generations[genNum];
    
    // A. Création des groupes (Familles nucléaires)
    const groups = [];
    if (people.length > 0) {
      let currentGroup = [people[0]];
      for (let i = 1; i < people.length; i++) {
        const prev = people[i - 1];
        const curr = people[i];
        if (areConnected(prev, curr)) {
          currentGroup.push(curr);
        } else {
          groups.push(currentGroup);
          currentGroup = [curr];
        }
      }
      groups.push(currentGroup);
    }

    // B. Placement des groupes
    let currentXCursor = 0; 

    // Initialisation arbitraire pour la génération la plus basse
    if (genNum === minGen) {
        currentXCursor = -((people.length * (NODE_WIDTH + 50)) / 2);
    }

    groups.forEach((group, gIndex) => {
      // 1. Calcul largeurs internes & Gaps Intelligents
      let groupWidth = 0;
      const memberRelX = []; 

      group.forEach((member, mIndex) => {
        memberRelX.push(groupWidth); 
        groupWidth += NODE_WIDTH; 

        if (mIndex < group.length - 1) {
          const nextMember = group[mIndex + 1];
          const relation = areConnected(member, nextMember);
          
          if (relation === 'married') {
            // --- LA CORRECTION ANTI-CHEVAUCHEMENT EST ICI ---
            const parentsA = getParents(member.id);
            const parentsB = getParents(nextMember.id);

            // Si les DEUX ont des parents affichés dans l'arbre
            if (parentsA.length > 0 && parentsB.length > 0) {
               // ALORS on met un GRAND espace pour laisser passer les traits
               groupWidth += GAP_COUPLE_WIDE; // 180px
            } else {
               // SINON on les laisse collés
               groupWidth += GAP_COUPLE_TIGHT; // 30px
            }
          } else if (relation === 'sibling') {
             groupWidth += GAP_SIBLING;
          } else {
             groupWidth += GAP_COUSIN;
          }
        }
      });

      // 2. Alignement sur les Enfants (Moyenne des positions des enfants)
      let childCenterSum = 0;
      let childCount = 0;

      group.forEach(member => {
        const children = getChildren(member.id);
        children.forEach(cId => {
          if (nodePositions[cId] !== undefined) {
            childCenterSum += nodePositions[cId];
            childCount++;
          }
        });
      });

      let idealStartX = currentXCursor;

      if (childCount > 0) {
        const avgChildX = childCenterSum / childCount;
        const groupCenterRel = groupWidth / 2;
        idealStartX = avgChildX - groupCenterRel;
      }

      // 3. Gestion Collision (On ne passe jamais "par dessus" le groupe de gauche)
      let finalStartX;
      if (gIndex === 0) {
        // Si c'est le tout premier groupe de la ligne, on privilégie l'alignement enfants
        finalStartX = (childCount > 0) ? idealStartX : currentXCursor;
      } else {
        // Sinon, on s'assure d'être après le groupe précédent + GAP
        const minSafeX = currentXCursor + GAP_UNRELATED;
        // On prend le max : soit on est loin à droite (aligné enfants), soit on est poussé par le voisin
        finalStartX = Math.max(idealStartX, minSafeX);
      }

      // 4. Enregistrement
      const currentY = (maxGen - genNum) * GAP_Y;

      group.forEach((member, mIndex) => {
        const posX = finalStartX + memberRelX[mIndex];
        nodePositions[member.id] = posX + (NODE_WIDTH / 2); // Centre

        layoutedNodes.push({
          ...member,
          position: { x: posX, y: currentY },
          targetPosition: 'bottom',
          sourcePosition: 'top',
        });
      });

      // Mise à jour du curseur pour le prochain groupe
      currentXCursor = finalStartX + groupWidth;
    });
  });

  return { nodes: layoutedNodes, edges };
};