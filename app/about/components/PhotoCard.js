"use client";
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import Image from 'next/image';

export default function PhotoCard({ variants }) {
  return (
    <motion.div 
      variants={variants}
      className="md:col-span-2 min-h-[250px] relative rounded-3xl overflow-hidden group shadow-2xl border border-white/20"
    >
      <Image 
        src="/images/about/montagne1.jpg"
        alt="Montagne"
        fill
        className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-100"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute bottom-4 left-4 text-white">
        <p className="text-xs font-medium uppercase tracking-wider flex items-center gap-1 text-white/90 drop-shadow-md">
          <MapPin size={12} /> Pyrénées, France
        </p>
      </div>
    </motion.div>
  );
}