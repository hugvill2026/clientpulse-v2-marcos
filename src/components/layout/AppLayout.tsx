import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BarChart3, 
  Users, 
  Settings, 
  Calendar, 
  History, 
  HelpCircle, 
  MessageSquare, 
  LayoutGrid, 
  LogOut,
  ChevronLeft,
  Search,
  Bell,
  User,
  PlusCircle,
  Menu,
  X
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../utils/cn'
import { ReminderScheduler } from './ReminderScheduler'
import { QuickActionModal } from './QuickActionModal'

// Navigation Items
const navItems = [
  { id: 'dashboard', label: 'Tablero', icon: BarChart3, path: '/dashboard' },
  { id: 'clients', label: 'Clientes', icon: Users, path: '/clients' },
  { id: 'categories', label: 'Categorías', icon: LayoutGrid, path: '/categories' },
  { id: 'messages', label: 'Mensajes', icon: MessageSquare, path: '/messages' },
  { id: 'calendar', label: 'Calendario', icon: Calendar, path: '/calendar' },
  { id: 'history', label: 'Historial', icon: History, path: '/history' },
]

const bottomNavItems = [
  { id: 'help', label: 'Ayuda', icon: HelpCircle, path: '/help' },
  { id: 'settings', label: 'Configuración', icon: Settings, path: '/settings' },
]

// Sidebar Component
const Sidebar = ({ isOpen, setOpen }: { isOpen: boolean, setOpen: (o: boolean) => void }) => {
  const location = useLocation()

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 260 : 80 }}
      className="hidden md:flex flex-col h-screen bg-slate-900 border-r border-slate-800 fixed left-0 top-0 z-50 text-slate-400 overflow-hidden group shadow-2xl"
    >
      {/* Branding */}
      <div className="h-20 flex items-center px-6 gap-3 w-full">
        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center relative">
          <img src="/logo_clientpulse_v2.svg" alt="ClientPulse Logo" className="w-9 h-9 drop-shadow-lg" />
        </div>
        {isOpen && (
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-white font-display font-medium text-lg"
          >
            clientpulse
          </motion.span>
        )}
      </div>

      {/* Nav Section */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link 
              key={item.id} 
              to={item.path}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 hover:text-white capitalize group relative",
                isActive ? "bg-teal-500 text-white shadow-lg shadow-teal-500/20 active-nav" : "hover:bg-white/5"
              )}
            >
              <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-white pulse-subtle")} />
              {isOpen && <span className="font-interface font-medium whitespace-nowrap">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Nav */}
      <div className="px-4 py-6 border-t border-slate-800 space-y-2">
        {bottomNavItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link 
              key={item.id} 
              to={item.path}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 hover:text-white capitalize group",
                isActive ? "bg-white/10 text-white" : "hover:bg-white/5"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="font-interface font-medium whitespace-nowrap">{item.label}</span>}
            </Link>
          )
        })}
        {/* Toggle Collapse */}
        <button 
          onClick={() => setOpen(!isOpen)}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 hover:bg-white/5 hover:text-white group"
        >
          <div className={cn("transition-transform duration-500", !isOpen && "rotate-180")}>
            <ChevronLeft className="w-5 h-5" />
          </div>
          {isOpen && <span className="font-interface font-medium">Colapsar</span>}
        </button>
      </div>
    </motion.aside>
  )
}

// Top Bar Component
const TopBar = ({ setMobileMenu }: { setMobileMenu: (o: boolean) => void }) => {
  return (
    <header className="h-20 glass border-b border-slate-200 fixed top-0 left-0 right-0 z-40 px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setMobileMenu(true)}
          className="md:hidden p-2 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <Menu className="w-6 h-6 text-slate-600" />
        </button>
        <div className="hidden md:flex relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar..." 
            className="bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-6 py-2.5 w-64 text-sm focus:w-80 transition-all duration-300 outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button className="p-2.5 hover:bg-slate-50 rounded-2xl relative transition-all group active:scale-95">
          <Bell className="w-5 h-5 text-slate-600 group-hover:text-teal-500 transition-colors" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />
        </button>
        <Link 
          to="/profile"
          className="flex items-center gap-3 p-1 pr-4 rounded-full hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group"
        >
          <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden border-2 border-slate-100 shadow-sm transition-transform group-hover:scale-105">
            <User className="w-full h-full p-2 text-slate-400" />
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-bold text-slate-800 line-clamp-1">Víctor Villegas</p>
            <p className="text-[10px] text-slate-400 font-medium">Plan Pro</p>
          </div>
        </Link>
      </div>
    </header>
  )
}

// Mobile Overlay Menu
const MobileNav = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] md:hidden"
        />
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-y-0 left-0 w-[280px] bg-white z-[70] md:hidden shadow-2xl p-6 flex flex-col pt-0"
        >
          <div className="h-20 flex items-center justify-between mb-4">
             <div className="flex items-center gap-3">
               <img src="/logo_clientpulse_v2.svg" alt="ClientPulse Logo" className="w-8 h-8 drop-shadow-md" />
               <span className="font-display font-bold text-slate-800">clientpulse</span>
             </div>
             <button onClick={onClose} className="p-2 bg-slate-100 rounded-xl"><X className="w-5 h-5 text-slate-500" /></button>
          </div>
          <nav className="flex-1 space-y-1">
            {navItems.map(item => (
              <Link key={item.id} to={item.path} onClick={onClose} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-teal-50 transition-colors">
                <item.icon className="w-5 h-5 text-slate-400" />
                <span className="font-medium text-slate-600">{item.label}</span>
              </Link>
            ))}
          </nav>
        </motion.div>
      </>
    )}
  </AnimatePresence>
)

// Main Layout
export const AppLayout = ({ children, title }: { children: React.ReactNode, title?: string }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true)
  const [isMobileNavOpen, setMobileNavOpen] = useState(false)
  const [isQuickActionOpen, setQuickActionOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-slate-50">
      <ReminderScheduler />
      {/* Sidebar Desktop */}
      <Sidebar isOpen={isSidebarOpen} setOpen={setSidebarOpen} />
      
      {/* Mobile Nav Overlay */}
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      {/* Main Content Area */}
      <div 
        className={cn(
          "flex-1 flex flex-col transition-all duration-300",
          "md:ml-20 lg:ml-20", // Default margin for collapsed/expanded sidebar base
          isSidebarOpen ? "md:ml-[260px]" : "md:ml-[80px]"
        )}
      >
        <TopBar setMobileMenu={setMobileNavOpen} />
        
        <main className="flex-1 pt-24 pb-12 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto w-full">
          {/* Page Heading (Optional) */}
          {title && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
            </motion.div>
          )}
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {children}
          </motion.div>
        </main>

        {/* Floating Action Button (FAB) as per spec */}
        <div className="fixed bottom-8 right-8 z-[90]">
          <button onClick={() => setQuickActionOpen(true)} className="w-14 h-14 bg-teal-500 rounded-full text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all group ring-8 ring-teal-500/10">
            <PlusCircle className="w-7 h-7" />
            <div className="absolute right-16 bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
              Acción Rápida
            </div>
          </button>
        </div>
        
        <QuickActionModal 
          isOpen={isQuickActionOpen} 
          onClose={() => setQuickActionOpen(false)} 
        />
      </div>
    </div>
  )
}

export default AppLayout
