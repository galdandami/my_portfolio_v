import React from 'react';
import { Language, ProfileInfo } from '../types';
import { Edit2, Mail, Github, Linkedin, Send, MapPin } from 'lucide-react';

interface ProfileSectionProps {
  profile: ProfileInfo;
  lang: Language;
  isAdmin: boolean;
  onEditProfile: () => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  profile,
  lang,
  isAdmin,
  onEditProfile,
}) => {
  const fontClassEn = profile.nameFontEn || 'font-outfit';

  const renderName = () => {
    const rawName = profile.name[lang] || '';
    if (!rawName) return lang === 'ru' ? 'Имя не указано' : 'Name not set';

    if (lang === 'en') {
      return <span className={`text-white font-extrabold tracking-tight ${fontClassEn}`}>{rawName}</span>;
    }

    return rawName;
  };

  return (
    <section className="relative pt-10 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
      
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00D2FF]/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* Admin quick edit badge */}
      {isAdmin && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-6 animate-pulse">
          <Edit2 className="w-3.5 h-3.5" />
          <span>
            {lang === 'ru'
              ? 'Режим редактирования: кликните иконку карандаша для настройки профиля'
              : 'Admin mode active: click edit icon to modify profile'}
          </span>
        </div>
      )}



      {/* Avatar Container with neon-border */}
      <div className="relative inline-block mb-6 group">
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-[2rem] overflow-hidden p-1 neon-border transition-transform duration-500 group-hover:scale-105 bg-[#0B0B0C]">
          <img
            src={profile.avatarUrl}
            alt={profile.name[lang]}
            className="w-full h-full object-cover rounded-[1.75rem]"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600';
            }}
          />
        </div>

        {/* Admin Avatar Edit Trigger */}
        {isAdmin && (
          <button
            onClick={onEditProfile}
            className="absolute -bottom-2 -right-2 p-2.5 rounded-2xl bg-[#00D2FF] text-black shadow-lg hover:bg-cyan-300 transition-all scale-100 hover:scale-110 font-bold"
            title={lang === 'ru' ? 'Изменить фото и информацию' : 'Edit photo & info'}
          >
            <Edit2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Profile Name & Title */}
      <div className="relative mb-4">
        <div className="flex items-center justify-center gap-3">
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight ${lang === 'en' ? fontClassEn : 'font-syne'}`}>
            {renderName()}
          </h1>
          {isAdmin && (
            <button
              onClick={onEditProfile}
              className="p-1.5 text-white/30 hover:text-[#00D2FF] transition-colors"
              title={lang === 'ru' ? 'Редактировать имя' : 'Edit Name'}
            >
              <Edit2 className="w-5 h-5" />
            </button>
          )}
        </div>

        <p className="mt-3 text-lg sm:text-xl font-semibold text-[#00D2FF] tracking-wide">
          {profile.title[lang]}
        </p>
      </div>

      {/* Location / Meta info */}
      {profile.location && profile.location[lang] && (
        <div className="flex items-center justify-center gap-1.5 text-xs text-white/50 mb-6 font-medium">
          <MapPin className="w-3.5 h-3.5 text-[#00D2FF]" />
          <span>{profile.location[lang]}</span>
        </div>
      )}

      {/* Bio / About me */}
      <div className="relative max-w-2xl mx-auto">
        <p className="text-white/70 text-base sm:text-lg leading-relaxed font-normal">
          {profile.bio[lang]}
        </p>
        
        {isAdmin && (
          <div className="mt-3">
            <button
              onClick={onEditProfile}
              className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:underline font-semibold"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>{lang === 'ru' ? 'Редактировать профиль' : 'Edit profile info'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Quick Contact & Social Links */}
      <div className="mt-8 flex flex-col items-center gap-3">
        {/* Mail Button top */}
        {profile.contactEmail && (
          <a
            href={`mailto:${profile.contactEmail}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl glass-card text-white text-xs font-semibold hover:border-[#00D2FF] hover:text-[#00D2FF] transition-all duration-300 shadow-sm"
          >
            <Mail className="w-3.5 h-3.5 text-[#00D2FF]" />
            <span>{profile.contactEmail}</span>
          </a>
        )}

        {/* Social Icons row bottom */}
        <div className="flex items-center justify-center gap-3">
          {profile.socials?.github && (
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-2xl glass-card text-white/70 hover:text-[#00D2FF] hover:border-[#00D2FF] transition-all"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          )}

          {profile.socials?.telegram && (
            <a
              href={profile.socials.telegram}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-2xl glass-card text-white/70 hover:text-[#00D2FF] hover:border-[#00D2FF] transition-all"
              title="Telegram"
            >
              <Send className="w-4 h-4" />
            </a>
          )}

          {profile.socials?.linkedin && (
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-2xl glass-card text-white/70 hover:text-[#00D2FF] hover:border-[#00D2FF] transition-all"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

    </section>
  );
};
