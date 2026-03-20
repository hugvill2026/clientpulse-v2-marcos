import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  MapPin, 
  Briefcase, 
  Clock, 
  Edit, 
  Trash, 
  ChevronRight,
  Globe,
  Tag,
  AlertCircle,
  CheckCircle2,
  FileText
} from 'lucide-react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import { ClientService, type ClientData } from '../services/firebase/firestore'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

const ClientDetail = () => {
  const { id } = useParams()
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const [client, setClient] = useState<ClientData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchClient = async () => {
      if (!user || !id) return
      try {
        const clients = await ClientService.getClients(user.uid)
        const found = clients.find(c => c.id === id)
        if (found) {
           setClient(found)
        } else {
           toast.error('Cliente no encontrado en tu base de datos.')
           navigate('/clients')
        }
      } catch (e) {
        toast.error('Fallo al cargar la ficha del cliente.')
      } finally {
        setLoading(false)
      }
    }
    fetchClient()
  }, [id, user])

  const handleDelete = async () => {
     if (id && window.confirm('¿ELIMINAR ESTE CLIENTE? Esto purgará también todos sus recordatorios y mensajes tácticos vinculados.')) {
        const tid = toast.loading('Purgando cliente del ecosistema...')
        await ClientService.deleteClient(id)
        toast.success('Cliente eliminado exitosamente.', { id: tid })
        navigate('/clients')
     }
  }

  if (loading) return <AppLayout><div className="h-96 bg-white animate-pulse rounded-[48px]" /></AppLayout>
  if (!client) return null

  return (
    <AppLayout>
      <div className="space-y-8 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="flex items-center gap-4">
              <button onClick={() => navigate('/clients')} className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all shadow-sm active:scale-95"><ArrowLeft className="w-5 h-5 text-slate-600" /></button>
              <div>
                 <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1"><Link to="/clients" className="hover:text-teal-600 transition-colors">Clientes</Link><ChevronRight className="w-3 h-3" /><span className="text-slate-900 pointer-events-none">Perfil Detallado</span></nav>
                 <h1 className="text-3xl font-bold text-slate-900 font-display">Ficha del Cliente</h1>
              </div>
           </div>
           <div className="flex items-center gap-3">
              <button onClick={handleDelete} className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-rose-600 hover:border-rose-100 transition-all shadow-sm"><Trash className="w-5 h-5" /></button>
              <button className="btn-secondary h-12 px-6 flex items-center gap-2"><Edit className="w-4 h-4" /> Editar Perfil</button>
              <a href={`https://wa.me/${client.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn-primary h-12 px-6 flex items-center gap-2 shadow-teal-500/20"><Phone className="w-4 h-4" /> Lanzar WhatsApp</a>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           <div className="lg:col-span-8 space-y-8">
              <div className="card-premium relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-32 bg-slate-900" />
                 <div className="p-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-end gap-6 mb-8">
                       <div className="w-32 h-32 rounded-[40px] bg-teal-gradient border-8 border-white shadow-2xl flex items-center justify-center font-display font-black text-4xl text-white overflow-hidden uppercase">{client.name[0]}</div>
                       <div className="flex-1 pb-2">
                          <h2 className="text-3xl font-bold text-white md:text-slate-900 mb-1 leading-none">{client.name}</h2>
                          <p className="text-sm font-bold text-teal-600 mb-4">{client.company || 'Sector Independiente'}</p>
                          <div className="flex flex-wrap gap-2">
                             <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-[10px] font-bold border border-teal-100 uppercase tracking-widest">{client.category || 'General'}</span>
                             <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-widest", client.priority === 'alta' ? "bg-rose-50 text-rose-600 border-rose-100" : "bg-sky-50 text-sky-600 border-sky-100")}>Prioridad {client.priority || 'media'}</span>
                             <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-bold border border-emerald-100 uppercase tracking-widest">{client.status}</span>
                          </div>
                       </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
                       {[ { icon: Phone, label: 'WhatsApp', value: client.whatsapp }, { icon: Mail, label: 'Email', value: client.email || 'N/A' }, { icon: MapPin, label: 'Ubicación', value: 'Referencia en base de datos' }, { icon: Briefcase, label: 'Cargo & Empresa', value: `${client.company || 'Independiente'}` } ].map((item, idx) => (
                          <div key={idx} className="flex gap-4"><div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400"><item.icon className="w-5 h-5" /></div><div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</p><p className="text-sm font-bold text-slate-800 line-clamp-1">{item.value}</p></div></div>
                       ))}
                    </div>
                 </div>
              </div>
              <div className="card-premium"><div className="flex items-center justify-between mb-6"><h3 className="text-lg font-bold text-slate-900 flex items-center gap-3"><FileText className="w-5 h-5 text-teal-500" /> Notas de Gestión VIP</h3><button className="text-[10px] font-black text-teal-600 hover:text-teal-700 uppercase tracking-[0.2em]">Sincronizar +</button></div><div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 min-h-[140px]"><p className="text-sm text-slate-600 leading-relaxed font-interface italic">"{client.notes || 'No hay notas tácticas registradas para este cliente.'}"</p></div><div className="mt-6 flex flex-wrap gap-2">{['Premium', 'Sincronizado'].map(tag => <span key={tag} className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-[10px] font-bold text-slate-500 shadow-sm">#{tag}</span>)}</div></div>
           </div>
           <div className="lg:col-span-4 space-y-8">
              <div className="card-premium bg-slate-900 text-white border-none relative overflow-hidden"><div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/20 blur-3xl -mr-16 -mt-16" /><h3 className="text-lg font-bold mb-6 flex items-center gap-3 relative z-10"><CheckCircle2 className="w-5 h-5 text-teal-400" /> Salud de Cuenta</h3><div className="grid grid-cols-2 gap-4"><div className="p-4 rounded-2xl bg-white/5 border border-white/10"><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Enviados</p><p className="text-2xl font-bold font-display">--</p></div><div className="p-4 rounded-2xl bg-white/5 border border-white/10"><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Fallidos</p><p className="text-2xl font-bold font-display text-rose-400">0</p></div></div></div>
              <div className="card-premium bg-amber-50 border-amber-200 shadow-none flex gap-4"><AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" /><div><p className="text-xs font-bold text-amber-900 mb-1 font-black uppercase tracking-widest text-[10px]">Alerta de Gestión</p><p className="text-[10px] text-amber-700 font-medium leading-relaxed">No hay tareas pendientes inmediatas para este cliente.</p></div></div>
           </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default ClientDetail
