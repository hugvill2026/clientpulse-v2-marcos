import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  Building2, 
  Phone, 
  Mail, 
  Globe, 
  Camera, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  Smartphone, 
  Key, 
  ToggleLeft as Toggle,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  Zap
} from 'lucide-react'
import AppLayout from '../components/layout/AppLayout'
import { cn } from '../utils/cn'

const SectionTitle = ({ icon: Icon, title, subtitle }: { icon: any, title: string, subtitle: string }) => (
  <div className="flex gap-4 mb-8">
     <div className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-teal-600 shadow-sm shadow-slate-200/50">
        <Icon className="w-6 h-6" />
     </div>
     <div>
        <h2 className="text-xl font-bold text-slate-900 font-display">{title}</h2>
        <p className="text-xs text-slate-500 font-medium leading-relaxed">{subtitle}</p>
     </div>
  </div>
)

const Profile = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'billing' | 'security'>('profile')

  return (
    <AppLayout title="Mi Perfil">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-20">
        
        {/* Profile Navigation */}
        <div className="lg:col-span-3 space-y-4">
           <div className="card-premium p-4 shadow-none border-slate-200">
              <nav className="space-y-1">
                 {[
                    { id: 'profile', label: 'Información Personal', icon: User },
                    { id: 'notifications', label: 'Alertas y Notificaciones', icon: Zap },
                    { id: 'security', label: 'Seguridad y Acceso', icon: ShieldCheck },
                    { id: 'billing', label: 'Suscripción y Pagos', icon: CreditCard },
                 ].map(item => (
                    <button 
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all",
                        activeTab === item.id ? "bg-teal-600 text-white shadow-lg shadow-teal-500/20" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                       <item.icon className="w-4 h-4" />
                       {item.label}
                    </button>
                 ))}
              </nav>
           </div>

           {/* User Summary Card */}
           <div className="card-premium h-[240px] flex flex-col items-center justify-center text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-slate-900 to-slate-800" />
              <div className="relative z-10 space-y-3">
                 <div className="relative group/avatar cursor-pointer">
                    <div className="w-24 h-24 rounded-[32px] bg-slate-100 border-4 border-white shadow-2xl overflow-hidden flex items-center justify-center">
                       <User className="w-12 h-12 text-slate-300" />
                    </div>
                    <div className="absolute inset-0 bg-slate-900/40 rounded-[32px] flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                       <Camera className="w-6 h-6 text-white" />
                    </div>
                 </div>
                 <div>
                    <h3 className="text-lg font-bold text-slate-900">Víctor Villegas</h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-teal-600">Pro Member</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Form Content */}
        <div className="lg:col-span-9 space-y-8">
           <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                 <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                 >
                    {/* Personal Info */}
                    <div className="card-premium">
                       <SectionTitle 
                          icon={User} 
                          title="Información Personal" 
                          subtitle="Actualiza tus datos básicos y la información de contacto de tu cuenta." 
                       />
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-1">
                             <label className="text-xs font-bold text-slate-500 ml-1">Nombre Completo</label>
                             <input type="text" defaultValue="Víctor Villegas" className="input-premium" />
                          </div>
                          <div className="space-y-1">
                             <label className="text-xs font-bold text-slate-500 ml-1">Email Principal</label>
                             <input type="email" defaultValue="hug.vill.2026@gmail.com" readOnly className="input-premium bg-slate-50 text-slate-400" />
                          </div>
                          <div className="space-y-1">
                             <label className="text-xs font-bold text-slate-500 ml-1">Número de Teléfono</label>
                             <input type="tel" defaultValue="+593 912 345 678" className="input-premium" />
                          </div>
                          <div className="space-y-1">
                             <label className="text-xs font-bold text-slate-500 ml-1">Ciudad / Región</label>
                             <input type="text" defaultValue="Guayaquil" className="input-premium" />
                          </div>
                       </div>
                    </div>

                    {/* Company Info */}
                    <div className="card-premium">
                       <SectionTitle 
                          icon={Building2} 
                          title="Tu Negocio" 
                          subtitle="Información sobre tu empresa para personalizar tus envíos y perfiles." 
                       />
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-1">
                             <label className="text-xs font-bold text-slate-500 ml-1">Nombre de la Empresa</label>
                             <input type="text" defaultValue="Global Financial Intelligence" className="input-premium" />
                          </div>
                          <div className="space-y-1">
                             <label className="text-xs font-bold text-slate-500 ml-1">Sitio Web</label>
                             <div className="relative">
                                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input type="url" defaultValue="https://www.gfi.com" className="input-premium pl-11" />
                             </div>
                          </div>
                          <div className="md:col-span-2 space-y-1">
                             <label className="text-xs font-bold text-slate-500 ml-1">Biografía / Descripción corta</label>
                             <textarea rows={3} className="input-premium py-4" defaultValue="Somos una empresa líder en análisis financiero y gestión inteligente de portafolios." />
                          </div>
                       </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center justify-end gap-4 pt-4">
                       <button className="btn-secondary">Cancelar</button>
                       <button className="btn-primary min-w-[160px] flex items-center justify-center gap-2">
                          <Save className="w-4 h-4" />
                          Guardar Cambios
                       </button>
                    </div>
                 </motion.div>
              )}

              {activeTab === 'notifications' && (
                 <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                 >
                    {/* WhatsApp Alert System */}
                    <div className="card-premium border-teal-100 bg-teal-50 shadow-none">
                       <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-white border border-teal-200 rounded-2xl flex flex-shrink-0 items-center justify-center text-teal-600 shadow-sm">
                             <Smartphone className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                             <div className="flex justify-between">
                                <div>
                                   <h3 className="text-lg font-bold text-slate-900 mb-1">Alertas de WhatsApp (CallMeBot)</h3>
                                   <p className="text-xs text-slate-500 font-medium">Recibe recordatorios en tu propio teléfono antes de gestionar tus clientes.</p>
                                </div>
                                <div className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold h-fit shadow-inner">
                                   <CheckCircle2 className="w-3 h-3" /> VERIFICADO
                                </div>
                             </div>

                             <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                   <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-widest leading-none">Tu número vinculado</label>
                                   <div className="flex items-center gap-2">
                                      <input type="tel" defaultValue="+593 912 345 678" className="input-premium shadow-none border-teal-200 focus:ring-teal-500/10 focus:border-teal-500" />
                                   </div>
                                </div>
                                <div className="space-y-1">
                                   <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-widest leading-none">CallMeBot API Key</label>
                                   <div className="relative group">
                                      <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-teal-500 transition-colors" />
                                      <input type="password" value="********" readOnly className="input-premium pl-11 shadow-none border-teal-200 cursor-default" />
                                      <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-teal-600 hover:text-teal-700 uppercase">Cambiar</button>
                                   </div>
                                </div>
                             </div>
                             
                             <div className="mt-8 p-4 bg-white/50 border border-teal-100/50 rounded-2xl flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                   <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-600">
                                      <Zap className="w-4 h-4" />
                                   </div>
                                   <div>
                                      <p className="text-xs font-bold text-slate-800">Alertas Automáticas Activadas</p>
                                      <p className="text-[10px] text-slate-400 font-medium">Te avisaremos 15 minutos antes de cada envío manual.</p>
                                   </div>
                                </div>
                                <button className="w-12 h-6 bg-teal-500 rounded-full flex items-center px-1 shadow-inner shadow-black/5"><div className="w-4 h-4 bg-white rounded-full shadow-md ml-auto" /></button>
                             </div>
                          </div>
                       </div>
                    </div>

                    {/* Email Config (EmailJS) */}
                    <div className="card-premium">
                       <SectionTitle 
                          icon={Mail} 
                          title="Notificaciones por Email" 
                          subtitle="Configura el sistema para recibir informes de actividad en tu correo." 
                       />
                       <div className="space-y-6">
                          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                             <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-xs ring-4 ring-white shadow-sm ring-inset">EJS</div>
                                <div>
                                   <p className="text-sm font-bold text-slate-800">EmailJS Service</p>
                                   <p className="text-xs text-slate-400 font-medium">Estado: Conectado satisfactoriamente</p>
                                </div>
                             </div>
                             <button className="text-xs font-bold text-sky-600 hover:text-sky-700">Editar configuración</button>
                          </div>
                          
                          <div className="space-y-4">
                             {[
                                { label: 'Resumen semanal de efectividad', desc: 'Informe detallado todos los lunes sobre tus envíos.' },
                                { label: 'Alertas de tasa de fallo', desc: 'Notificar si más del 5% de los envíos fallan en un día.' },
                                { label: 'Alertas de inicio de sesión', desc: 'Notificar cada vez que se acceda desde un nuevo dispositivo.' }
                             ].map((opt, i) => (
                                <div key={i} className="flex items-center justify-between py-2 group cursor-pointer hover:bg-slate-50 px-2 rounded-xl transition-all">
                                   <div>
                                      <p className="text-sm font-bold text-slate-700">{opt.label}</p>
                                      <p className="text-xs text-slate-400 font-medium">{opt.desc}</p>
                                   </div>
                                   <button className="w-10 h-5 bg-slate-200 rounded-full flex items-center px-0.5 group-hover:bg-slate-300 transition-colors"><div className={cn("w-4 h-4 bg-white rounded-full shadow-sm", i === 0 ? "ml-auto bg-teal-500" : "")} /></button>
                                </div>
                             ))}
                          </div>
                       </div>
                    </div>
                 </motion.div>
              )}
           </AnimatePresence>
        </div>
      </div>
    </AppLayout>
  )
}

export default Profile
