import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  TrendingUp, 
  ArrowUpRight, 
  Clock, 
  ChevronRight,
  BellRing,
  Sparkles,
  Sun,
  Moon,
  Coffee,
  Zap,
  Target
} from 'lucide-react'
import AppLayout from '../components/layout/AppLayout'
import { cn } from '../utils/cn'
import { useAuthStore } from '../store/authStore'
import { ClientService, ReminderService } from '../services/firebase/firestore'
import { format } from 'date-fns'

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
}

const MetricCard = ({ icon: Icon, label, value, trend, trendValue, colorClass }: any) => (
  <motion.div 
    variants={itemVariants}
    whileHover={{ y: -8, scale: 1.02 }}
    className={cn(
      "card-premium h-full min-h-[160px] flex flex-col justify-between relative overflow-hidden group border-2 border-transparent hover:border-teal-500/20",
    )}
  >
    <div className={cn("absolute top-0 right-0 w-32 h-32 blur-[60px] -mr-16 -mt-16 opacity-10 transition-opacity group-hover:opacity-20", colorClass)} />
    <div className="flex items-start justify-between relative z-10">
      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110", colorClass, "bg-opacity-10 text-white shadow-lg")}>
         <div className={cn("w-full h-full rounded-2xl flex items-center justify-center", colorClass)}>
            <Icon className="w-7 h-7 text-white" />
         </div>
      </div>
      {trend && (
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100/50">
           <ArrowUpRight className="w-3.5 h-3.5 font-black" />
           <span className="text-[10px] font-black uppercase tracking-tighter">{trendValue}</span>
        </div>
      )}
    </div>
    <div className="mt-6 relative z-10">
      <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.25em] mb-1.5">{label}</h3>
      <p className="text-4xl font-black text-slate-900 font-display tracking-tightest leading-none drop-shadow-sm">{value}</p>
    </div>
  </motion.div>
)

const Dashboard = () => {
  const { user } = useAuthStore()
  const [stats, setStats] = useState({
    clients: 0,
    messagesToday: 0,
    scheduled: 0,
    successRate: 0
  })
  const [recentReminders, setRecentReminders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const hour = new Date().getHours()

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return
      try {
        const [clients, pending] = await Promise.all([
          ClientService.getClients(user.uid),
          ReminderService.getPendingReminders(user.uid)
        ])
        setStats({
          clients: clients.length,
          scheduled: pending.length,
          messagesToday: pending.filter(p => format(new Date(p.scheduledAt), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')).length,
          successRate: clients.length > 0 ? 98.2 : 0
        })
        setRecentReminders(pending.slice(0, 4))
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [user])

  const greeting = hour < 12 ? { text: '¡Buen día', icon: Coffee, color: 'text-amber-500' } : 
                   hour < 18 ? { text: '¡Buenas tardes', icon: Sun, color: 'text-orange-500' } : 
                   { text: '¡Buenas noches', icon: Moon, color: 'text-indigo-500' }

  const userName = user?.displayName?.split(' ')[0] || user?.email?.split('@')[0] || 'Miembro VIP'

  return (
    <AppLayout>
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="space-y-10 pb-20"
      >
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-2">
           <div className="space-y-3">
              <motion.div 
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 5 }}
                className="flex items-center gap-2.5 bg-white w-fit px-4 py-1.5 rounded-full border border-slate-100 shadow-sm"
              >
                 <greeting.icon className={cn("w-3.5 h-3.5", greeting.color)} />
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{greeting.text}!</span>
              </motion.div>
              <div className="space-y-1 min-w-0">
                 <h1 className="text-3xl md:text-5xl font-black text-slate-900 font-display tracking-tightest leading-tight truncate">
                    Escritorio <span className="bg-gradient-to-br from-teal-500 to-teal-700 bg-clip-text text-transparent italic">{userName}</span>
                 </h1>
                 <p className="text-[11px] md:text-sm text-slate-500 font-semibold max-w-xl leading-relaxed opacity-70 uppercase tracking-widest">
                    Puntos de impacto hoy: <span className="text-teal-600 font-bold">{stats.messagesToday} envíos</span>
                 </p>
              </div>
           </div>
           
           <div className="flex gap-3">
              <button className="bg-white border-2 border-slate-50 text-slate-600 px-5 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2 shadow-lg active:scale-95">
                 <Target className="w-4 h-4 text-indigo-500" />
                 Ver Objetivos
              </button>
              <button className="btn-primary h-14 px-8 rounded-2xl group text-xs">
                 <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300 group-hover:rotate-12 transition-transform" />
                 Impulsar Ventas
              </button>
           </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           <MetricCard icon={Users} label="Total Clientes" value={stats.clients} trend="up" trendValue="+12%" colorClass="bg-teal-gradient" />
           <MetricCard icon={Zap} label="Impactos Hoy" value={stats.messagesToday} trend="up" trendValue="+8" colorClass="bg-indigo-gradient" />
           <MetricCard icon={Calendar} label="Programados" value={stats.scheduled} colorClass="bg-rose-gradient" />
           <MetricCard icon={TrendingUp} label="Conversión" value={`${stats.successRate}%`} trend="up" trendValue="+1.2%" colorClass="bg-slate-900" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
           
           {/* Activity Monitor */}
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between px-2">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 shadow-inner">
                       <Clock className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Monitor de Actividad</h2>
                 </div>
                 <button className="text-xs font-black text-teal-600 hover:text-teal-700 tracking-widest uppercase flex items-center gap-2 group">
                    Historial Completo <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                 </button>
              </div>

              <div className="space-y-4">
                 <AnimatePresence mode="popLayout">
                    {loading ? (
                       [1,2,3].map(i => <div key={i} className="h-24 bg-white/50 animate-pulse rounded-[32px] border border-slate-100" />)
                    ) : recentReminders.length > 0 ? (
                       recentReminders.map((reminder) => (
                          <motion.div 
                            layout
                            key={reminder.id}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="card-premium h-24 p-5 flex items-center justify-between border-slate-100 hover:border-teal-500/20 active:scale-98 transition-all relative overflow-hidden group shadow-lg"
                          >
                             <div className="flex items-center gap-6">
                                <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center font-black text-teal-600 text-xl border-4 border-white shadow-md relative overflow-hidden">
                                   {reminder.clientName[0]}
                                   <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />
                                </div>
                                <div>
                                   <p className="font-black text-slate-900 text-lg leading-none mb-1.5">{reminder.clientName}</p>
                                   <div className="flex items-center gap-2">
                                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estado:</span>
                                      <span className="text-[10px] font-black text-teal-600 uppercase tracking-widest bg-teal-50 px-2 py-0.5 rounded-full">Pendiente</span>
                                   </div>
                                </div>
                             </div>
                             <div className="flex items-center gap-6">
                                <div className="text-right">
                                   <p className="text-xl font-black text-slate-900 tabular-nums tracking-tighter">
                                      {new Date(reminder.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                                   </p>
                                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hoy</p>
                                </div>
                                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-teal-600 group-hover:text-white transition-all cursor-pointer shadow-sm">
                                   <ChevronRight className="w-6 h-6" />
                                </div>
                             </div>
                          </motion.div>
                       ))
                    ) : (
                       <div className="py-20 text-center bg-white border-2 border-dashed border-slate-100 rounded-[48px] space-y-4">
                          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
                             <Target className="w-8 h-8" />
                          </div>
                          <p className="text-slate-400 font-bold italic">No hay recordatorios tácticos en curso.</p>
                       </div>
                    )}
                 </AnimatePresence>
              </div>
           </div>

           {/* Asistente Card */}
           <div className="lg:col-span-4 space-y-8">
              <div className="card-gradient bg-slate-950 border-none relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent opacity-50" />
                 <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10">
                    <BellRing className="w-6 h-6 text-teal-400" />
                    Asistente VIP
                 </h3>
                 <div className="space-y-4 relative z-10">
                    <div className="p-5 rounded-[24px] bg-white/5 border border-white/10 group-hover:bg-white/10 transition-all cursor-pointer">
                       <p className="text-sm font-black text-teal-400 mb-1.5 uppercase tracking-widest">Estatus: 100% Ok</p>
                       <p className="text-xs text-slate-300 font-bold leading-relaxed opacity-80">El sistema de aislamiento de datos está blindado por UID personal.</p>
                    </div>
                    <div className="p-5 rounded-[24px] bg-indigo-500/10 border border-indigo-500/20 transition-all cursor-pointer">
                       <p className="text-sm font-black text-indigo-400 mb-1.5 uppercase tracking-widest flex items-center gap-2">
                          <Sparkles className="w-4 h-4" /> Tip Pro
                       </p>
                       <p className="text-xs text-slate-300 font-bold leading-relaxed opacity-80">Usa WhatsApp Web para una sincronización instantánea y sin costos.</p>
                    </div>
                 </div>
              </div>

              {/* Quick Messenger */}
              <div className="card-premium bg-white border-slate-100 shadow-2xl relative">
                 <div className="absolute -top-4 -right-4 w-12 h-12 bg-teal-gradient rounded-full flex items-center justify-center text-white shadow-xl rotate-12">
                    <Zap className="w-6 h-6" />
                 </div>
                 <h3 className="text-lg font-black text-slate-900 mb-4">Envío Táctico</h3>
                 <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-6 leading-tight">Acceso a plantillas de conversión.</p>
                 <div className="space-y-3">
                    {['Cobro Élite', 'Bienvenida PRO', 'Oferta VIP'].map(label => (
                       <button key={label} className="w-full py-4 px-5 bg-slate-50 rounded-2xl border border-slate-100 text-left hover:bg-teal-50 hover:border-teal-200 transition-all group flex items-center justify-between">
                          <span className="text-sm font-black text-slate-700 group-hover:text-teal-700">{label}</span>
                          <MessageSquare className="w-4 h-4 text-slate-300 group-hover:text-teal-500" />
                       </button>
                    ))}
                 </div>
              </div>
           </div>

        </div>
      </motion.div>
    </AppLayout>
  )
}

export default Dashboard
