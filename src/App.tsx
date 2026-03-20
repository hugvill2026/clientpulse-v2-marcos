import React, { Suspense, lazy, useMemo } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Lazy load pages for performance
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Clients = lazy(() => import('./pages/Clients'))
const ClientDetail = lazy(() => import('./pages/ClientDetail'))
const Categories = lazy(() => import('./pages/Categories'))
const Messages = lazy(() => import('./pages/Messages'))
const Calendar = lazy(() => import('./pages/Calendar'))
const History = lazy(() => import('./pages/History'))
const Profile = lazy(() => import('./pages/Profile'))
const Settings = lazy(() => import('./pages/Settings'))
const Help = lazy(() => import('./pages/Help'))
const Onboarding = lazy(() => import('./components/onboarding/OnboardingWizard'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Simple Loading Screen
const PageLoader = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
    <div className="w-12 h-12 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin" />
    <span className="text-sm font-display font-medium text-slate-500 animate-pulse">clientpulse</span>
  </div>
)

import { useAuthStore } from './store/authStore'

function App() {
  const location = useLocation()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  // Memoize the root redirect element to prevent infinite loops
  const rootRedirect = useMemo(() => {
    return isAuthenticated
      ? <Navigate to="/dashboard" replace />
      : <Navigate to="/login" replace />
  }, [isAuthenticated])

  // Memoize route elements to prevent re-creation on every render
  const publicRoutes = useMemo(() => (
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </>
  ), [])

  const protectedRoutes = useMemo(() => (
    <>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/clients/:id" element={<ClientDetail />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/history" element={<History />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/help" element={<Help />} />
      <Route path="/onboarding" element={<Onboarding />} />
    </>
  ), [])

  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {publicRoutes}
          {protectedRoutes}
          <Route path="/" element={rootRedirect} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  )
}

export default App
