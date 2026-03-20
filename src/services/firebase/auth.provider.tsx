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
    // Force session persistence to ensure clean identity isolation
    setPersistence(auth, browserSessionPersistence);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setStoreUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setStoreUser]);

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
      localStorage.clear();
      sessionStorage.clear();
      // Only reload if we are not already at login to prevent loops
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    } catch (e) {
      console.error(e);
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

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

