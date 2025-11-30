// Fichier : app/about/components/weather-scenes/SunEffect.js (Version Corrigée et Simplifiée)
"use client";

export default function SunEffect() {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600">
      
      {/* 1. LUEUR D'AMBIANCE */}
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-white opacity-30 blur-[80px] rounded-full pointer-events-none" />

      {/* 2. LE CONTENEUR GÉANT */}
      <div className="absolute -top-[80%] -left-[80%] w-[250%] h-[250%] rotate-[-45deg] pointer-events-none z-10 flex justify-center">
        
        {/* --- Les rayons sont maintenant organisés par position (left) --- */}

        {/* Rayon 1 (Gauche, Large, Très flou) */}
        <div 
          className="absolute h-full w-40 bg-gradient-to-b from-white/10 to-transparent blur-2xl"
          style={{ left: '30%' }} 
        />
        
        {/* Rayon 2 (Centre-Gauche, Large, Flou) */}
        <div 
          className="absolute h-full w-32 bg-gradient-to-b from-white/40 via-white/10 to-transparent blur-xl"
          style={{ left: '42%' }} 
        />

        {/* Rayon 3 (Centre, Très fin, Net) */}
        <div 
          className="absolute h-full w-6 bg-gradient-to-b from-white/60 via-white/5 to-transparent blur-sm mix-blend-overlay"
          style={{ left: '48%' }} 
        />
        
        {/* Rayon 4 (Centre-Droite, Fin, Moins flou) */}
        <div 
          className="absolute h-full w-12 bg-gradient-to-b from-white/50 via-white/20 to-transparent blur-md mix-blend-overlay"
          style={{ left: '52%' }} 
        />

        {/* --- NOUVEAU RAYON 5 (Droite, Moyen, Moins flou) --- */}
        <div 
          className="absolute h-full w-20 bg-gradient-to-b from-white/30 to-transparent blur-lg mix-blend-overlay"
          style={{ left: '58%' }} // On le place clairement à droite des autres
        />

      </div>
    </div>
  );
};