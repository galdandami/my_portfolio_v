import React, { useEffect } from 'react';
import { Achievement, Language } from '../types';
import { X, Calendar, ExternalLink, Sparkles, Tag } from 'lucide-react';

interface AchievementDetailModalProps {
  item: Achievement | null;
  lang: Language;
  onClose: () => void;
}

export const AchievementDetailModal: React.FC<AchievementDetailModalProps> = ({
  item,
  lang,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const title = item.title[lang] || item.title.ru || item.title.en;
  const shortDesc = item.shortDesc[lang] || item.shortDesc.ru || item.shortDesc.en;
  const fullDesc = item.fullDesc[lang] || item.fullDesc.ru || item.fullDesc.en;
  const category = item.category ? (item.category[lang] || item.category.ru) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-[#121316] border border-white/15 rounded-3xl overflow-hidden shadow-2xl my-8 transform transition-all scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-slate-300 hover:text-white hover:bg-black border border-white/10 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image */}
        <div className="relative aspect-[16/9] w-full bg-[#080809] overflow-hidden">
          <img
            src={item.image}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-transparent opacity-90" />

          {/* Badge overlays */}
          <div className="absolute bottom-4 left-6 right-6 flex items-center gap-3 flex-wrap">
            {category && (
              <span className="px-3.5 py-1 text-xs font-bold rounded-xl bg-[#00D2FF]/20 text-[#00D2FF] border border-[#00D2FF]/40 backdrop-blur-md flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,210,255,0.15)]">
                <Tag className="w-3 h-3" />
                {category}
              </span>
            )}
            {item.date && (
              <span className="px-3.5 py-1 text-xs font-mono font-medium rounded-xl bg-black/70 text-white/80 border border-white/15 backdrop-blur-md flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#00D2FF]" />
                {item.date}
              </span>
            )}
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-syne mb-2 tracking-tight">
              {title}
            </h2>
            <p className="text-sm font-semibold text-[#00D2FF] leading-relaxed">
              {shortDesc}
            </p>
          </div>

          <hr className="border-white/10" />

          {/* Full Description text block */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/50 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#00D2FF]" />
              {lang === 'ru' ? 'Подробное описание' : 'Full Description'}
            </h4>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal">
              {fullDesc}
            </p>
          </div>

          {/* External Link button if present */}
          {item.linkUrl && (
            <div className="pt-4 flex justify-end">
              <a
                href={item.linkUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#00D2FF] text-black font-extrabold text-xs hover:brightness-110 transition-all shadow-[0_0_20px_rgba(0,210,255,0.25)]"
              >
                <span>{lang === 'ru' ? 'ПЕРЕЙТИ К ПРОЕКТУ' : 'VISIT PROJECT'}</span>
                <ExternalLink className="w-4 h-4 stroke-[2.5]" />
              </a>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
