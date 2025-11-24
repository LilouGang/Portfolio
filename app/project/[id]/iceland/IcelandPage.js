"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { 
  motion, 
  AnimatePresence,
  useScroll, 
  useTransform,
  useMotionValue,
  animate,
  useInView
} from 'framer-motion';
import Link from 'next/link';
import { icelandData } from '@/lib/icelandData';
import TrekMap from './components/TrekMap';

// ================================================================================= //
// SOUS-COMPOSANT : CURSEUR DE SOURIS (Inchangé)
// ================================================================================= //
function HomeCursor({ mousePosition, cursorVariant }) {
  const variants = {
    default: {
      width: 24, height: 24, border: '2px solid rgba(226, 232, 240, 0.5)',
      x: mousePosition.x - 12, y: mousePosition.y - 12,
    },
    text: {
      width: 80, height: 80, backgroundColor: '#e2e8f0', mixBlendMode: 'difference',
      x: mousePosition.x - 40, y: mousePosition.y - 40,
    },
    image: {
      width: 100, height: 100, border: '2px solid white', backgroundColor: 'rgba(255, 255, 255, 0.1)',
      x: mousePosition.x - 50, y: mousePosition.y - 50,
    }
  };
  
  return (
    <motion.div
      className="fixed top-0 left-0 z-50 rounded-full pointer-events-none"
      variants={variants}
      animate={cursorVariant}
      transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 0.1 }}
    />
  );
};

// ================================================================================= //
// SOUS-COMPOSANT : LIGHTBOX (Inchangé)
// ================================================================================= //
function Lightbox({ images, currentIndex, onClose }) { 
  const image = images[currentIndex];

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!image) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md" 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.0, ease: "easeInOut" }} 
      onClick={onClose} 
      style={{ WebkitBackdropFilter: 'blur(12px)' }} 
    >
      <div 
        className="relative z-10 max-w-full max-h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()} 
      >
        <motion.img
          src={image.src}
          alt={image.description}
          className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }}   
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{
            delay: 1.0, 
            duration: 1.0, 
            ease: "easeInOut" 
          }}
        />
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-4xl p-2 transition-colors"
          aria-label="Fermer la visionneuse"
          whileHover={{ scale: 1.1, rotate: 90 }} 
          whileTap={{ scale: 0.9 }}
        >
          &times;
        </motion.button>
      </div>
    </motion.div>
  );
}

// ================================================================================= //
// SOUS-COMPOSANT : HEADER (Inchangé)
// ================================================================================= //
function IcelandHeader() {
  const [isHovered, setIsHovered] = useState(false);
  const layoutSpring = { type: 'spring', stiffness: 300, damping: 20 };
  const textVariants = {
    hidden: { opacity: 0, x: -10, width: 0 },
    visible: { opacity: 1, x: 0, width: 'auto' }
  };

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed top-8 left-8 z-50 mix-blend-difference text-white"
    >
      <Link href="/" className="cursor-pointer" aria-label="Retour à l'accueil">
        <motion.div 
          layout
          className="flex items-center gap-0 text-white"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          transition={layoutSpring} 
        >
          <motion.div layout="position">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              className="m-2 box-content"
            >
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </motion.div>
          
          <AnimatePresence>
            {isHovered && (
              <motion.span
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={layoutSpring}
                className="font-semibold whitespace-nowrap overflow-hidden"
              >
                Retour
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </Link>
    </motion.header>
  );
}

// ================================================================================= //
// SOUS-COMPOSANT : STATS (Inchangé)
// ================================================================================= //
function AnimatedStat({ stat }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, latest => Math.round(latest));

  const runAnimation = () => {
    count.set(0);
    animate(count, stat.value, { 
      duration: 3, 
      ease: "easeInOut" 
    });
  };

  useEffect(() => {
    if (isInView) {
      runAnimation();
    }
  }, [isInView]);

  return (
    <motion.div 
      ref={ref}
      className="flex flex-col items-center justify-center text-center cursor-pointer"
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 300 }}
      onClick={runAnimation}
    >
      <div className="flex items-baseline space-x-2">
        <motion.div className="text-8xl md:text-9xl font-bold text-black">
          {rounded}
        </motion.div>
        <span className="text-2xl md:text-3xl font-light text-blue-500 -mb-4">{stat.unit}</span>
      </div>
      <span className="mt-4 text-gray-500 uppercase tracking-widest text-sm border-t border-gray-200 pt-4 w-3/4">
        {stat.label}
      </span>
    </motion.div>
  );
}

// ================================================================================= //
// SOUS-COMPOSANT : LECTEUR VIDÉO (SUPPRIMÉ)
// ================================================================================= //
// La fonction VideoPlayer a été supprimée.

// ================================================================================= //
// SOUS-COMPOSANT : APPEL À L'ACTION VIDÉO (NOUVEAU)
// ================================================================================= //
function VideoCta({ videoUrl }) {
  // Extrait l'ID de la vidéo pour l'aperçu
  const videoIdMatch = videoUrl.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})(?:\?|&|$)/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&rel=0` : null;

  return (
    <motion.div 
      className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
    >
      {/* Colonne de texte */}
      <div className="flex flex-col gap-6">
        <h2 className="text-3xl md:text-5xl [font-family:'Boldonse',serif] text-black">
          L'Aventure en mouvement
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Pour poursuivre l'aventure en vidéo, découvrez le film de l'expédition qui retrace ce voyage intense à travers les hautes terres d'Islande.
        </p>
        <motion.a 
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-fit bg-blue-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05, y: -2, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          Voir la vidéo sur YouTube
        </motion.a>
      </div>

      {/* Colonne de la vidéo (aperçu) */}
      {embedUrl && (
        <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl">
          <iframe
            src={embedUrl}
            title="Aperçu de la vidéo YouTube"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      )}
    </motion.div>
  );
}

// ================================================================================= //
// SOUS-COMPOSANT : FOOTER (Inchangé)
// ================================================================================= //
function IcelandFooter() {
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const linkVariants = {
    rest: { opacity: 0.7, x: 0, color: '#9ca3af' }, 
    hover: { opacity: 1, x: 5, color: '#FFFFFF' }   
  };
  const linkTransition = { type: 'spring', stiffness: 300, damping: 15 };

  return (
    <footer className="relative z-10 w-full p-8 md:p-8 bg-black text-gray-400"> 
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-middle gap-12">
          <h3 className="text-3xl [font-family:'Boldonse',serif] text-white">
            Là où finit la route commence l’aventure.
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-8 md:gap-8">
            <motion.a 
              href="https://instagram.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 font-medium"
              variants={linkVariants}
              initial="rest"
              whileHover="hover"
              transition={linkTransition}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069s-3.584-.011-4.85-.069c-3.225-.149-4.771-1.664-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664 4.771 4.919 4.919 1.266-.058 1.644.069 4.85.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.058 1.281-.072 1.689-.072 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" /></svg>
              <span>Instagram</span>
            </motion.a>
            
            <motion.a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 font-medium"
              variants={linkVariants}
              initial="rest"
              whileHover="hover"
              transition={linkTransition}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c.99-1.66 3.193-2.25 4.404-1.232 1.291 1.096 1.596 3.111 1.596 5.67v4.797z" /></svg>
              <span>LinkedIn</span>
            </motion.a>

            <motion.a 
              href="https://github.com/votre-utilisateur" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 font-medium"
              variants={linkVariants}
              initial="rest"
              whileHover="hover"
              transition={linkTransition}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.08-.737.08-.721.08-.721 1.192.083 1.819 1.294 1.819 1.294 1.065 1.817 2.801 1.299 3.464.993.108-.775.418-1.299.762-1.594-2.665-.3-5.466-1.332-5.466-5.93 0-1.312.465-2.387 1.223-3.221-.12-.3-.523-1.523.124-3.179 0 0 .999-.321 3.255 1.232.945-.262 1.946-.392 2.947-.393 1.001 0 2.002.13 2.947.393 2.256-1.553 3.255-1.232 3.255-1.232.647 1.656.245 2.879.124 3.179.758.834 1.223 1.909 1.223 3.221 0 4.609-2.806 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.607.801.571 4.771-1.587 8.2-6.085 8.2-11.386 0-6.627-5.373-12-12-12z"/></svg>
              <span>GitHub</span>
            </motion.a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 flex justify-between items-center text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} Killian Lacaque. Expédition Islande.
          </div>
          
          <motion.button
            onClick={scrollToTop}
            className="font-semibold uppercase tracking-wider"
            variants={linkVariants} 
            initial="rest"
            whileHover="hover"
            transition={linkTransition}
          >
            Remonter &uarr;
          </motion.button>
        </div>

      </div>
    </footer>
  );
}

// ================================================================================= //
// SOUS-COMPOSANT : PHOTOCARD (Inchangé)
// ================================================================================= //
function PhotoCard({ photo, index, onOpenLightbox }) { 
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
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}


// ================================================================================= //
// COMPOSANT PRINCIPAL DE LA PAGE (MODIFIÉ)
// ================================================================================= //
export default function IcelandPage({ project }) {
  const pageRef = useRef(null);
  const { scrollYProgress } = useScroll({ 
    target: pageRef,
    offset: ["start start", "end end"]
  });

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default'); 

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', mouseMove);
    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, []); 

  const openLightbox = useCallback((index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const heroImageY = useTransform(scrollYProgress, [0, 0.2], ["0%", "-20%"]);
  const heroTitleY = useTransform(scrollYProgress, [0, 0.2], ["0%", "-500%"]);
  const heroTitleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <main ref={pageRef} className="bg-white text-black min-h-screen overflow-x-hidden selection:bg-blue-500 selection:text-white">
      
      <HomeCursor mousePosition={mousePosition} cursorVariant={cursorVariant} />

      <IcelandHeader />

      {/* --- Section 1: HERO (Inchangé) --- */}
      <section className="relative h-screen w-full">
        <div className="sticky top-0 h-full w-full overflow-hidden">
          <motion.div 
            layoutId={`card-container-${project.id}`}
            className="absolute inset-0 w-full h-full"
            style={{ y: heroImageY }}
          >
            <img src={project.imageUrl} className="w-full h-full object-cover" alt={project.title} />
          </motion.div>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 3.0, ease: "easeInOut", delay: 0.5 }} 
              style={{ opacity: heroTitleOpacity, y: heroTitleY }}
              className="text-[15vw] font-black [font-family:'Boldonse',serif] tracking-tighter [line-height:1.4] text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-black/5"
            >
              ISLANDE
            </motion.h1>

          </div>
        </div>
      </section>

      {/* --- Section 2: STATS (Inchangé) --- */}
      <section className="relative py-32 px-6 bg-white z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          {icelandData.stats.map((stat, i) => (
            <AnimatedStat key={i} stat={stat} />
          ))}
        </div>
      </section>
      
      {/* --- Section 3: CARTE (Inchangé) --- */}
      <section className="h-auto w-full flex flex-col items-center justify-center bg-white py-20">
        <h2 className="text-3xl md:text-5xl [font-family:'Boldonse',serif] mb-12 text-center px-4">
          Expédition
        </h2>
        <div className="w-[90vw] h-auto aspect-[4/3] max-w-4xl">
          <TrekMap />
        </div>
      </section>

      {/* --- Section 4: GALERIE (Inchangé) --- */}
      <section className="relative bg-white py-20 px-8 z-10">
        <div className="max-w-7xl mx-auto mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl [font-family:'Boldonse',serif]"
          >
            Galerie
          </motion.h2>
        </div>
        
        <div className="max-w-7xl mx-auto columns-1 sm:columns-2 md:columns-3 gap-8 space-y-8">
          {icelandData.gallery.map((photo, i) => ( 
            <PhotoCard 
              key={i} 
              photo={photo} 
              index={i} 
              onOpenLightbox={openLightbox}
            />
          ))}

        </div>
      </section>

      {/* --- Section 5: VIDÉO (Maintenant le nouveau composant) --- */}
      <section className="relative bg-white py-20 px-8">
        <VideoCta videoUrl={icelandData.videoUrl} />
      </section>
      
      <IcelandFooter />

      {/* --- LIGHTBOX (Simplifiée) --- */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={icelandData.gallery}
            currentIndex={currentImageIndex}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>
    </main>
  );
}