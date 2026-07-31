import React, { useState, useEffect } from 'react';
import { Language, ProfileInfo } from '../types';
import { X, User, Save, Image as ImageIcon, Sparkles, MapPin, Upload } from 'lucide-react';

interface ProfileEditModalProps {
  profile: ProfileInfo;
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProfile: ProfileInfo) => void;
}

const SAMPLE_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
];

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  profile,
  lang,
  isOpen,
  onClose,
  onSave,
}) => {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [nameRu, setNameRu] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [nameFontEn, setNameFontEn] = useState('font-outfit');
  const [titleRu, setTitleRu] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [bioRu, setBioRu] = useState('');
  const [bioEn, setBioEn] = useState('');
  const [locationRu, setLocationRu] = useState('');
  const [locationEn, setLocationEn] = useState('');
  const [email, setEmail] = useState('');
  const [github, setGithub] = useState('');
  const [telegram, setTelegram] = useState('');

  useEffect(() => {
    if (profile) {
      setAvatarUrl(profile.avatarUrl || '');
      setNameRu(profile.name.ru || '');
      setNameEn(profile.name.en || '');
      setNameFontEn(profile.nameFontEn || 'font-outfit');
      setTitleRu(profile.title.ru || '');
      setTitleEn(profile.title.en || '');
      setBioRu(profile.bio.ru || '');
      setBioEn(profile.bio.en || '');
      setLocationRu(profile.location?.ru || '');
      setLocationEn(profile.location?.en || '');
      setEmail(profile.contactEmail || '');
      setGithub(profile.socials?.github || '');
      setTelegram(profile.socials?.telegram || '');
    }
  }, [profile, isOpen]);

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setAvatarUrl(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfileData = () => {
    const updated: ProfileInfo = {
      avatarUrl: avatarUrl.trim() || SAMPLE_AVATARS[0],
      name: {
        ru: nameRu.trim() || nameEn.trim(),
        en: nameEn.trim() || nameRu.trim(),
      },
      nameFontEn: nameFontEn,
      title: {
        ru: titleRu.trim() || titleEn.trim(),
        en: titleEn.trim() || titleRu.trim(),
      },
      bio: {
        ru: bioRu.trim() || bioEn.trim(),
        en: bioEn.trim() || bioRu.trim(),
      },
      location: {
        ru: locationRu.trim(),
        en: locationEn.trim(),
      },
      contactEmail: email.trim(),
      socials: {
        github: github.trim(),
        telegram: telegram.trim(),
      },
    };

    onSave(updated);
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
        saveProfileData();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isOpen,
    onClose,
    avatarUrl,
    nameRu,
    nameEn,
    nameFontEn,
    titleRu,
    titleEn,
    bioRu,
    bioEn,
    locationRu,
    locationEn,
    email,
    github,
    telegram,
  ]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveProfileData();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#121316] border border-white/20 rounded-3xl overflow-hidden shadow-2xl my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/60">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#00D2FF]" />
            <h2 className="text-xl font-bold text-white font-syne tracking-wide">
              {lang === 'ru' ? 'Редактировать профиль' : 'Edit Profile Information'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Avatar Section */}
          <div className="space-y-3 p-4 rounded-2xl bg-[#0B0B0C] border border-white/10">
            <label className="block text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              {lang === 'ru' ? 'Фото профиля' : 'Profile Avatar'}
            </label>
            
            <div className="flex items-center gap-4">
              <img
                src={avatarUrl || SAMPLE_AVATARS[0]}
                alt="Avatar preview"
                className="w-16 h-16 rounded-2xl object-cover border border-cyan-500/40 shrink-0"
              />
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                  <input
                    type="text"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
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
                      onChange={handleAvatarFileChange}
                    />
                  </label>
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] text-slate-500">
                    {lang === 'ru' ? 'Выбрать готовый аватар:' : 'Choose avatar:'}
                  </span>
                  {SAMPLE_AVATARS.map((url, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setAvatarUrl(url)}
                      className="w-7 h-7 rounded-lg overflow-hidden border border-white/20 hover:border-cyan-400 transition-all"
                    >
                      <img src={url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Name (RU / EN) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                ФИО / Имя (RU)
              </label>
              <input
                type="text"
                value={nameRu}
                onChange={(e) => setNameRu(e.target.value)}
                className="w-full px-4 py-2 bg-[#0B0B0C] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Full Name (EN)
              </label>
              <input
                type="text"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                className="w-full px-4 py-2 bg-[#0B0B0C] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* English Name Font Choice */}
          <div className="p-4 rounded-2xl bg-[#0B0B0C] border border-white/10 space-y-2">
            <label className="block text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              {lang === 'ru' ? 'Шрифт имени на английском' : 'English Name Font Style'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'font-outfit', label: 'Outfit', sample: 'Alexander Orlov' },
                { id: 'font-playfair', label: 'Playfair', sample: 'Alexander Orlov' },
                { id: 'font-cinzel', label: 'Cinzel', sample: 'Alexander Orlov' },
                { id: 'font-space-grotesk', label: 'Space Grotesk', sample: 'Alexander Orlov' },
                { id: 'font-unbounded', label: 'Unbounded', sample: 'Alexander Orlov' },
                { id: 'font-cormorant', label: 'Cormorant', sample: 'Alexander Orlov' },
                { id: 'font-syne', label: 'Syne', sample: 'Alexander Orlov' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setNameFontEn(f.id)}
                  className={`px-3 py-2.5 rounded-xl border text-left transition-all ${
                    nameFontEn === f.id
                      ? 'border-[#00D2FF] bg-[#00D2FF]/10 text-white shadow-[0_0_12px_rgba(0,210,255,0.2)]'
                      : 'border-white/10 bg-[#16181D] text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <div className="text-[10px] text-slate-400 font-sans uppercase tracking-wider">{f.label}</div>
                  <div className={`text-xs ${f.id} truncate font-bold text-white mt-0.5`}>
                    {nameEn || f.sample}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Title (RU / EN) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Профессия / Заголовок (RU)
              </label>
              <input
                type="text"
                value={titleRu}
                onChange={(e) => setTitleRu(e.target.value)}
                className="w-full px-4 py-2 bg-[#0B0B0C] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Title / Profession (EN)
              </label>
              <input
                type="text"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                className="w-full px-4 py-2 bg-[#0B0B0C] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Location / City (RU / EN) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#00D2FF]" />
                <span>Город / Локация (RU)</span>
              </label>
              <input
                type="text"
                value={locationRu}
                onChange={(e) => setLocationRu(e.target.value)}
                placeholder="Москва, Россия"
                className="w-full px-4 py-2 bg-[#0B0B0C] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00D2FF]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#00D2FF]" />
                <span>City / Location (EN)</span>
              </label>
              <input
                type="text"
                value={locationEn}
                onChange={(e) => setLocationEn(e.target.value)}
                placeholder="Moscow, Russia"
                className="w-full px-4 py-2 bg-[#0B0B0C] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00D2FF]"
              />
            </div>
          </div>

          {/* Bio (RU / EN) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                О себе (RU)
              </label>
              <textarea
                rows={3}
                value={bioRu}
                onChange={(e) => setBioRu(e.target.value)}
                className="w-full px-4 py-2 bg-[#0B0B0C] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                About Me (EN)
              </label>
              <textarea
                rows={3}
                value={bioEn}
                onChange={(e) => setBioEn(e.target.value)}
                className="w-full px-4 py-2 bg-[#0B0B0C] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Contacts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Contact Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-[#0B0B0C] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                GitHub URL
              </label>
              <input
                type="url"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                className="w-full px-4 py-2 bg-[#0B0B0C] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Telegram URL
              </label>
              <input
                type="url"
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
                className="w-full px-4 py-2 bg-[#0B0B0C] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Footer Actions */}
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
              <span>{lang === 'ru' ? 'СОХРАНИТЬ ИЗМЕНЕНИЯ' : 'SAVE PROFILE'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
