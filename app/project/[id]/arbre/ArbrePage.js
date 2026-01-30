"use client";

import React from 'react';

export default function ArbrePage({ project }) {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold">{project.title}</h1>
        <p className="text-gray-400 mt-2">{project.description}</p>
      </header>
      
      <div className="tree-container">
        {/* Ici viendront tes composants d'arbre */}
        <p>Contenu de l'arbre généalogique à venir...</p>
      </div>
    </div>
  );
}