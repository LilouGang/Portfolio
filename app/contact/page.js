"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Send, Check, Linkedin, Instagram, ArrowUpRight, Smile } from 'lucide-react';

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState('idle');

  // Fonction d'envoi via FormSubmit (AVEC TA CLÉ SÉCURISÉE)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const formData = new FormData(e.target);

    try {
      // J'ai remplacé ton email par le code sécurisé que tu as reçu
      const response = await fetch("https://formsubmit.co/ajax/a1f3094ee4b612d1bbd89bfce7ac9082", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        setFormStatus('success');
        e.target.reset(); // Vide le formulaire
        setTimeout(() => setFormStatus('idle'), 3000);
      } else {
        console.error("Erreur lors de l'envoi");
        setFormStatus('idle');
        alert("Une erreur est survenue. Merci de réessayer.");
      }
    } catch (error) {
      console.error(error);
      setFormStatus('idle');
      alert("Erreur de connexion.");
    }
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, scale: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2, type: "spring", stiffness: 100, damping: 20 } 
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0, rotate: 2 },
    visible: { y: 0, opacity: 1, rotate: 0, transition: { type: "spring", stiffness: 100 } 
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F5F7] text-neutral-900 flex items-center justify-center p-4 md:p-8 relative overflow-hidden font-sans">
      
      {/* === FOND TEXTURÉ ET ANIMÉ (Double Blob plus petits et visibles) === */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-30"></div>
        
        {/* BLOB 1 : BLEU (Plus petit, plus visible) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: [0.6, 0.8, 0.6, 0.9], // Opacité augmentée (plus visible)
            scale: [1, 1.4, 0.9, 1.2, 1],
            x: [0, 800, 200, 600, 0], 
            y: [0, 500, -100, 300, 0],
          }}
          transition={{ duration: 20, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
          // Taille réduite (h-300/500 au lieu de 600/800) et blur réduit (90 au lieu de 120)
          className="absolute top-[-10%] left-[-10%] h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full bg-blue-500/40 blur-[90px]" 
        />

         {/* BLOB 2 : VIOLET (Plus petit, plus visible) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
             opacity: [0.5, 0.7, 0.5, 0.8], // Opacité augmentée (plus visible)
             scale: [1, 1.3, 0.8, 1.1, 1],
             x: [0, -700, -200, -500, 0], 
             y: [0, -600, 100, -400, 0],
          }}
          transition={{ duration: 35, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
          // Taille réduite et blur réduit
          className="absolute bottom-[-10%] right-[-10%] h-[300px] w-[300px] md:h-[450px] md:w-[450px] rounded-full bg-purple-500/40 blur-[90px]" 
        />
      </div>
      {/* =========================================== */}


      {/* BOUTON RETOUR */}
      <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="absolute top-6 left-6 z-50">
        <Link href="/" className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-neutral-200 hover:shadow-md hover:-translate-y-0.5 transition-all group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-semibold">Retour</span>
        </Link>
      </motion.div>

      {/* CONTENEUR PRINCIPAL */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6 z-10">
        
        {/* GAUCHE */}
        <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-neutral-200/50 border border-white flex flex-col justify-between h-full min-h-[280px] relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200 rounded-full blur-[60px] opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
             <div>
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-bold uppercase tracking-wider mb-6">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>Disponible
               </div>
               <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">Hello<span className="text-blue-600">.</span></h1>
               <p className="text-neutral-500 text-lg leading-relaxed">Un problème ? Une question ? Remplissez le formulaire ou passez me voir sur les réseaux.</p>
             </div>
             <div className="mt-8 flex items-center gap-2 text-sm font-medium text-neutral-400">
               <Smile size={20} className="text-neutral-900" /><span>Réponse rapide assurée.</span>
             </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <a href="https://linkedin.com" target="_blank" className="bg-white px-6 py-5 rounded-[1.5rem] shadow-lg shadow-neutral-200/40 border border-white hover:border-blue-200 hover:shadow-blue-100 transition-all group cursor-pointer flex flex-col justify-between h-32">
               <div className="flex justify-between items-start"><Linkedin size={28} className="text-neutral-900 group-hover:text-blue-600 transition-colors" /><ArrowUpRight size={18} className="opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all text-neutral-400" /></div>
               <span className="font-bold text-sm mt-auto">LinkedIn</span>
            </a>
            <a href="https://instagram.com" target="_blank" className="bg-white px-6 py-5 rounded-[1.5rem] shadow-lg shadow-neutral-200/40 border border-white hover:border-pink-200 hover:shadow-pink-100 transition-all group cursor-pointer flex flex-col justify-between h-32">
               <div className="flex justify-between items-start"><Instagram size={28} className="text-neutral-900 group-hover:text-pink-600 transition-colors" /><ArrowUpRight size={18} className="opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all text-neutral-400" /></div>
               <span className="font-bold text-sm mt-auto">Instagram</span>
            </a>
          </div>
        </motion.div>

        {/* DROITE : FORMULAIRE */}
        <motion.div variants={itemVariants} className="lg:col-span-7 bg-white rounded-[2rem] p-8 md:p-12 shadow-xl shadow-neutral-200/50 border border-white relative">
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* CONFIGURATION DU MAIL */}
            <input type="hidden" name="_subject" value="Nouveau message Portfolio !" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 ml-1">Votre Nom</label>
                <input type="text" name="name" placeholder="Jean Dupont" required className="w-full bg-neutral-50 border-2 border-transparent focus:bg-white focus:border-blue-600/20 hover:bg-white hover:shadow-sm rounded-xl px-5 py-3 font-medium transition-all outline-none placeholder:text-neutral-300" />
              </div>
              <div className="group">
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 ml-1">Votre Email</label>
                <input type="email" name="email" placeholder="jeandupont@gmail.com" required className="w-full bg-neutral-50 border-2 border-transparent focus:bg-white focus:border-blue-600/20 hover:bg-white hover:shadow-sm rounded-xl px-5 py-3 font-medium transition-all outline-none placeholder:text-neutral-300" />
              </div>
            </div>

            <div className="group">
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 ml-1">Sujet</label>
              <input type="text" name="message_subject" placeholder="De quoi voulez-vous parler ?" required className="w-full bg-neutral-50 border-2 border-transparent focus:bg-white focus:border-blue-600/20 hover:bg-white hover:shadow-sm rounded-xl px-5 py-3 font-medium transition-all outline-none placeholder:text-neutral-300" />
            </div>

            <div className="group">
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 ml-1">Message</label>
              <textarea rows={4} name="message" placeholder="Dites-m'en plus..." required className="w-full bg-neutral-50 border-2 border-transparent focus:bg-white focus:border-blue-600/20 hover:bg-white hover:shadow-sm rounded-xl px-5 py-3 font-medium transition-all outline-none resize-none placeholder:text-neutral-300" />
            </div>

            <div className="pt-2">
              <button type="submit" disabled={formStatus !== 'idle'} className={`w-full py-4 rounded-xl font-bold text-base tracking-wide transition-all flex items-center justify-center gap-3 shadow-lg ${formStatus === 'success' ? 'bg-green-500 text-white shadow-green-200' : 'bg-neutral-900 text-white hover:bg-black hover:scale-[1.01] shadow-neutral-300'}`}>
                {formStatus === 'idle' && <>Envoyer le message <Send size={18} /></>}
                {formStatus === 'submitting' && <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                {formStatus === 'success' && <>Message Reçu ! <Check size={20} /></>}
              </button>
              <p className="text-center text-xs text-neutral-400 mt-4">Vos données restent confidentielles. Promis.</p>
            </div>

          </form>
        </motion.div>
      </motion.div>
    </main>
  );
}