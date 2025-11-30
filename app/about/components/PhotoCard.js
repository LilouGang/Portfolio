"use client";
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function PhotoCard({ variants }) {
  return (
    <motion.div 
      variants={variants}
      className="md:col-span-2 min-h-[250px] relative rounded-3xl overflow-hidden group shadow-2xl border border-white/20"
    >
      <img 
        src="/images/about/montagne.jpg"
        alt="Montagne"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute bottom-4 left-4 text-white">
        <p className="text-xs font-medium uppercase tracking-wider flex items-center gap-1 text-white/90 drop-shadow-md">
          <MapPin size={12} /> Pyrénées, France
        </p>
      </div>
    </motion.div>
  );
}