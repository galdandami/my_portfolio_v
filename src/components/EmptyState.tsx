import React from 'react';
import { AchievementType, Language } from '../types';
import { AppWindow, Award, PlusCircle, RefreshCw, SearchX, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  hasSearch: boolean;
  activeTab?: AchievementType;
  lang: Language;
  isAdmin: boolean;
  onClearSearch: () => void;
  onAddClick: () => void;
  onLoadSampleData: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  hasSearch,
  activeTab = 'project',
  lang,
  isAdmin,
  onClearSearch,
  onAddClick,
  onLoadSampleData,
}) => {
  return (
    <div className="max-w-2xl mx-auto my-12 p-8 sm:p-12 glass-card text-center shadow-2xl relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#00D2FF]/10 blur-[90px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-[#00D2FF]/10 border border-[#00D2FF]/30 flex items-center justify-center text-[#00D2FF] mb-6 shadow-[0_0_15px_rgba(0,210,255,0.15)]">
          {hasSearch ? (
            <SearchX className="w-8 h-8" />
          ) : activeTab === 'certificate' ? (
            <Award className="w-8 h-8" />
          ) : (
            <AppWindow className="w-8 h-8" />
          )}
        </div>

        {/* Heading */}
        <h3 className="text-2xl font-bold text-white font-syne mb-2 tracking-tight">
          {hasSearch
            ? lang === 'ru'
              ? 'Ничего не найдено'
              : 'No results found'
            : activeTab === 'certificate'
              ? lang === 'ru'
                ? 'Дипломов и грамот пока нет'
                : 'No diplomas or certificates yet'
              : lang === 'ru'
                ? 'Примеров работ пока нет'
                : 'No projects added yet'}
        </h3>

        {/* Subtitle */}
        <p className="text-white/60 text-sm max-w-md leading-relaxed mb-8 font-normal">
          {hasSearch
            ? lang === 'ru'
              ? 'Попробуйте изменить поисковый запрос или сбросить фильтрацию.'
              : 'Try adjusting your search query or reset filters.'
            : activeTab === 'certificate'
              ? lang === 'ru'
                ? 'Этот раздел пуст. Добавьте свои дипломы, грамоты и благодарственные письма или загрузите демо-данные.'
                : 'This section is empty. Add your diplomas, certificates, and letters of gratitude or load sample data.'
              : lang === 'ru'
                ? 'Список работ пуст. Добавьте свои сайты и приложения или загрузите демо-данные.'
                : 'Your work showcase is empty. Add your websites and applications or load sample data.'}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          {hasSearch ? (
            <button
              onClick={onClearSearch}
              className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/15"
            >
              {lang === 'ru' ? 'СБРОСИТЬ ПОИСК' : 'CLEAR SEARCH'}
            </button>
          ) : (
            <>
              {isAdmin && (
                <button
                  onClick={onAddClick}
                  className="px-6 py-3 rounded-2xl bg-[#00D2FF] text-black font-extrabold text-xs hover:brightness-110 transition-all shadow-[0_0_20px_rgba(0,210,255,0.25)] flex items-center gap-2"
                >
                  <PlusCircle className="w-4 h-4 stroke-[2.5]" />
                  <span>
                    {activeTab === 'certificate'
                      ? lang === 'ru' ? 'ДОБАВИТЬ ДИПЛОМ / ГРАМОТУ' : 'ADD DIPLOMA / CERTIFICATE'
                      : lang === 'ru' ? 'ДОБАВИТЬ ПРИМЕР РАБОТЫ' : 'ADD WORK EXAMPLE'}
                  </span>
                </button>
              )}

              <button
                onClick={onLoadSampleData}
                className="px-6 py-3 rounded-2xl border border-[#00D2FF] text-[#00D2FF] font-bold text-xs hover:bg-[#00D2FF] hover:text-black transition-all flex items-center gap-2 shadow-[0_0_12px_rgba(0,210,255,0.15)]"
              >
                <RefreshCw className="w-4 h-4" />
                <span>
                  {lang === 'ru'
                    ? 'ЗАГРУЗИТЬ ДЕМО-ДАННЫЕ'
                    : 'LOAD SAMPLE DATA'}
                </span>
              </button>
            </>
          )}
        </div>

      </div>

    </div>
  );
};
