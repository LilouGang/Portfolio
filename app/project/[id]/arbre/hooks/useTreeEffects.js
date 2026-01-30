export const useTreeEffects = (viewMode) => {
  const getNodeStyle = (data) => {
    const { job, location } = data;
    
    if (viewMode === 'job') {
      const colors = {
        'Développeur': 'border-blue-500 bg-blue-100/80 text-blue-900',
        'Forgeron': 'border-orange-500 bg-orange-100/80 text-orange-900',
        'Menuisier': 'border-amber-600 bg-amber-100/80 text-amber-900',
        'Couturière': 'border-purple-500 bg-purple-100/80 text-purple-900',
        'Infirmière': 'border-rose-500 bg-rose-100/80 text-rose-900'
      };
      return colors[job] || 'border-slate-300 bg-white';
    }

    if (viewMode === 'location') {
      const colors = {
        'Paris': 'border-indigo-600 bg-indigo-100/80 text-indigo-900',
        'Bretagne': 'border-emerald-600 bg-emerald-100/80 text-emerald-900',
        'Lyon': 'border-cyan-600 bg-cyan-100/80 text-cyan-900'
      };
      return colors[location] || 'border-slate-300 bg-white';
    }

    return 'border-slate-200 bg-white';
  };

  return { getNodeStyle };
};