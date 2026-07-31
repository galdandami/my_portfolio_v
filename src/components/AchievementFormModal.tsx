import React, { useState, useEffect } from 'react';
import { Achievement, AchievementType, Language } from '../types';
import { X, Image as ImageIcon, Calendar, Link as LinkIcon, Plus, Save, Sparkles, AlertCircle, Upload, AppWindow, Award } from 'lucide-react';

interface AchievementFormModalProps {
  initialItem?: Achievement | null;
  defaultType?: AchievementType;
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  onSave: (achievement: Achievement) => void;
}

const SAMPLE_IMAGES = [
  { label: 'E-Commerce', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200' },
  { label: 'Dashboard', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200' },
  { label: 'Mobile App', url: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80&w=1200' },
  { label: 'Diploma', url: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=1200' },
  { label: 'Certificate', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200' },
];

export const AchievementFormModal: React.FC<AchievementFormModalProps> = ({
  initialItem,
  defaultType = 'project',
  lang,
  isOpen,
  onClose,
  onSave,
}) => {
  const [type, setType] = useState<AchievementType>(defaultType);
  const [imageUrl, setImageUrl] = useState('');
  const [date, setDate] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  
  const [titleRu, setTitleRu] = useState('');
  const [titleEn, setTitleEn] = useState('');
  
  const [shortRu, setShortRu] = useState('');
  const [shortEn, setShortEn] = useState('');
  
  const [fullRu, setFullRu] = useState('');
  const [fullEn, setFullEn] = useState('');

  const [categoryRu, setCategoryRu] = useState('');
  const [categoryEn, setCategoryEn] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialItem) {
      setType(initialItem.type || 'project');
      setImageUrl(initialItem.image || '');
      setDate(initialItem.date || new Date().toISOString().split('T')[0]);
      setLinkUrl(initialItem.linkUrl || '');
      setTitleRu(initialItem.title.ru || '');
      setTitleEn(initialItem.title.en || '');
      setShortRu(initialItem.shortDesc.ru || '');
      setShortEn(initialItem.shortDesc.en || '');
      setFullRu(initialItem.fullDesc.ru || '');
      setFullEn(initialItem.fullDesc.en || '');
      setCategoryRu(initialItem.category?.ru || '');
      setCategoryEn(initialItem.category?.en || '');
    } else {
      // Defaults for new item
      setType(defaultType);
      setImageUrl(defaultType === 'certificate' ? SAMPLE_IMAGES[3].url : SAMPLE_IMAGES[0].url);
      setDate(new Date().toISOString().split('T')[0]);
      setLinkUrl('');
      setTitleRu('');
      setTitleEn('');
      setShortRu('');
      setShortEn('');
      setFullRu('');
      setFullEn('');
      setCategoryRu('');
      setCategoryEn('');
    }
    setErrorMsg('');
  }, [initialItem, defaultType, isOpen]);

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setImageUrl(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const saveAchievementData = () => {
    if (!titleRu.trim() && !titleEn.trim()) {
      setErrorMsg(
        lang === 'ru'
          ? 'Пожалуйста, заполните название хотя бы на одном языке.'
          : 'Please enter a title in at least one language.'
      );
      return;
    }

    const newAchievement: Achievement = {
      id: initialItem ? initialItem.id : `ach-${Date.now()}`,
      type: type,
      image: imageUrl.trim() || SAMPLE_IMAGES[0].url,
      date: date || new Date().toISOString().split('T')[0],
      order: initialItem ? initialItem.order : 0,
      linkUrl: linkUrl.trim() || undefined,
      title: {
        ru: titleRu.trim() || titleEn.trim(),
        en: titleEn.trim() || titleRu.trim(),
      },
      shortDesc: {
        ru: shortRu.trim() || shortEn.trim(),
        en: shortEn.trim() || shortRu.trim(),
      },
      fullDesc: {
        ru: fullRu.trim() || fullEn.trim(),
        en: fullEn.trim() || fullRu.trim(),
      },
      category: (categoryRu || categoryEn) ? {
        ru: categoryRu.trim() || categoryEn.trim(),
        en: categoryEn.trim() || categoryRu.trim(),
      } : undefined,
    };

    onSave(newAchievement);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'Enter') {
        const target = e.target as HTMLElement;
        if (target && target.tagName === 'TEXTAREA') {
          return;
        }
        e.preventDefault();
        saveAchievementData();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isOpen,
    onClose,
    titleRu,
    titleEn,
    shortRu,
    shortEn,
    fullRu,
    fullEn,
    categoryRu,
    categoryEn,
    imageUrl,
    date,
    linkUrl,
    initialItem,
    lang,
  ]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveAchievementData();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#121316] border border-white/20 rounded-3xl overflow-hidden shadow-2xl my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/60">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#00D2FF]" />
            <h2 className="text-xl font-bold text-white font-syne tracking-wide">
              {initialItem
                ? lang === 'ru'
                  ? 'Редактировать достижение'
                  : 'Edit Achievement'
                : lang === 'ru'
                  ? 'Добавить новое достижение'
                  : 'Add New Achievement'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {errorMsg && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Type Selector (Tab 1: Projects vs Tab 2: Diplomas) */}
          <div className="p-4 rounded-2xl bg-[#0B0B0C] border border-white/10 space-y-2">
            <label className="block text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
              {lang === 'ru' ? 'Раздел (Вкладка портфолио):' : 'Portfolio Section:'}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType('project')}
                className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                  type === 'project'
                    ? 'bg-[#00D2FF]/15 border-[#00D2FF] text-[#00D2FF] font-bold shadow-[0_0_15px_rgba(0,210,255,0.15)]'
                    : 'bg-[#16181D] border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <AppWindow className="w-4 h-4 shrink-0" />
                <div className="text-left text-xs">
                  <div className="font-semibold">{lang === 'ru' ? 'Пример работы' : 'Example of Work'}</div>
                  <div className="text-[10px] opacity-70">{lang === 'ru' ? 'Сайт или приложение' : 'Website or App'}</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setType('certificate')}
                className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                  type === 'certificate'
                    ? 'bg-[#00D2FF]/15 border-[#00D2FF] text-[#00D2FF] font-bold shadow-[0_0_15px_rgba(0,210,255,0.15)]'
                    : 'bg-[#16181D] border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <Award className="w-4 h-4 shrink-0" />
                <div className="text-left text-xs">
                  <div className="font-semibold">{lang === 'ru' ? 'Диплом / Грамота' : 'Diploma / Certificate'}</div>
                  <div className="text-[10px] opacity-70">{lang === 'ru' ? 'Грамота, диплом, благодарность' : 'Awards & honors'}</div>
                </div>
              </button>
            </div>
          </div>

          {/* Media & Meta section */}
          <div className="space-y-4 p-4 rounded-2xl bg-[#0B0B0C] border border-white/10">
            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              {lang === 'ru' ? 'Медиа и Метаданные' : 'Media & Meta'}
            </h3>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {lang === 'ru' ? 'Изображение (URL или файл):' : 'Image (URL or File):'}
              </label>
              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder={lang === 'ru' ? 'Вставьте URL или загрузите файл' : 'Paste URL or upload file'}
                  className="flex-1 min-w-0 px-4 py-2 bg-[#16181D] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
                <label className="cursor-pointer px-3.5 py-2 rounded-xl bg-[#00D2FF]/15 hover:bg-[#00D2FF]/25 text-[#00D2FF] border border-[#00D2FF]/30 text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{lang === 'ru' ? 'Загрузить файл' : 'Upload File'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageFileChange}
                  />
                </label>
              </div>
              
              {/* Sample preset links */}
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                <span className="text-[11px] text-slate-500">
                  {lang === 'ru' ? 'Готовые пресеты:' : 'Presets:'}
                </span>
                {SAMPLE_IMAGES.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setImageUrl(img.url)}
                    className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 transition-all"
                  >
                    {img.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Image Preview */}
            {imageUrl && (
              <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-black">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200';
                  }}
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {lang === 'ru' ? 'Дата добавления:' : 'Date:'}
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2 bg-[#16181D] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {lang === 'ru' ? 'Ссылка на проект / демо (необязательно):' : 'Project Link (optional):'}
                </label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-4 py-2 bg-[#16181D] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Bilingual Content section */}
          <div className="space-y-6">
            
            {/* Title (RU / EN) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-cyan-400 mb-1">
                  Название (RU) *
                </label>
                <input
                  type="text"
                  value={titleRu}
                  onChange={(e) => setTitleRu(e.target.value)}
                  placeholder="Например: Платформа NexStore"
                  className="w-full px-4 py-2.5 bg-[#0B0B0C] border border-white/10 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-cyan-400 mb-1">
                  Title (EN) *
                </label>
                <input
                  type="text"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  placeholder="e.g. NexStore Platform"
                  className="w-full px-4 py-2.5 bg-[#0B0B0C] border border-white/10 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Short Description (RU / EN) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Краткое описание (RU)
                </label>
                <textarea
                  rows={2}
                  value={shortRu}
                  onChange={(e) => setShortRu(e.target.value)}
                  placeholder="Краткое резюме карточки..."
                  className="w-full px-4 py-2 bg-[#0B0B0C] border border-white/10 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Short Description (EN)
                </label>
                <textarea
                  rows={2}
                  value={shortEn}
                  onChange={(e) => setShortEn(e.target.value)}
                  placeholder="Short card summary..."
                  className="w-full px-4 py-2 bg-[#0B0B0C] border border-white/10 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Full Description (RU / EN) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Подробное описание (RU)
                </label>
                <textarea
                  rows={4}
                  value={fullRu}
                  onChange={(e) => setFullRu(e.target.value)}
                  placeholder="Полное описание для модального окна..."
                  className="w-full px-4 py-2 bg-[#0B0B0C] border border-white/10 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Description (EN)
                </label>
                <textarea
                  rows={4}
                  value={fullEn}
                  onChange={(e) => setFullEn(e.target.value)}
                  placeholder="Detailed description for modal view..."
                  className="w-full px-4 py-2 bg-[#0B0B0C] border border-white/10 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Category Tag (RU / EN) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Категория / Тэг (RU)
                </label>
                <input
                  type="text"
                  value={categoryRu}
                  onChange={(e) => setCategoryRu(e.target.value)}
                  placeholder="Веб-сервис, Финтех..."
                  className="w-full px-4 py-2 bg-[#0B0B0C] border border-white/10 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Category / Tag (EN)
                </label>
                <input
                  type="text"
                  value={categoryEn}
                  onChange={(e) => setCategoryEn(e.target.value)}
                  placeholder="Web App, Fintech..."
                  className="w-full px-4 py-2 bg-[#0B0B0C] border border-white/10 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-2xl border border-white/15 text-xs font-semibold text-white/70 hover:text-white hover:bg-white/5 transition-all"
            >
              {lang === 'ru' ? 'Отмена' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-[#00D2FF] text-black font-extrabold text-xs hover:brightness-110 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,210,255,0.25)]"
            >
              <Save className="w-4 h-4 stroke-[2.5]" />
              <span>{lang === 'ru' ? 'СОХРАНИТЬ' : 'SAVE ACHIEVEMENT'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
