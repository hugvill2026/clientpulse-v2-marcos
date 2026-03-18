import React from 'react'
import { motion } from 'framer-motion'
import { History as HistoryIcon, Search, Filter, Clock, CheckCircle2, AlertCircle, ExternalLink, MessageCircle, Send, MoreHorizontal } from 'lucide-react'
import AppLayout from '../components/layout/AppLayout'
import { cn } from '../utils/cn'

const History = () => {
  return (
    <AppLayout title="Historial de Envíos">
      <div className="space-y-6">
        
        {/* History Search Tools */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="flex-1 flex items-center gap-3">
              <div className="relative flex-1 max-w-lg group">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                 <input type="text" placeholder="Buscar por cliente, mensaje o tipo..." className="input-premium pl-11 shadow-sm" />
              </div>
              <button className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all text-slate-500 shadow-sm active:scale-95"><Filter className="w-5 h-5" /></button>
           </div>
           
           <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-2xl p-1 shadow-2xl">
              <button className="px-5 py-2.5 rounded-xl bg-teal-600 text-white text-xs font-bold shadow-lg shadow-teal-500/20 transition-all">Todos</button>
              <button className="px-5 py-2.5 rounded-xl text-slate-400 hover:text-white transition-all text-xs font-bold uppercase tracking-widest">Enviados</button>
              <button className="px-5 py-2.5 rounded-xl text-slate-400 hover:text-white transition-all text-xs font-bold uppercase tracking-widest">Fallidos</button>
           </div>
        </div>

        {/* History Table */}
        <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm">
           <table className="w-full text-left border-collapse">
              <thead>
                 <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Mensaje & Cliente</th>
                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Tipo / Modo</th>
                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Fecha y Hora</th>
                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center">Estado</th>
                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Acciones</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                 {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                    <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                       <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-400 text-xs">M{i}</div>
                             <div>
                                <p className="text-sm font-bold text-slate-800 leading-tight">Recordatorio Pago Vencido</p>
                                <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest mt-1 mr-2 inline-block">Cliente:</p>
                                <span className="text-[10px] font-medium text-slate-400">Andrés Castro</span>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-5">
                          <div className="flex flex-col gap-1">
                             <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full w-fit uppercase tracking-tighter">Automático</span>
                             <span className="text-[10px] font-bold text-slate-400">whatsapp + wa.me</span>
                          </div>
                       </td>
                       <td className="px-8 py-5">
                          <div className="flex items-center gap-2 text-slate-600">
                             <Clock className="w-3.5 h-3.5 text-slate-400" />
                             <span className="text-xs font-bold">18/03/2024</span>
                             <span className="text-[10px] font-medium text-slate-400">10:45 AM</span>
                          </div>
                       </td>
                       <td className="px-8 py-5 text-center">
                          <div className={cn(
                             "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                             i % 4 === 0 ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"
                          )}>
                             {i % 4 === 0 ? <AlertCircle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                             {i % 4 === 0 ? 'Fallido' : 'Enviado'}
                          </div>
                       </td>
                       <td className="px-8 py-5 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button className="p-2.5 bg-slate-100 rounded-xl hover:bg-teal-600 hover:text-white transition-all text-slate-500 shadow-sm"><ExternalLink className="w-4 h-4" /></button>
                             <button className="p-2.5 bg-slate-100 rounded-xl hover:bg-teal-600 hover:text-white transition-all text-slate-500 shadow-sm"><MoreHorizontal className="w-4 h-4" /></button>
                          </div>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
           
           {/* Pagination */}
           <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mostrando 8 de 1,240 registros</p>
              <div className="flex items-center gap-2">
                 <button className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-400 hover:bg-slate-50 transition-all cursor-not-allowed" disabled>Atrás</button>
                 <button className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:border-teal-500 transition-all shadow-sm">Siguiente</button>
              </div>
           </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default History
