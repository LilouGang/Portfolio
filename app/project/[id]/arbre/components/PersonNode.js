import { Handle, Position } from 'reactflow';

// --- ICÔNES SVG ---
const MaleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const FemaleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M12 4a4 4 0 0 1 4 4c0 2.21-1.79 4-4 4a4 4 0 0 1-4-4c0-2.21 1.79-4 4-4m0-2C9.24 2 7 4.24 7 7c0 2.3 1.57 4.23 3.71 4.8C7.03 12.64 4 15.34 4 19v1h16v-1c0-3.66-3.03-6.36-6.71-7.2C15.43 11.23 17 9.3 17 7c0-2.76-2.24-5-5-5z" />
  </svg>
);

const UnknownIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

export default function PersonNode({ data }) {
  const { viewMode, firstname, lastname, birthDate, deathDate, isDimmed, job, category, sex, status } = data;

  // --- 1. CALCULS ROBUSTES ---
  const getYear = (dateStr) => {
    if (!dateStr) return null;
    const cleanStr = dateStr.toString().trim();
    if (cleanStr.match(/^\d{4}$/)) return parseInt(cleanStr);
    if (cleanStr.includes('/')) {
      const parts = cleanStr.split('/');
      const year = parseInt(parts[parts.length - 1]);
      return isNaN(year) ? null : year;
    }
    return null;
  };

  const bYear = getYear(birthDate);
  const dYear = getYear(deathDate);
  const currentYear = new Date().getFullYear();

  let calculatedAge = null;
  if (bYear) {
    if (dYear) {
      calculatedAge = dYear - bYear;
    } else if (status === 'alive') {
      calculatedAge = currentYear - bYear;
    }
  }

  // --- 2. GESTION DES MODES ---
  const isJobMode = viewMode === 'job';
  const isAgeMode = viewMode === 'age';
  const isLocationMode = viewMode === 'location'; 
  const isClassicMode = !isJobMode && !isAgeMode && !isLocationMode;

  // --- 3. COULEURS ADOUCIES (Grade 200 Fond / 400 Bordure) ---
  const getCardStyle = () => {
    // MODE NORMAL (Blanc)
    if (!isAgeMode) {
      if (isJobMode && category) {
        const jobColors = { 
          'agriculture': 'bg-green-100 border-green-500 text-green-950', 
          'artisanat': 'bg-orange-100 border-orange-500 text-orange-950', 
          'sante': 'bg-rose-100 border-rose-500 text-rose-950', 
          'tech': 'bg-indigo-100 border-indigo-500 text-indigo-950', 
          'droit': 'bg-blue-100 border-blue-600 text-blue-950', 
          'commerce': 'bg-yellow-100 border-yellow-500 text-yellow-950' 
        };
        return jobColors[category] || 'bg-white border-slate-300 text-slate-900';
      }
      return 'bg-white border-slate-300 text-slate-900';
    }

    // MODE AGE : Fond 200 (Visible) + Bordure 400 (Douce)
    
    // 1. Vivant (Bleu Ciel)
    if (status === 'alive') {
      return 'bg-sky-200 border-sky-400 text-sky-900';
    }

    // 2. Décédé
    if (calculatedAge !== null) {
      // < 40 : Rouge
      if (calculatedAge < 40) return 'bg-red-200 border-red-400 text-red-900';
      // 40-70 : Orange
      if (calculatedAge < 70) return 'bg-orange-200 border-orange-400 text-orange-900';
      // 70-90 : Teal (Bleu-Vert foncé)
      if (calculatedAge < 90) return 'bg-teal-200 border-teal-400 text-teal-900'; 
      // 90+ : Jaune/Ambre
      return 'bg-amber-200 border-amber-400 text-amber-900';
    }

    // Inconnu : Gris
    return 'bg-slate-200 border-slate-400 text-slate-700';
  };

  // --- 4. COULEURS LOGO ---
  const getLogoStyle = () => {
    if (sex === 'F') return 'bg-[#C27E8E] text-white'; 
    if (sex === 'M') return 'bg-[#5A7D9A] text-white'; 
    return 'bg-slate-500 text-white';
  };

  // --- 5. TEXTES ---
  const getClassicLabel = () => {
    if (bYear && dYear) return `${bYear} - ${dYear}`;
    if (!bYear && dYear) return `- ${dYear}`;
    if (status === 'alive') return sex === 'F' ? 'Vivante' : 'Vivant';
    if (status === 'deceased' && !dYear && !bYear) return sex === 'F' ? 'Décédée' : 'Décédé';
    if (bYear && status === 'deceased' && !dYear) return `${bYear} - ${sex === 'F' ? 'Décédée' : 'Décédé'}`;
    if (bYear) return `${bYear} - ?`;
    return "";
  };

  const getAgeLabel = () => {
    if (status === 'alive') return sex === 'F' ? 'VIVANTE' : 'VIVANT';
    if (calculatedAge !== null) return `${calculatedAge} ANS`;
    return "?";
  };

  return (
    <div 
      className={`
        w-[140px] h-[240px] 
        rounded-lg shadow-sm border-[2px] 
        flex flex-col items-center justify-between
        pt-6 pb-4 px-2
        transition-colors duration-300 ease-in-out
        ${getCardStyle()}
        ${isDimmed ? 'opacity-30 grayscale' : 'opacity-100 hover:shadow-md hover:scale-105'}
      `}
    >
      <Handle type="source" position={Position.Top} id="top" className="opacity-0" />
      <Handle type="target" position={Position.Bottom} id="bottom" className="opacity-0" />
      <Handle type="target" position={Position.Left} id="left" className="opacity-0" />
      <Handle type="source" position={Position.Right} id="right" className="opacity-0" />

      {/* LOGO */}
      <div className={`
        flex items-center justify-center w-16 h-16 rounded-full shadow-inner mb-2
        ${getLogoStyle()}
      `}>
        {sex === 'F' ? <FemaleIcon /> : (sex === 'M' ? <MaleIcon /> : <UnknownIcon />)}
      </div>

      {/* IDENTITÉ */}
      <div className="flex flex-col items-center justify-center text-center w-full flex-grow z-10">
        <span style={{ fontFamily: "'Nunito', sans-serif" }} className="italic font-light text-sm leading-tight mb-1 opacity-90">
          {firstname}
        </span>
        <span style={{ fontFamily: "'Nunito', sans-serif" }} className="uppercase font-extrabold text-sm tracking-wide leading-tight break-words w-full px-1">
          {lastname}
        </span>
      </div>

      {/* ZONE BASSE */}
      <div className={`w-full pt-3 mt-1 h-[24px] relative flex items-center justify-center overflow-hidden border-t border-black/10`}>
        
        {/* CLASSIQUE */}
        <span 
          className={`
            absolute text-[10px] font-bold tracking-widest
            transition-transform duration-300 ease-in-out
            ${isClassicMode ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
          `}
        >
          {getClassicLabel()}
        </span>

        {/* AGE (MODE 4) */}
        <span 
          className={`
            absolute text-[12px] font-black tracking-widest uppercase
            transition-transform duration-300 ease-in-out
            ${isAgeMode ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
          `}
        >
          {getAgeLabel()}
        </span>

        {/* MÉTIER */}
        <span 
          className={`
            absolute text-[10px] font-bold uppercase tracking-wide truncate w-full text-center
            transition-transform duration-300 ease-in-out
            ${isJobMode ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}
          `}
        >
          {job || "-"}
        </span>

      </div>
    </div>
  );
}