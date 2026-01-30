export const initialPeople = [
  { id: 'gp1', type: 'personNode', position: { x: 0, y: 0 }, data: { name: 'Arthur', birth: '1920', death: '1998', job: 'Forgeron', location: 'Bretagne' } },
  { id: 'gp2', type: 'personNode', position: { x: 0, y: 0 }, data: { name: 'Rose', birth: '1925', death: '2005', job: 'Couturière', location: 'Paris' } },
  { id: 'p1', type: 'personNode', position: { x: 0, y: 0 }, data: { name: 'Marc', birth: '1955', death: null, job: 'Menuisier', location: 'Bretagne' } },
  { id: 'p2', type: 'personNode', position: { x: 0, y: 0 }, data: { name: 'Julie', birth: '1960', death: null, job: 'Infirmière', location: 'Lyon' } },
  { id: '1', type: 'personNode', position: { x: 0, y: 0 }, data: { name: 'Killian', birth: '1995', death: null, job: 'Développeur', location: 'Paris' } }
];

export const initialLinks = [
  { id: 'e-gp1-gp2', source: 'gp1', target: 'gp2', data: { type: 'married' } },
  { id: 'e-p1-p2', source: 'p1', target: 'p2', data: { type: 'couple' } },
  { id: 'e-gp1-p1', source: 'gp1', target: 'p1', data: { type: 'blood' } },
  { id: 'e-gp2-p1', source: 'gp2', target: 'p1', data: { type: 'blood' } },
  { id: 'e-p1-1', source: 'p1', target: '1', data: { type: 'blood' } },
  { id: 'e-p2-1', source: 'p2', target: '1', data: { type: 'blood' } },
];