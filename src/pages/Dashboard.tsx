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
  BellRing
} from 'lucide-react'
import AppLayout from '../components/layout/AppLayout'
import { cn } from '../utils/cn'

// Metric Card Component
const MetricCard = ({ 
  icon: Icon, 
  label, 
  value, 
  trend, 
  trendValue, 
  color 
}: { 
  icon: any, 
  label: string, 
  value: string | number, 
  trend?: 'up' | 'down', 
  trendValue?: string, 
  color: string 
}) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="card-premium h-full flex flex-col justify-between"
  >
    <div className="flex items-start justify-between mb-4">
      <div className={cn("p-3 rounded-2xl bg-opacity-10", color.replace('text-', 'bg-').replace('500', '500/10'))}>
        <Icon className={cn("w-6 h-6", color)} />
      </div>
      {trend && (
        <div className={cn(
          "flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full",
          trend === 'up' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
        )}>
          {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trendValue}
        </div>
      )}
    </div>
    <div>
      <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">{label}</h3>
      <p className="text-3xl font-bold text-slate-900 font-display">{value}</p>
    </div>
  </motion.div>
)

const Dashboard = () => {
  return (
    <AppLayout title="Panel de Control">
      <div className="space-y-10">
        
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            icon={Users} 
            label="Clientes Activos" 
            value="1,284" 
            trend="up" 
            trendValue="+12%" 
            color="text-teal-500" 
          />
          <MetricCard 
            icon={MessageSquare} 
            label="Mensajes Hoy" 
            value="42" 
            trend="up" 
            trendValue="+5" 
            color="text-sky-500" 
          />
          <MetricCard 
            icon={Calendar} 
            label="Programados" 
            value="18" 
            color="text-amber-500" 
          />
          <MetricCard 
            icon={TrendingUp} 
            label="Tasa de Éxito" 
            value="98.2%" 
            trend="up" 
            trendValue="+0.4%" 
            color="text-indigo-500" 
          />
        </div>

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
                {[1, 2, 3, 4, 5].map((i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, x: -10 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: i * 0.05 }}
                     className="glass p-4 rounded-3xl flex items-center justify-between border-slate-100 hover:border-teal-200 transition-all hover:bg-slate-50 relative overflow-hidden group shadow-sm hover:shadow-md cursor-pointer"
                   >
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center font-display font-bold text-slate-500 text-lg border-2 border-white shadow-sm ring-1 ring-slate-100 ring-offset-2">
                            {['JD', 'MS', 'AK', 'RL', 'VP'][i-1]}
                         </div>
                         <div>
                            <p className="font-bold text-slate-800 text-base leading-tight">Juan Delgado (VIP)</p>
                            <div className="flex items-center gap-3 mt-1">
                               <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                                  <Send className="w-3 h-3" /> Recordatorio mensual
                               </span>
                               <span className="w-1 h-1 bg-slate-300 rounded-full" />
                               <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">ENVIADO</span>
                            </div>
                         </div>
                      </div>
                      <div className="text-right flex flex-col items-end gap-1">
                         <p className="text-xs font-bold text-slate-500">hace {i * 15} min</p>
                         <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-teal-500/20" />
                            <div className="w-1.5 h-1.5 rounded-full bg-teal-500/20" />
                            <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                         </div>
                      </div>
                   </motion.div>
                ))}
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
