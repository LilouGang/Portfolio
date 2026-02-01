import { Handle, Position } from 'reactflow';

// --- ICÔNES SUR MESURE (Style Silhouette FamilySearch) ---

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
  const { viewMode, firstname, lastname, birthDate, deathDate, isDimmed, job, category, sex } = data;

  const formatDates = () => {
    if (!birthDate) return ""; 
    const bYear = birthDate.split('/').pop(); 
    const dYear = deathDate ? deathDate.split('/').pop() : '';
    if (!dYear) return `° ${bYear}`;
    return `${bYear} - ${dYear}`;
  };

  // --- COULEURS DOUCES (FAMILY SEARCH STYLE) ---
  const getGenderStyle = () => {
    // Homme : Bleu Ardoise doux / Femme : Vieux Rose doux
    if (sex === 'F') return 'bg-[#C27E8E] text-white'; 
    if (sex === 'M') return 'bg-[#5A7D9A] text-white'; 
    return 'bg-slate-400 text-white'; 
  };

  // On sélectionne la bonne icône
  const renderIcon = () => {
    if (sex === 'F') return <FemaleIcon />;
    if (sex === 'M') return <MaleIcon />;
    return <UnknownIcon />;
  };

  const getBorderStyle = () => {
    if (viewMode === 'job' && category) {
      const colors = { 'agriculture': 'border-green-500', 'artisanat': 'border-orange-500', 'sante': 'border-rose-500', 'tech': 'border-indigo-500', 'droit': 'border-blue-800', 'commerce': 'border-yellow-500' };
      return colors[category] || 'border-slate-200';
    }
    return 'border-slate-200';
  };

  return (
    <div 
      className={`
        w-[140px] h-[220px] 
        bg-white rounded-lg shadow-md border-2
        flex flex-col items-center justify-between
        pt-6 pb-4 px-2
        transition-all duration-300
        ${getBorderStyle()}
        ${isDimmed ? 'opacity-20 grayscale' : 'opacity-100 hover:shadow-xl hover:scale-105'}
      `}
    >
      <Handle type="source" position={Position.Top} id="top" className="opacity-0" />
      <Handle type="target" position={Position.Bottom} id="bottom" className="opacity-0" />
      <Handle type="target" position={Position.Left} id="left" className="opacity-0" />
      <Handle type="source" position={Position.Right} id="right" className="opacity-0" />

      {/* 1. GROS LOGO GENRE (Cercle plus grand) */}
      <div className={`
        flex items-center justify-center w-16 h-16 rounded-full shadow-inner mb-2
        ${getGenderStyle()}
      `}>
        {renderIcon()}
      </div>

      {/* 2. IDENTITÉ */}
      <div className="flex flex-col items-center justify-center text-center w-full flex-grow">
        <span className="text-slate-600 italic font-light text-sm leading-tight mb-1">
          {firstname}
        </span>
        <span className="text-slate-900 uppercase font-medium text-sm tracking-wide leading-tight break-words w-full px-1">
          {lastname}
        </span>
      </div>

      {/* 3. DATES */}
      <div className="w-full border-t border-slate-100 pt-3 mt-1 text-center">
        <span className="text-[11px] text-slate-500 font-medium tracking-widest block">
          {formatDates()}
        </span>
      </div>

      {viewMode === 'job' && job && (
        <div className="absolute -bottom-3 bg-white shadow-sm text-[9px] px-2 py-0.5 rounded-full border border-slate-200 text-slate-600 whitespace-nowrap z-10">
          {job}
        </div>
      )}
    </div>
  );
}