// components/pages/home/HomeIntro.js
"use client";

import { motion } from 'framer-motion';

const text = "Guidé par la curiosité, je transforme ce qui m'inspire en projets concrets. C'est ici que ma passion pour la découverte rencontre l'art de la création, du pixel à l'horizon.";

const containerVariant = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    }
  }
};

const wordVariant = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function HomeIntro() {
  return (
    // *** CHANGEMENT ICI : Ajout de pb-16 ***
    <section className="bg-gray-50 pt-20 md:pt-70 px-4 md:px-8 pb-60">
      <motion.p
        className="max-w-3xl mx-auto text-center text-xl md:text-2xl text-gray-700 leading-relaxed [font-family:'Lato',sans-serif]"
        variants={containerVariant}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
      >
        {text.split(' ').map((word, index) => (
          <span 
            key={index}
            className="inline-block"
            style={{ paddingRight: '0.2em' }}
          >
            <motion.span variants={wordVariant}>
              {word}
            </motion.span>
          </span>
        ))}
      </motion.p>
    </section>
  );
}