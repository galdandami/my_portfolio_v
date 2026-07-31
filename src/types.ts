export type Language = 'ru' | 'en';

export type SortMode = 'title' | 'date' | 'custom';

export type AchievementType = 'project' | 'certificate';

export interface LocalizedText {
  ru: string;
  en: string;
}

export interface Achievement {
  id: string;
  type?: AchievementType; // 'project' (examples of work: sites/apps) or 'certificate' (diplomas, awards, letters)
  image: string;
  date: string; // YYYY-MM-DD
  title: LocalizedText;
  shortDesc: LocalizedText;
  fullDesc: LocalizedText;
  order: number; // for custom order sorting
  category?: LocalizedText;
  linkUrl?: string;
}

export interface ProfileInfo {
  name: LocalizedText;
  nameFontEn?: string; // Font class for English name: 'font-outfit' | 'font-playfair' | 'font-space-grotesk' | 'font-cinzel' | 'font-unbounded' | 'font-cormorant' | 'font-syne'
  title: LocalizedText;
  bio: LocalizedText;
  avatarUrl: string;
  location?: LocalizedText;
  contactEmail?: string;
  socials?: {
    github?: string;
    telegram?: string;
    linkedin?: string;
  };
}
