
import { Monitor } from 'lucide-react';
import type { ModuleData } from '@/types/courseTypes';

interface ModuleHeaderProps {
  data: ModuleData;
}

const ModuleHeader = ({ data }: ModuleHeaderProps) => {
  return (
    <header className="mb-12 md:mb-16 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">{data.title}</h1>
      <p className="text-md text-slate-700 mt-4 max-w-2xl mx-auto">{data.rationale}</p>
      <p className="text-sm text-slate-500 mt-2">Est. Time: {data.est_minutes} minutes</p>
      <p className="text-sm text-teal-600 font-medium mt-2 flex items-center justify-center gap-2">
        <Monitor className="w-4 h-4" />
        AI Companion: Active ✨
      </p>
    </header>
  );
};

export default ModuleHeader;
