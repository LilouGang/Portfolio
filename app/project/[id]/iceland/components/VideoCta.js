"use client";
import { motion } from 'framer-motion';

export default function VideoCta({ videoUrl }) {
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