import React, { useState, useEffect, useMemo } from 'react';
import { Achievement, AchievementType, Language, ProfileInfo, SortMode } from './types';
import { defaultProfile, sampleAchievements } from './data/initialData';
import { Header } from './components/Header';
import { ProfileSection } from './components/ProfileSection';
import { CategoryTabs } from './components/CategoryTabs';
import { SearchAndSort } from './components/SearchAndSort';
import { AchievementCard } from './components/AchievementCard';
import { AchievementDetailModal } from './components/AchievementDetailModal';
import { AchievementFormModal } from './components/AchievementFormModal';
import { ProfileEditModal } from './components/ProfileEditModal';
import { EmptyState } from './components/EmptyState';
import { Sparkles, ArrowUp, RefreshCw, ShieldAlert, Shield, ShieldCheck } from 'lucide-react';
import {
  subscribeToAchievements,
  subscribeToProfile,
  saveAchievementToFirestore,
  deleteAchievementFromFirestore,
  saveProfileToFirestore,
  batchSaveAchievementsToFirestore
} from './lib/firebase';

const STORAGE_KEY_LANG = 'portfolio_lang_v1';
const STORAGE_KEY_SORT = 'portfolio_sort_v1';
const STORAGE_KEY_TAB = 'portfolio_tab_v1';
const STORAGE_KEY_PROFILE = 'portfolio_profile_v2';
const STORAGE_KEY_ACHIEVEMENTS = 'portfolio_achievements_v2';

export default function App() {
  // Set document title
  useEffect(() => {
    document.title = 'Danis | Portfolio';
  }, []);

  // 1. Language state
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_LANG);
    return saved === 'en' || saved === 'ru' ? saved : 'ru';
  });

  // 2. Active Tab state (1: examples of work, 2: diplomas & certificates)
  const [activeTab, setActiveTab] = useState<AchievementType>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_TAB);
    return saved === 'certificate' ? 'certificate' : 'project';
  });

  const handleTabChange = (tab: AchievementType) => {
    setActiveTab(tab);
    localStorage.setItem(STORAGE_KEY_TAB, tab);
  };

  // 3. Admin mode state (checks ?admin=true parameter or state)
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('admin') === 'true';
    }
    return false;
  });

  // Listen for URL changes or popstate
  useEffect(() => {
    const checkAdminParam = () => {
      const params = new URLSearchParams(window.location.search);
      setIsAdmin(params.get('admin') === 'true');
    };
    window.addEventListener('popstate', checkAdminParam);
    return () => window.removeEventListener('popstate', checkAdminParam);
  }, []);

  const handleToggleAdmin = () => {
    const newAdminState = !isAdmin;
    setIsAdmin(newAdminState);
    const url = new URL(window.location.href);
    if (newAdminState) {
      url.searchParams.set('admin', 'true');
    } else {
      url.searchParams.delete('admin');
    }
    window.history.pushState({}, '', url.toString());
  };

  // 3. Profile state (synced with Firebase Firestore + Local Cache for instant load)
  const [profile, setProfile] = useState<ProfileInfo>(() => {
    const cached = localStorage.getItem(STORAGE_KEY_PROFILE);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        // Fall back to default profile
      }
    }
    return defaultProfile;
  });

  useEffect(() => {
    const unsubscribe = subscribeToProfile((newProfile) => {
      setProfile(newProfile);
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(newProfile));
    });
    return () => unsubscribe();
  }, []);

  // Save profile to Firestore and local cache
  const handleSaveProfile = async (updatedProfile: ProfileInfo) => {
    setProfile(updatedProfile);
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(updatedProfile));
    try {
      await saveProfileToFirestore(updatedProfile);
    } catch (err) {
      console.error('Failed to save profile to Firestore:', err);
    }
  };

  // 4. Achievements list state (synced with Firebase Firestore + Local Cache for instant load)
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const cached = localStorage.getItem(STORAGE_KEY_ACHIEVEMENTS);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        // Fall back to sample achievements
      }
    }
    return sampleAchievements;
  });

  useEffect(() => {
    const unsubscribe = subscribeToAchievements((items) => {
      setAchievements(items);
      localStorage.setItem(STORAGE_KEY_ACHIEVEMENTS, JSON.stringify(items));
    });
    return () => unsubscribe();
  }, []);

  // Save language
  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem(STORAGE_KEY_LANG, newLang);
  };

  // 5. Search & Sort state
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMode, setSortMode] = useState<SortMode>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_SORT);
    if (saved === 'title' || saved === 'date' || saved === 'custom') {
      return saved;
    }
    return 'custom';
  });

  const handleSortChange = (mode: SortMode) => {
    setSortMode(mode);
    localStorage.setItem(STORAGE_KEY_SORT, mode);
  };

  // 6. Modal states
  const [selectedDetail, setSelectedDetail] = useState<Achievement | null>(null);
  const [editingItem, setEditingItem] = useState<Achievement | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Handlers for achievements CRUD with Firestore
  const handleAddClick = () => {
    setEditingItem(null);
    setIsFormModalOpen(true);
  };

  const handleEditItem = (item: Achievement) => {
    setEditingItem(item);
    setIsFormModalOpen(true);
  };

  const handleDeleteItem = async (id: string) => {
    const confirmMsg =
      lang === 'ru'
        ? 'Вы уверены, что хотите удалить это достижение?'
        : 'Are you sure you want to delete this achievement?';
    if (window.confirm(confirmMsg)) {
      try {
        await deleteAchievementFromFirestore(id);
      } catch (err) {
        console.error('Failed to delete achievement from Firestore:', err);
      }
    }
  };

  const handleSaveAchievement = async (itemToSave: Achievement) => {
    try {
      const exists = achievements.some((a) => a.id === itemToSave.id);
      if (exists) {
        await saveAchievementToFirestore(itemToSave);
      } else {
        const newItem = { ...itemToSave, order: 0 };
        // Shift existing order
        const reindexed = achievements.map((a) => ({ ...a, order: (a.order ?? 0) + 1 }));
        await batchSaveAchievementsToFirestore([newItem, ...reindexed]);
      }
    } catch (err) {
      console.error('Failed to save achievement to Firestore:', err);
    }
  };

  // Move up/down in custom order mode
  const handleMoveItem = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= achievements.length) return;

    const newArr = [...achievements];
    const temp = newArr[index];
    newArr[index] = newArr[targetIndex];
    newArr[targetIndex] = temp;

    const reindexed = newArr.map((item, idx) => ({ ...item, order: idx }));
    try {
      await batchSaveAchievementsToFirestore(reindexed);
    } catch (err) {
      console.error('Failed to update order in Firestore:', err);
    }
  };

  // Reset or Load Sample Data
  const handleLoadSampleData = async () => {
    try {
      await batchSaveAchievementsToFirestore(sampleAchievements);
    } catch (err) {
      console.error('Failed to reset sample data in Firestore:', err);
    }
  };

  const handleClearAllAchievements = async () => {
    if (
      window.confirm(
        lang === 'ru'
          ? 'Очистить все достижения? Список станет пустым.'
          : 'Clear all achievements? List will become empty.'
      )
    ) {
      try {
        await Promise.all(achievements.map((item) => deleteAchievementFromFirestore(item.id)));
      } catch (err) {
        console.error('Failed to clear achievements from Firestore:', err);
      }
    }
  };

  // Counts for tabs
  const projectsCount = useMemo(() => {
    return achievements.filter((item) => (item.type || 'project') === 'project').length;
  }, [achievements]);

  const certificatesCount = useMemo(() => {
    return achievements.filter((item) => item.type === 'certificate').length;
  }, [achievements]);

  // Filter & Sort computation
  const filteredAndSortedAchievements = useMemo(() => {
    // 1. Filter by Active Tab
    let result = achievements.filter((item) => {
      const itemType = item.type || 'project';
      return itemType === activeTab;
    });

    // 2. Filter by search query
    result = result.filter((item) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const titleRu = item.title.ru?.toLowerCase() || '';
      const titleEn = item.title.en?.toLowerCase() || '';
      const descRu = item.shortDesc.ru?.toLowerCase() || '';
      const descEn = item.shortDesc.en?.toLowerCase() || '';
      const catRu = item.category?.ru?.toLowerCase() || '';
      const catEn = item.category?.en?.toLowerCase() || '';

      return (
        titleRu.includes(q) ||
        titleEn.includes(q) ||
        descRu.includes(q) ||
        descEn.includes(q) ||
        catRu.includes(q) ||
        catEn.includes(q)
      );
    });

    // 3. Sort
    result = [...result].sort((a, b) => {
      if (sortMode === 'title') {
        const titleA = (a.title[lang] || a.title.ru || '').toLowerCase();
        const titleB = (b.title[lang] || b.title.ru || '').toLowerCase();
        return titleA.localeCompare(titleB, lang === 'ru' ? 'ru' : 'en');
      }
      if (sortMode === 'date') {
        // Latest date first
        const dateA = a.date || '1970-01-01';
        const dateB = b.date || '1970-01-01';
        return dateB.localeCompare(dateA);
      }
      // Custom order
      return (a.order ?? 0) - (b.order ?? 0);
    });

    return result;
  }, [achievements, activeTab, searchQuery, sortMode, lang]);

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white flex flex-col justify-between relative overflow-hidden">
      
      {/* Immersive UI Abstract Wave Background */}
      <div className="bg-wave" />

      {/* Header */}
      <Header
        lang={lang}
        onLanguageChange={handleLanguageChange}
        isAdmin={isAdmin}
        onToggleAdmin={handleToggleAdmin}
      />

      {/* Main Container */}
      <main className="flex-1 pb-24">
        
        {/* Profile Block */}
        <ProfileSection
          profile={profile}
          lang={lang}
          isAdmin={isAdmin}
          onEditProfile={() => setIsProfileModalOpen(true)}
        />

        {/* 2 Tabs: 1. Examples of Work (sites & apps) | 2. Diplomas, certificates, letters */}
        <CategoryTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
          lang={lang}
          projectsCount={projectsCount}
          certificatesCount={certificatesCount}
        />

        {/* Search & Sort Block */}
        <SearchAndSort
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortMode={sortMode}
          onSortChange={handleSortChange}
          lang={lang}
          isAdmin={isAdmin}
          onAddClick={handleAddClick}
          totalCount={filteredAndSortedAchievements.length}
        />

        {/* Achievements Grid / Empty State */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredAndSortedAchievements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredAndSortedAchievements.map((item, idx) => (
                <AchievementCard
                  key={item.id}
                  item={item}
                  lang={lang}
                  isAdmin={isAdmin}
                  sortMode={sortMode}
                  onOpenDetail={(i) => setSelectedDetail(i)}
                  onEdit={handleEditItem}
                  onDelete={handleDeleteItem}
                  onMoveUp={() => handleMoveItem(idx, 'up')}
                  onMoveDown={() => handleMoveItem(idx, 'down')}
                  isFirst={idx === 0}
                  isLast={idx === filteredAndSortedAchievements.length - 1}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              hasSearch={Boolean(searchQuery.trim())}
              activeTab={activeTab}
              lang={lang}
              isAdmin={isAdmin}
              onClearSearch={() => setSearchQuery('')}
              onAddClick={handleAddClick}
              onLoadSampleData={handleLoadSampleData}
            />
          )}
        </div>

        {/* Admin reset helper footer bar */}
        {isAdmin && achievements.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-white/5 flex items-center justify-between flex-wrap gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-2 text-amber-400 font-medium">
              <ShieldAlert className="w-4 h-4" />
              {lang === 'ru'
                ? 'Режим администратора активен'
                : 'Administrator Mode Active'}
            </span>

            <div className="flex items-center gap-3">
              <button
                onClick={handleLoadSampleData}
                className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 transition-all flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>
                  {lang === 'ru'
                    ? 'Восстановить демо-данные'
                    : 'Restore Sample Data'}
                </span>
              </button>

              <button
                onClick={handleClearAllAchievements}
                className="px-3.5 py-1.5 rounded-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 transition-all"
              >
                {lang === 'ru' ? 'Очистить все' : 'Clear All'}
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 bg-black/60 backdrop-blur-md text-center text-xs text-white/50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00D2FF] animate-pulse shadow-[0_0_8px_#00D2FF]" />
            <span className="font-bold text-white/70 tracking-wide">
              {profile.name[lang]} &copy; {new Date().getFullYear()}
            </span>
          </div>

          <p className="text-white/40 font-medium">
            {lang === 'ru'
              ? 'Создано на React & Tailwind CSS • Все права защищены'
              : 'Built with React & Tailwind CSS • All rights reserved'}
          </p>

          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className="text-[11px] text-white/20 hover:text-white/60 transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-white/5"
            title={isAdmin ? (lang === 'ru' ? 'Выйти из режима админа' : 'Exit Admin') : (lang === 'ru' ? 'Вход для администратора' : 'Admin Login')}
          >
            {isAdmin ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400/80" />
                <span className="text-amber-400/80 font-medium">{lang === 'ru' ? 'Админ активен' : 'Admin Active'}</span>
              </>
            ) : (
              <>
                <Shield className="w-3.5 h-3.5 text-white/20" />
                <span>{lang === 'ru' ? 'Админ' : 'Admin'}</span>
              </>
            )}
          </button>
        </div>
      </footer>

      {/* Modals */}
      {selectedDetail && (
        <AchievementDetailModal
          item={selectedDetail}
          lang={lang}
          onClose={() => setSelectedDetail(null)}
        />
      )}

      {isFormModalOpen && (
        <AchievementFormModal
          initialItem={editingItem}
          defaultType={activeTab}
          lang={lang}
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          onSave={handleSaveAchievement}
        />
      )}

      {isProfileModalOpen && (
        <ProfileEditModal
          profile={profile}
          lang={lang}
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          onSave={handleSaveProfile}
        />
      )}

    </div>
  );
}
