import AppLayout from '../components/layout/AppLayout'
import { cn } from '../utils/cn'
import { useAuthStore } from '../store/authStore'
import { ClientService, UserService, type ClientData } from '../services/firebase/firestore'
import { GoogleSheetsService } from '../services/googleSheets.service'
import ClientModal from '../components/clients/ClientModal'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { 
  Search, 
  LayoutGrid, 
  List, 
  Plus, 
  Trash, 
  Phone, 
  Briefcase, 
  Zap,
  Edit2
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

const categories = [
  { id: '1', name: 'Premium (VIP)', color: 'bg-teal-500', text: 'text-teal-500' },
  { id: '2', name: 'Prospectos', color: 'bg-indigo-500', text: 'text-indigo-500' },
  { id: '3', name: 'Empresas', color: 'bg-sky-500', text: 'text-sky-500' },
  { id: '4', name: 'E-commerce', color: 'bg-rose-500', text: 'text-rose-500' },
]

const Clients = () => {
  const { user } = useAuthStore()
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [clients, setClients] = useState<ClientData[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<ClientData | null>(null)
  const [saving, setSaving] = useState(false)
  const [activeCategory, setActiveCategory] = useState('Todos')

  const fetchClients = async () => {
    if (!user) return
    try {
      const data = await ClientService.getClients(user.uid)
      setClients(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClients()
  }, [user])

  const handleCreateOrUpdateClient = async (data: any) => {
    if (!user) return
    setSaving(true)
    const toastId = toast.loading(editingClient ? 'Actualizando registro estratégico...' : 'Registrando en base segura...')
    try {
      if (editingClient) {
        await ClientService.updateClient(editingClient.id!, data)
        toast.success('Identidad institucional actualizada 🏛️', { id: toastId })
      } else {
        const newId = await ClientService.createClient({ ...data, userId: user.uid, status: 'activo' })
        const profile = await UserService.getUserProfile(user.uid)
        await GoogleSheetsService.sync(profile?.googleSheetsUrl, 'CLIENT', { id: newId, userId: user.uid, ...data })
        toast.success('Cliente sincronizado institucionalmente ☁️', { id: toastId })
      }
      
      fetchClients()
      setIsModalOpen(false); setEditingClient(null)
    } catch (e) {
      toast.error('Fallo en la operación de datos.', { id: toastId })
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteClient = async (id: string) => {
    if (!window.confirm('¿Deseas eliminar permanentemente a este cliente?')) return
    try {
      await ClientService.deleteClient(id)
      toast.success('Registro eliminado')
      fetchClients()
    } catch (e) {
      toast.error('Error al eliminar')
    }
  }

  const filteredClients = clients.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.whatsapp.includes(searchTerm)
    const matchesCategory = activeCategory === 'Todos' || c.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <AppLayout>
      <div className="space-y-12 pb-20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pt-4">
           <div className="flex-1 max-w-2xl space-y-4">
              <div className="flex items-center gap-3 bg-white w-fit px-4 py-2 rounded-full border border-slate-100 shadow-sm">
                 <Zap className="w-4 h-4 text-teal-600" />
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Monitor de Directorio VIP</span>
              </div>
              <h1 className="text-5xl font-black text-slate-900 font-display tracking-tightest leading-none">
                 Gestión de <span className="bg-gradient-to-br from-indigo-500 to-indigo-700 bg-clip-text text-transparent">Clientes</span>
              </h1>
              <div className="relative group mt-6 pt-4">
                 <Search className="absolute left-6 top-1/2 mt-2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-teal-500 transition-colors" />
                 <input type="text" placeholder="Busca por nombre, empresa, WhatsApp..." className="input-premium h-20 pl-16 pr-8 shadow-xl" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
           </div>
           <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex bg-white border-2 border-slate-100 rounded-[28px] p-2 shadow-xl h-16 items-center">
                 <button onClick={() => setViewType('grid')} className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all", viewType === 'grid' ? "bg-teal-gradient text-white shadow-lg" : "text-slate-400 hover:text-slate-600")}>
                    <LayoutGrid className="w-6 h-6" />
                 </button>
                 <button onClick={() => setViewType('list')} className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all", viewType === 'list' ? "bg-teal-gradient text-white shadow-lg" : "text-slate-400 hover:text-slate-600")}>
                    <List className="w-6 h-6" />
                 </button>
              </div>
              <button onClick={() => { setEditingClient(null); setIsModalOpen(true); }} className="btn-primary h-20 px-10 rounded-[32px] group">
                 <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
                 <span>Registrar Cliente</span>
              </button>
           </div>
        </div>

        <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
           <button onClick={() => setActiveCategory('Todos')} className={cn("px-8 py-4 rounded-[24px] font-black text-xs uppercase tracking-widest transition-all", activeCategory === 'Todos' ? "bg-slate-900 text-white shadow-2xl" : "bg-white text-slate-400 border-2 border-slate-100")}>
              Todos <span className="ml-2 opacity-50">{clients.length}</span>
           </button>
           {categories.map(cat => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.name)} className={cn("px-8 py-4 rounded-[24px] font-black text-xs uppercase tracking-widest transition-all bg-white border-2 border-slate-100 flex items-center gap-3", activeCategory === cat.name ? cn("ring-4 ring-opacity-20", cat.text, "ring-current border-current") : "text-slate-500")}>
                 <div className={cn("w-3 h-3 rounded-full", cat.color)} />
                 {cat.name}
              </button>
           ))}
        </div>

        <AnimatePresence mode="wait">
          {viewType === 'grid' ? (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {loading ? [1,2,3,4].map(i => <div key={i} className="h-64 bg-slate-100 animate-pulse rounded-[32px]" />) : filteredClients.map((client) => (
                <motion.div layout key={client.id} className="card-premium h-full group flex flex-col justify-between relative border-2 border-slate-100 hover:border-teal-500 hover:shadow-2xl transition-all">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-teal-gradient text-white flex items-center justify-center font-black text-2xl border-2 border-white shadow-xl">{client.name[0]}</div>
                    <div className="flex gap-2">
                       <button onClick={() => { setEditingClient(client); setIsModalOpen(true); }} className="p-3 text-slate-300 hover:text-teal-500 hover:bg-teal-50 rounded-xl transition-all"><Edit2 className="w-5 h-5" /></button>
                       <button onClick={() => handleDeleteClient(client.id!)} className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"><Trash className="w-5 h-5" /></button>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-xl font-black text-slate-900 mb-1 line-clamp-1">{client.name}</h3>
                    <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest leading-none">
                       <Briefcase className="w-3.5 h-3.5" />
                       <span className="line-clamp-1">{client.company || 'Directo'}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-3 pt-6 border-t border-slate-50">
                     <button onClick={() => { setEditingClient(client); setIsModalOpen(true); }} className="flex-1 btn-secondary h-12 rounded-xl text-[10px] uppercase tracking-widest">Ver Ficha</button>
                     <a href={`https://wa.me/${client.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="w-12 h-12 bg-emerald-gradient text-white rounded-xl flex items-center justify-center hover:scale-110 transition-all shadow-lg shadow-emerald-500/10"><Phone className="w-5 h-5" /></a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="list" className="card-premium p-0 border-2 border-slate-100 overflow-hidden shadow-2xl">
              <table className="w-full text-left">
                 <thead><tr className="bg-slate-50 border-b border-slate-100"><th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Cliente</th><th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">WhatsApp</th><th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Acción</th></tr></thead>
                 <tbody className="divide-y divide-slate-50">
                    {filteredClients.map(client => (
                       <tr key={client.id} className="group hover:bg-slate-50 transition-colors">
                          <td className="px-8 py-6"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-black">{client.name[0]}</div><span className="font-black text-slate-900">{client.name}</span></div></td>
                          <td className="px-8 py-6"><span className="font-bold text-slate-500 tabular-nums">{client.whatsapp}</span></td>
                          <td className="px-8 py-6 text-right"><div className="flex justify-end gap-2"><button onClick={() => { setEditingClient(client); setIsModalOpen(true); }} className="p-2 text-slate-300 hover:text-teal-500 transition-all"><Edit2 className="w-4 h-4" /></button><button onClick={() => handleDeleteClient(client.id!)} className="p-2 text-slate-300 hover:text-rose-500 transition-all"><Trash className="w-4 h-4" /></button></div></td>
                       </tr>
                    ))}
                 </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ClientModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setEditingClient(null); }} 
        onSubmit={handleCreateOrUpdateClient} 
        initialData={editingClient ? {
          name: editingClient.name,
          whatsapp: editingClient.whatsapp,
          email: editingClient.email,
          company: editingClient.company,
          category: editingClient.category || 'Prospectos',
          priority: (editingClient.priority as any) || 'media',
          notes: editingClient.notes
        } : undefined}
        loading={saving} 
      />
    </AppLayout>
  )
}

export default Clients
