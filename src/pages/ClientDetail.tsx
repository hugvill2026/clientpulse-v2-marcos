import React from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  MapPin, 
  Briefcase, 
  Calendar, 
  Clock, 
  Edit, 
  Trash, 
  ExternalLink, 
  MessageSquare, 
  MoreVertical,
  ChevronRight,
  Globe,
  Tag,
  AlertCircle,
  CheckCircle2,
  FileText
} from 'lucide-react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import { cn } from '../utils/cn'

const ClientDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  // Mock Client Details
  const client = {
    id: '1',
    name: 'Víctor Villegas',
    company: 'Global Financial Intelligence',
    whatsapp: '+593 912 345 678',
    email: 'hug.vill.2026@gmail.com',
    category: 'Premium (VIP)',
    priority: 'alta',
    status: 'activo',
    industry: 'Finanzas / Tech',
    jobTitle: 'CEO & Founder',
    address: 'Av. Las Lomas 500, Guayaquil, Ecuador',
    notes: 'Cliente de alto valor. Prefiere contacto vía WhatsApp los martes por la mañana. Interesado en expansión de portafolio para Q4.',
    internalReference: 'VIP-GFI-001',
    lastContact: '2024-03-15',
    createdAt: '2024-01-10',
    tags: ['Inversionista', 'SaaS', 'High-Trust'],
  }

  return (
    <AppLayout>
      <div className="space-y-8 pb-20">
        
        {/* Header / Breadcrumbs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/clients')}
                className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all shadow-sm active:scale-95"
              >
                 <ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
              <div>
                 <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                    <Link to="/clients" className="hover:text-teal-600 transition-colors">Clientes</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-slate-900 pointer-events-none">Perfil Detallado</span>
                 </nav>
                 <h1 className="text-3xl font-bold text-slate-900 font-display">Ficha del Cliente</h1>
              </div>
           </div>
           
           <div className="flex items-center gap-3">
              <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:text-rose-600 hover:border-rose-100 transition-all shadow-sm"><Trash className="w-5 h-5" /></button>
              <button className="btn-secondary flex items-center gap-2 h-12 px-6"><Edit className="w-4 h-4" /> Editar Perfil</button>
              <button className="btn-primary flex items-center gap-2 h-12 px-6 shadow-teal-500/20"><Phone className="w-4 h-4" /> Abrir WhatsApp</button>
           </div>
        </div>

        {/* Client Profile Overview Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           
           {/* Left Column: Basic Info */}
           <div className="lg:col-span-8 space-y-8">
              <div className="card-premium relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-32 bg-slate-900" />
                 <div className="relative z-10 p-4">
                    <div className="flex flex-col md:flex-row items-end gap-6 mb-8">
                       <div className="w-32 h-32 rounded-[40px] bg-slate-100 border-8 border-white shadow-2xl flex items-center justify-center font-display font-bold text-4xl text-slate-300 overflow-hidden">
                          {client.name.split(' ').map(n => n[0]).join('')}
                       </div>
                       <div className="flex-1 pb-2">
                          <h2 className="text-3xl font-bold text-white md:text-slate-900 mb-1 leading-none">{client.name}</h2>
                          <p className="text-sm font-bold text-teal-600 mb-4">{client.company}</p>
                          <div className="flex flex-wrap gap-2">
                             <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-[10px] font-bold border border-teal-100 uppercase tracking-widest">{client.category}</span>
                             <span className="bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-[10px] font-bold border border-rose-100 uppercase tracking-widest">Prioridad {client.priority}</span>
                             <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-bold border border-emerald-100 uppercase tracking-widest">{client.status}</span>
                          </div>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
                       <div className="space-y-6">
                          <div className="flex gap-4">
                             <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400"><Phone className="w-5 h-5" /></div>
                             <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">WhatsApp</p>
                                <p className="text-sm font-bold text-slate-800 tracking-wider">{client.whatsapp}</p>
                             </div>
                          </div>
                          <div className="flex gap-4">
                             <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400"><Mail className="w-5 h-5" /></div>
                             <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email</p>
                                <p className="text-sm font-bold text-slate-800 line-clamp-1">{client.email}</p>
                             </div>
                          </div>
                          <div className="flex gap-4">
                             <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400"><MapPin className="w-5 h-5" /></div>
                             <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ubicación</p>
                                <p className="text-sm font-bold text-slate-800 leading-relaxed">{client.address}</p>
                             </div>
                          </div>
                       </div>

                       <div className="space-y-6">
                          <div className="flex gap-4">
                             <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400"><Briefcase className="w-5 h-5" /></div>
                             <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cargo & Empresa</p>
                                <p className="text-sm font-bold text-slate-800">{client.jobTitle} en {client.company}</p>
                             </div>
                          </div>
                          <div className="flex gap-4">
                             <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400"><Globe className="w-5 h-5" /></div>
                             <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Industria</p>
                                <p className="text-sm font-bold text-slate-800">{client.industry}</p>
                             </div>
                          </div>
                          <div className="flex gap-4">
                             <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400"><Tag className="w-5 h-5" /></div>
                             <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Referencia Interna</p>
                                <p className="text-sm font-bold font-mono text-teal-600">{client.internalReference}</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Notes Section */}
              <div className="card-premium">
                 <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-3">
                       <FileText className="w-5 h-5 text-teal-500" /> Notas y Observaciones
                    </h3>
                    <button className="text-xs font-bold text-teal-600 hover:text-teal-700 uppercase tracking-widest">Añadir Nota +</button>
                 </div>
                 <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 min-h-[140px]">
                    <p className="text-sm text-slate-600 leading-relaxed font-interface italic">"{client.notes}"</p>
                 </div>
                 <div className="mt-6 flex flex-wrap gap-2">
                    {client.tags.map(tag => (
                       <span key={tag} className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-[10px] font-bold text-slate-500 shadow-sm">#{tag}</span>
                    ))}
                 </div>
              </div>
           </div>

           {/* Right Column: Stats & Timeline */}
           <div className="lg:col-span-4 space-y-8">
              
              {/* Engagement Stats */}
              <div className="card-premium bg-slate-900 text-white border-none relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/20 blur-3xl -mr-16 -mt-16" />
                 <h3 className="text-lg font-bold mb-6 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-400" /> Interacción
                 </h3>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                       <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Enviados</p>
                       <p className="text-2xl font-bold font-display">142</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                       <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Fallidos</p>
                       <p className="text-2xl font-bold font-display text-rose-400">03</p>
                    </div>
                 </div>
                 <div className="mt-6 space-y-3 pt-6 border-t border-white/10">
                    <div className="flex justify-between text-xs font-bold">
                       <span className="text-slate-400">Último contacto:</span>
                       <span className="text-teal-400">{client.lastContact}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold">
                       <span className="text-slate-400">Miembro desde:</span>
                       <span className="text-teal-400">{client.createdAt}</span>
                    </div>
                 </div>
              </div>

              {/* Recent History Mini-List */}
              <div className="card-premium">
                 <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <Clock className="w-5 h-5 text-teal-500" /> Historial reciente
                 </h3>
                 <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                       <div key={i} className="flex gap-4 group cursor-pointer">
                          <div className="w-1.5 h-auto bg-slate-100 rounded-full group-hover:bg-teal-500 transition-colors" />
                          <div className="flex-1 pb-4 border-b border-slate-50">
                             <p className="text-xs font-bold text-slate-800 leading-none mb-1">Recordatorio VIP</p>
                             <p className="text-[10px] text-slate-400 font-medium">Enviado vía WhatsApp • 15 Mar</p>
                          </div>
                       </div>
                    ))}
                 </div>
                 <button className="w-full mt-6 text-xs font-bold text-slate-400 hover:text-teal-600 transition-all uppercase tracking-widest flex items-center justify-center gap-2">
                    Ver historial completo <ChevronRight className="w-4 h-4" />
                 </button>
              </div>

              {/* Action Alert */}
              <div className="card-premium bg-amber-50 border-amber-200 shadow-none flex gap-4">
                 <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                 <div>
                    <p className="text-xs font-bold text-amber-900 mb-1">Próxima acción pendiente</p>
                    <p className="text-[10px] text-amber-700 font-medium leading-relaxed">Enviar propuesta de renovación para el próximo martes.</p>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </AppLayout>
  )
}

export default ClientDetail
