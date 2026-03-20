import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  MessageSquare, 
  Clock, 
  Save, 
  User, 
  Sparkles,
  Zap,
  Target,
  Smartphone,
  Plus
} from 'lucide-react'
import type { ClientData } from '../../services/firebase/firestore'
import { cn } from '../../utils/cn'
import toast from 'react-hot-toast'
import { useEffect } from 'react'

const messageSchema = z.object({
  name: z.string().min(3, 'Asunto institucional requerido'),
  text: z.string().min(5, 'El cuerpo del mensaje es muy corto'),
  type: z.enum(['once', 'recurring', 'manual']),
  clientId: z.string().min(1, 'Selecciona un destinatario'),
  scheduledAt: z.string().min(1, 'Define fecha y hora de lanzamiento'),
})

type MessageFormValues = z.infer<typeof messageSchema>

interface MessageModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: MessageFormValues) => Promise<void>
  clients: ClientData[]
  initialData?: any
  loading?: boolean
}

const MessageModal = ({ isOpen, onClose, onSubmit, clients, initialData, loading }: MessageModalProps) => {
  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<MessageFormValues>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      type: 'once',
      scheduledAt: new Date().toISOString().slice(0, 16)
    }
  })

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || '',
        text: initialData.messageText || '',
        type: initialData.type || 'once',
        clientId: initialData.clientId || '',
        scheduledAt: initialData.scheduledAt instanceof Date 
                     ? initialData.scheduledAt.toISOString().slice(0, 16) 
                     : new Date(initialData.scheduledAt).toISOString().slice(0, 16)
      })
    } else {
      reset({
        type: 'once',
        scheduledAt: new Date().toISOString().slice(0, 16)
      })
    }
  }, [initialData, reset, isOpen])

  const msgType = watch('type')

  const onFormSubmit = async (data: MessageFormValues) => {
    await onSubmit(data)
    reset()
  }

  const insertVariable = () => {
    const currentText = watch('text')
    setValue('text', currentText + ' {{nombre}} ')
    toast.success('Variable integrada')
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
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-[#F8FAFC] rounded-[48px] shadow-2xl z-[151] overflow-hidden border border-white/40"
          >
            <div className="flex flex-col md:flex-row h-full min-h-[600px]">
               {/* Decorative Sidebar */}
               <div className="w-full md:w-80 bg-slate-950 p-10 flex flex-col justify-between text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 blur-[100px] -mr-32 -mt-32" />
                  <div className="relative z-10 space-y-8">
                     <div className="w-16 h-16 bg-teal-gradient rounded-3xl flex items-center justify-center shadow-2xl">
                        <MessageSquare className="w-8 h-8 text-white" />
                     </div>
                     <div className="space-y-4">
                        <h2 className="text-3xl font-black font-display leading-[0.9] tracking-tightest">{initialData ? 'Refinar Despacho' : 'Nuevo Despacho'}</h2>
                        <p className="text-sm font-bold text-slate-400 opacity-80 leading-relaxed italic">
                           "La precisión en el mensaje define el éxito comercial."
                        </p>
                     </div>
                  </div>
                  
                  <div className="relative z-10 space-y-6">
                     <div className="p-6 bg-white/5 rounded-[32px] border border-white/10">
                        <div className="flex items-center gap-3 text-teal-400 mb-3">
                           <Sparkles className="w-5 h-5" />
                           <span className="text-[10px] font-black uppercase tracking-widest">Sugerencia VIP</span>
                        </div>
                        <p className="text-xs text-slate-300 font-medium leading-relaxed">
                           Personaliza cada impacto con la variable dinámica de nombre.
                        </p>
                     </div>
                  </div>
               </div>

               {/* Form Area */}
               <div className="flex-1 p-10 md:p-16 overflow-y-auto">
                  <button type="button" onClick={onClose} className="absolute right-10 top-10 p-4 bg-white rounded-full text-slate-300 hover:text-rose-500 shadow-xl border border-slate-100">
                     <X className="w-6 h-6" />
                  </button>

                  <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-10">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-3">
                           <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] ml-2">Asunto Estratégico</label>
                           <div className="relative group/input">
                              <Target className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within/input:text-teal-600 transition-colors" />
                              <input {...register('name')} placeholder="Ej. Campaña Navidad PRO" className="input-premium h-20 pl-16 text-lg" />
                           </div>
                           {errors.name && <p className="text-[10px] font-bold text-rose-500 ml-4">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-3">
                           <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] ml-2">Destinatario</label>
                           <div className="relative group/input">
                              <User className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within/input:text-indigo-600 transition-colors" />
                              <select {...register('clientId')} className="input-premium h-20 pl-16 text-lg appearance-none bg-white">
                                 <option value="">Selecciona un contacto...</option>
                                 {clients.map(c => <option key={c.id} value={c.id}>{c.name} ({c.whatsapp})</option>)}
                              </select>
                           </div>
                        </div>

                        <div className="space-y-3">
                           <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] ml-2">Protocolo</label>
                           <div className="relative">
                              <Zap className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300" />
                              <select {...register('type')} className="input-premium h-20 pl-16 text-lg appearance-none bg-white">
                                 <option value="once">Lanzamiento Único</option>
                                 <option value="recurring">Ciclo de Ventas</option>
                                 <option value="manual">Manual / Push</option>
                              </select>
                           </div>
                        </div>

                        <div className="space-y-3">
                           <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] ml-2">Programación</label>
                           <div className="relative group/input">
                              <Clock className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300" />
                              <input type="datetime-local" {...register('scheduledAt')} className="input-premium h-20 pl-16 text-lg" />
                           </div>
                        </div>
                     </div>

                     <div className="space-y-3">
                        <div className="flex justify-between items-end ml-2">
                           <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em]">Cuerpo del Mensaje</label>
                           <button type="button" onClick={insertVariable} className="text-[10px] font-black text-teal-600 bg-teal-50 px-4 py-2 rounded-xl border border-teal-100 flex items-center gap-2">
                              <Plus className="w-4 h-4" /> Insertar {'{{nombre}}'}
                           </button>
                        </div>
                        <textarea {...register('text')} rows={6} className="input-premium py-8 text-lg font-interface leading-relaxed" placeholder="Contenido táctico aquí..." />
                        {errors.text && <p className="text-[10px] font-bold text-rose-500 ml-4">Especifica un mensaje corporativo.</p>}
                     </div>

                     <div className="flex items-center justify-end gap-6 pt-10 border-t-2 border-slate-50">
                        <button type="button" onClick={onClose} className="text-sm font-black uppercase tracking-widest text-slate-400 hover:text-slate-950 transition-all">Abortar</button>
                        <button type="submit" disabled={loading} className="btn-primary h-20 min-w-[320px] rounded-[32px] text-xl">
                           {loading ? <div className="w-8 h-8 rounded-full border-4 border-white/40 border-t-white animate-spin" /> : <><Save className="w-6 h-6" /><span>{initialData ? 'Actualizar Envío' : 'Confirmar Lanzamiento'}</span></>}
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

export default MessageModal
