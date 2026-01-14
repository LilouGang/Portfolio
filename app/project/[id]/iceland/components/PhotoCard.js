"use client";
import { motion } from 'framer-motion';
    
export default function PhotoCard({ photo, index, onOpenLightbox }) { 
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: (index % 3) * 0.1 }
    }
  };

  const cornerVariants = {
    hidden: { width: 0, height: 0, opacity: 0 },
    hover: { 
      width: '25px', 
      height: '25px', 
      opacity: 1,
      transition: { duration: 0.2, ease: "easeOut" } 
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.7, y: 10, rotate: 0 },
    hover: { 
      opacity: 1, 
      scale: 1.2, 
      y: 0,
      rotate: 90, 
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 10 
      } 
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="break-inside-avoid rounded-2xl overflow-hidden shadow-xl group relative cursor-pointer"
      onClick={() => onOpenLightbox(index)}
    >
      <motion.div
        className="relative w-full" 
        whileHover="hover" 
        initial="hidden" 
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        <motion.img 
          src={photo.src}
          alt={photo.description}
          className="w-full h-auto object-cover" 
          onError={(e) => { e.target.src = 'https://placehold.co/800x600/0a0a0a/FFF?text=IMAGE'; e.target.alt = "Image non trouvée"; }}
        />
        <motion.div className="absolute top-4 left-4 border-t-2 border-l-2 border-white/80" variants={cornerVariants} />
        <motion.div className="absolute top-4 right-4 border-t-2 border-r-2 border-white/80" variants={cornerVariants} />
        <motion.div className="absolute bottom-4 left-4 border-b-2 border-l-2 border-white/80" variants={cornerVariants} />
        <motion.div className="absolute bottom-4 right-4 border-b-2 border-r-2 border-white/80" variants={cornerVariants} />
        <motion.div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          variants={logoVariants}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-12 w-12 text-white/80" 
            viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="1" 
            strokeLinecap="round" strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}