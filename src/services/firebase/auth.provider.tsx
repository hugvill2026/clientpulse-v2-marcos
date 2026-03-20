import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut, 
  type User, 
  GoogleAuthProvider, 
  signInWithPopup,
  browserSessionPersistence,
  setPersistence
} from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { setUser: setStoreUser, logout: clearStore } = useAuthStore();

  useEffect(() => {
    let isMounted = true;

    // Set session persistence once, properly awaited
    const initAuth = async () => {
      try {
        await setPersistence(auth, browserSessionPersistence);
      } catch (e) {
        console.warn('Persistence already set or error:', e);
      }
    };

    initAuth();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (isMounted) {
        setUser(currentUser);
        setStoreUser(currentUser);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' }); // Crucial: Always allow account selection
    try {
      return await signInWithPopup(auth, provider);
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
         toast.error('Has cerrado la conexión con Google. Inténtalo de nuevo.');
      }
      throw error;
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    return await signInWithEmailAndPassword(auth, email, pass);
  };

  const registerWithEmail = async (email: string, pass: string) => {
    return await createUserWithEmailAndPassword(auth, email, pass);
  };

  const logout = async () => {
    try {
      await signOut(auth);
      clearStore();
      // Soft cleanup - preserve auth-related keys to prevent infinite loops
      const authKeysToPreserve = ['clientpulse-auth', 'firebase-local-storage-cache'];
      Object.keys(localStorage).forEach(key => {
        if (!authKeysToPreserve.includes(key) && !key.startsWith('firebase')) {
          localStorage.removeItem(key);
        }
      });
      // Only redirect if we are not already at login to prevent loops
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    } catch (e) {
      console.error(e);
      // Even on error, try to navigate to login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
  };

  const value = {
    user,
    loading,
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
    logout,
  };

  // Show loading screen while Firebase initializes
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
        <div className="w-12 h-12 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin" />
        <span className="text-sm font-display font-medium text-slate-500 animate-pulse">clientpulse</span>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

