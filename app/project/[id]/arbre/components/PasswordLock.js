// components/PasswordLock.js
"use client";
import React, { useState, useEffect } from 'react';

export default function PasswordLock({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // --- MOT DE PASSE À DÉFINIR ICI ---
  const SECRET_PASSWORD = "lilougang"; 

  useEffect(() => {
    const storedAuth = localStorage.getItem("tree_auth");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === SECRET_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("tree_auth", "true"); 
      setError(false);
    } else {
      setError(true);
      setPassword(""); 
    }
  };

  if (loading) return null;

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-9999 bg-[#fdfbf7] flex flex-col items-center justify-center p-6 text-slate-800">
      
      {/* Fond texture papier */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none mix-blend-multiply" 
           style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/natural-paper.png')` }}>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-700">
        
        {/* Titre (Sans uppercase) */}
        <h1 className="text-lg font-bold tracking-widest font-nunito text-slate-400">
          Accéder à l'arbre
        </h1>

        {/* Formulaire compact (w-56) */}
        <form onSubmit={handleSubmit} className="w-56 flex flex-col items-center gap-4">
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder="Mot de passe"
            className={`
              w-full bg-transparent border-b border-slate-300 py-2 text-center text-lg tracking-widest 
              text-slate-800 placeholder:text-slate-300 placeholder:text-sm placeholder:tracking-normal
              focus:outline-none focus:border-slate-800 transition-colors duration-300
              ${error ? 'border-red-400 text-red-500 placeholder:text-red-300' : ''}
            `}
          />
          
          {/* Bouton discret (Sans uppercase) */}
          <button 
            type="submit"
            className="mt-2 text-s font-bold tracking-widest text-slate-400 hover:text-slate-800 transition-colors duration-300"
          >
            Entrer
          </button>
        </form>

        {error && (
          <p className="text-red-400 text-[12px] font-medium animate-pulse tracking-wide">
            Mot de passe incorrect
          </p>
        )}
      </div>
    </div>
  );
}