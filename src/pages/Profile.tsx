import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  Save, 
  Smartphone, 
  ShieldCheck,
  Zap,
  Globe,
  Mail,
  MapPin,
  Briefcase,
  Table as TableIcon
} from 'lucide-react'
import AppLayout from '../components/layout/AppLayout'
import { cn } from '../utils/cn'
import { useAuthStore } from '../store/authStore'
import { UserService, type UserProfileData } from '../services/firebase/firestore'
import toast from 'react-hot-toast'

const SectionTitle = ({ icon: Icon, title, subtitle, colorClass }: any) => (
  <div className="flex gap-6 mb-10">
     <div className={cn("w-14 h-14 rounded-[28px] flex items-center justify-center text-white shadow-xl shadow-slate-200/50", colorClass)}>
        <Icon className="w-7 h-7" />
     </div>
     <div className="pt-1.5">
        <h2 className="text-2xl font-black text-slate-900 font-display tracking-tight leading-none mb-1.5">{title}</h2>
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">{subtitle}</p>
     </div>
  </div>
)

const Profile = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'connections' | 'security'>('profile')
  const { user } = useAuthStore()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  const [formData, setFormData] = useState<Partial<UserProfileData>>({
    fullName: '',
    phone: '',
    city: '',
    companyName: '',
    website: '',
    bio: '',
    callMeBotPhone: '',
  })
  
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return
      try {
        const profile = await UserService.getUserProfile(user.uid)
        
        setFormData({
          fullName: profile?.fullName || user.displayName || '',
          phone: profile?.phone || '',
          city: profile?.city || '',
          companyName: profile?.companyName || '',
          website: profile?.website || '',
          bio: profile?.bio || '',
          callMeBotPhone: profile?.callMeBotPhone || '',
        })
      } catch (e) {
        console.error("Error loading profile", e)
      } finally {
        setLoading(false)
      }
    }
    loadProfile()
  }, [user])

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!user) return
    setSaving(true)
    const toastId = toast.loading('Guardando configuración táctica...')
    try {
      await UserService.updateUserProfile(user.uid, formData)
      toast.success('Perfil institucional actualizado 🏛️', { id: toastId })
    } catch (e) {
      toast.error('Fallo al guardar perfil', { id: toastId })
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  if (loading) return (
     <div className="flex flex-col items-center justify-center min-h-[600px] space-y-4">
        <div className="w-16 h-16 border-[6px] border-teal-500/10 border-t-teal-600 rounded-full animate-spin shadow-2xl" />
        <p className="text-sm font-black text-slate-400 uppercase tracking-widest animate-pulse">Cargando Inteligencia...</p>
     </div>
  )

  return (
    <AppLayout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 pt-4">
        
        {/* Profile Sidebar */}
        <div className="lg:col-span-4 space-y-8">
           <div className="card-premium p-4 shadow-2xl border-slate-100">
              <nav className="space-y-3">
                 {[
                    { id: 'profile', label: 'Indentidad Personal', icon: User, color: 'bg-teal-500' },
                    { id: 'connections', label: 'Ecosistema & Nube', icon: Zap, color: 'bg-indigo-500' },
                    { id: 'security', label: 'Seguridad de Datos', icon: ShieldCheck, color: 'bg-slate-900' },
                 ].map(item => (
                    <button 
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className={cn(
                        "w-full flex items-center gap-4 px-6 py-5 rounded-[24px] text-xs font-black uppercase tracking-widest transition-all",
                        activeTab === item.id ? "bg-slate-950 text-white shadow-2xl" : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                       <item.icon className={cn("w-5 h-5", activeTab === item.id ? "text-teal-400" : "")} />
                       {item.label}
                    </button>
                 ))}
              </nav>
           </div>
           
           <div className="card-premium h-[380px] flex flex-col items-center justify-center text-center relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-32 bg-slate-950" />
              <div className="absolute top-32 left-0 w-full h-full bg-gradient-to-b from-slate-50 to-white" />
              <div className="relative z-10 space-y-6">
                 <div className="w-32 h-32 rounded-[48px] bg-white border-4 border-white shadow-2xl overflow-hidden flex items-center justify-center mx-auto transition-transform group-hover:scale-105">
                    {user?.photoURL ? <img src={user.photoURL} alt="V" className="w-full h-full object-cover" /> : <User className="w-16 h-16 text-slate-200" />}
                 </div>
                 <div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">{formData.fullName || 'Usuario'}</h3>
                    <div className="flex flex-col gap-2 items-center">
                       <span className="text-[10px] font-black bg-teal-gradient text-white px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg">Miembro VIP Gold</span>
                       <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{user?.email}</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Dynamic Forms Area */}
        <div className="lg:col-span-8 space-y-8">
           <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                 <motion.form key="p" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8" onSubmit={handleSave}>
                    <div className="card-premium shadow-2xl border-slate-100">
                       <SectionTitle icon={User} title="Identidad Corporativa" subtitle="Configura tu presencia institucional." colorClass="bg-teal-gradient" />
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] ml-1">Nombre Completo</label>
                             <div className="relative"><User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="input-premium pl-14" placeholder="Ana María" />
                             </div>
                          </div>
                          <div className="space-y-3">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] ml-1">Email Principal</label>
                             <div className="relative"><Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                <input type="email" value={user?.email || ''} readOnly className="input-premium pl-14 bg-slate-50 opacity-60 cursor-not-allowed" />
                             </div>
                          </div>
                          <div className="space-y-3">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] ml-1">Empresa / Negocio</label>
                             <div className="relative"><Briefcase className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} className="input-premium pl-14" placeholder="Nombre de tu marca" />
                             </div>
                          </div>
                          <div className="space-y-3">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] ml-1">Ciudad Operativa</label>
                             <div className="relative"><MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="input-premium pl-14" placeholder="Ej. Madrid, ES" />
                             </div>
                          </div>
                       </div>
                    </div>
                    <div className="flex justify-end"><button type="submit" disabled={saving} className="btn-primary min-w-[280px] h-16 rounded-[28px] text-lg shadow-2xl">
                       {saving ? <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-6 h-6" />}
                       <span>Guardar Perfil Corporativo</span>
                    </button></div>
                 </motion.form>
              )}

              {activeTab === 'connections' && (
                 <motion.div key="c" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                    <div className="card-premium border-indigo-100 bg-indigo-50/20 shadow-none">
                       <SectionTitle icon={TableIcon} title="Nube Corporativa" subtitle="Sincronización Maestra Activa y Segura." colorClass="bg-indigo-gradient shadow-indigo-500/20 shadow-none" />
                       <p className="text-sm text-slate-600 font-bold leading-relaxed mb-10">
                          Tus datos están blindados en el servidor central administrado por el creador del ecosistema. No es necesario realizar configuraciones adicionales.
                       </p>
                       <div className="bg-white/80 p-8 rounded-[40px] border-2 border-indigo-50 flex items-center gap-8 group">
                          <div className="w-20 h-20 bg-indigo-gradient rounded-3xl flex items-center justify-center text-white shadow-xl rotate-6 transition-transform">
                             <Zap className="w-10 h-10" />
                          </div>
                          <div>
                             <p className="text-lg font-black text-slate-800 leading-none mb-2">Conectividad de Nivel Corporativo</p>
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Todos tus envíos se registran en la Tabla Maestra del sistema.</p>
                          </div>
                       </div>
                    </div>

                    <div className="card-premium shadow-2xl border-slate-100">
                       <SectionTitle icon={Smartphone} title="Terminal WhatsApp" subtitle="Configura tu número de envío principal." colorClass="bg-rose-gradient shadow-rose-500/20 shadow-none" />
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] ml-1">Tu Número WhatsApp</label>
                             <div className="relative"><Smartphone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                <input type="tel" name="callMeBotPhone" value={formData.callMeBotPhone} onChange={handleInputChange} placeholder="+593 9..." className="input-premium pl-14" />
                             </div>
                             <p className="text-[10px] text-slate-400 font-bold ml-2">Usa el formato internacional para una correcta sincronización.</p>
                          </div>
                       </div>
                    </div>
                    
                    <div className="flex justify-end"><button type="button" onClick={() => handleSave()} className="btn-primary min-w-[280px] h-16 rounded-[28px] text-lg">
                       <Zap className="w-6 h-6" />
                       <span>Activar Ecosistema</span>
                    </button></div>
                 </motion.div>
              )}

              {activeTab === 'security' && (
                 <motion.div key="s" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                    <div className="card-premium border-rose-100 bg-rose-50/10 shadow-none">
                       <SectionTitle icon={ShieldCheck} title="Privacidad & Datos" subtitle="Borrado integral de identidad." colorClass="bg-slate-900 shadow-none" />
                       <div className="p-8 bg-white border border-slate-100 rounded-[32px] space-y-6 shadow-xl">
                          <h4 className="text-lg font-black text-slate-900 leading-none">Zona de Peligro</h4>
                          <p className="text-sm text-slate-500 font-bold leading-relaxed">
                             Al eliminar tu cuenta, todos tus clientes y mensajes vinculados a tu ID de usuario se perderán para siempre en el servidor institucional.
                          </p>
                          <button 
                            type="button" 
                            onClick={async () => {
                               if (window.confirm('¿ELIMINAR TODO PERMANENTEMENTE? Esta acción no se puede deshacer.')) {
                                  const id = toast.loading('Borrando rastro digital...')
                                  try {
                                     await UserService.deleteUserAccount(user!.uid)
                                     toast.success('Cuenta eliminada.', { id })
                                     window.location.reload()
                                  } catch (e) {
                                     toast.error('Error en borrado.', { id })
                                  }
                               }
                            }}
                            className="h-16 px-10 bg-rose-500 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-rose-600 transition-all shadow-xl shadow-rose-500/20"
                          >
                             Eliminar mi cuenta e Información
                          </button>
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
