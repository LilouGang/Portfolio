"use client";

import React, { use } from 'react';
import Link from 'next/link';
import { galleryItems } from '@/lib/data';

// --- Le Catalogue des Mises en Page ---
import IcelandPage from './iceland/IcelandPage';
// import NovaPage from './nova/NovaPage'; // Prêt pour le futur

export default function ProjectPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { id } = params;
  const project = galleryItems.find((item) => item.id === parseInt(id));

  // Étape 1 : Vérifier si le projet existe dans les données
  if (!project) {
    return <ProjectNotFound />;
  }

  // --- Étape 2 : L'Aiguillage Intelligent ---
  switch (project.id) {
    case 2: // ID de l'Islande
      return <IcelandPage project={project} />;
    
    // case 1: // ID de Nova
    //   return <NovaPage project={project} />;

    // --- Étape 3 : Si aucune mise en page n'est trouvée ---
    default:
      return <ProjectPageNotAvailable project={project} />;
  }
}


// --- Composants d'aide pour les cas d'erreur ---
function ProjectNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white bg-black">
      <h1 className="text-4xl font-bold">Projet Introuvable</h1>
      <p className="mt-4 text-gray-400">Ce projet n'existe pas dans notre catalogue.</p>
      <Link href="/" className="mt-8 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
        Retour à la galerie
      </Link>
    </div>
  );
}

function ProjectPageNotAvailable({ project }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white bg-black">
      <h1 className="text-2xl font-bold text-center">Page en Construction</h1>
      <p className="mt-4 text-gray-400 text-center">
        La page de détail pour le projet "{project.title}" n'est pas encore disponible.
      </p>
      <Link href="/" className="mt-8 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
        Retour à la galerie
      </Link>
    </div>
  );
}