// Fichier : lib/icelandData.js (Version Manuelle Complète)

export const icelandData = {
  videoUrl: "https://www.youtube.com/watch?v=jjyDPQoUBzY&t=1574s",
  stats: [
    { label: "Distance", value: 470, unit: "km" },
    { label: "Portage", value: 30, unit: "kg" },
    { label: "Durée", value: 21, unit: "jours" },
  ],
  
  // --- VOTRE LISTE DE 21 POINTS ---
  timeline: [
    { day: 1, coords: { x: 44, y: 91 } }, 
    { day: 2, coords: { x: 44, y: 87.5 } }, 
    { day: 3, coords: { x: 45, y: 84 } },
    { day: 4, coords: { x: 46, y: 81 } },
    { day: 5, coords: { x: 47, y: 78 } },
    { day: 6, coords: { x: 47.5, y: 74 } },
    { day: 7, coords: { x: 49, y: 70 } },
    { day: 8, coords: { x: 50, y: 67 } },
    { day: 9, coords: { x: 51.5, y: 63 } },
    { day: 10, coords: { x: 53, y: 61.5 } },
    { day: 11, coords: { x: 56, y: 60.5 } },
    { day: 12, coords: { x: 58, y: 58 } },
    { day: 13, coords: { x: 60, y: 56 } },
    { day: 14, coords: { x: 61, y: 52 } },
    { day: 15, coords: { x: 62, y: 48 } },
    { day: 16, coords: { x: 62.5, y: 42.5 } },
    { day: 17, coords: { x: 64, y: 39 } },
    { day: 18, coords: { x: 66, y: 36 } },
    { day: 19, coords: { x: 65.5, y: 35 } },
    { day: 20, coords: { x: 63, y: 28 } },
    { day: 21, coords: { x: 62, y: 23 } },
  ],
  
  gallery: Array.from({ length: 18 }, (_, i) => ({
    src: `/images/iceland/iceland${i + 1}.jpg`,
    description: `${i + 1}`,
  })),
};