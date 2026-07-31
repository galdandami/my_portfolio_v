import React from 'react';
import { Language, AchievementType } from '../types';
import { AppWindow, Award, Sparkles } from 'lucide-react';

interface CategoryTabsProps {
  activeTab: AchievementType;
  onTabChange: (tab: AchievementType) => void;
  lang: Language;
  projectsCount: number;
  certificatesCount: number;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeTab,
  onTabChange,
  lang,
  projectsCount,
  certificatesCount,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div className="flex items-center justify-center">
        <div className="inline-flex p-1.5 rounded-3xl bg-[#121316] border border-white/10 shadow-2xl relative max-w-2xl w-full sm:w-auto">
          
          {/* Tab 1: Examples of work (sites and apps) */}
          <button
            onClick={() => onTabChange('project')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 relative z-10 ${
              activeTab === 'project'
                ? 'bg-gradient-to-r from-[#00D2FF] to-[#0080FF] text-black shadow-[0_0_25px_rgba(0,210,255,0.3)] font-extrabold scale-[1.02]'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <AppWindow className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 ${activeTab === 'project' ? 'text-black' : 'text-[#00D2FF]'}`} />
            <div className="flex flex-col items-start text-left">
              <span className="leading-tight">
                {lang === 'ru' ? 'Примеры работ' : 'Projects & Apps'}
              </span>
              <span className={`text-[10px] font-normal tracking-wide hidden sm:inline ${activeTab === 'project' ? 'text-black/70' : 'text-white/40'}`}>
                {lang === 'ru' ? 'Сайты и приложения' : 'Websites & Applications'}
              </span>
            </div>
            
            <span
              className={`ml-1 px-2 py-0.5 rounded-full text-[11px] font-mono font-bold transition-colors ${
                activeTab === 'project'
                  ? 'bg-black/20 text-black'
                  : 'bg-white/10 text-white/70'
              }`}
            >
              {projectsCount}
            </span>
          </button>

          {/* Tab 2: Diplomas, certificates, letters */}
          <button
            onClick={() => onTabChange('certificate')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 relative z-10 ${
              activeTab === 'certificate'
                ? 'bg-gradient-to-r from-[#00D2FF] to-[#0080FF] text-black shadow-[0_0_25px_rgba(0,210,255,0.3)] font-extrabold scale-[1.02]'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Award className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 ${activeTab === 'certificate' ? 'text-black' : 'text-[#00D2FF]'}`} />
            <div className="flex flex-col items-start text-left">
              <span className="leading-tight">
                {lang === 'ru' ? 'Дипломы и грамоты' : 'Diplomas & Certificates'}
              </span>
              <span className={`text-[10px] font-normal tracking-wide hidden sm:inline ${activeTab === 'certificate' ? 'text-black/70' : 'text-white/40'}`}>
                {lang === 'ru' ? 'Дипломы, грамоты, благодарности' : 'Awards & commendations'}
              </span>
            </div>

            <span
              className={`ml-1 px-2 py-0.5 rounded-full text-[11px] font-mono font-bold transition-colors ${
                activeTab === 'certificate'
                  ? 'bg-black/20 text-black'
                  : 'bg-white/10 text-white/70'
              }`}
            >
              {certificatesCount}
            </span>
          </button>

        </div>
      </div>
    </div>
  );
};
