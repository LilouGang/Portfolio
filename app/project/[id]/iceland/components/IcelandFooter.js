// Fichier : app/project/[id]/iceland/components/IcelandFooter.js
"use client";
import { motion } from 'framer-motion';

export default function IcelandFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const linkVariants = {
    rest: { opacity: 0.7, x: 0, color: '#9ca3af' }, 
    hover: { opacity: 1, x: 5, color: '#FFFFFF' }   
  };
  const linkTransition = { type: 'spring', stiffness: 300, damping: 15 };

  return (
    <footer className="relative z-10 w-full p-8 md:p-8 bg-black text-gray-400"> 
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <h3 className="text-3xl [font-family:'Boldonse',serif] text-white text-center md:text-left">
            Là où finit la route commence l’aventure.
          </h3>
          <div className="flex flex-col sm:flex-row gap-8 md:gap-8">
            <motion.a 
              href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 font-medium"
              variants={linkVariants} initial="rest" whileHover="hover" transition={linkTransition}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                {/* --- PATH INSTAGRAM --- */}
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069s-3.584-.011-4.85-.069c-3.225-.149-4.771-1.664-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664 4.771 4.919-4.919 1.266-.058 1.644.069 4.85.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.058 1.281-.072 1.689-.072 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" />
              </svg>
              <span>Instagram</span>
            </motion.a>
            <motion.a 
              href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 font-medium"
              variants={linkVariants} initial="rest" whileHover="hover" transition={linkTransition}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                {/* --- PATH LINKEDIN --- */}
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c.99-1.66 3.193-2.25 4.404-1.232 1.291 1.096 1.596 3.111 1.596 5.67v4.797z" />
              </svg>
              <span>LinkedIn</span>
            </motion.a>
            <motion.a 
              href="https://github.com/votre-utilisateur" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 font-medium"
              variants={linkVariants} initial="rest" whileHover="hover" transition={linkTransition}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                {/* --- PATH GITHUB --- */}
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.08-.737.08-.721.08-.721 1.192.083 1.819 1.294 1.819 1.294 1.065 1.817 2.801 1.299 3.464.993.108-.775.418-1.299.762-1.594-2.665-.3-5.466-1.332-5.466-5.93 0-1.312.465-2.387 1.223-3.221-.12-.3-.523-1.523.124-3.179 0 0 .999-.321 3.255 1.232.945-.262 1.946-.392 2.947-.393 1.001 0 2.002.13 2.947.393 2.256-1.553 3.255-1.232 3.255-1.232.647 1.656.245 2.879.124 3.179.758.834 1.223 1.909 1.223 3.221 0 4.609-2.806 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.607.801.571 4.771-1.587 8.2-6.085 8.2-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </motion.a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 flex justify-between items-center text-xs text-gray-500">
          <div>© {new Date().getFullYear()} Killian Lacaque. Expédition Islande.</div>
          <motion.button
            onClick={scrollToTop}
            className="font-semibold uppercase tracking-wider"
            variants={linkVariants} initial="rest" whileHover="hover" transition={linkTransition}
          >
            Remonter &uarr;
          </motion.button>
        </div>
      </div>
    </footer>
  );
}