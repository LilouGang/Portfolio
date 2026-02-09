import { Handle, Position } from 'reactflow';
import { Ban, Star } from 'lucide-react';

// --- ICÔNES (Sexe) ---
const MaleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const FemaleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9">
    <path d="M12 4a4 4 0 0 1 4 4c0 2.21-1.79 4-4 4a4 4 0 0 1-4-4c0-2.21 1.79-4 4-4m0-2C9.24 2 7 4.24 7 7c0 2.3 1.57 4.23 3.71 4.8C7.03 12.64 4 15.34 4 19v1h16v-1c0-3.66-3.03-6.36-6.71-7.2C15.43 11.23 17 9.3 17 7c0-2.76-2.24-5-5-5z" />
  </svg>
);

const UnknownIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

// --- ICÔNE DECES (Croix) ---
const DeathIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-slate-400">
    <path d="M10 2h4v6h6v4h-6v10h-4v-10h-6v-4h6z" /> 
  </svg>
);

export default function PersonNode({ data }) {
  const { viewMode, firstname, lastname, birthDate, deathDate, isDimmed, job, category, sex, birthPlace, region } = data;

  // --- 1. FONCTIONS DE DATE ---
  const formatDate = (dateString) => {
    if (!dateString) return "?";
    if (dateString.length === 4) return dateString;
    if (dateString.length === 7 && dateString.includes('-')) {
       const [y, m] = dateString.split('-');
       return `${m}/${y}`;
    }
    if (dateString.length >= 10 && dateString.includes('-')) {
       const cleanDate = dateString.substring(0, 10);
       const [y, m, d] = cleanDate.split('-');
       return `${d}/${m}/${y}`;
    }
    return dateString;
  };

  const getYear = (str) => {
    if (!str) return "?";
    const match = str.match(/^\d{4}/);
    return match ? match[0] : "?";
  };

  // --- 2. CALCULS ---
  const isAlive = !deathDate || deathDate.trim() === '';
  const birthDisplay = formatDate(birthDate);
  const deathDisplay = formatDate(deathDate);

  const currentYear = new Date().getFullYear();
  let age = null;
  const bYear = getYear(birthDate);
  const dYear = getYear(deathDate);
  const bYearInt = parseInt(bYear);
  const dYearInt = parseInt(dYear);

  if (!isNaN(bYearInt)) {
    if (!isNaN(dYearInt)) age = dYearInt - bYearInt;
    else if (isAlive) age = currentYear - bYearInt;
  }

  // --- 3. MODES ---
  const isJobMode = viewMode === 'job';
  const isAgeMode = viewMode === 'age';
  const isLocationMode = viewMode === 'location';
  const isClassicMode = !isJobMode && !isAgeMode && !isLocationMode;

  // --- 4. STYLES ---
  const normalizeText = (txt) => txt ? txt.toLowerCase() : "";
  const placeText = normalizeText(birthPlace) + " " + normalizeText(region);

  const getLocationStyle = () => {
    if (placeText.includes('bretagne')) return 'bg-teal-200 border-teal-600 text-teal-950';
    if (placeText.includes('île-de-france') || placeText.includes('paris')) return 'bg-blue-200 border-blue-600 text-blue-950';
    if (placeText.includes('rhône') || placeText.includes('lyon')) return 'bg-red-200 border-red-600 text-red-950';
    if (placeText.includes('paca') || placeText.includes('provence')) return 'bg-yellow-200 border-yellow-600 text-yellow-950';
    if (placeText.includes('nord')) return 'bg-sky-200 border-sky-600 text-sky-950';
    return 'bg-slate-200 border-slate-500 text-slate-800';
  };

  const getCardStyle = () => {
    if (!isAgeMode && !isLocationMode && !isJobMode) return 'bg-white border-slate-300 text-slate-900';
    if (isJobMode) {
      if (!job) return 'bg-slate-100 border-slate-300 text-slate-500';
      const jobColors = { 
        'agriculture': 'bg-green-200 border-green-600 text-green-950', 
        'artisanat': 'bg-orange-200 border-orange-600 text-orange-950', 
        'sante': 'bg-rose-200 border-rose-600 text-rose-950', 
        'tech': 'bg-indigo-200 border-indigo-600 text-indigo-950', 
        'droit': 'bg-blue-200 border-blue-800 text-blue-950', 
        'commerce': 'bg-yellow-200 border-yellow-600 text-yellow-950' 
      };
      return jobColors[category] || 'bg-white border-slate-300 text-slate-900';
    }
    if (isLocationMode) return getLocationStyle();
    if (isAlive) return 'bg-sky-200 border-sky-600 text-sky-950';
    if (age !== null) {
      if (age < 40) return 'bg-red-200 border-red-600 text-red-950';
      if (age < 70) return 'bg-orange-200 border-orange-600 text-orange-950';
      if (age < 90) return 'bg-teal-200 border-teal-600 text-teal-950'; 
      return 'bg-amber-200 border-amber-600 text-amber-950';
    }
    return 'bg-slate-200 border-slate-500 text-slate-800';
  };

  const getLogoStyle = () => {
    if (sex === 'F') return 'bg-[#C27E8E] text-white'; 
    if (sex === 'M') return 'bg-[#5A7D9A] text-white'; 
    return 'bg-slate-500 text-white';
  };

  // --- RENDU CONTENUS ---
  const renderClassicDates = () => (
    <div className="flex flex-col items-center leading-tight w-full px-1 gap-0.5">
      
      {/* Ligne Naissance : Étoile + Date */}
      <div className="flex items-center gap-1.5">
        <Star size={10} className="text-slate-400 fill-slate-400" />
        <span className="font-bold text-[12px] text-slate-700 whitespace-nowrap">
          {birthDisplay}
        </span>
      </div>
      
      {isAlive ? (
        // Vivant
        <span className="text-[11px] font-bold text-sky-600 tracking-wide mt-0.5">
          {sex === 'F' ? 'Vivante' : 'Vivant'}
        </span>
      ) : (
        // Ligne Décès : Croix + Date
        <div className="flex items-center gap-1.5">
          <DeathIcon />
          <span className="font-bold text-[12px] text-slate-700 whitespace-nowrap">
            {deathDisplay}
          </span>
        </div>
      )}
    </div>
  );

  const getAgeLabel = () => {
    if (isAlive) return sex === 'F' ? 'Vivante' : 'Vivant';
    if (age !== null) return `${age} ans`;
    return "?";
  };

  return (
    <div 
      className={`
        w-[160px] h-[230px] 
        rounded-lg shadow-sm border-[2px] 
        flex flex-col items-center justify-between
        py-4 px-2
        
        transform transition-all duration-500 ease-in-out
        scale-100 origin-center will-change-transform
        
        ${getCardStyle()}
        
        ${isDimmed ? 'opacity-30 grayscale blur-[1px]' : 'opacity-100 hover:shadow-xl hover:scale-105'}
      `}
    >
      <Handle type="source" position={Position.Top} id="top" className="opacity-0" />
      <Handle type="target" position={Position.Bottom} id="bottom" className="opacity-0" />
      <Handle type="target" position={Position.Left} id="left" className="opacity-0" />
      <Handle type="source" position={Position.Right} id="right" className="opacity-0" />

      {/* LOGO */}
      <div className={`
        flex items-center justify-center w-16 h-16 rounded-full shadow-inner mb-1
        ${getLogoStyle()}
      `}>
        {sex === 'F' ? <FemaleIcon /> : (sex === 'M' ? <MaleIcon /> : <UnknownIcon />)}
      </div>

      {/* IDENTITÉ */}
      <div className="flex flex-col items-center justify-center text-center w-full flex-grow z-10 -mt-1">
        <span className="italic font-light text-[15px] leading-tight mb-0.5 opacity-90 font-nunito">
          {firstname}
        </span>
        <span className="font-extrabold text-base tracking-wide leading-tight break-words w-full px-1 font-nunito">
          {lastname}
        </span>
      </div>

      {/* ZONE BASSE */}
      <div className={`w-full h-[45px] relative flex items-center justify-center overflow-hidden mt-1`}>
        
        <div className={`
            absolute w-full flex justify-center
            transition-transform duration-300 ease-in-out
            ${isClassicMode ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
          `}
        >
          {renderClassicDates()}
        </div>

        <span className={`
            absolute text-[15px] font-bold tracking-wide
            transition-transform duration-300 ease-in-out
            ${isAgeMode ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
          `}
        >
          {getAgeLabel()}
        </span>

        <span className={`
            absolute text-[15px] font-bold tracking-wide truncate w-full text-center flex items-center justify-center
            transition-transform duration-300 ease-in-out
            ${isJobMode ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'}
          `}
        >
          {job ? job : <Ban className="w-5 h-5 text-slate-400 opacity-50" />}
        </span>

        <span className={`
            absolute text-[15px] font-bold tracking-wide truncate w-full text-center flex items-center justify-center
            transition-transform duration-300 ease-in-out
            ${isLocationMode ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'}
          `}
        >
          {placeText ? (birthPlace || region) : "?"}
        </span>

      </div>
    </div>
  );
}