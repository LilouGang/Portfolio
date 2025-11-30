"use client";
import { motion } from 'framer-motion';
import { Stars } from 'lucide-react';

export default function AboutFooter() {
  return (
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
  );
}