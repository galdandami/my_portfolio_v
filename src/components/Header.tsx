import React from 'react';
import { Language } from '../types';
import { Sparkles } from 'lucide-react';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  isAdmin?: boolean;
  onToggleAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onLanguageChange,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0B0B0C]/80 border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
        
        {/* Brand / Title Pill */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#00D2FF]/10 border border-[#00D2FF]/30 text-[#00D2FF] shadow-[0_0_15px_rgba(0,210,255,0.15)]">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1 sm:gap-1.5">
              <span className="font-syne font-bold text-base sm:text-lg text-white tracking-widest">
                PORT<span className="text-[#00D2FF]">FOLIO</span>
              </span>
              <span className="px-1.5 py-0.5 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider rounded-md bg-[#00D2FF]/10 text-[#00D2FF] border border-[#00D2FF]/20">
                {lang === 'ru' ? 'RU' : 'EN'}
              </span>
            </div>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          
          {/* Language Selector */}
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 text-xs font-semibold uppercase tracking-wider">
            <button
              onClick={() => onLanguageChange('ru')}
              className={`px-2.5 sm:px-3 py-1 rounded-lg transition-all duration-200 ${
                lang === 'ru'
                  ? 'bg-[#00D2FF] text-black font-bold shadow-md shadow-[#00D2FF]/20'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              RU
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 sm:px-3 py-1 rounded-lg transition-all duration-200 ${
                lang === 'en'
                  ? 'bg-[#00D2FF] text-black font-bold shadow-md shadow-[#00D2FF]/20'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

        </div>

      </div>
    </header>
  );
};
