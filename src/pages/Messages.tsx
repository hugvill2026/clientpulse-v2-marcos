import AppLayout from '../components/layout/AppLayout'
import { cn } from '../utils/cn'
import { useAuthStore } from '../store/authStore'
import { ReminderService, ClientService, UserService, type ReminderData, type ClientData } from '../services/firebase/firestore'
import { GoogleSheetsService } from '../services/googleSheets.service'
import MessageModal from '../components/messages/MessageModal'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { 
  Target,
  X,
  Clock, 
  Plus, 
  Trash, 
  Zap,
  Smartphone,
  Mail,
  Send as Telegram,
  TrendingUp,
  Edit2,
  Image as ImageIcon
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

const MessageCard = ({ msg, onDelete, onEdit }: { msg: ReminderData, onDelete: (id: string) => void, onEdit: (msg: ReminderData) => void }) => {
  const isSent = msg.status === 'sent'

  const handleLaunchChannel = (channel: 'whatsapp' | 'telegram' | 'email') => {
    let finalMessage = msg.messageText.replace(/{{nombre}}/gi, msg.clientName)
    if (msg.messageImage) finalMessage += `\n\n🖼️ Imagen: ${msg.messageImage}`
    if (msg.messageVideo) finalMessage += `\n\n🎥 Video: ${msg.messageVideo}`
    if (msg.messagePdf) finalMessage += `\n\n📄 PDF: ${msg.messagePdf}`
    if (msg.messageZip) finalMessage += `\n\n📦 Archivo: ${msg.messageZip}`
    
    const cleanPhone = msg.clientWhatsapp.replace(/\D/g, '')

    if (channel === 'whatsapp') {
       const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(finalMessage)}`
       window.open(url, '_blank')
       toast.success('Lanzando WhatsApp...', { icon: '🚀' })
    } else if (channel === 'telegram') {
       const url = `https://t.me/share/url?url=${encodeURIComponent(msg.messageImage || msg.messageVideo || '')}&text=${encodeURIComponent(finalMessage)}`
       window.open(url, '_blank')
       toast.success('Lanzando Telegram...', { icon: '✈️' })
    } else if (channel === 'email') {
       const url = `mailto:?subject=Impacto de ClientPulse&body=${encodeURIComponent(finalMessage)}`
       window.open(url, '_blank')
       toast.success('Preparando Email...', { icon: '📧' })
    }

    ReminderService.updateReminderStatus(msg.id!, 'sent')
  }

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "card-premium h-full min-h-[500px] flex flex-col justify-between group border-2 border-slate-100 hover:border-teal-500/30 transition-all shadow-xl relative overflow-hidden bg-white/50 backdrop-blur-sm",
        isSent ? "opacity-80 grayscale-[0.2]" : "opacity-100"
      )}
    >
      <div className={cn("absolute top-0 right-0 w-32 h-32 blur-[60px] -mr-16 -mt-16 opacity-10", isSent ? "bg-slate-500" : "bg-teal-500")} />
      
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-4">
          <div className="w-16 h-16 rounded-[24px] flex items-center justify-center font-black text-2xl border-4 border-white shadow-xl bg-teal-gradient text-white">
            {msg.clientName[0]}
          </div>
          <div className="pt-1">
            <h3 className="text-lg font-black text-slate-900 leading-tight mb-1 line-clamp-1">{msg.clientName}</h3>
            <div className="flex items-center gap-2">
               <span className="text-[10px] font-black text-slate-400 tracking-[0.15em] uppercase">
                  {msg.scheduledAt instanceof Date ? format(msg.scheduledAt, 'MMM d, p', { locale: es }) : 'Programado'}
               </span>
               <div className={cn("w-1.5 h-1.5 rounded-full", isSent ? "bg-slate-400" : "bg-teal-500 animate-pulse")} />
            </div>
          </div>
        </div>
        <div className="flex gap-1">
           <button onClick={() => onEdit(msg)} className="p-3 text-slate-300 hover:text-teal-500 hover:bg-teal-50 rounded-xl transition-all"><Edit2 className="w-5 h-5" /></button>
           <button onClick={() => onDelete(msg.id!)} className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"><Trash className="w-5 h-5" /></button>
        </div>
      </div>

      <div className="flex-1 my-6 relative overflow-hidden p-6 bg-slate-50/80 rounded-[40px] border border-slate-100/50 shadow-inner group-hover:bg-white transition-all min-h-[180px] flex flex-col items-center justify-center text-center space-y-4">
         {msg.messageImage && (
           <div className="w-full h-32 rounded-2xl overflow-hidden border-2 border-white shadow-md mb-2">
              <img src={msg.messageImage} alt="M" className="w-full h-full object-cover" />
           </div>
         )}
         <div className="flex gap-2 mb-2">
            {msg.messageVideo && <div className="w-8 h-8 bg-sky-100 text-sky-600 rounded-lg flex items-center justify-center" title="Video Incuído"><Zap className="w-4 h-4" /></div>}
            {msg.messagePdf && <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center" title="PDF Incluído"><Target className="w-4 h-4" /></div>}
            {msg.messageZip && <div className="w-8 h-8 bg-slate-200 text-slate-700 rounded-lg flex items-center justify-center" title="Archivo Incluído"><X className="w-4 h-4" /></div>}
         </div>
         <p className="text-sm text-slate-600 font-interface leading-relaxed italic w-full font-medium">
            "{msg.messageText.replace('{{nombre}}', msg.clientName)}"
          </p>
      </div>

      <div className="space-y-5 pt-8 border-t border-slate-50 relative z-10">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center"><Clock className="w-4 h-4" /></div>
              <span className="text-[10px] font-black tracking-widest uppercase text-slate-400">Canal de Impacto</span>
           </div>
           <span className={cn(
             "px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase",
             isSent ? "bg-slate-100 text-slate-500" : "bg-teal-100 text-teal-700 shadow-lg shadow-teal-500/10"
           )}>
             {isSent ? 'Despachado' : 'Pendiente'}
           </span>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
           <button 
             onClick={() => handleLaunchChannel('whatsapp')}
             className="col-span-2 h-16 bg-emerald-gradient text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl hover:scale-105 transition-all group"
           >
              <Smartphone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              WhatsApp
           </button>
           <button 
             onClick={() => handleLaunchChannel('telegram')}
             className="h-16 bg-sky-500 text-white rounded-2xl flex items-center justify-center hover:scale-105 transition-all shadow-xl group"
           >
              <Telegram className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
           </button>
           <button 
             onClick={() => handleLaunchChannel('email')}
             className="h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:scale-105 transition-all shadow-xl group"
           >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
           </button>
        </div>
      </div>
    </motion.div>
  )
}

const Messages = () => {
  const { user } = useAuthStore()
  const [reminders, setReminders] = useState<ReminderData[]>([])
  const [clients, setClients] = useState<ClientData[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingMsg, setEditingMsg] = useState<ReminderData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [filter, setFilter] = useState<'all' | 'pending' | 'sent'>('all')

  const fetchData = async () => {
    if (!user) return
    try {
      const [remData, cliData] = await Promise.all([
        ReminderService.getPendingReminders(user.uid),
        ClientService.getClients(user.uid)
      ])
      setReminders(remData)
      setClients(cliData)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [user])

  const handleCreateOrUpdateReminder = async (formData: any) => {
    if (!user) return
    setSaving(true)
    const toastId = toast.loading(editingMsg ? 'Actualizando despacho...' : 'Calculando ruta táctica...')
    try {
      const client = clients.find(c => c.id === formData.clientId)
      if (!client) throw new Error('Cliente no identificado')

      const payload = {
        ...formData,
        userId: user.uid,
        clientName: client.name,
        clientWhatsapp: client.whatsapp,
        messageText: formData.text,
        messageImage: formData.imageUrl || '',
        messageVideo: formData.videoUrl || '',
        messagePdf: formData.pdfUrl || '',
        messageZip: formData.zipUrl || '',
        scheduledAt: new Date(formData.scheduledAt)
      }

      if (editingMsg) {
        await ReminderService.updateReminder(editingMsg.id!, payload)
        toast.success('Envío actualizado institucionalmente 🏛️', { id: toastId })
      } else {
        await ReminderService.createReminder(payload)
        const profile = await UserService.getUserProfile(user.uid)
        await GoogleSheetsService.sync(profile?.googleSheetsUrl, 'REMINDER', {
           userId: user.uid,
           clientName: client.name,
           text: formData.text,
           imageUrl: formData.imageUrl,
           videoUrl: formData.videoUrl,
           pdfUrl: formData.pdfUrl,
           zipUrl: formData.zipUrl,
           scheduledAt: formData.scheduledAt
        })
        toast.success('Programación en la nube activa ☁️', { id: toastId })
      }
      
      fetchData()
      setIsModalOpen(false)
      setEditingMsg(null)
    } catch (e) {
      toast.error('Fallo técnico al programar.', { id: toastId })
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteReminder = async (id: string) => {
    if (!window.confirm('¿Abortar este envío?')) return
    try {
      await ReminderService.deleteReminder(id)
      toast.success('Operación eliminada')
      fetchData()
    } catch (e) {
      toast.error('Error al limpiar')
    }
  }

  const filteredReminders = reminders.filter(r => filter === 'all' || r.status === filter)

  return (
    <AppLayout>
      <div className="space-y-12 pb-20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pt-4">
           <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3 bg-white w-fit px-4 py-2 rounded-full border border-slate-100 shadow-sm">
                 <Zap className="w-4 h-4 text-teal-600" />
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Despacho Táctico Maestro</span>
              </div>
              <h1 className="text-5xl font-black text-slate-900 font-display tracking-tightest leading-none">
                 Centro de <span className="bg-gradient-to-br from-indigo-500 to-indigo-700 bg-clip-text text-transparent italic">Mensajes</span>
              </h1>
           </div>
           
           <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex bg-white border-2 border-slate-100 rounded-[28px] p-2 shadow-xl h-20 items-center px-4">
                 {[
                   { id: 'all', label: 'Historial', color: 'bg-slate-900' },
                   { id: 'pending', label: 'En Cola', color: 'bg-teal-600' },
                   { id: 'sent', label: 'Efectivos', color: 'bg-emerald-600' }
                 ].map(f => (
                    <button key={f.id} onClick={() => setFilter(f.id as any)} className={cn("px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all h-12 flex items-center justify-center", filter === f.id ? cn(f.color, "text-white shadow-lg") : "text-slate-400 hover:text-slate-600")}>{f.label}</button>
                 ))}
              </div>
              <button onClick={() => { setEditingMsg(null); setIsModalOpen(true); }} className="btn-primary h-20 px-10 rounded-[32px] group"><Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" /><span>Programar Envío</span></button>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
           {[
             { label: 'Multimedia', icon: ImageIcon, val: 'ACTIVE', color: 'text-rose-500' },
             { label: 'Telegram', icon: Telegram, val: '84%', color: 'text-sky-500' },
             { label: 'Email', icon: Mail, val: '72%', color: 'text-slate-800' },
             { label: 'Impacto', icon: TrendingUp, val: '+24%', color: 'text-white', bg: 'bg-teal-gradient' }
           ].map(stat => (
              <div key={stat.label} className={cn("card-premium h-32 flex flex-col justify-between border-slate-100 shadow-xl", stat.bg)}>
                 <div className={cn("flex items-center gap-3", stat.color || "text-white/60")}><stat.icon className="w-4 h-4" /><span className="text-[10px] font-black uppercase tracking-widest">{stat.label}</span></div>
                 <p className={cn("text-4xl font-black font-display leading-none", stat.bg ? "text-white" : "text-slate-900")}>{stat.val}</p>
              </div>
           ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
           <AnimatePresence>
              {filteredReminders.map(msg => (
                 <MessageCard key={msg.id} msg={msg} onDelete={handleDeleteReminder} onEdit={(m) => { setEditingMsg(m); setIsModalOpen(true); }} />
              ))}
              {!loading && filteredReminders.length === 0 && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-40 text-center bg-white border-2 border-dashed border-slate-100 rounded-[32px] text-slate-400 font-bold italic">Bandeja de lanzamiento despejada.</motion.div>
              )}
           </AnimatePresence>
        </div>
      </div>

      <MessageModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingMsg(null); }} onSubmit={handleCreateOrUpdateReminder} clients={clients} initialData={editingMsg || undefined} loading={saving} />
    </AppLayout>
  )
}

export default Messages
