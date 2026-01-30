import { Handle, Position } from 'reactflow';
import { useTreeEffects } from '../hooks/useTreeEffects';

export default function PersonNode({ data }) {
  const { viewMode, name, birth, death, rotation, isRadial } = data;
  const { getNodeStyle } = useTreeEffects(viewMode);
  const styleClass = getNodeStyle(data);

  return (
    <div 
      style={{ 
        transform: isRadial ? `rotate(${rotation}deg)` : 'none',
        transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' 
      }}
      className={`p-4 rounded-xl border transition-all duration-500 min-w-[180px] shadow-lg
                  ${styleClass} ${viewMode === 'classic' ? 'bg-white border-slate-200' : ''}`}
    >
      {/* Les Handles doivent rester, mais avec la rotation ils seront sur les côtés de l'éventail */}
      <Handle type="target" position={Position.Top} id="top" className="opacity-0" />
      <Handle type="source" position={Position.Bottom} id="bottom" className="opacity-0" />
      
      <div className="flex flex-col items-center text-center">
        <span className="font-bold text-base tracking-tight italic">{name}</span>
        <span className="text-[10px] text-slate-500 font-medium">
          {birth} — {death || '∞'}
        </span>
      </div>

      <Handle type="source" position={Position.Right} id="right" className="opacity-0" />
      <Handle type="target" position={Position.Left} id="left" className="opacity-0" />
    </div>
  );
}