import { 
  collection, 
  doc, 
  addDoc, 
  setDoc, 
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../../config/firebase';

// Collections
const USERS_COLLECTION = 'users';
const CLIENTS_COLLECTION = 'clients';
const REMINDERS_COLLECTION = 'reminders';

// Interfaces
export interface UserProfileData {
  fullName: string;
  phone: string;
  city: string;
  companyName: string;
  website: string;
  bio: string;
  email?: string;
  photoURL?: string;
  userId: string;
  updatedAt: any;
  createdAt?: any;
  callMeBotPhone?: string;
  googleSheetsUrl?: string;
}

export interface ClientData {
  id?: string;
  userId: string;
  name: string;
  whatsapp: string;
  email?: string;
  company?: string;
  category?: string;
  priority?: string;
  status: 'activo' | 'inactivo';
  notes?: string;
  createdAt: any;
}

export interface ReminderData {
  id?: string;
  userId: string;
  clientId: string;
  clientName: string;
  clientWhatsapp: string;
  messageText: string;
  messageImage?: string;
  messageVideo?: string;
  messagePdf?: string;
  messageZip?: string;
  scheduledAt: any;
  status: 'pending' | 'sent' | 'failed';
  type: 'once' | 'recurring' | 'manual';
  createdAt: any;
}

// User Profile Services
export const UserService = {
  async getUserProfile(userId: string): Promise<UserProfileData | null> {
    const docRef = doc(db, USERS_COLLECTION, userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() as UserProfileData : null;
  },

  async updateUserProfile(userId: string, data: Partial<UserProfileData>) {
    const docRef = doc(db, USERS_COLLECTION, userId);
    await setDoc(docRef, { 
      ...data, 
      updatedAt: serverTimestamp() 
    }, { merge: true });
  },

  async deleteUserAccount(userId: string) {
    // 1. Delete all Reminders
    const remindersQuery = query(collection(db, REMINDERS_COLLECTION), where('userId', '==', userId));
    const remindersSnap = await getDocs(remindersQuery);
    await Promise.all(remindersSnap.docs.map(d => deleteDoc(d.ref)));

    // 2. Delete all Clients
    const clientsQuery = query(collection(db, CLIENTS_COLLECTION), where('userId', '==', userId));
    const clientsSnap = await getDocs(clientsQuery);
    await Promise.all(clientsSnap.docs.map(d => deleteDoc(d.ref)));

    // 3. Delete Profile
    const docRef = doc(db, USERS_COLLECTION, userId);
    await deleteDoc(docRef);
  }
};

// Client Services
export const ClientService = {
  async getClients(userId: string): Promise<ClientData[]> {
    const q = query(
      collection(db, CLIENTS_COLLECTION),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    } as ClientData));
    
    // Sort client-side to avoid indexing requirement for now
    return data.sort((a, b) => {
      const timeA = a.createdAt?.toMillis?.() || 0;
      const timeB = b.createdAt?.toMillis?.() || 0;
      return timeB - timeA;
    });
  },

  async createClient(data: Omit<ClientData, 'id' | 'createdAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, CLIENTS_COLLECTION), {
      ...data,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  },

  async updateClient(clientId: string, data: Partial<ClientData>) {
    const docRef = doc(db, CLIENTS_COLLECTION, clientId);
    await updateDoc(docRef, data);
  },

  async deleteClient(clientId: string) {
    const remindersQuery = query(
      collection(db, REMINDERS_COLLECTION),
      where('clientId', '==', clientId)
    );
    const remindersSnap = await getDocs(remindersQuery);
    const deletePromises = remindersSnap.docs.map(d => deleteDoc(d.ref));
    await Promise.all(deletePromises);

    const docRef = doc(db, CLIENTS_COLLECTION, clientId);
    await deleteDoc(docRef);
  }
};

// Reminder Services
export const ReminderService = {
  async getPendingReminders(userId: string): Promise<ReminderData[]> {
    const q = query(
      collection(db, REMINDERS_COLLECTION),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    const reminders = querySnapshot.docs.map(doc => {
      const data = doc.data();
      const scheduledAt = data.scheduledAt instanceof Timestamp ? data.scheduledAt.toDate() : data.scheduledAt;
      return { 
        id: doc.id, 
        ...data,
        scheduledAt 
      } as ReminderData;
    });

    // Client-side sort by scheduledAt
    return reminders.sort((a, b) => {
      const dateA = a.scheduledAt instanceof Date ? a.scheduledAt.getTime() : new Date(a.scheduledAt).getTime();
      const dateB = b.scheduledAt instanceof Date ? b.scheduledAt.getTime() : new Date(b.scheduledAt).getTime();
      return dateA - dateB;
    });
  },

  async createReminder(data: Omit<ReminderData, 'id' | 'status' | 'createdAt'>) {
    const docRef = await addDoc(collection(db, REMINDERS_COLLECTION), {
      ...data,
      status: 'pending',
      createdAt: serverTimestamp()
    });
    return docRef.id;
  },

  async updateReminder(reminderId: string, data: Partial<ReminderData>) {
    const docRef = doc(db, REMINDERS_COLLECTION, reminderId);
    await updateDoc(docRef, data);
  },

  async updateReminderStatus(reminderId: string, status: 'sent' | 'failed') {
    const docRef = doc(db, REMINDERS_COLLECTION, reminderId);
    await updateDoc(docRef, { status });
  },

  async deleteReminder(reminderId: string) {
    const docRef = doc(db, REMINDERS_COLLECTION, reminderId);
    await deleteDoc(docRef);
  }
};
