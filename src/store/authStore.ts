import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

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
      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user, 
        loading: false 
      }),
      logout: () => {
        // Clear everything to prevent identity leaks
        set({ 
          user: null, 
          isAuthenticated: false, 
          loading: false 
        })
        localStorage.removeItem('clientpulse-auth')
      },
    }),
    {
      name: 'clientpulse-auth',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

