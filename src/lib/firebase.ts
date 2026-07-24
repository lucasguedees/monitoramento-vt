import { initializeApp, getApps } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  writeBatch
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { City, RiverReading, Shelter, ShelterReading } from '../types';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Helper to subscribe to Firestore collection with automatic initial seeding
export function subscribeCollection<T extends { id: string }>(
  collectionName: string,
  onData: (items: T[]) => void,
  initialSeed?: T[]
) {
  const colRef = collection(db, collectionName);

  return onSnapshot(
    colRef,
    async (snapshot) => {
      if (snapshot.empty && initialSeed && initialSeed.length > 0) {
        console.log(`[Firebase] Initializing empty collection '${collectionName}' with seed data...`);
        try {
          const batch = writeBatch(db);
          initialSeed.forEach((item) => {
            const itemRef = doc(db, collectionName, item.id);
            batch.set(itemRef, item);
          });
          await batch.commit();
          console.log(`[Firebase] Successfully seeded '${collectionName}'`);
        } catch (err) {
          console.error(`[Firebase] Failed to seed '${collectionName}':`, err);
        }
      } else {
        const items: T[] = [];
        snapshot.forEach((doc) => {
          items.push(doc.data() as T);
        });
        onData(items);
      }
    },
    (error) => {
      console.error(`[Firebase] Error subscribing to '${collectionName}':`, error);
    }
  );
}

// CRUD Helpers
export async function saveDocument<T extends { id: string }>(collectionName: string, data: T): Promise<void> {
  const docRef = doc(db, collectionName, data.id);
  await setDoc(docRef, data, { merge: true });
}

export async function deleteDocument(collectionName: string, id: string): Promise<void> {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
}

export async function saveAppConfig(key: string, value: string): Promise<void> {
  const docRef = doc(db, 'appConfig', key);
  await setDoc(docRef, { value }, { merge: true });
}

export function subscribeAppConfig(key: string, onValue: (val: string | null) => void) {
  const docRef = doc(db, 'appConfig', key);
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      onValue(docSnap.data().value || null);
    } else {
      onValue(null);
    }
  });
}
