# Project Memories - ClientPulse V2 Marcos

## Fixed: Infinite Redirect Loop on Login Page

**Problem**: Login page was causing infinite redirect loop, making the app unusable.

**Root Causes**:
1. **auth.provider.tsx**: `setPersistence()` was called without await inside useEffect, and `setStoreUser` was in the dependency array causing re-renders
2. **Login.tsx**: Cleanup code was deleting auth state from localStorage (`clientpulse-auth`), triggering Firebase auth state changes in a loop
3. **App.tsx**: Routes were being re-created on every render, causing unnecessary re-renders

**Solution Applied**:
- auth.provider.tsx: Properly await setPersistence, use mounted flag, remove setStoreUser from useEffect dependencies
- Login.tsx: Removed aggressive localStorage cleanup - only remove specific known app keys
- App.tsx: Added useMemo for routes and use selector pattern for isAuthenticated

**Files Changed**:
- src/services/firebase/auth.provider.tsx
- src/pages/Login.tsx
- src/App.tsx

## Key Pattern

When dealing with auth state and Zustand persist:
- Never delete `clientpulse-auth` from localStorage in cleanup effects
- Use selector pattern: `useAuthStore((state) => state.isAuthenticated)` instead of destructuring
- Memoize route elements to prevent re-creation on every render