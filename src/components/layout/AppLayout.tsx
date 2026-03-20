import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  MessageSquare, 
  Settings, 
  User, 
  LogOut, 
  LayoutDashboard, 
  Search,
  Bell,
  Zap,
  ShieldCheck,
  ChevronRight,
  Menu,
  Moon
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../utils/cn'
import { useAuth } from '../../services/firebase/auth.provider'
import { useAuthStore } from '../../store/authStore'
import { UserService, type UserProfileData } from '../../services/firebase/firestore'
import toast from 'react-hot-toast'

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Centro de Mando', path: '/dashboard', color: 'bg-teal-gradient' },
  { icon: Users, label: 'Directorio VIP', path: '/clients', color: 'bg-indigo-gradient' },
  { icon: MessageSquare, label: 'Mensajería Élite', path: '/reminders', color: 'bg-rose-gradient' },
  { icon: User, label: 'Identidad PRO', path: '/profile', color: 'bg-slate-900' },
  { icon: Settings, label: 'Configuración', path: '/settings', color: 'bg-slate-950' },
]

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()
  const { logout } = useAuth()
  const { user } = useAuthStore()
  const [profile, setProfile] = useState<UserProfileData | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.uid) {
        const data = await UserService.getUserProfile(user.uid)
        setProfile(data)
      }
    }
    fetchProfile()
  }, [user])

  const handleLogout = async () => {
    if (window.confirm('¿Seguro que deseas salir del entorno seguro?')) {
      const toastId = toast.loading('Cerrando Sesión VIP...')
      try {
        await logout()
        toast.success('Sesión finalizada. Identidad aislada.', { id: toastId })
      } catch (e) {
        toast.error('Fallo técnico al salir.')
      }
    }
  }

  const userName = profile?.fullName || user?.displayName?.split(' ')[0] || user?.email?.split('@')[0] || 'Usuario'

  return (
    <div className="min-h-screen bg-slate-50 grid grid-cols-[320px_1fr] overflow-hidden font-['Inter']">
      
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col bg-slate-950 text-white relative z-50 shadow-3xl h-screen overflow-hidden">
         <div className="p-10 relative z-10">
            <Link to="/dashboard" className="flex items-center gap-4 group">
               <div className="w-14 h-14 bg-teal-gradient rounded-3xl flex items-center justify-center shadow-2xl shadow-teal-500/20 group-hover:rotate-12 transition-transform duration-500 flex-shrink-0">
                  <Zap className="w-8 h-8 text-white fill-white" />
               </div>
               <div className="flex flex-col min-w-0">
                  <span className="text-xl font-black tracking-tightest leading-none truncate font-display">CLIENTPULSE</span>
                  <span className="text-[9px] font-black text-teal-400 uppercase tracking-[0.3em] mt-1 whitespace-nowrap">Institutional Desktop</span>
               </div>
            </Link>
         </div>

         <nav className="flex-1 px-6 py-2 space-y-3 relative z-10 overflow-y-auto scrollbar-hide">
            {sidebarItems.map((item) => {
               const isActive = location.pathname === item.path
               return (
                  <Link 
                    key={item.path} 
                    to={item.path}
                    className={cn(
                      "group flex items-center justify-between px-6 py-5 rounded-[28px] transition-all duration-300 border-2 border-transparent",
                      isActive 
                        ? "bg-white text-slate-950 shadow-2xl scale-[1.02]" 
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    )}
                  >
                     <div className="flex items-center gap-5 min-w-0">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center transition-all flex-shrink-0",
                          isActive ? item.color : "bg-white/5 text-slate-500 group-hover:bg-white/10"
                        )}>
                           <item.icon className="w-5 h-5" />
                        </div>
                        <span className="font-black text-[11px] uppercase tracking-widest truncate">{item.label}</span>
                     </div>
                     {isActive && <ChevronRight className="w-4 h-4 text-teal-500" />}
                  </Link>
               )
            })}
         </nav>

         <div className="p-6 relative z-10">
            <div className="card-premium bg-white/5 border-white/5 p-6 mb-4 overflow-hidden">
               <p className="text-[9px] font-black text-teal-400 uppercase tracking-widest mb-2">Sync Status</p>
               <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 pulse-teal" />
                  <span className="text-[10px] font-black text-white/90">Ecosistema Nube Activo</span>
               </div>
            </div>

            <button 
              onClick={handleLogout}
              className="w-full h-16 rounded-[24px] bg-rose-500/10 border-2 border-rose-500/20 text-rose-500 font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-rose-500 hover:text-white transition-all active:scale-95 group"
            >
               <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
               Desconectar
            </button>
         </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen relative overflow-hidden bg-slate-50 min-w-0">
         
         {/* Top Bar */}
         <header className="h-24 flex items-center justify-between px-10 relative z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 flex-shrink-0">
            <div className="flex items-center gap-6 flex-1 max-w-2xl min-w-0">
               <div className="relative group w-full">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-teal-600 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Búsqueda táctica..." 
                    className="input-premium h-14 pl-16 rounded-[24px] border-none shadow-sm focus:shadow-xl transition-all w-full"
                  />
               </div>
            </div>

            <div className="flex items-center gap-8 ml-12">
               <div className="flex items-center gap-4 bg-white p-2 rounded-3xl border border-slate-50 h-20 shadow-xl">
                  <button className="w-14 h-14 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-white hover:text-teal-500 transition-all active:scale-90 relative">
                     <Bell className="w-6 h-6" />
                     <div className="absolute top-4 right-4 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
                  </button>
                  <button className="w-14 h-14 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-white hover:text-slate-900 transition-all active:scale-90">
                     <Moon className="w-6 h-6" />
                  </button>
               </div>

               <Link to="/profile" className="flex items-center gap-4 bg-white p-2.5 pr-6 rounded-2xl border-2 border-slate-50 shadow-xl hover:border-teal-500/20 transition-all group max-w-[200px] overflow-hidden">
                  <div className="w-12 h-12 rounded-xl bg-teal-gradient text-white flex items-center justify-center font-black text-xl border-2 border-white shadow-lg overflow-hidden flex-shrink-0">
                     {user?.photoURL ? <img src={user.photoURL} alt="I" className="w-full h-full object-cover" /> : (profile?.fullName || 'U')[0]}
                  </div>
                  <div className="flex flex-col min-w-0">
                     <span className="text-slate-900 font-black text-[11px] tracking-tight leading-none group-hover:text-teal-600 transition-colors uppercase truncate">{profile?.fullName || 'Perfil VIP'}</span>
                     <div className="flex items-center gap-1 mt-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-500" />
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Sincronizado</span>
                     </div>
                  </div>
               </Link>

               <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden w-16 h-16 bg-slate-950 text-white rounded-2xl flex items-center justify-center">
                  <Menu className="w-8 h-8" />
               </button>
            </div>
         </header>

         {/* Content Viewport */}
         <div className="flex-1 overflow-y-auto px-12 pb-12 pt-4 relative">
            <div className="max-w-[1920px] mx-auto">
               {children}
            </div>
         </div>

         {/* Footer */}
         <footer className="h-20 flex items-center justify-between px-12 bg-white/30 border-t border-slate-100 text-slate-400">
            <div className="flex items-center gap-4">
               <span className="text-[10px] font-black uppercase tracking-[0.4em]">ClientPulse V2</span>
               <div className="w-1 h-1 bg-slate-300 rounded-full" />
               <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Premium Institutional</span>
            </div>
            <p className="text-[10px] font-bold italic">© 2026 Entorno Táctico Corporativo</p>
         </footer>
      </main>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
         {isMobileMenuOpen && (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 bg-slate-950/90 backdrop-blur-3xl z-[100] p-12 flex flex-col justify-between"
            >
               <div className="flex justify-between items-center">
                  <div className="w-16 h-16 bg-teal-gradient rounded-2xl flex items-center justify-center">
                     <Zap className="w-9 h-9 text-white fill-white" />
                  </div>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="w-16 h-16 bg-white/10 text-white rounded-full flex items-center justify-center">
                     <ChevronRight className="rotate-180 w-8 h-8" />
                  </button>
               </div>

               <nav className="space-y-4">
                  {sidebarItems.map(item => (
                     <Link 
                       key={item.path} 
                       to={item.path} 
                       onClick={() => setIsMobileMenuOpen(false)}
                       className="flex items-center gap-8 py-6 text-4xl font-black text-white hover:text-teal-400 transition-all uppercase tracking-tightest"
                     >
                        <item.icon className="w-12 h-12" />
                        {item.label}
                     </Link>
                  ))}
               </nav>

               <button 
                 onClick={handleLogout}
                 className="w-full h-24 bg-rose-500 text-white rounded-[40px] font-black uppercase text-xl shadow-2xl shadow-rose-500/20"
               >
                  Finalizar Sesión
               </button>
            </motion.div>
         )}
      </AnimatePresence>
    </div>
  )
}

export default AppLayout
