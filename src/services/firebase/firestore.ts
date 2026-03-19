import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc,
  query, 
  where, 
  orderBy, 
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../../config/firebase';

// Collections
const CLIENTS_COLLECTION = 'clients';
const REMINDERS_COLLECTION = 'reminders';

// Interfaces
export interface ClientData {
  id?: string;
  userId: string;
  name: string;
  whatsapp: string;
  email?: string;
  category?: string;
  priority?: string;
  status: string;
  company?: string;
  notes?: string;
  createdAt?: any;
}

export interface ReminderData {
  id?: string;
  userId: string;
  clientId: string;
  clientName: string;
  clientWhatsapp: string;
  messageText: string;
  imageUrl?: string;
  scheduledAt: Date | Timestamp | any;
  status: 'pending' | 'sent' | 'failed';
  createdAt?: any;
}

export const ClientService = {
  // Create a new client
  async createClient(data: Omit<ClientData, 'id'>) {
    const docRef = await addDoc(collection(db, CLIENTS_COLLECTION), {
      ...data,
      createdAt: serverTimestamp(),
      status: data.status || 'activo'
    });
    return docRef.id;
  },

  // Get all clients for a user
  async getClients(userId: string) {
    const q = query(
      collection(db, CLIENTS_COLLECTION), 
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ClientData));
  },

  // Update client
  async updateClient(clientId: string, data: Partial<ClientData>) {
    const docRef = doc(db, CLIENTS_COLLECTION, clientId);
    await updateDoc(docRef, { ...data });
  },

  // Delete client
  async deleteClient(clientId: string) {
    const docRef = doc(db, CLIENTS_COLLECTION, clientId);
    await deleteDoc(docRef);
  }
};

export const ReminderService = {
  // Create a new reminder
  async createReminder(data: Omit<ReminderData, 'id' | 'status'>) {
    const docRef = await addDoc(collection(db, REMINDERS_COLLECTION), {
      ...data,
      scheduledAt: Timestamp.fromDate(data.scheduledAt as Date),
      status: 'pending',
      createdAt: serverTimestamp()
    });
    return docRef.id;
  },

  // Get pending reminders for a user
  async getPendingReminders(userId: string) {
    const q = query(
      collection(db, REMINDERS_COLLECTION),
      where('userId', '==', userId),
      where('status', '==', 'pending'),
      orderBy('scheduledAt', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data(), 
      scheduledAt: (doc.data().scheduledAt as Timestamp).toDate()
    } as ReminderData));
  },

  // Update reminder status
  async updateReminderStatus(reminderId: string, status: 'sent' | 'failed') {
    const docRef = doc(db, REMINDERS_COLLECTION, reminderId);
    await updateDoc(docRef, { status });
  }
};
