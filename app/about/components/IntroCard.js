"use client";
import { motion } from 'framer-motion';
import { Compass, Mountain } from 'lucide-react';

export default function IntroCard({ variants }) {
  return (
    <motion.div 
      variants={variants}
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
        <p className="text-neutral-800 leading-relaxed max-w-lg text-lg font-light [font-family:'Lato',sans-serif]">
          Mon monde ne se limite pas aux lignes de code. Je puise mon inspiration dehors, là où l'air est frais et le ciel dégagé. Toujours en quête de comprendre comment fonctionne le monde.
        </p>
      </div>
      <Mountain className="absolute -bottom-4 -right-4 text-neutral-600/10 w-64 h-64 rotate-12 group-hover:scale-105 transition-transform duration-700" strokeWidth={1} />
    </motion.div>
  );
}