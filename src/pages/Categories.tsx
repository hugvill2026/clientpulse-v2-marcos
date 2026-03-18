import React from 'react'
import { motion } from 'framer-motion'
import { LayoutGrid, Plus, MoreVertical, Edit, Trash, Users, ChevronRight } from 'lucide-react'
import AppLayout from '../components/layout/AppLayout'
import { cn } from '../utils/cn'

const categories = [
  { id: '1', name: 'Clientes VIP', color: '#10B981', count: 12, description: 'Clientes de alta prioridad con facturación recurrente.' },
  { id: '2', name: 'Prospectos', color: '#3B82F6', count: 48, description: 'Interesados que aún no han realizado su primera compra.' },
  { id: '3', name: 'Empresas Corporativas', color: '#6366F1', count: 24, description: 'Cuentas grandes con múltiples contactos.' },
  { id: '4', name: 'Ventas Únicas', color: '#F59E0B', count: 31, description: 'Clientes que compraron una vez y requieren reactivación.' },
]

const Categories = () => {
  return (
    <AppLayout title="Categorías de Clientes">
      <div className="space-y-8">
        <div className="flex justify-between items-center bg-white border border-slate-200 p-4 rounded-3xl shadow-sm">
           <div className="flex-1 max-w-md px-4">
              <p className="text-xs text-slate-500 font-medium">Organiza a tus clientes por grupos para automatizar envíos específicos a cada segmento.</p>
           </div>
           <button className="btn-primary flex items-center gap-2 group h-12 px-6">
              <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
              <span>Nueva Categoría</span>
           </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
           {categories.map((cat, idx) => (
              <motion.div 
                 key={cat.id}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: idx * 0.05 }}
                 className="card-premium h-full flex flex-col justify-between group overflow-hidden border-2 border-transparent hover:border-slate-100 relative"
              >
                 <div className="flex justify-between items-start mb-6">
                    <div 
                       className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-black/5 ring-4 ring-white" 
                       style={{ backgroundColor: cat.color }}
                    >
                       <LayoutGrid className="w-6 h-6" />
                    </div>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all"><MoreVertical className="w-5 h-5" /></button>
                 </div>

                 <div className="flex-1 space-y-4">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-600 transition-colors uppercase text-sm tracking-widest">{cat.name}</h3>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed line-clamp-2">{cat.description}</p>
                    
                    <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between border border-slate-100 group-hover:bg-white transition-all">
                       <div className="flex items-center gap-3">
                          <Users className="w-4 h-4 text-slate-400" />
                          <span className="text-sm font-bold text-slate-700">{cat.count} Clientes</span>
                       </div>
                       <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-teal-500 transition-colors" />
                    </div>
                 </div>

                 <div className="mt-8 pt-4 border-t border-slate-50 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="flex-1 py-2.5 bg-slate-50 text-slate-600 font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2"><Edit className="w-3.5 h-3.5" /> Editar</button>
                    <button className="p-2.5 bg-slate-50 text-rose-500 font-bold rounded-xl hover:bg-rose-50 transition-all"><Trash className="w-3.5 h-3.5" /></button>
                 </div>
              </motion.div>
           ))}
           
           {/* Add Slot */}
           <div className="border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 gap-4 text-center cursor-pointer hover:border-teal-300 hover:bg-teal-50/20 transition-all h-[340px]">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 group-hover:text-teal-500 transition-colors">
                 <Plus className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Nueva Categoría</p>
           </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Categories
