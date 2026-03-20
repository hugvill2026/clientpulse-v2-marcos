import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  User, 
  Phone, 
  Mail, 
  Building2, 
  MapPin, 
  Zap, 
  ShieldCheck, 
  Save, 
  Target,
  Briefcase
} from 'lucide-react'
import { cn } from '../../utils/cn'

const clientSchema = z.object({
  name: z.string().min(3, 'Nombre institucional requerido'),
  whatsapp: z.string().min(10, 'Canal de WhatsApp inválido'),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  company: z.string().optional(),
  city: z.string().optional(),
  category: z.string().min(1, 'Define una categoría estratégica'),
  priority: z.enum(['alta', 'media', 'baja']),
  notes: z.string().optional(),
})

type ClientFormValues = z.infer<typeof clientSchema>

interface ClientModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ClientFormValues) => Promise<void>
  initialData?: Partial<ClientFormValues>
  loading?: boolean
}

const ClientModal = ({ isOpen, onClose, onSubmit, initialData, loading }: ClientModalProps) => {
  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: initialData || {
      priority: 'media',
      category: 'Prospectos'
    }
  })

  const currentPriority = watch('priority')

  const onFormSubmit = async (data: ClientFormValues) => {
    await onSubmit(data)
    reset()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-950/40 backdrop-blur-xl z-[150]" onClick={onClose} />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl max-h-[90vh] bg-[#F8FAFC] rounded-[48px] shadow-[0_32px_128px_rgba(0,0,0,0.2)] z-[151] overflow-hidden border border-white/40 flex flex-col md:flex-row"
          >
            <div className="flex flex-col md:flex-row w-full h-full overflow-hidden">
               {/* Corporate Identity Sidebar */}
               <div className="w-full md:w-96 bg-slate-950 p-12 flex flex-col justify-between text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/20 blur-[120px] -mr-40 -mt-40" />
                  <div className="relative z-10 space-y-10">
                     <div className="w-20 h-20 bg-teal-gradient rounded-[32px] flex items-center justify-center shadow-2xl shadow-teal-500/20 rotate-3">
                        <User className="w-10 h-10 text-white fill-white" />
                     </div>
                     <div className="space-y-4">
                        <h2 className="text-4xl font-black font-display leading-[0.9] tracking-tightest">Gestión de Directorio</h2>
                        <p className="text-sm font-bold text-slate-400 opacity-80 leading-relaxed italic">
                           "Cada dato es una oportunidad de conexión de alto impacto."
                        </p>
                     </div>
                  </div>
                  
                  <div className="relative z-10 space-y-8">
                     <div className="p-8 bg-white/5 rounded-[40px] border border-white/10 flex items-center gap-6">
                        <ShieldCheck className="w-12 h-12 text-teal-400 flex-shrink-0" />
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-relaxed">
                           Datos protegidos por cifrado end-to-end.<br/>Sincronización segura con Google Sheets activada.
                        </p>
                     </div>
                  </div>
               </div>

               {/* Institutional Form */}
               <div className="flex-1 p-8 md:p-14 overflow-y-auto custom-scrollbar">
                  <button onClick={onClose} className="absolute right-12 top-12 p-5 bg-white rounded-full text-slate-300 hover:text-rose-500 shadow-2xl shadow-slate-200/50 hover:scale-110 active:scale-90 transition-all border border-slate-100">
                     <X className="w-7 h-7" />
                  </button>

                  <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-12">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Name Input */}
                        <div className="space-y-3">
                           <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] ml-2">Nombre Completo</label>
                           <div className="relative group/input">
                              <User className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within/input:text-teal-600 transition-colors" />
                              <input {...register('name')} placeholder="Ana Mercedes" className="input-premium h-20 pl-16 text-lg" />
                           </div>
                           {errors.name && <p className="text-[10px] font-bold text-rose-500 ml-4">{errors.name.message}</p>}
                        </div>

                        {/* WhatsApp Input */}
                        <div className="space-y-3">
                           <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] ml-2">Canal WhatsApp (Lanzamiento)</label>
                           <div className="relative group/input">
                              <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within/input:text-emerald-600 transition-colors" />
                              <input {...register('whatsapp')} placeholder="+593 9..." className="input-premium h-20 pl-16 text-lg font-display tabular-nums" />
                           </div>
                           {errors.whatsapp && <p className="text-[10px] font-bold text-rose-500 ml-4">{errors.whatsapp.message}</p>}
                        </div>

                        <div className="space-y-3">
                           <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] ml-2">Correo Corporativo</label>
                           <div className="relative">
                              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300" />
                              <input type="email" {...register('email')} placeholder="contacto@empresa.pro" className="input-premium h-20 pl-16 text-lg" />
                           </div>
                        </div>

                        <div className="space-y-3">
                           <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] ml-2">Asociación Empresarial</label>
                           <div className="relative">
                              <Briefcase className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300" />
                              <input {...register('company')} placeholder="Sector o Marca" className="input-premium h-20 pl-16 text-lg" />
                           </div>
                        </div>

                        <div className="space-y-3">
                           <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] ml-2">Segmentación Estratégica</label>
                           <div className="relative">
                              <Target className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300" />
                              <select {...register('category')} className="input-premium h-20 pl-16 text-lg appearance-none bg-white">
                                 <option value="Prospectos">Prospectos Nuevos</option>
                                 <option value="Premium (VIP)">Socios Premium VIP</option>
                                 <option value="Empresas">Cuentas Corporativas</option>
                                 <option value="E-commerce">Canales de Venta Online</option>
                              </select>
                           </div>
                        </div>

                        <div className="space-y-3">
                           <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] ml-2">Prioridad de Atención</label>
                           <div className="flex h-20 bg-slate-100 rounded-[28px] p-2 border-2 border-slate-50 relative overflow-hidden">
                              {(['alta', 'media', 'baja'] as const).map(p => (
                                 <button
                                   key={p}
                                   type="button"
                                   onClick={() => setValue('priority', p)}
                                   className={cn(
                                      "flex-1 rounded-[22px] text-[11px] font-black uppercase tracking-widest transition-all relative z-10 flex items-center justify-center gap-2",
                                      currentPriority === p ? "bg-white text-slate-900 shadow-xl" : "text-slate-400 hover:text-slate-600"
                                   )}
                                 >
                                    <div className={cn("w-2 h-2 rounded-full", p === 'alta' ? 'bg-rose-500' : p === 'media' ? 'bg-amber-500' : 'bg-teal-500')} />
                                    {p}
                                 </button>
                              ))}
                           </div>
                        </div>
                     </div>

                     <div className="space-y-3">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] ml-2">Notas Tácticas</label>
                        <textarea {...register('notes')} rows={4} className="input-premium py-8 text-lg font-interface leading-relaxed" placeholder="Resumen estratégico de este contacto..." />
                     </div>

                     <div className="flex items-center justify-end gap-10 pt-12 border-t-2 border-slate-50">
                        <button type="button" onClick={onClose} className="text-sm font-black uppercase tracking-widest text-slate-300 hover:text-slate-950 transition-all">Cancelar Registro</button>
                        <button type="submit" disabled={loading} className="btn-primary h-20 min-w-[350px] rounded-[32px] text-xl shadow-2xl shadow-teal-500/30">
                           {loading ? <div className="w-8 h-8 rounded-full border-4 border-white/30 border-t-white animate-spin" /> : <><Save className="w-6 h-6" /><span>{initialData ? 'Actualizar Identidad' : 'Consolidar Registro'}</span></>}
                        </button>
                     </div>
                  </form>
               </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ClientModal
