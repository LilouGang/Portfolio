import { Handle, Position } from 'reactflow';

export default function PersonNode({ data }) {
  const { viewMode, firstname, lastname, birthDate, deathDate, isDimmed, job, category, location, region } = data;

  const formatDates = () => {
    if (!birthDate && !deathDate) return ""; 
    if (!birthDate && deathDate) return `? — ${deathDate}`;
    if (birthDate && !deathDate) return `${birthDate}`;
    return `${birthDate} — ${deathDate}`;
  };

  const getAge = () => {
    if (!birthDate) return "?";
    const birthYear = parseInt(birthDate);
    const endYear = deathDate ? parseInt(deathDate) : new Date().getFullYear();
    const age = endYear - birthYear;
    return `${age} ans`;
  };

  const getDynamicStyle = () => {
    if (viewMode === 'classic') return 'bg-white border-slate-200';

    if (viewMode === 'job') {
      const colors = {
        'agriculture': 'border-green-500 bg-green-50',
        'artisanat': 'border-orange-500 bg-orange-50',
        'sante': 'border-rose-500 bg-rose-50',
        'tech': 'border-indigo-500 bg-indigo-50',
        'droit': 'border-blue-800 bg-blue-50',
        'commerce': 'border-yellow-500 bg-yellow-50',
      };
      return colors[category] || 'border-slate-300 bg-slate-50';
    }

    if (viewMode === 'location') {
      const colors = {
        'bretagne': 'border-teal-500 bg-teal-50',
        'idf': 'border-blue-500 bg-blue-50',
        'rhone': 'border-red-500 bg-red-50',
        'paca': 'border-yellow-500 bg-yellow-50',
        'nord': 'border-sky-500 bg-sky-50',
      };
      return colors[region] || 'border-slate-300 bg-slate-50';
    }

    if (viewMode === 'age') {
      if (!birthDate) return 'border-slate-200 bg-slate-50';
      const ageStr = getAge();
      const age = parseInt(ageStr);
      
      if (age < 40) return 'border-red-400 bg-red-50';
      if (age < 70) return 'border-orange-300 bg-orange-50';
      if (age < 90) return 'border-emerald-400 bg-emerald-50';
      return 'border-amber-400 bg-amber-50 shadow-amber-100';
    }
    
    return 'bg-white border-slate-200';
  };

  const getInfoContent = () => {
    if (viewMode === 'job') return job;
    if (viewMode === 'location') return location;
    if (viewMode === 'age') return getAge();
    return null;
  };

  return (
    <div 
      className={`
        rounded-xl border-2 min-w-[180px] shadow-lg text-center relative overflow-hidden
        transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) cursor-pointer
        ${getDynamicStyle()} 
        ${isDimmed 
            ? 'opacity-20 grayscale scale-95 pointer-events-none' 
            : 'opacity-100 scale-100 hover:scale-105 hover:shadow-xl'
        }
      `}
    >
      <Handle type="source" position={Position.Top} id="top" className="opacity-0" />
      <Handle type="target" position={Position.Bottom} id="bottom" className="opacity-0" />
      <Handle type="target" position={Position.Left} id="left" className="opacity-0" />
      <Handle type="source" position={Position.Right} id="right" className="opacity-0" />

      <div className="flex flex-col items-center p-4">
        <div className={`
          font-bold text-base tracking-tight transition-colors duration-500
          ${viewMode === 'classic' ? 'text-slate-800' : 'text-slate-900'}
        `}>
          {firstname} <span className="uppercase">{lastname}</span>
        </div>
        
        <span className="text-[11px] text-slate-500 font-medium mt-1">
          {formatDates()}
        </span>
        
        <div className={`
          w-full overflow-hidden transition-all duration-500 ease-in-out
          ${viewMode === 'classic' 
            ? 'max-h-0 opacity-0 border-none m-0 p-0' 
            : 'max-h-[50px] opacity-100 border-t border-black/10 pt-2 mt-2'
          }
        `}>
          <span className="text-[11px] uppercase font-black tracking-widest block opacity-80">
            {getInfoContent()}
          </span>
        </div>
      </div>
    </div>
  );
}