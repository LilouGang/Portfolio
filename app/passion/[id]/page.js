"use client";

import React, { use } from 'react';
import Link from 'next/link';
import { galleryItems } from '@/lib/data';
import IcelandPage from './iceland/IcelandPage';

export default function PassionPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { id } = params;
  const passion = galleryItems.find((item) => item.id === parseInt(id));

  if (!passion) {
    return <PassionNotFound />;
  }

  switch (passion.id) {
    case 1:
      return <IcelandPage passion={passion} />;
    default:
      return <PassionPageNotAvailable passion={passion} />;
  }
}

function PassionNotFound() {
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

function PassionPageNotAvailable({ passion }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white bg-black">
      <h1 className="text-2xl font-bold text-center">Page en Construction</h1>
      <p className="mt-4 text-gray-400 text-center">
        La page de détail pour le projet "{passion.title}" n'est pas encore disponible.
      </p>
      <Link href="/" className="mt-8 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
        Retour à la galerie
      </Link>
    </div>
  );
}