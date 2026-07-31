import React from 'react';
import { Language, SortMode } from '../types';
import { Search, ArrowUpDown, PlusCircle, ArrowUpAZ, Calendar, GripVertical } from 'lucide-react';

interface SearchAndSortProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortMode: SortMode;
  onSortChange: (mode: SortMode) => void;
  lang: Language;
  isAdmin: boolean;
  onAddClick: () => void;
  totalCount: number;
}

export const SearchAndSort: React.FC<SearchAndSortProps> = ({
  searchQuery,
  onSearchChange,
  sortMode,
  onSortChange,
  lang,
  isAdmin,
  onAddClick,
  totalCount,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 glass-card shadow-2xl">
        
        {/* Left side: Search bar & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={
                lang === 'ru' ? 'Поиск достижений...' : 'Search achievements...'
              }
              className="w-full pl-11 pr-8 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort Selector Dropdown / Pills */}
          <div className="grid grid-cols-3 w-full sm:flex sm:w-auto p-1 bg-black/60 rounded-2xl border border-white/10 gap-1 sm:gap-1.5">
            
            {/* Sort: Title */}
            <button
              onClick={() => onSortChange('title')}
              className={`px-1.5 sm:px-3.5 py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 ${
                sortMode === 'title'
                  ? 'bg-[#00D2FF] text-black font-extrabold shadow-md shadow-[#00D2FF]/20'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <ArrowUpAZ className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">{lang === 'ru' ? 'По названию' : 'By Title'}</span>
              <span className="sm:hidden">{lang === 'ru' ? 'Название' : 'Title'}</span>
            </button>

            {/* Sort: Date */}
            <button
              onClick={() => onSortChange('date')}
              className={`px-1.5 sm:px-3.5 py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 ${
                sortMode === 'date'
                  ? 'bg-[#00D2FF] text-black font-extrabold shadow-md shadow-[#00D2FF]/20'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">{lang === 'ru' ? 'По дате' : 'By Date'}</span>
              <span className="sm:hidden">{lang === 'ru' ? 'Дата' : 'Date'}</span>
            </button>

            {/* Sort: Custom Order */}
            <button
              onClick={() => onSortChange('custom')}
              className={`px-1.5 sm:px-3.5 py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 ${
                sortMode === 'custom'
                  ? 'bg-[#00D2FF] text-black font-extrabold shadow-md shadow-[#00D2FF]/20'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <GripVertical className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">{lang === 'ru' ? 'Мой порядок' : 'Custom Order'}</span>
              <span className="sm:hidden">{lang === 'ru' ? 'Порядок' : 'Custom'}</span>
            </button>

          </div>

        </div>

        {/* Right side: Add Achievement Button */}
        {isAdmin && (
          <div className="flex items-center justify-end w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-white/5">
            <button
              onClick={onAddClick}
              className="bg-[#00D2FF] text-black text-xs font-extrabold px-6 py-3 rounded-2xl flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,210,255,0.25)] w-full sm:w-auto justify-center"
            >
              <PlusCircle className="w-4 h-4 stroke-[2.5]" />
              <span>
                {lang === 'ru' ? 'ДОБАВИТЬ ДОСТИЖЕНИЕ' : 'ADD ACHIEVEMENT'}
              </span>
            </button>
          </div>
        )}

      </div>

      {/* Admin hint if Custom Order active */}
      {isAdmin && sortMode === 'custom' && (
        <div className="mt-3 text-center text-xs text-amber-300/90 bg-amber-500/10 border border-amber-500/20 rounded-2xl py-2 px-4 max-w-md mx-auto font-medium">
          {lang === 'ru'
            ? '💡 В режиме "Мой порядок" используйте кнопки [▲ Вверх] / [▼ Вниз] на карточках для перемещения.'
            : '💡 In "Custom Order" mode, use [▲ Move Up] / [▼ Move Down] buttons on cards to reorder.'}
        </div>
      )}

    </div>
  );
};
