import { Handle, Position } from 'reactflow';
import { Ban, Star } from 'lucide-react';

// --- ICÔNES ---
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

const DeathIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-slate-400">
    <path d="M10 2h4v6h6v4h-6v10h-4v-10h-6v-4h6z" /> 
  </svg>
);

export default function PersonNode({ data }) {
  const { viewMode, firstname, lastname, birthDate, deathDate, isDimmed, job, sex, birthPlace, region } = data;

  // --- 1. LOGIQUE DATES & STATUT ---
  const formatDate = (dateString) => {
    if (!dateString) return null;
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
    if (!str) return null;
    const match = str.match(/\d{4}/);
    return match ? parseInt(match[0]) : null;
  };

  const isAlive = deathDate && deathDate.trim() === 'V'; 
  const hasDeathDate = deathDate && deathDate.trim() !== '' && deathDate.trim() !== 'V';

  const bYear = getYear(birthDate);
  const dYear = getYear(deathDate);
  const currentYear = new Date().getFullYear();
  
  let age = null;

  if (bYear !== null) {
    if (isAlive) {
      age = currentYear - bYear;
    } else if (dYear !== null) {
      age = dYear - bYear;
    }
  }

  const birthDisplay = formatDate(birthDate);
  const deathDisplay = hasDeathDate ? formatDate(deathDate) : null;

  // --- 2. INTELLIGENCE (Classification Auto) ---
  const detectJobCategory = (jobTitle) => {
    if (!jobTitle) return 'unknown';
    const j = jobTitle.toLowerCase();
    
    if (j.includes('cultivat') || j.includes('laboureur') || j.includes('proprio') || j.includes('bûcheron')) return 'agriculture';
    if (j.includes('ouvrier') || j.includes('tréfileur') || j.includes('mine') || j.includes('usine') || j.includes('atelier')) return 'industrie';
    if (j.includes('artisan') || j.includes('cordonnier') || j.includes('lingère') || j.includes('marchand') || j.includes('traiteur')) return 'artisanat';
    if (j.includes('chauffeur') || j.includes('transport')) return 'transport';
    if (j.includes('secrétaire') || j.includes('cadre') || j.includes('employé')) return 'services';
    if (j.includes('militaire') || j.includes('pénitentier') || j.includes('armée') || j.includes('gendarme')) return 'armee';
    if (j.includes('journalier') || j.includes('saisonnière') || j.includes('femme de chambre') || j.includes('domestique')) return 'journalier';
    if (j.includes('étudiant') || j.includes('élève')) return 'etudes';

    return 'unknown';
  };
  const jobCategory = detectJobCategory(job);

  const detectRegion = (place) => {
    if (!place) return 'unknown';
    const p = place.toLowerCase();

    if (p.includes('ruaux') || p.includes('nabord') || p.includes('amé') || p.includes('toul') || p.includes('troyes') || p.includes('nogent')) return 'grandest';
    if (p.includes('sormery') || p.includes('lasson') || p.includes('vergigny') || p.includes('turny') || p.includes('auxon') || p.includes('migennes') || p.includes('tonnerre') || p.includes('clérimois')) return 'bourgogne';
    if (p.includes('roide') || p.includes('audincourt') || p.includes('glaissans') || p.includes('undervilier')) return 'franchecomte';
    if (p.includes('denain') || p.includes('nord')) return 'nord';
    if (p.includes('paris') || p.includes('melun') || p.includes('evry')) return 'idf';
    if (p.includes('tajo') || p.includes('espagne')) return 'etranger';

    return 'autre';
  };
  const regionCategory = detectRegion(birthPlace);

  // --- 3. MODES & STYLES ---
  const isJobMode = viewMode === 'job';
  const isAgeMode = viewMode === 'age';
  const isLocationMode = viewMode === 'location';
  const isClassicMode = !isJobMode && !isAgeMode && !isLocationMode;

  const hasDataForMode = () => {
    if (isJobMode) return jobCategory !== 'unknown';
    if (isLocationMode) return regionCategory !== 'unknown';
    if (isAgeMode) return age !== null;
    return true; 
  };
  const isDimmedMode = !hasDataForMode();

  // --- 4. GESTION DE L'OPACITÉ ET DU FLOU ---
  const getOpacityClass = () => {
    // CAS 1 : Sélection d'une personne dans l'arbre (Priorité haute)
    if (isDimmed) return 'opacity-50 grayscale blur-[1px]'; 

    // CAS 2 : Mode Statistique (Priorité moyenne)
    if (isDimmedMode && !isClassicMode) return 'opacity-50 grayscale blur-[1px]';

    // CAS 3 : Normal
    return 'opacity-100 hover:shadow-xl hover:scale-105';
  };

  const getLocationStyle = () => {
    const map = {
      'grandest': 'bg-emerald-200 border-emerald-600 text-emerald-950',
      'bourgogne': 'bg-amber-200 border-amber-600 text-amber-950',
      'franchecomte': 'bg-violet-200 border-violet-600 text-violet-950',
      'nord': 'bg-cyan-200 border-cyan-600 text-cyan-950',
      'idf': 'bg-blue-200 border-blue-600 text-blue-950',
      'etranger': 'bg-fuchsia-200 border-fuchsia-600 text-fuchsia-950',
      'autre': 'bg-slate-100 border-slate-300 text-slate-500'
    };
    return map[regionCategory] || map['autre'];
  };

  const getJobStyle = () => {
    if (!job) return 'bg-slate-100 border-slate-300 text-slate-500';
    const map = {
      'agriculture': 'bg-lime-200 border-lime-600 text-lime-950',
      'industrie': 'bg-slate-300 border-slate-600 text-slate-900',
      'artisanat': 'bg-orange-200 border-orange-600 text-orange-950',
      'transport': 'bg-indigo-200 border-indigo-600 text-indigo-950',
      'services': 'bg-pink-200 border-pink-600 text-pink-950',
      'armee': 'bg-blue-200 border-blue-800 text-blue-950',
      'journalier': 'bg-stone-200 border-stone-500 text-stone-800',
      'etudes': 'bg-teal-200 border-teal-600 text-teal-950',
      'unknown': 'bg-slate-100 border-slate-300 text-slate-500'
    };
    return map[jobCategory] || map['unknown'];
  };

  const getCardStyle = () => {
    if (isClassicMode) return 'bg-white border-slate-300 text-slate-900';
    // Si la carte est estompée par le mode (pas de données), on met un fond neutre
    if (isDimmedMode) return 'bg-slate-50 border-slate-200 text-slate-400';

    if (isJobMode) return getJobStyle();
    if (isLocationMode) return getLocationStyle();
    
    if (isAgeMode) {
      if (isAlive) return 'bg-sky-200 border-sky-600 text-sky-950';
      if (age !== null) {
        if (age < 60) return 'bg-red-200 border-red-600 text-red-950';
        if (age < 80) return 'bg-orange-200 border-orange-600 text-orange-950';
        if (age < 90) return 'bg-teal-200 border-teal-600 text-teal-950'; 
        return 'bg-yellow-200 border-yellow-600 text-yellow-950'; 
      }
      return 'bg-slate-200 border-slate-500 text-slate-800';
    }

    return 'bg-white border-slate-300 text-slate-900';
  };

  const getLogoStyle = () => {
    // Si la carte est estompée (quelle que soit la raison), on grise le logo
    if (isDimmed || (isDimmedMode && !isClassicMode)) return 'bg-slate-200 text-white';
    
    if (sex === 'F') return 'bg-[#C27E8E] text-white'; 
    if (sex === 'M') return 'bg-[#5A7D9A] text-white'; 
    return 'bg-slate-500 text-white';
  };

  const getAgeLabel = () => {
    if (isAlive) return sex === 'F' ? 'Vivante' : 'Vivant';
    if (age !== null) return `${age} ans`;
    return sex === 'F' ? 'Décédée' : 'Décédé';
  };

  return (
    <div 
      className={`
        w-40 h-[230px] 
        rounded-lg shadow-sm border-2 
        flex flex-col items-center justify-between
        py-4 px-2
        transform transition-all duration-500 ease-in-out
        scale-100 origin-center will-change-transform
        ${getCardStyle()}
        ${getOpacityClass()}
      `}
    >
      <Handle type="source" position={Position.Top} id="top" className="opacity-0" />
      <Handle type="target" position={Position.Bottom} id="bottom" className="opacity-0" />
      <Handle type="target" position={Position.Left} id="left" className="opacity-0" />
      <Handle type="source" position={Position.Right} id="right" className="opacity-0" />

      {/* LOGO avec transition synchronisée */}
      <div className={`
          flex items-center justify-center w-16 h-16 rounded-full shadow-inner mb-1 
          transition-colors duration-500 ease-in-out 
          ${getLogoStyle()}
      `}>
        {sex === 'F' ? <FemaleIcon /> : (sex === 'M' ? <MaleIcon /> : <UnknownIcon />)}
      </div>

      {/* IDENTITÉ */}
      <div className="flex flex-col items-center justify-center text-center w-full grow z-10 -mt-1">
        <span className="italic font-light text-[15px] leading-tight mb-0.5 opacity-90 font-nunito">{firstname}</span>
        <span className="font-extrabold text-base tracking-wide leading-tight wrap-break-word w-full px-1 font-nunito">{lastname}</span>
      </div>

      {/* ZONE BASSE */}
      <div className={`w-full h-[45px] relative flex items-center justify-center overflow-hidden mt-1`}>
        
        {/* DATES CLASSIQUES */}
        <div className={`absolute w-full flex justify-center transition-transform duration-300 ease-in-out ${isClassicMode ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="flex flex-col items-center leading-tight w-full px-1 gap-0.5">
            <div className="flex items-center gap-1.5">
              <Star size={10} className="text-slate-400 fill-slate-400" />
              <span className="font-bold text-[12px] text-slate-700 whitespace-nowrap">{birthDisplay || "?"}</span>
            </div>
            {isAlive ? (
              <span className="text-[11px] font-bold text-sky-600 tracking-wide mt-0.5">{sex === 'F' ? 'Vivante' : 'Vivant'}</span>
            ) : (
              <div className="flex items-center gap-1.5">
                <DeathIcon />
                <span className="font-bold text-[12px] text-slate-700 whitespace-nowrap">
                  {hasDeathDate ? deathDisplay : (sex === 'F' ? 'Décédée' : 'Décédé')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* AGE */}
        <span className={`absolute text-[15px] font-bold tracking-wide transition-transform duration-300 ease-in-out ${isAgeMode ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          {getAgeLabel()}
        </span>

        {/* MÉTIER */}
        <span className={`absolute text-[13px] font-bold tracking-wide truncate w-full text-center flex items-center justify-center transition-transform duration-300 ease-in-out ${isJobMode ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'}`}>
          {job || <Ban className="w-5 h-5 text-slate-300" />}
        </span>

        {/* LIEU */}
        <span className={`absolute text-[13px] font-bold tracking-wide truncate w-full text-center flex items-center justify-center transition-transform duration-300 ease-in-out ${isLocationMode ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'}`}>
          {birthPlace || region || <Ban className="w-5 h-5 text-slate-300" />}
        </span>
      </div>
    </div>
  );
}