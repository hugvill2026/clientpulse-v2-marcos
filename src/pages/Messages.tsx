import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageSquare, 
  Send, 
  Clock, 
  Plus, 
  Trash, 
  Edit, 
  MoreVertical, 
  Image as ImageIcon, 
  Video, 
  FileText, 
  ChevronRight,
  Filter,
  CheckCircle2,
  Calendar,
  AlertCircle
} from 'lucide-react'
import AppLayout from '../components/layout/AppLayout'
import { cn } from '../utils/cn'

// Mock Templates
const mockMessages = [
  { id: '1', name: 'Recordatorio Mensual VIP', text: 'Hola {{nombre_cliente}}, un gusto saludarte de parte de {{empresa}}...', type: 'recurring', status: 'active', lastSent: '2024-03-15', nextSend: '2024-04-15', attachment: 'none' },
  { id: '2', name: 'Alerta de Pago Vencido', text: 'Estimado {{nombre_cliente}}, te recordamos que tu factura con referencia {{referencia}}...', type: 'manual', status: 'paused', lastSent: '2024-02-10', nextSend: '-', attachment: 'document' },
  { id: '3', name: 'Bienvenida Nuevos Clientes', text: '¡Bienvenido a la familia! Estamos felices de tenerte con nosotros...', type: 'once', status: 'completed', lastSent: '2024-03-01', nextSend: '-', attachment: 'image' },
]

const MessageCard = ({ msg }: { msg: typeof mockMessages[0] }) => {
  const isRecurring = msg.type === 'recurring'
  const isActive = msg.status === 'active'

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-premium h-full flex flex-col justify-between group border-l-[6px]"
      style={{ borderLeftColor: isActive ? '#0D9488' : msg.status === 'paused' ? '#F59E0B' : '#94A3B8' }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3">
          <div className={cn("p-2.5 rounded-2xl bg-opacity-10", isActive ? "bg-teal-500 text-teal-600" : "bg-slate-500 text-slate-600")}>
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 line-clamp-1 group-hover:text-teal-600 transition-colors uppercase text-xs tracking-wider">{msg.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={cn(
                "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter",
                msg.type === 'recurring' ? "bg-indigo-50 text-indigo-600" : "bg-sky-50 text-sky-600"
              )}>
                {msg.type}
              </span>
              <span className="w-1 h-1 bg-slate-300 rounded-full" />
              <span className="text-[10px] font-bold text-slate-400">Creado hace 2 meses</span>
            </div>
          </div>
        </div>
        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 my-4">
        <div className="bg-slate-50 p-4 rounded-2xl relative overflow-hidden h-32 flex flex-col justify-between">
           <p className="text-xs text-slate-500 line-clamp-4 leading-relaxed font-interface italic">
              "{msg.text}"
           </p>
           {msg.attachment !== 'none' && (
              <div className="flex items-center gap-2 mt-3 px-3 py-2 bg-white/60 backdrop-blur-sm rounded-xl border border-white/50 w-fit">
                 {msg.attachment === 'image' ? <ImageIcon className="w-3.5 h-3.5 text-teal-500" /> : <FileText className="w-3.5 h-3.5 text-sky-500" />}
                 <span className="text-[10px] font-bold text-slate-500">Adjunto: {msg.attachment}</span>
              </div>
           )}
        </div>
      </div>

      <div className="space-y-3 pt-4 border-t border-slate-50">
        <div className="flex items-center justify-between text-xs font-bold">
           <span className="text-slate-400 flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> Última vez:</span>
           <span className="text-slate-600">{msg.lastSent}</span>
        </div>
        <div className="flex items-center justify-between text-xs font-bold">
           <span className="text-slate-400 flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> Siguiente:</span>
           <span className={cn(isActive ? "text-teal-600" : "text-slate-400")}>{msg.nextSend}</span>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2">
         <button className="flex-1 btn-primary h-11 text-xs py-0 flex items-center justify-center gap-2">
            <Send className="w-4 h-4" /> Enviar ahora
         </button>
         <button className="p-3 bg-slate-50 text-slate-600 border border-slate-200 rounded-2xl hover:bg-slate-100 transition-all active:scale-95">
            <Edit className="w-4 h-4" />
         </button>
      </div>
    </motion.div>
  )
}

const Messages = () => {
  return (
    <AppLayout title="Gestión de Mensajes">
      <div className="space-y-8">
        
        {/* Header Tools */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="flex bg-white border border-slate-200 rounded-2xl p-1 shadow-sm w-fit">
              <button className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-lg shadow-slate-900/10 transition-all">Todos</button>
              <button className="px-5 py-2 rounded-xl text-slate-400 hover:text-slate-600 transition-all text-xs font-bold">Automáticos</button>
              <button className="px-5 py-2 rounded-xl text-slate-400 hover:text-slate-600 transition-all text-xs font-bold">Manuales</button>
              <button className="px-5 py-2 rounded-xl text-slate-400 hover:text-slate-600 transition-all text-xs font-bold">Borradores</button>
           </div>
           
           <button className="btn-primary h-12 flex items-center justify-center gap-2 group px-6">
              <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
              <span>Crear Nuevo Mensaje</span>
           </button>
        </div>

        {/* Messaging Stats Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="card-premium bg-gradient-to-br from-teal-500 to-teal-700 text-white border-none relative overflow-hidden h-32">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-2xl -mr-16 -mt-16" />
              <div className="relative z-10 flex flex-col justify-between h-full">
                 <p className="text-xs font-bold uppercase tracking-widest opacity-80">Total Enviados</p>
                 <div className="flex items-end gap-3">
                    <p className="text-4xl font-bold font-display leading-none">12.5k</p>
                    <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full">+4.2%</span>
                 </div>
              </div>
           </div>
           <div className="card-premium border-slate-200 shadow-none h-32">
              <div className="flex flex-col justify-between h-full">
                 <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Mensajes Activos</p>
                 <p className="text-4xl font-bold font-display text-slate-800 leading-none">08</p>
              </div>
           </div>
           <div className="card-premium h-32 border-none bg-indigo-50 bg-opacity-50 shadow-none">
              <div className="flex flex-col justify-between h-full">
                 <p className="text-xs font-bold uppercase tracking-widest text-indigo-500">Tasa de Entrega</p>
                 <div className="flex items-center gap-3">
                    <p className="text-4xl font-bold font-display text-indigo-900 leading-none">99.9%</p>
                    <CheckCircle2 className="w-6 h-6 text-indigo-500" />
                 </div>
              </div>
           </div>
        </div>

        {/* Message Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
           {mockMessages.map(msg => (
              <MessageCard key={msg.id} msg={msg} />
           ))}
           
           {/* Empty/Add Slot */}
           <motion.div 
              whileHover={{ scale: 1.01 }}
              className="border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 gap-4 text-center cursor-pointer hover:border-teal-300 hover:bg-teal-50/20 transition-all h-[420px]"
           >
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 group-hover:text-teal-500 transition-colors">
                 <Plus className="w-8 h-8" />
              </div>
              <div>
                 <p className="font-bold text-slate-800">Crea una plantilla</p>
                 <p className="text-xs text-slate-400 max-w-[200px] mt-2">Personaliza el mensaje con variables como el nombre del cliente y ahorra tiempo.</p>
              </div>
           </motion.div>
        </div>

        {/* Usage Tips / Guidelines */}
        <div className="bg-amber-50 rounded-3xl p-6 flex gap-4 border border-amber-100">
           <div className="w-12 h-12 bg-amber-500 rounded-2xl flex flex-shrink-0 items-center justify-center text-white shadow-lg shadow-amber-500/20">
              <AlertCircle className="w-6 h-6" />
           </div>
           <div>
              <p className="text-sm font-bold text-amber-900 mb-1">Evita bloqueos de WhatsApp</p>
              <p className="text-xs text-amber-700 leading-relaxed max-w-3xl">
                 Recuerda no enviar el mismo mensaje exacto a demasiados contactos en un periodo corto. 
                 Usa nuestras variables <code className="bg-amber-100/50 px-1.5 py-0.5 rounded text-amber-900">{'{{nombre_cliente}}'}</code> para hacer que cada mensaje sea único. 
                 Mantén tus programaciones automáticas con intervalos razonables.
              </p>
           </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Messages
