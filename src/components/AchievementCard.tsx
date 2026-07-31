import React from 'react';
import { Achievement, Language, SortMode } from '../types';
import { Info, Edit3, Trash2, ArrowUp, ArrowDown, Calendar, ExternalLink, Sparkles } from 'lucide-react';

interface AchievementCardProps {
  item: Achievement;
  lang: Language;
  isAdmin: boolean;
  sortMode: SortMode;
  onOpenDetail: (item: Achievement) => void;
  onEdit: (item: Achievement) => void;
  onDelete: (id: string) => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  item,
  lang,
  isAdmin,
  sortMode,
  onOpenDetail,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}) => {
  const titleText = item.title[lang] || item.title.ru || item.title.en;
  const shortDescText = item.shortDesc[lang] || item.shortDesc.ru || item.shortDesc.en;
  const categoryText = item.category ? (item.category[lang] || item.category.ru) : null;

  return (
    <div className="group relative flex flex-col justify-between glass-card hover:border-[#00D2FF]/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,210,255,0.15)] overflow-hidden">
      
      {/* Admin Action Bar (Top Floating) */}
      {isAdmin && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 p-1 rounded-2xl bg-black/80 backdrop-blur-md border border-white/20 shadow-xl">
          {sortMode === 'custom' && (
            <>
              <button
                onClick={onMoveUp}
                disabled={isFirst}
                className={`p-1.5 rounded-xl text-xs transition-colors ${
                  isFirst
                    ? 'text-white/20 cursor-not-allowed'
                    : 'text-white/70 hover:text-[#00D2FF] hover:bg-white/10'
                }`}
                title={lang === 'ru' ? 'Переместить вверх' : 'Move Up'}
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onMoveDown}
                disabled={isLast}
                className={`p-1.5 rounded-xl text-xs transition-colors ${
                  isLast
                    ? 'text-white/20 cursor-not-allowed'
                    : 'text-white/70 hover:text-[#00D2FF] hover:bg-white/10'
                }`}
                title={lang === 'ru' ? 'Переместить вниз' : 'Move Down'}
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
              <div className="w-px h-4 bg-white/20 my-auto" />
            </>
          )}

          <button
            onClick={() => onEdit(item)}
            className="p-1.5 rounded-xl text-white/80 hover:text-amber-300 hover:bg-amber-500/20 transition-all"
            title={lang === 'ru' ? 'Редактировать' : 'Edit'}
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          
          <button
            onClick={() => onDelete(item.id)}
            className="p-1.5 rounded-xl text-white/80 hover:text-rose-400 hover:bg-rose-500/20 transition-all"
            title={lang === 'ru' ? 'Удалить' : 'Delete'}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Card Image Area */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40 group-hover:brightness-105 transition-all duration-300">
        <img
          src={item.image}
          alt={titleText}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200';
          }}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-transparent opacity-90" />

        {/* Category & Date badges */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2 z-10">
          {categoryText ? (
            <span className="px-3 py-1 text-[11px] font-bold rounded-xl bg-[#00D2FF]/15 text-[#00D2FF] border border-[#00D2FF]/30 backdrop-blur-md shadow-[0_0_10px_rgba(0,210,255,0.1)]">
              {categoryText}
            </span>
          ) : (
            <span className="px-3 py-1 text-[11px] font-bold rounded-xl bg-[#00D2FF]/10 text-[#00D2FF] border border-[#00D2FF]/20 backdrop-blur-md">
              {item.type === 'certificate' ? (lang === 'ru' ? 'ДИПЛОМ' : 'DIPLOMA') : (lang === 'ru' ? 'ПРОЕКТ' : 'PROJECT')}
            </span>
          )}

          {item.date && (
            <span className="flex items-center gap-1.5 text-[11px] font-mono text-white/70 bg-black/70 px-3 py-1 rounded-xl backdrop-blur-md border border-white/10">
              <Calendar className="w-3 h-3 text-[#00D2FF]" />
              {item.date}
            </span>
          )}
        </div>
      </div>

      {/* Card Body & Text */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-[#00D2FF] transition-colors line-clamp-2 font-syne mb-2 tracking-tight">
            {titleText}
          </h3>
          <p className="text-sm text-white/60 leading-relaxed line-clamp-3 mb-6 font-normal">
            {shortDescText}
          </p>
        </div>

        {/* Bottom Button Action */}
        <div className="pt-2 flex items-center justify-between border-t border-white/5 gap-2">
          <button
            onClick={() => onOpenDetail(item)}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-[#00D2FF] text-[#00D2FF] font-bold text-xs hover:bg-[#00D2FF] hover:text-black transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_12px_rgba(0,210,255,0.15)]"
          >
            <Info className="w-3.5 h-3.5" />
            <span>{lang === 'ru' ? 'ПОДРОБНЕЕ' : 'MORE INFO'}</span>
          </button>

          {item.linkUrl && (
            <a
              href={item.linkUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl text-white/60 hover:text-[#00D2FF] hover:bg-white/5 border border-transparent hover:border-[#00D2FF]/30 transition-all"
              title={lang === 'ru' ? 'Открыть проект' : 'Open project'}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

    </div>
  );
};
