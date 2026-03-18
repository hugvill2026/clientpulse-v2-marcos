import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  Search, 
  Filter, 
  LayoutGrid, 
  List, 
  Plus, 
  MoreHorizontal, 
  Phone, 
  Mail, 
  MapPin, 
  Briefcase, 
  CheckCircle2, 
  MoreVertical,
  ChevronRight,
  User,
  ExternalLink,
  Edit,
  Trash
} from 'lucide-react'
import AppLayout from '../components/layout/AppLayout'
import { cn } from '../utils/cn'

// Dummy Categories
const categories = [
  { id: '1', name: 'Premium (VIP)', color: '#0D9488', count: 12 },
  { id: '2', name: 'Prospectos', color: '#0369A1', count: 48 },
  { id: '3', name: 'Empresas', color: '#4338CA', count: 24 },
  { id: '4', name: 'E-commerce', color: '#D97706', count: 31 },
]

// Mock Client Data
const mockClients = [
  { id: '1', name: 'Víctor Villegas', company: 'Global Tech', whatsapp: '+593912345678', email: 'victor@tech.com', category: 'Premium (VIP)', priority: 'alta', active: true, color: 'teal' },
  { id: '2', name: 'María Sánchez', company: 'Studio Design', whatsapp: '+593987654321', email: 'maria@studio.com', category: 'Empresas', priority: 'media', active: true, color: 'indigo' },
  { id: '3', name: 'Andrés Castro', company: 'AutoParts Express', whatsapp: '+34644593207', email: 'andres@parts.es', category: 'Prospectos', priority: 'baja', active: false, color: 'sky' },
  { id: '4', name: 'Lucía Pardo', company: 'E-com Solutions', whatsapp: '+5215512345678', email: 'lucia@ecom.mx', category: 'E-commerce', priority: 'alta', active: true, color: 'amber' },
]

// Priority Badge Component
const PriorityBadge = ({ priority }: { priority: 'alta' | 'media' | 'baja' }) => {
  const styles = {
    alta: "bg-rose-50 text-rose-600 border-rose-100",
    media: "bg-amber-50 text-amber-600 border-amber-100",
    baja: "bg-teal-50 text-teal-600 border-teal-100"
  }
  return (
    <span className={cn("text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border", styles[priority])}>
      {priority}
    </span>
  )
}

const Clients = () => {
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <AppLayout title="Directorio de Clientes">
      <div className="space-y-8">
        
        {/* Toolbar & Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
           {/* Search and Filters */}
           <div className="flex flex-1 items-center gap-3">
              <div className="relative flex-1 max-w-md group">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                 <input 
                    type="text" 
                    placeholder="Buscar clientes por nombre, empresa, whatsapp..." 
                    className="input-premium pl-11 shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                 />
              </div>
              <button className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all text-slate-500 active:scale-95 shadow-sm">
                 <Filter className="w-5 h-5" />
              </button>
           </div>

           {/* Actions and Views */}
           <div className="flex items-center gap-3">
              <div className="flex bg-white border border-slate-200 rounded-2xl p-1 shadow-sm">
                 <button 
                  onClick={() => setViewType('grid')}
                  className={cn("p-2 rounded-xl transition-all", viewType === 'grid' ? "bg-slate-100 text-teal-600 shadow-sm" : "text-slate-400 hover:text-slate-600")}>
                    <LayoutGrid className="w-5 h-5" />
                 </button>
                 <button 
                  onClick={() => setViewType('list')}
                  className={cn("p-2 rounded-xl transition-all", viewType === 'list' ? "bg-slate-100 text-teal-600 shadow-sm" : "text-slate-400 hover:text-slate-600")}>
                    <List className="w-5 h-5" />
                 </button>
              </div>
              <button className="btn-primary h-12 flex items-center justify-center gap-2 group px-4">
                 <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
                 <span>Nuevo Cliente</span>
              </button>
           </div>
        </div>

        {/* Categories Horizontal Scroll */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
           <button className="px-5 py-2.5 bg-slate-900 text-white rounded-2xl font-bold text-sm shadow-lg shadow-slate-900/10 whitespace-nowrap active:scale-95 transition-all">
              Todos los clientes <span className="text-slate-400 ml-2 font-medium">115</span>
           </button>
           {categories.map(cat => (
              <button key={cat.id} className="px-5 py-2.5 bg-white border border-slate-200 rounded-2xl font-bold text-sm text-slate-600 hover:border-slate-300 hover:bg-slate-50 whitespace-nowrap transition-all active:scale-95 flex items-center gap-3 group">
                 <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                 {cat.name}
                 <span className="text-slate-400 font-medium group-hover:text-slate-900 transition-colors">{cat.count}</span>
              </button>
           ))}
        </div>

        {/* Clients View Content */}
        <AnimatePresence mode="wait">
          {viewType === 'grid' ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20"
            >
              {mockClients.map((client, idx) => (
                <motion.div 
                  key={client.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="card-premium h-full group flex flex-col justify-between overflow-hidden relative"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="relative">
                      <div className={cn(
                        "w-16 h-16 rounded-3xl bg-slate-100 flex items-center justify-center font-display font-bold text-xl border-4 border-white shadow-xl transition-transform group-hover:scale-110",
                        client.color === 'teal' ? "text-teal-600 bg-teal-50" : client.color === 'indigo' ? "text-indigo-600 bg-indigo-50" : "text-slate-600"
                      )}>
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className={cn(
                        "absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white shadow-sm",
                        client.active ? "bg-emerald-500" : "bg-slate-300"
                      )} />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <PriorityBadge priority={client.priority as any} />
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all active:scale-90">
                         <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-teal-600 transition-colors line-clamp-1">{client.name}</h3>
                    <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                       <Briefcase className="w-3.5 h-3.5" />
                       <span className="line-clamp-1">{client.company}</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-slate-100">
                     <div className="flex items-center gap-3 text-slate-400">
                        <Phone className="w-4 h-4 text-emerald-500" />
                        <span className="text-xs font-bold text-slate-600">{client.whatsapp}</span>
                     </div>
                     <div className="flex items-center gap-3 text-slate-400">
                        <Mail className="w-4 h-4 text-sky-400" />
                        <span className="text-xs font-bold text-slate-600 line-clamp-1">{client.email}</span>
                     </div>
                  </div>

                  <div className="mt-8 flex items-center gap-3">
                     <button className="flex-1 btn-secondary h-11 flex items-center justify-center gap-2 shadow-none hover:border-teal-300 hover:text-teal-600">
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-xs">Detalle</span>
                     </button>
                     <button className="w-11 h-11 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-sm hover:shadow-emerald-200 active:scale-95">
                        <Phone className="w-5 h-5" />
                     </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm"
            >
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                       <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Cliente</th>
                       <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Categoría</th>
                       <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Contacto</th>
                       <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Prioridad</th>
                       <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Estado</th>
                       <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Acciones</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {mockClients.map(client => (
                       <tr key={client.id} className="group hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm">
                                   {client.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                   <p className="font-bold text-sm text-slate-800 leading-tight">{client.name}</p>
                                   <p className="text-xs text-slate-400 font-medium">{client.company}</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-teal-500" />
                                <span className="text-xs font-bold text-slate-600">{client.category}</span>
                             </div>
                          </td>
                          <td className="px-6 py-4">
                             <div className="space-y-0.5">
                                <p className="text-xs font-bold text-slate-700">{client.whatsapp}</p>
                                <p className="text-[10px] text-slate-400 font-medium">{client.email}</p>
                             </div>
                          </td>
                          <td className="px-6 py-4">
                             <PriorityBadge priority={client.priority as any} />
                          </td>
                          <td className="px-6 py-4">
                             <div className={cn(
                                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                client.active ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"
                             )}>
                                <div className={cn("w-1.5 h-1.5 rounded-full", client.active ? "bg-emerald-500" : "bg-slate-400")} />
                                {client.active ? 'Activo' : 'Inactivo'}
                             </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                             <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors"><Edit className="w-4 h-4" /></button>
                                <button className="p-2 hover:bg-rose-100 rounded-lg text-rose-500 transition-colors"><Trash className="w-4 h-4" /></button>
                                <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  )
}

export default Clients
