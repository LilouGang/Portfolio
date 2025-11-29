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
  Wind,
  CloudLightning,
  CloudDrizzle
} from 'lucide-react';

// --- COMPOSANT : ITEM PASSION (Adapté pour fond clair) ---
const PassionItem = ({ icon: Icon, label, color }) => (
  <motion.div 
    whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.5)" }}
    className="flex items-center gap-3 p-3 rounded-xl bg-white/40 border border-white/20 transition-colors cursor-default shadow-sm"
  >
    <div className={`p-2 rounded-lg bg-white/60 text-neutral-800 shadow-sm ${color}`}>
      <Icon size={18} />
    </div>
    <span className="font-medium text-neutral-800">{label}</span>
  </motion.div>
);

// --- COMPOSANT : MÉTÉO STYLE APPLE ---
const AppleWeatherCard = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const getWeatherStyle = (conditionId) => {
    const id = conditionId || 800;
    
    // ORAGE (2xx)
    if (id >= 200 && id < 300) {
      return { 
        gradient: "from-[#203A43]/80 to-[#2C5364]/80", 
        icon: <CloudLightning size={100} className="text-yellow-400" />,
        animation: { scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] } 
      };
    } 
    // BRUINE (3xx)
    else if (id >= 300 && id < 400) {
      return { 
        gradient: "from-[#4B79A1]/80 to-[#283E51]/80", 
        icon: <CloudDrizzle size={100} className="text-blue-200" />,
        animation: { y: [0, 3, 0] } 
      };
    }
    // PLUIE (5xx)
    else if (id >= 500 && id < 600) {
      return { 
        gradient: "from-[#2c3e50]/80 to-[#4ca1af]/80",
        icon: <CloudRain size={100} className="text-blue-100" />,
        animation: { y: [0, 5, 0] } 
      };
    } 
    // NEIGE (6xx)
    else if (id >= 600 && id < 700) {
      return { 
        gradient: "from-[#83a4d4]/80 to-[#b6fbff]/80", 
        icon: <Snowflake size={100} className="text-white" />,
        animation: { rotate: [0, 45, 0] } 
      };
    } 
    // ATMOSPHERE (7xx)
    else if (id >= 700 && id < 800) {
      return { 
        gradient: "from-[#757F9A]/80 to-[#D7DDE8]/80",
        icon: <Wind size={100} className="text-neutral-100" />,
        animation: { x: [-10, 10, -10] } 
      };
    }
    // CLAIR (800)
    else if (id === 800) {
      return { 
        gradient: "from-[#2980B9]/80 to-[#6DD5FA]/80", 
        icon: <Sun size={100} className="text-yellow-300" />,
        animation: { rotate: 360 } 
      };
    } 
    // NUAGES (80x)
    else {
      return { 
        gradient: "from-[#5D7EA8]/80 to-[#8FAAC9]/80", 
        icon: <Cloud size={100} className="text-white/90" />,
        animation: { x: [-5, 5, -5] } 
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
          id: data.weather[0].id,
          isFallback: false
        });
      } catch (err) {
        setWeather({ temp: 18, city: 'Paris', desc: 'Nuageux', high: 20, low: 15, id: 802, isFallback: true });
      } finally {
        setLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
        () => fetchWeather(48.8566, 2.3522) 
      );
    } else {
      fetchWeather(48.8566, 2.3522);
    }
  }, []);

  const style = getWeatherStyle(weather?.id);

  return (
    <div className={`h-full w-full bg-gradient-to-br ${loading ? 'from-gray-700/50 to-gray-800/50' : style.gradient} backdrop-blur-md text-white p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-1000`}>
       
       {loading ? (
         <div className="flex flex-col items-center justify-center h-full gap-2 text-white/80">
            <Loader2 className="animate-spin" />
            <span className="text-xs font-medium">Météo locale...</span>
         </div>
       ) : (
         <>
            <div className="z-10 relative">
               <h3 className="text-xl font-bold drop-shadow-md flex items-center gap-2 w-full min-w-0">
                 <span className="truncate">{weather.city}</span>
                 {weather.isFallback && <span className="flex-shrink-0 w-2 h-2 bg-yellow-400 rounded-full shadow-sm" title="Position par défaut"></span>}
               </h3>
               <p className="text-sm font-medium opacity-90 drop-shadow-sm truncate">{weather.desc}</p>
            </div>

            <div className="z-10 relative flex flex-col mt-auto">
               <span className="text-6xl font-thin tracking-tighter drop-shadow-md">{weather.temp}°</span>
               <div className="flex gap-3 text-xs font-medium opacity-90 mt-1">
                 <span>H:{weather.high}°</span>
                 <span>L:{weather.low}°</span>
               </div>
            </div>

            <motion.div 
               animate={style.animation}
               transition={{ duration: style.id === 800 ? 60 : 8, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -bottom-4 -right-4 opacity-60 pointer-events-none"
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
    <main className="min-h-screen text-neutral-900 font-sans relative overflow-y-auto overflow-x-hidden selection:bg-blue-500/30">
      
      {/* --- FOND D'ÉCRAN IMMERSIF (Intouché) --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <img 
            src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80" 
            alt="Mountain Background" 
            className="w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-white/20"></div>
         <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      </div>

      {/* CONTENU PRINCIPAL */}
      <div className="relative z-10 p-6 md:p-12">
        
        {/* BOUTON RETOUR */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="mb-12"
        >
          <a href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white/40 backdrop-blur-md rounded-full border border-white/30 hover:bg-white/60 transition-all text-sm font-medium text-neutral-800 shadow-lg">
            <ArrowLeft size={16} /> Retour
          </a>
        </motion.div>

        {/* BENTO GRID LAYOUT */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-6 auto-rows-min gap-6"
        >

          {/* 1. INTRO (4 colonnes) */}
          <motion.div 
            variants={cardVariants}
            className="md:col-span-4 bg-white/40 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl relative overflow-hidden group"
          >
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/50 text-emerald-800 rounded-full text-xs font-bold tracking-wider uppercase mb-6 border border-white/20">
                <Compass size={14} /> À propos de moi
              </div>
              <h1 className="text-3xl md:text-5xl font-serif font-medium leading-tight mb-6 text-neutral-900">
                Curieux de nature,<br/>
                fasciné par <span className="italic text-blue-700">la découverte</span>.
              </h1>
              <p className="text-neutral-800 leading-relaxed max-w-lg text-lg font-medium">
                Mon monde ne se limite pas aux lignes de code. Je puise mon inspiration dehors, là où l'air est frais et le ciel dégagé. Toujours en quête de comprendre comment fonctionne le monde.
              </p>
            </div>
            {/* Décoration de fond (adaptée en sombre pour contraste sur fond clair) */}
            <Mountain className="absolute -bottom-4 -right-4 text-neutral-900/10 w-64 h-64 rotate-12 group-hover:scale-105 transition-transform duration-700" strokeWidth={1} />
          </motion.div>

          {/* 2. PHOTO (2 colonnes) */}
          <motion.div 
            variants={cardVariants}
            className="md:col-span-2 min-h-[250px] relative rounded-3xl overflow-hidden group shadow-2xl border border-white/20"
          >
            <img 
              src="/images/about/montagne.jpg"
              alt="Montagnes"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-100"
            />
            {/* Garder le texte en blanc ici car c'est sur une photo sombre */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-xs font-medium uppercase tracking-wider flex items-center gap-1 text-white/90 drop-shadow-md">
                <MapPin size={12} /> Pyrénées, France
              </p>
            </div>
          </motion.div>

          {/* 3. CENTRES D'INTÉRÊT (2 colonnes) */}
          <motion.div 
            variants={cardVariants}
            className="md:col-span-2 bg-white/40 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl flex flex-col justify-center"
          >
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-neutral-900">
              <Atom size={18} className="text-blue-600" /> Centres d'intérêt
            </h3>
            <div className="flex flex-col gap-2">
              <PassionItem icon={Telescope} label="Astronomie & Cosmologie" color="text-indigo-700" />
              <PassionItem icon={Leaf} label="Trekking & Nature" color="text-emerald-700" />
              <PassionItem icon={Atom} label="Arts visuels & Cinéma" color="text-blue-700" />
            </div>
          </motion.div>

          {/* 4. CITATION (2 colonnes) - Version Light Glass */}
          <motion.div 
            variants={cardVariants}
            className="md:col-span-2 bg-white/40 backdrop-blur-xl border border-white/20 p-8 rounded-3xl relative overflow-hidden flex flex-col justify-center text-center shadow-2xl"
          >
            <Quote className="absolute top-4 left-4 text-indigo-900/20 w-8 h-8" />
            <div className="relative z-10">
              <p className="font-serif text-xl text-indigo-950 italic leading-relaxed drop-shadow-sm">
                "Au-delà de l'océan spatial, les étoiles sont d'autres soleils."
              </p>
              <p className="text-xs font-bold text-indigo-700 uppercase tracking-widest mt-4">
                — Carl Sagan
              </p>
            </div>
            <motion.div 
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute bottom-2 right-6"
            >
              <Stars size={24} className="text-indigo-900/30" />
            </motion.div>
          </motion.div>

          {/* 5. WIDGET MÉTÉO (2 colonnes) */}
          <motion.div 
            variants={cardVariants}
            className="md:col-span-2 rounded-3xl shadow-2xl overflow-hidden border border-white/20"
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
          <p className="text-white/80 text-sm flex items-center justify-center gap-2 drop-shadow-md font-medium">
             Pas de code ici, juste de la curiosité <Stars size={12} className="text-yellow-200" />
          </p>
        </motion.footer>
      </div>

    </main>
  );
}