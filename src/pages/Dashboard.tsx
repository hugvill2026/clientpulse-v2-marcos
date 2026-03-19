import React from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  ChevronRight,
  Send,
  BellRing,
  Sparkles,
  Sun,
  Moon,
  Coffee,
  Lightbulb
} from 'lucide-react'
import AppLayout from '../components/layout/AppLayout'
import { cn } from '../utils/cn'
import { useAuthStore } from '../store/authStore'
import { ClientService, ReminderService } from '../services/firebase/firestore'

// Metric Card Component
const MetricCard = ({ 
  icon: Icon, 
  label, 
  value, 
  trend, 
  trendValue, 
  color,
  bgGradient 
}: { 
  icon: any, 
  label: string, 
  value: string | number, 
  trend?: 'up' | 'down', 
  trendValue?: string, 
  color: string,
  bgGradient: string
}) => (
  <motion.div 
    whileHover={{ y: -5, scale: 1.02 }}
    className={cn("card-premium h-full flex flex-col justify-between relative overflow-hidden group", bgGradient)}
  >
    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 blur-3xl -mr-8 -mt-8 group-hover:bg-white/20 transition-all" />
    <div className="flex items-start justify-between mb-4 relative z-10">
      <div className={cn("p-3 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30")}>
        <Icon className={cn("w-6 h-6 text-white")} />
      </div>
      {trend && (
        <div className={cn(
          "flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg backdrop-blur-md",
          trend === 'up' ? "bg-emerald-400/20 text-emerald-100" : "bg-rose-400/20 text-rose-100"
        )}>
          {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trendValue}
        </div>
      )}
    </div>
    <div className="relative z-10">
      <h3 className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{label}</h3>
      <p className="text-3xl font-black text-white font-display tracking-tight">{value}</p>
    </div>
  </motion.div>
)

const Dashboard = () => {
  const { user } = useAuthStore()
  const [stats, setStats] = React.useState({
    clients: 0,
    messagesToday: 0,
    scheduled: 0,
    successRate: 98.2
  })
  const [recentReminders, setRecentReminders] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)
  const hour = new Date().getHours()

  React.useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return
      try {
        const clients = await ClientService.getClients(user.uid)
        const pending = await ReminderService.getPendingReminders(user.uid)
        
        setStats(prev => ({
          ...prev,
          clients: clients.length,
          scheduled: pending.length
        }))

        // Get some "recent" reminders (sent or pending)
        // For now, just show the pending ones as activity
        setRecentReminders(pending.slice(0, 5))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchDashboardData()
  }, [user])
  
  const getGreeting = () => {
    if (hour < 12) return { text: '¡Buen día', icon: Coffee }
    if (hour < 18) return { text: '¡Buenas tardes', icon: Sun }
    return { text: '¡Buenas noches', icon: Moon }
  }

  const greeting = getGreeting()

  return (
    <AppLayout title="Panel de Control">
      <div className="space-y-10 pb-10">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
           <div className="space-y-3">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 text-teal-600 font-black uppercase tracking-[0.3em] text-[10px]"
              >
                 <greeting.icon className="w-4 h-4" />
                 {greeting.text}!
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 font-display tracking-tight leading-none">
                 Hola, {user?.name?.split(' ')[0] || 'Marcos'} <span className="text-teal-500">👋</span>
              </h1>
              <p className="text-slate-500 font-interface text-lg max-w-xl leading-relaxed">
                 Hoy tienes <span className="text-slate-900 font-bold">18 recordatorios pendientes</span>. Tu negocio está en movimiento y nosotros estamos aquí para ayudarte.
              </p>
           </div>
           <button className="btn-primary h-14 px-8 flex items-center justify-center gap-3 shadow-xl shadow-teal-500/30">
              <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300" />
              <span>Ver Sugerencias hoy</span>
           </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            icon={Users} 
            label="Clientes Activos" 
            value={stats.clients} 
            trend="up" 
            trendValue="+12%" 
            color="text-teal-500" 
            bgGradient="bg-gradient-to-br from-teal-500 to-teal-700"
          />
          <MetricCard 
            icon={MessageSquare} 
            label="Mensajes Hoy" 
            value={stats.messagesToday} 
            trend="up" 
            trendValue="+5" 
            color="text-sky-500" 
            bgGradient="bg-gradient-to-br from-sky-500 to-sky-700"
          />
          <MetricCard 
            icon={Calendar} 
            label="Programados" 
            value={stats.scheduled} 
            color="text-amber-500" 
            bgGradient="bg-gradient-to-br from-amber-500 to-amber-700"
          />
          <MetricCard 
            icon={TrendingUp} 
            label="Tasa de Éxito" 
            value={`${stats.successRate}%`} 
            trend="up" 
            trendValue="+0.4%" 
            color="text-indigo-500" 
            bgGradient="bg-gradient-to-br from-indigo-500 to-indigo-700"
          />
        </div>

        {/* Coach Card - Didactic Element */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="bg-white border-2 border-dashed border-teal-100 rounded-[40px] p-8 flex flex-col md:flex-row items-center gap-8 group hover:border-teal-300 transition-colors"
        >
           <div className="w-20 h-20 bg-teal-50 rounded-3xl flex items-center justify-center text-teal-600 shadow-inner group-hover:scale-110 transition-transform">
              <Lightbulb className="w-10 h-10" />
           </div>
           <div className="flex-1 space-y-2 text-center md:text-left">
              <h3 className="text-xl font-bold text-slate-800">Tip de ClientPulse Coach:</h3>
              <p className="text-slate-500 text-base leading-relaxed">
                 ¿Sabías que los mensajes enviados entre las <span className="text-teal-600 font-bold">10:00 AM y 11:30 AM</span> tienen una tasa de respuesta un 40% superior? Prueba programar tus recordatorios VIP en este horario.
              </p>
           </div>
           <button className="bg-slate-900 text-white px-8 py-4 rounded-[20px] font-bold text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10">
              Personalizar horarios
           </button>
        </motion.div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Recent Activity List */}
          <div className="lg:col-span-8 space-y-6">
             <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                   <Clock className="w-5 h-5 text-teal-500" />
                   Actividad reciente
                </h2>
                <button className="text-sm font-bold text-teal-600 hover:text-teal-700 transition-colors flex items-center gap-1">
                   Ver todo <ChevronRight className="w-4 h-4" />
                </button>
             </div>

             <div className="space-y-4">
                {loading ? (
                   [1,2,3].map(i => <div key={i} className="h-20 bg-slate-100 animate-pulse rounded-3xl" />)
                ) : recentReminders.length > 0 ? (
                   recentReminders.map((reminder, i) => (
                      <motion.div 
                        key={reminder.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="glass p-4 rounded-3xl flex items-center justify-between border-slate-100 hover:border-teal-200 transition-all hover:bg-slate-50 relative overflow-hidden group shadow-sm hover:shadow-md cursor-pointer"
                      >
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center font-display font-bold text-teal-600 text-lg border-2 border-white shadow-sm">
                               {reminder.clientName.charAt(0)}
                            </div>
                            <div>
                               <p className="font-bold text-slate-800 text-base leading-tight">{reminder.clientName}</p>
                               <div className="flex items-center gap-3 mt-1">
                                  <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                                     <Clock className="w-3 h-3" /> {reminder.status === 'pending' ? 'Pendiente' : 'Enviado'}
                                  </span>
                                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                  <span className={cn(
                                     "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full",
                                     reminder.status === 'pending' ? "text-amber-500 bg-amber-50" : "text-emerald-500 bg-emerald-50"
                                  )}>
                                     {reminder.status === 'pending' ? 'PRÓXIMO' : 'ENVIADO'}
                                  </span>
                               </div>
                            </div>
                         </div>
                         <div className="text-right">
                            <p className="text-xs font-bold text-slate-500">{new Date(reminder.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                         </div>
                      </motion.div>
                   ))
                ) : (
                   <div className="p-8 text-center border-2 border-dashed border-slate-100 rounded-[32px]">
                      <p className="text-slate-400 font-medium italic">No hay actividad reciente aún.</p>
                   </div>
                )}
             </div>
          </div>

          {/* Right Sidebar - System Alerts & Quick Tools */}
          <div className="lg:col-span-4 space-y-6">
             <div className="card-premium bg-slate-900 border-none text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/20 blur-3xl -mr-12 -mt-12" />
                <h3 className="text-lg font-bold mb-4 flex items-center gap-3">
                   <BellRing className="w-5 h-5 text-teal-400" />
                   Alertas del sistema
                </h3>
                <div className="space-y-4">
                   <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors pointer-cursor">
                      <p className="text-sm font-bold text-teal-400 mb-1">WhatsApp no configurado</p>
                      <p className="text-xs text-slate-400 leading-relaxed font-medium">Vincula tu número para empezar a recibir notificaciones directas.</p>
                      <button className="mt-3 text-xs font-bold text-white flex items-center gap-1 hover:underline underline-offset-4">
                         Configurar ahora <ChevronRight className="w-4 h-4" />
                      </button>
                   </div>
                   <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors pointer-cursor">
                      <p className="text-sm font-bold text-sky-400 mb-1">Tutorial pendiente</p>
                      <p className="text-xs text-slate-400 leading-relaxed font-medium">Aprende a sacarle el máximo provecho a ClientPulse en 2 minutos.</p>
                      <button className="mt-3 text-xs font-bold text-white flex items-center gap-1 hover:underline underline-offset-4">
                         Ver tutorial <ChevronRight className="w-4 h-4" />
                      </button>
                   </div>
                </div>
             </div>

             {/* Quick Actions / Mini Calendar Preview */}
             <div className="card-premium">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Próximos envíos</h3>
                <div className="space-y-3">
                   {[10, 11, 14].map(time => (
                      <div key={time} className="flex items-center gap-4 group cursor-pointer p-2 rounded-2xl hover:bg-slate-50 transition-all">
                         <div className="w-16 text-right">
                            <span className="text-xs font-bold text-slate-400">{time}:00</span>
                         </div>
                         <div className={cn("flex-1 p-3 rounded-2xl border-l-[4px] bg-slate-50 border-teal-500 group-hover:bg-white group-hover:shadow-sm transition-all")}>
                            <p className="text-xs font-bold text-slate-800 line-clamp-1">Actualización VIP Mensual</p>
                            <p className="text-[10px] text-slate-400 font-medium">Categoría: Premium</p>
                         </div>
                      </div>
                   ))}
                </div>
                <button className="w-full mt-6 py-3 border border-slate-200 rounded-2xl text-slate-500 font-bold text-xs hover:bg-slate-50 hover:text-slate-800 transition-all">
                   Ver calendario completo
                </button>
             </div>
          </div>

        </div>
      </div>
    </AppLayout>
  )
}

export default Dashboard
