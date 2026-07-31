import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  getDocs,
  writeBatch,
  query,
  orderBy
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { Achievement, ProfileInfo } from '../types';
import { defaultProfile, sampleAchievements } from '../data/initialData';

const app = initializeApp(firebaseConfig);

export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

const ACHIEVEMENTS_COLLECTION = 'achievements';
const PROFILE_COLLECTION = 'profile';
const PROFILE_DOC_ID = 'main';

// 1. Subscribe to achievements in real-time
export function subscribeToAchievements(
  onData: (achievements: Achievement[]) => void,
  onError?: (error: Error) => void
) {
  const achievementsRef = collection(db, ACHIEVEMENTS_COLLECTION);
  return onSnapshot(
    achievementsRef,
    async (snapshot) => {
      if (snapshot.empty) {
        // Seed initial sample achievements if database is empty
        await seedAchievementsIfEmpty();
        return;
      }
      const list: Achievement[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as Achievement;
        list.push({ ...data, id: docSnap.id });
      });
      // Sort by order ascending or custom
      list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      onData(list);
    },
    (err) => {
      console.error('Error fetching achievements:', err);
      if (onError) onError(err);
    }
  );
}

// 2. Subscribe to profile info in real-time
export function subscribeToProfile(
  onData: (profile: ProfileInfo) => void,
  onError?: (error: Error) => void
) {
  const profileDocRef = doc(db, PROFILE_COLLECTION, PROFILE_DOC_ID);
  return onSnapshot(
    profileDocRef,
    async (docSnap) => {
      if (!docSnap.exists()) {
        // Seed initial profile if doc doesn't exist
        await setDoc(profileDocRef, defaultProfile);
        onData(defaultProfile);
      } else {
        onData(docSnap.data() as ProfileInfo);
      }
    },
    (err) => {
      console.error('Error fetching profile:', err);
      if (onError) onError(err);
    }
  );
}

// Helper to seed achievements if empty
async function seedAchievementsIfEmpty() {
  const batch = writeBatch(db);
  sampleAchievements.forEach((item) => {
    const docRef = doc(db, ACHIEVEMENTS_COLLECTION, item.id);
    batch.set(docRef, item);
  });
  await batch.commit();
}

// 3. Save / Update achievement
export async function saveAchievementToFirestore(item: Achievement) {
  const docRef = doc(db, ACHIEVEMENTS_COLLECTION, item.id);
  await setDoc(docRef, item, { merge: true });
}

// 4. Batch save achievements (for reordering)
export async function batchSaveAchievementsToFirestore(items: Achievement[]) {
  const batch = writeBatch(db);
  items.forEach((item, index) => {
    const docRef = doc(db, ACHIEVEMENTS_COLLECTION, item.id);
    batch.set(docRef, { ...item, order: index }, { merge: true });
  });
  await batch.commit();
}

// 5. Delete achievement
export async function deleteAchievementFromFirestore(id: string) {
  const docRef = doc(db, ACHIEVEMENTS_COLLECTION, id);
  await deleteDoc(docRef);
}

// 6. Save Profile
export async function saveProfileToFirestore(profileData: ProfileInfo) {
  const docRef = doc(db, PROFILE_COLLECTION, PROFILE_DOC_ID);
  await setDoc(docRef, profileData, { merge: true });
}
