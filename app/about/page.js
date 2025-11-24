"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Mountain, 
  Telescope, 
  Atom, 
  Quote, 
  MapPin, 
  Compass,
  Leaf,
  Stars,
  Cloud,
  Sun,
  CloudRain,
  Snowflake,
  Loader2,
  Wind
} from 'lucide-react';

// --- COMPOSANT : ITEM PASSION ---
const PassionItem = ({ icon: Icon, label, color }) => (
  <motion.div 
    whileHover={{ x: 5 }}
    className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors cursor-default"
  >
    <div className={`p-2 rounded-lg bg-white shadow-sm ${color}`}>
      <Icon size={18} />
    </div>
    <span className="font-medium text-neutral-700">{label}</span>
  </motion.div>
);

// --- COMPOSANT : MÉTÉO STYLE APPLE ---
const AppleWeatherCard = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  // Détermine le style (dégradé + icône) selon la météo
  const getWeatherStyle = (conditionId) => {
    // Codes OpenWeatherMap : 2xx (Orage), 3xx (Bruine), 5xx (Pluie), 6xx (Neige), 800 (Clair), 80x (Nuages)
    const id = conditionId || 800;
    
    if (id >= 200 && id < 600) {
      return { 
        gradient: "from-slate-700 to-slate-900", 
        icon: <CloudRain size={80} className="text-blue-200" />,
        animation: { y: [0, 5, 0] } 
      };
    } else if (id >= 600 && id < 700) {
      return { 
        gradient: "from-blue-200 to-slate-400", 
        icon: <Snowflake size={80} className="text-white" />,
        animation: { rotate: [0, 45, 0] } 
      };
    } else if (id === 800) {
      return { 
        gradient: "from-[#4ca2ff] to-[#007aff]", 
        icon: <Sun size={80} className="text-yellow-300" />,
        animation: { rotate: 360 } 
      };
    } else {
      return { 
        gradient: "from-slate-400 to-slate-600", 
        icon: <Cloud size={80} className="text-white/80" />,
        animation: { x: [-10, 10, -10] } 
      };
    }
  };

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      try {
        const API_KEY = "2d60b7baaada43f03ef7517be63e4af6";
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${API_KEY}`);
        
        if (!res.ok) throw new Error("Erreur API");
        const data = await res.json();
        
        setWeather({
          temp: Math.round(data.main.temp),
          city: data.name,
          desc: data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1),
          high: Math.round(data.main.temp_max),
          low: Math.round(data.main.temp_min),
          id: data.weather[0].id
        });
      } catch (err) {
        // Fallback (Paris) si erreur ou refus géoloc
        setWeather({ temp: 18, city: 'Paris', desc: 'Nuageux', high: 20, low: 15, id: 802, isFallback: true });
      } finally {
        setLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
        () => fetchWeather(48.8566, 2.3522) // Paris par défaut
      );
    } else {
      fetchWeather(48.8566, 2.3522);
    }
  }, []);

  const style = getWeatherStyle(weather?.id);

  return (
    <div className={`h-full w-full bg-gradient-to-b ${loading ? 'from-gray-200 to-gray-300' : style.gradient} text-white p-6 flex flex-col justify-between relative overflow-hidden transition-colors duration-1000`}>
       
       {loading ? (
         <div className="flex flex-col items-center justify-center h-full gap-2 text-neutral-500">
            <Loader2 className="animate-spin" />
            <span className="text-xs font-medium">Météo locale...</span>
         </div>
       ) : (
         <>
            <div className="z-10">
               <h3 className="text-xl font-bold drop-shadow-md truncate max-w-[140px] flex items-center gap-2">
                 {weather.city}
                 {weather.isFallback && <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full" title="Position par défaut"></span>}
               </h3>
               <p className="text-sm font-medium opacity-90 drop-shadow-sm">{weather.desc}</p>
            </div>

            <div className="z-10 flex flex-col">
               <span className="text-6xl font-thin tracking-tighter drop-shadow-md">{weather.temp}°</span>
               <div className="flex gap-3 text-xs font-medium opacity-90 mt-1">
                 <span>H:{weather.high}°</span>
                 <span>L:{weather.low}°</span>
               </div>
            </div>

            {/* Animation de fond (Icone Dynamique) */}
            <motion.div 
               animate={style.animation}
               transition={{ duration: style.id === 800 ? 60 : 10, repeat: Infinity, ease: "linear" }}
               className="absolute -bottom-6 -right-6 opacity-30"
            >
               {style.icon}
            </motion.div>
         </>
       )}
    </div>
  );
};


export default function AboutPage() {
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 50 } 
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-neutral-800 p-6 md:p-12 font-sans relative overflow-hidden selection:bg-green-100">
      
      {/* BACKGROUND PARTICLES */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-80" style={{
            backgroundImage: 'radial-gradient(#A3A3A3 1px, transparent 1px)',
            backgroundSize: '32px 32px'
        }}></div>
        
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] border border-dashed border-neutral-200 rounded-full opacity-40"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] -right-[5%] w-[400px] h-[400px] border border-neutral-100 rounded-full opacity-60"
        />
      </div>

      {/* BOUTON RETOUR */}
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="relative z-20 mb-12"
      >
        <a href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-neutral-100 hover:shadow-md transition-all text-sm font-medium text-neutral-600 hover:text-neutral-900">
          <ArrowLeft size={16} /> Retour
        </a>
      </motion.div>

      {/* BENTO GRID LAYOUT */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-6 auto-rows-min gap-6 relative z-10"
      >

        {/* 1. INTRO (4 colonnes) */}
        <motion.div 
          variants={cardVariants}
          className="md:col-span-4 bg-white p-8 rounded-3xl shadow-sm border border-neutral-100 relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold tracking-wider uppercase mb-6">
              <Compass size={14} /> À propos de moi
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-medium leading-tight mb-6 text-neutral-900">
              Curieux de nature,<br/>
              fasciné par <span className="italic text-neutral-500">la découverte</span>.
            </h1>
            <p className="text-neutral-500 leading-relaxed max-w-lg">
              Mon monde ne se limite pas aux lignes de code. Je puise mon inspiration dehors, là où l'air est frais et le ciel dégagé. Toujours en quête de comprendre comment fonctionne le monde.
            </p>
          </div>
          <Mountain className="absolute -bottom-4 -right-4 text-neutral-50 w-48 h-48 rotate-12" strokeWidth={1} />
        </motion.div>

        {/* 2. PHOTO (2 colonnes) */}
        <motion.div 
          variants={cardVariants}
          className="md:col-span-2 min-h-[250px] relative rounded-3xl overflow-hidden group shadow-sm"
        >
          <img 
            src="/images/about/montagne.jpg"
            alt="Montagnes"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          <div className="absolute bottom-4 left-4 text-white">
            <p className="text-xs font-medium uppercase tracking-wider flex items-center gap-1">
              <MapPin size={12} /> Pyrénées, France
            </p>
          </div>
        </motion.div>

        {/* 3. CENTRES D'INTÉRÊT (2 colonnes) */}
        <motion.div 
          variants={cardVariants}
          className="md:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-neutral-100 flex flex-col justify-center"
        >
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <Atom size={18} className="text-blue-500" /> Centres d'intérêt
          </h3>
          <div className="flex flex-col gap-2">
            <PassionItem icon={Telescope} label="Astronomie & Cosmologie" color="text-indigo-600" />
            <PassionItem icon={Leaf} label="Trekking & Nature" color="text-green-600" />
            <PassionItem icon={Atom} label="Arts visuels & Cinéma" color="text-blue-500" />
          </div>
        </motion.div>

        {/* 4. CITATION (2 colonnes) */}
        <motion.div 
          variants={cardVariants}
          className="md:col-span-2 bg-blue-50 p-8 rounded-3xl relative overflow-hidden flex flex-col justify-center text-center"
        >
          <Quote className="absolute top-4 left-4 text-blue-200 w-8 h-8" />
          <div className="relative z-10">
            <p className="font-serif text-xl text-blue-900 italic leading-relaxed">
              "Au-delà de l'océan spatial, les étoiles sont d'autres soleils."
            </p>
            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mt-4">
              — Carl Sagan
            </p>
          </div>
          <motion.div 
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute bottom-2 right-6"
          >
            <Stars size={24} className="text-blue-300" />
          </motion.div>
        </motion.div>

        {/* 5. NOUVEAU : WIDGET MÉTÉO (2 colonnes) */}
        <motion.div 
          variants={cardVariants}
          className="md:col-span-2 rounded-3xl shadow-sm overflow-hidden"
        >
          <AppleWeatherCard />
        </motion.div>

      </motion.div>

      {/* FOOTER */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-16 text-center"
      >
        <p className="text-neutral-400 text-sm flex items-center justify-center gap-2">
           Pas de code ici, juste de la curiosité <Stars size={12} />
        </p>
      </motion.footer>

    </main>
  );
}