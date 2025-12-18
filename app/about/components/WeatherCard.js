"use client";

import React, { useState, useEffect } from 'react';
import { Loader2, MapPin, Droplets, Wind, Thermometer } from 'lucide-react';
import RainEffect from './weather-scenes/RainEffect';
import SnowEffect from './weather-scenes/SnowEffect';
import CloudsEffect from './weather-scenes/CloudsEffect';
import SunEffect from './weather-scenes/SunEffect';
import ThunderEffect from './weather-scenes/ThunderEffect';

export default function WeatherCard() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const getWeatherVisuals = (conditionId) => {
    const id = conditionId || 800;
    if (id >= 200 && id < 300) return { bg: "bg-gradient-to-br from-gray-900 via-slate-800 to-indigo-950", scene: <ThunderEffect />, textColor: "text-white" };
    if ((id >= 300 && id < 400) || (id >= 500 && id < 600)) return { bg: "bg-gradient-to-br from-slate-700 to-sky-900", scene: <RainEffect />, textColor: "text-blue-50" };
    if (id >= 600 && id < 700) return { bg: "bg-gradient-to-br from-blue-200 to-slate-200", scene: <SnowEffect />, textColor: "text-sky-800" };
    if (id >= 700 && id < 800) return { bg: "bg-gradient-to-br from-slate-200 to-slate-400", scene: <CloudsEffect isDark={true} />, textColor: "text-gray-700" };
    if (id === 800) return { bg: "bg-gradient-to-br from-blue-300 to-sky-400", scene: <SunEffect />, textColor: "text-white" };
    return { bg: "bg-gradient-to-br from-blue-400 to-sky-200", scene: <CloudsEffect />, textColor: "text-white" };
  };

  useEffect(() => {

    const setFallbackWeather = () => {
      setWeather({ 
        temp: 12, 
        city: 'Paris', 
        desc: 'Pluie modérée', 
        high: 14, 
        low: 10, 
        humidity: 82, 
        wind: 25, 
        id: 800, 
        isFallback: true 
      });
      setLoading(false); 
    };

    const fetchWeather = async (lat, lon) => {
      setLoading(true);
      try {
        const API_KEY = "2d60b7baaada43f03ef7517be63e4af6"; 

        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${API_KEY}`);
        
        if (!res.ok) {
          throw new Error("La requête vers l'API météo a échoué");
        }
        
        const data = await res.json();
        
        setWeather({
          temp: Math.round(data.main.temp),
          city: data.name,
          desc: data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1),
          high: Math.round(data.main.temp_max),
          low: Math.round(data.main.temp_min),
          humidity: data.main.humidity,
          wind: Math.round(data.wind.speed * 3.6),
          id: data.weather[0].id,
          isFallback: false
        });
        setLoading(false);

      } catch (err) {
        console.error("Erreur Météo:", err);
        setFallbackWeather();
      }
    };

    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        () => {
          console.warn("Géolocalisation refusée. Affichage du fallback.");
          setFallbackWeather();
        }
      );
    } else {
      console.warn("Géolocalisation non supportée. Affichage du fallback.");
      setFallbackWeather();
    }
  }, []);

  const visuals = getWeatherVisuals(weather?.id);

  const textShadowStyle = {
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2), 0 0 10px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div className={`h-full w-full relative overflow-hidden transition-all duration-1000 rounded-xl ${loading ? 'bg-slate-200' : visuals.bg}`}>
      
      <div className="absolute inset-0 z-0">
          {!loading && visuals.scene}
      </div>


      <div className={`relative z-10 h-full p-6 flex flex-col justify-between ${loading ? 'text-slate-400' : visuals.textColor}`}>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full gap-3">
             <Loader2 className="animate-spin text-slate-400" size={32} />
             <span className="text-sm font-medium">Analyse météo...</span>
          </div>
        ) : (
          <>
             <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0 pr-4">
                   <h3 className="text-2xl font-bold flex items-center gap-2" style={textShadowStyle}>
                     <span className="truncate">{weather.city}</span>
                     {weather.isFallback && <MapPin size={14} className="opacity-50 flex-shrink-0" />}
                   </h3>
                   <p className="text-base font-medium opacity-90 truncate" style={textShadowStyle}>{weather.desc}</p>
                </div>
                <div className="text-6xl font-thin tracking-tighter leading-none" style={textShadowStyle}>
                  {weather.temp}°
                </div>
             </div>

             <div className="grid grid-cols-3 gap-2 pt-4 mt-auto">
                
                <div className="flex flex-col col-span-1 items-start">
                   <span className="text-[10px] uppercase tracking-wider opacity-60 mb-1 flex items-center gap-1 font-medium" style={textShadowStyle}>
                      <Droplets size={12} /> Humidité
                   </span>
                   <span className="font-semibold text-base" style={textShadowStyle}>{weather.humidity}%</span>
                </div>

                <div className="flex flex-col col-span-1 items-center">
                   <span className="text-[10px] uppercase tracking-wider opacity-60 mb-1 flex items-center gap-1 font-medium" style={textShadowStyle}>
                      <Thermometer size={12} /> Temp.
                   </span>
                   <span className="font-semibold text-base flex gap-1 whitespace-nowrap" style={textShadowStyle}>
                      <span title="Max">Max. {weather.high}°</span> 
                      <span className="opacity-60">/</span> 
                      <span title="Min" className="opacity-90">Min. {weather.low}°</span>
                   </span>
                </div>

                <div className="flex flex-col col-span-1 items-end">
                   <span className="text-[10px] uppercase tracking-wider opacity-60 mb-1 flex items-center gap-1 font-medium" style={textShadowStyle}>
                      <Wind size={12} /> Vent
                   </span>
                   <span className="font-semibold text-base whitespace-nowrap" style={textShadowStyle}>
                     {weather.wind} <span className="text-xs font-normal opacity-90">km/h</span>
                   </span>
                </div>

             </div>
          </>
        )}
      </div>
    </div>
  );
}