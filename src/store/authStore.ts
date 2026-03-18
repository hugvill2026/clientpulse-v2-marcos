import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  user: any | null
  loading: boolean
  isAuthenticated: boolean
  setUser: (user: any) => void
  logout: () => void
}

export const useAuthStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      loading: true,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user, loading: false }),
      logout: () => set({ user: null, isAuthenticated: false, loading: false }),
    }),
    {
      name: 'clientpulse-auth',
    }
  )
)
