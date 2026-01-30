"use client";
import { motion } from 'framer-motion';

export default function PhotoCard({ photo, onOpenLightbox }) { 
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.0, ease: "easeOut" }}
      className="relative cursor-pointer overflow-hidden bg-white group"
      onClick={onOpenLightbox}
    >
      <div className="relative w-full h-full overflow-hidden">
        <img 
          src={photo.src}
          alt={photo.description || ""}
          className="w-full h-auto block object-cover transition-transform duration-1000 group-hover:scale-105"
        />

        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white" />
          <div className="absolute inset-0 bg-black/10" />
        </div>
      </div>
    </motion.div>
  );
}