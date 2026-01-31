export const initialPeople = [
  { 
    id: 'g12-1', type: 'personNode', position: { x: -200, y: 0 }, 
    data: { firstname: 'Pépé 1', lastname: 'G12', birthDate: '1750', deathDate: '', birthPlace: '', job: '' } 
  },
  { 
    id: 'g12-2', type: 'personNode', position: { x: 0, y: 0 },    
    data: { firstname: 'Mémé 1', lastname: 'G12', birthDate: '1755', deathDate: '', birthPlace: '', job: '' } 
  },
  
  { 
    id: 'g12-3', type: 'personNode', position: { x: 400, y: 0 },  
    data: { firstname: 'Pépé 2', lastname: 'G12', birthDate: '1750', deathDate: '', birthPlace: '', job: '' } 
  },
  { 
    id: 'g12-4', type: 'personNode', position: { x: 600, y: 0 },  
    data: { firstname: 'Mémé 2', lastname: 'G12', birthDate: '1755', deathDate: '', birthPlace: '', job: '' } 
  },

  { 
    id: 'g11-1', type: 'personNode', position: { x: 100, y: 300 }, 
    data: { firstname: 'Pépé', lastname: 'G11', birthDate: '1780', deathDate: '', birthPlace: '', job: '' } 
  },
  { 
    id: 'g11-2', type: 'personNode', position: { x: 300, y: 300 }, 
    data: { firstname: 'Mémé', lastname: 'G11', birthDate: '1785', deathDate: '', birthPlace: '', job: '' } 
  },

  { 
    id: 'g10-1', type: 'personNode', position: { x: -400, y: 600 }, 
    data: { firstname: 'Homme 1', lastname: 'G10', birthDate: '1810', deathDate: '', birthPlace: '', job: '' } 
  },
  { 
    id: 'g10-2', type: 'personNode', position: { x: -200, y: 600 }, 
    data: { firstname: 'Femme 1', lastname: 'G10', birthDate: '1815', deathDate: '', birthPlace: '', job: '' } 
  },

  { 
    id: 'g10-3', type: 'personNode', position: { x: 200, y: 600 }, 
    data: { firstname: 'Homme 2', lastname: 'G10', birthDate: '1810', deathDate: '', birthPlace: '', job: '' } 
  },
  { 
    id: 'g10-4', type: 'personNode', position: { x: 400, y: 600 }, 
    data: { firstname: 'Femme 2', lastname: 'G10', birthDate: '1815', deathDate: '', birthPlace: '', job: '' } 
  },

  { 
    id: 'g10-5', type: 'personNode', position: { x: 800, y: 600 }, 
    data: { firstname: 'Homme 3', lastname: 'G10', birthDate: '1810', deathDate: '', birthPlace: '', job: '' } 
  },
  { 
    id: 'g10-6', type: 'personNode', position: { x: 1000, y: 600 }, 
    data: { firstname: 'Femme 3', lastname: 'G10', birthDate: '1815', deathDate: '', birthPlace: '', job: '' } 
  },

  { 
    id: 'g10-sb1', type: 'personNode', position: { x: 1250, y: 600 }, 
    data: { firstname: 'Frère 1', lastname: 'G10', birthDate: '', deathDate: '', birthPlace: '', job: '' } 
  },
  { 
    id: 'g10-sb2', type: 'personNode', position: { x: 1450, y: 600 }, 
    data: { firstname: 'Sœur 1', lastname: 'G10', birthDate: '', deathDate: '', birthPlace: '', job: '' } 
  },
  { 
    id: 'g10-sb3', type: 'personNode', position: { x: 1650, y: 600 }, 
    data: { firstname: 'Frère 2', lastname: 'G10', birthDate: '', deathDate: '', birthPlace: '', job: '' } 
  },
  { 
    id: 'g10-sb4', type: 'personNode', position: { x: 1850, y: 600 }, 
    data: { firstname: 'Sœur 2', lastname: 'G10', birthDate: '', deathDate: '', birthPlace: '', job: '' } 
  },

  { 
    id: 'g9-1', type: 'personNode', position: { x: 0, y: 900 }, 
    data: { firstname: 'Homme A', lastname: 'G9', birthDate: '1840', deathDate: '', birthPlace: '', job: '' } 
  },
  { 
    id: 'g9-sb-h1', type: 'personNode', position: { x: -200, y: 900 }, 
    data: { firstname: 'Frère A1', lastname: 'G9', birthDate: '', deathDate: '', birthPlace: '', job: '' } 
  },
  { 
    id: 'g9-sb-h2', type: 'personNode', position: { x: -400, y: 900 }, 
    data: { firstname: 'Frère A2', lastname: 'G9', birthDate: '', deathDate: '', birthPlace: '', job: '' } 
  },
  
  { 
    id: 'g9-2', type: 'personNode', position: { x: 250, y: 900 }, 
    data: { firstname: 'Femme A', lastname: 'G9', birthDate: '1845', deathDate: '', birthPlace: '', job: '' } 
  },

  ...Array.from({ length: 13 }).map((_, i) => ({
    id: `g9-sib-w-${i}`, type: 'personNode', 
    position: { x: 500 + (i * 200), y: 900 },
    data: { firstname: `Adelphe ${i+1}`, lastname: 'G9', birthDate: '', deathDate: '', birthPlace: '', job: '' } 
  })),

  { 
    id: 'g9-3', type: 'personNode', position: { x: -800, y: 900 }, 
    data: { firstname: 'Homme B', lastname: 'G9', birthDate: '1840', deathDate: '', birthPlace: '', job: '' } 
  },
  { 
    id: 'g9-4', type: 'personNode', position: { x: -600, y: 900 }, 
    data: { firstname: 'Femme B', lastname: 'G9', birthDate: '1845', deathDate: '', birthPlace: '', job: '' } 
  },

  { 
    id: 'g9-5', type: 'personNode', position: { x: -1400, y: 900 }, 
    data: { firstname: 'Homme C', lastname: 'G9', birthDate: '1840', deathDate: '', birthPlace: '', job: '' } 
  },
  { 
    id: 'g9-6', type: 'personNode', position: { x: -1200, y: 900 }, 
    data: { firstname: 'Femme C', lastname: 'G9', birthDate: '1845', deathDate: '', birthPlace: '', job: '' } 
  },

  ...Array.from({ length: 8 }).map((_, i) => ({
    id: `g9-sib-c-${i}`, type: 'personNode', 
    position: { x: -1650 - (i * 200), y: 900 }, 
    data: { firstname: `Adelphe C${i+1}`, lastname: 'G9', birthDate: '', deathDate: '', birthPlace: '', job: '' } 
  })),

  { 
    id: 'g9-7', type: 'personNode', position: { x: -1000, y: 1050 }, 
    data: { firstname: 'Homme D', lastname: 'G9', birthDate: '1840', deathDate: '', birthPlace: '', job: '' } 
  },
  { 
    id: 'g9-8', type: 'personNode', position: { x: -800, y: 1050 }, 
    data: { firstname: 'Femme D', lastname: 'G9', birthDate: '1845', deathDate: '', birthPlace: '', job: '' } 
  },

  ...Array.from({ length: 10 }).flatMap((_, i) => [
    { 
      id: `g8-h${i}`, type: 'personNode', position: { x: (i * 450) - 2000, y: 1200 }, 
      data: { firstname: `Homme ${i+1}`, lastname: 'G8', birthDate: '1870', deathDate: '', birthPlace: '', job: '' } 
    },
    { 
      id: `g8-f${i}`, type: 'personNode', position: { x: (i * 450) - 1800, y: 1200 }, 
      data: { firstname: `Femme ${i+1}`, lastname: 'G8', birthDate: '1875', deathDate: '', birthPlace: '', job: '' } 
    },
  ]),

  ...Array.from({ length: 8 }).flatMap((_, i) => [
    { 
      id: `g7-h${i}`, type: 'personNode', position: { x: (i * 450) - 1500, y: 1500 }, 
      data: { firstname: `Homme ${i+1}`, lastname: 'G7', birthDate: '1900', deathDate: '', birthPlace: '', job: '' } 
    },
    { 
      id: `g7-f${i}`, type: 'personNode', position: { x: (i * 450) - 1300, y: 1500 }, 
      data: { firstname: `Femme ${i+1}`, lastname: 'G7', birthDate: '1905', deathDate: '', birthPlace: '', job: '' } 
    },
  ]),

  ...Array.from({ length: 5 }).flatMap((_, i) => [
    { 
      id: `g6-h${i}`, type: 'personNode', position: { x: (i * 450) - 1000, y: 1800 }, 
      data: { firstname: `Homme ${i+1}`, lastname: 'G6', birthDate: '1930', deathDate: '', birthPlace: '', job: '' } 
    },
    { 
      id: `g6-f${i}`, type: 'personNode', position: { x: (i * 450) - 800, y: 1800 }, 
      data: { firstname: `Femme ${i+1}`, lastname: 'G6', birthDate: '1935', deathDate: '', birthPlace: '', job: '' } 
    },
  ]),

  { 
    id: 'g6-h6', type: 'personNode', position: { x: 1500, y: 1800 }, 
    data: { firstname: 'Homme 6', lastname: 'G6', birthDate: '1930', deathDate: '', birthPlace: '', job: '' } 
  },
  { 
    id: 'g6-f6', type: 'personNode', position: { x: 1700, y: 1800 }, 
    data: { firstname: 'Femme 6', lastname: 'G6', birthDate: '1935', deathDate: '', birthPlace: '', job: '' } 
  },

  { 
    id: 'g6-s1', type: 'personNode', position: { x: 1900, y: 1800 }, 
    data: { firstname: 'Sœur 1', lastname: 'G6', birthDate: '', deathDate: '', birthPlace: '', job: '' } 
  },
  { 
    id: 'g6-s2', type: 'personNode', position: { x: 2100, y: 1800 }, 
    data: { firstname: 'Sœur 2', lastname: 'G6', birthDate: '', deathDate: '', birthPlace: '', job: '' } 
  },
  { 
    id: 'g6-s3', type: 'personNode', position: { x: 2300, y: 1800 }, 
    data: { firstname: 'Sœur 3', lastname: 'G6', birthDate: '', deathDate: '', birthPlace: '', job: '' } 
  },
  { 
    id: 'g6-b1', type: 'personNode', position: { x: 2500, y: 1800 }, 
    data: { firstname: 'Frère 1', lastname: 'G6', birthDate: '', deathDate: '', birthPlace: '', job: '' } 
  },

  { 
    id: 'g5-1', type: 'personNode', position: { x: -400, y: 2100 }, 
    data: { firstname: 'Pépé A', lastname: 'G5', birthDate: '1960', deathDate: '', birthPlace: '', job: '' } 
  },
  { 
    id: 'g5-2', type: 'personNode', position: { x: -200, y: 2100 }, 
    data: { firstname: 'Mémé A', lastname: 'G5', birthDate: '1965', deathDate: '', birthPlace: '', job: '' } 
  },
  
  { 
    id: 'g5-3', type: 'personNode', position: { x: 200, y: 2100 }, 
    data: { firstname: 'Pépé B', lastname: 'G5', birthDate: '1960', deathDate: '', birthPlace: '', job: '' } 
  },
  { 
    id: 'g5-4', type: 'personNode', position: { x: 400, y: 2100 }, 
    data: { firstname: 'Mémé B', lastname: 'G5', birthDate: '1965', deathDate: '', birthPlace: '', job: '' } 
  },

  { 
    id: 'g5-5', type: 'personNode', position: { x: 800, y: 2100 }, 
    data: { firstname: 'Pépé C', lastname: 'G5', birthDate: '1960', deathDate: '', birthPlace: '', job: '' } 
  },
  { 
    id: 'g5-6', type: 'personNode', position: { x: 1000, y: 2100 }, 
    data: { firstname: 'Mémé C', lastname: 'G5', birthDate: '1965', deathDate: '', birthPlace: '', job: '' } 
  },

  { 
    id: 'g4-1', type: 'personNode', position: { x: -200, y: 2400 }, 
    data: { firstname: 'Arr-GP Paternel', lastname: 'G4', birthDate: '1900', deathDate: '', birthPlace: '', job: '' } 
  },
  { 
    id: 'g4-2', type: 'personNode', position: { x: 0, y: 2400 },    
    data: { firstname: 'Arr-GM Paternel', lastname: 'G4', birthDate: '1905', deathDate: '', birthPlace: '', job: '' } 
  },
  
  { 
    id: 'g4-3', type: 'personNode', position: { x: 600, y: 2400 },  
    data: { firstname: 'Arr-GP Maternel', lastname: 'G4', birthDate: '1900', deathDate: '', birthPlace: '', job: '' } 
  },
  { 
    id: 'g4-4', type: 'personNode', position: { x: 800, y: 2400 },  
    data: { firstname: 'Arr-GM Maternel', lastname: 'G4', birthDate: '1905', deathDate: '', birthPlace: '', job: '' } 
  },

  { 
    id: 'g3-1', type: 'personNode', position: { x: -100, y: 2700 }, 
    data: { firstname: 'Grand-Père', lastname: 'G3', birthDate: '1930', deathDate: '', birthPlace: '', job: '' } 
  },
  { 
    id: 'g3-2', type: 'personNode', position: { x: 200, y: 2700 },  
    data: { firstname: 'Grand-Mère', lastname: 'G3', birthDate: '1935', deathDate: '', birthPlace: '', job: '' } 
  },
  
  { 
    id: 'g3-3', type: 'personNode', position: { x: 700, y: 2700 },  
    data: { firstname: 'GP Maternel', lastname: 'G3', birthDate: '1930', deathDate: '', birthPlace: '', job: '' } 
  },
  { 
    id: 'g3-4', type: 'personNode', position: { x: 900, y: 2700 },  
    data: { firstname: 'GM Maternelle', lastname: 'G3', birthDate: '1935', deathDate: '', birthPlace: '', job: '' } 
  },

  { 
    id: 'g2-uncle1', type: 'personNode', position: { x: -300, y: 3000 }, 
    data: { firstname: 'Oncle Paternel', lastname: 'G2', birthDate: '1958', deathDate: '', birthPlace: '', job: '' } 
  },
  
  { 
    id: 'g2-1', type: 'personNode', position: { x: 50, y: 3000 },    
    data: { firstname: 'Papa', lastname: 'G2', birthDate: '1960', deathDate: '', birthPlace: '', job: '' } 
  },

  { 
    id: 'g2-2', type: 'personNode', position: { x: 350, y: 3000 },   
    data: { firstname: 'Maman', lastname: 'G2', birthDate: '1962', deathDate: '', birthPlace: '', job: '' } 
  },

  { 
    id: 'g2-uncle2', type: 'personNode', position: { x: 650, y: 3000 },  
    data: { firstname: 'Oncle Maternel', lastname: 'G2', birthDate: '1964', deathDate: '', birthPlace: '', job: '' } 
  },

  { 
    id: 'g1-s1', type: 'personNode', position: { x: 0, y: 3300 },   
    data: { firstname: 'Sœur Aînée', lastname: 'G1', birthDate: '1990', deathDate: '', birthPlace: '', job: '' } 
  },
  { 
    id: 'g1-me', type: 'personNode', position: { x: 200, y: 3300 }, 
    data: { firstname: 'MOI', lastname: 'G1', birthDate: '1995', deathDate: '', birthPlace: '', job: '' } 
  },
  { 
    id: 'g1-s2', type: 'personNode', position: { x: 400, y: 3300 }, 
    data: { firstname: 'Sœur Cadette', lastname: 'G1', birthDate: '1998', deathDate: '', birthPlace: '', job: '' } 
  },
];

export const initialLinks = [
  //G1 à G2
  { id: 'b-me-g2-1', source: 'g1-me', target: 'g2-1', data: { type: 'blood' } },
  { id: 'b-me-g2-2', source: 'g1-me', target: 'g2-2', data: { type: 'blood' } },
  { id: 'b-s1-g2-1', source: 'g1-s1', target: 'g2-1', data: { type: 'blood' } },
  { id: 'b-s1-g2-2', source: 'g1-s1', target: 'g2-2', data: { type: 'blood' } },
  { id: 'b-s2-g2-1', source: 'g1-s2', target: 'g2-1', data: { type: 'blood' } },
  { id: 'b-s2-g2-2', source: 'g1-s2', target: 'g2-2', data: { type: 'blood' } },

  
  { id: 'm-g12-1', source: 'g12-1', target: 'g12-2', data: { type: 'married' } },
  { id: 'm-g12-2', source: 'g12-3', target: 'g12-4', data: { type: 'married' } },
  { id: 'm-g11-1', source: 'g11-1', target: 'g11-2', data: { type: 'married' } },
  { id: 'm-g10-1', source: 'g10-1', target: 'g10-2', data: { type: 'married' } },
  { id: 'm-g10-2', source: 'g10-3', target: 'g10-4', data: { type: 'married' } },
  { id: 'm-g10-3', source: 'g10-5', target: 'g10-6', data: { type: 'married' } },
  { id: 'm-g9-1', source: 'g9-1', target: 'g9-2', data: { type: 'married' } },
  { id: 'm-g9-2', source: 'g9-3', target: 'g9-4', data: { type: 'married' } },
  { id: 'm-g9-3', source: 'g9-5', target: 'g9-6', data: { type: 'married' } },
  { id: 'm-g2-1', source: 'g2-1', target: 'g2-2', data: { type: 'couple' } },
  { id: 'm-g3-1', source: 'g3-1', target: 'g3-2', data: { type: 'married' } },
  { id: 'm-g3-2', source: 'g3-3', target: 'g3-4', data: { type: 'married' } },
  { id: 'b-g3-dad', source: 'g3-1', target: 'g2-1', data: { type: 'blood' } },
  { id: 'b-g3-uncle', source: 'g3-1', target: 'g2-uncle1', data: { type: 'blood' } },
  { id: 'b-g3-mom', source: 'g3-3', target: 'g2-2', data: { type: 'blood' } },
  { id: 'b-g3-uncle2', source: 'g3-3', target: 'g2-uncle2', data: { type: 'blood' } },
];