// Fichier : components/pages/home/HomeFooter.js
"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function HomeFooter() {
  const currentYear = new Date().getFullYear();

  const iconVariants = {
    rest: { scale: 1, rotate: 0, color: 'rgb(156 163 175)' },
    hover: { scale: 1.2, rotate: -15, color: 'rgb(255 255 255)' }
  };

  const iconTransition = { type: 'spring', stiffness: 400, damping: 10 };

  return (
    <footer 
      className="relative z-10 w-full py-4 px-6 md:px-8 text-gray-400 bg-black"
    >
      <div className="flex justify-between items-center">
        <div className="text-xs md:text-sm">
          © {currentYear} Killian Lacaque. Tous droits réservés.
        </div>
        <div className="flex space-x-5">
          <motion.a
            href="https://instagram.com" target="_blank" rel="noopener noreferrer"
            variants={iconVariants} initial="rest" whileHover="hover" transition={iconTransition}
            aria-label="Instagram"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"> {/* J'ai aussi passé les icônes de w-6 à w-5 pour l'élégance */}
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069s-3.584-.011-4.85-.069c-3.225-.149-4.771-1.664-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664 4.771 4.919-4.919 1.266-.058 1.644.069 4.85.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.058 1.281-.072 1.689-.072 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" />
            </svg>
          </motion.a>
          <motion.a
            href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
            variants={iconVariants} initial="rest" whileHover="hover" transition={iconTransition}
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c.99-1.66 3.193-2.25 4.404-1.232 1.291 1.096 1.596 3.111 1.596 5.67v4.797z" />
            </svg>
          </motion.a>
        </div>
      </div>
    </footer>
  );
}