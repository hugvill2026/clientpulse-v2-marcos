import React from 'react'
import { motion } from 'framer-motion'
import { HelpCircle, Search, MessageSquare, Book, FileText, Smartphone, ChevronRight, Play, ExternalLink, Zap } from 'lucide-react'
import AppLayout from '../components/layout/AppLayout'
import { cn } from '../utils/cn'

const Help = () => {
  return (
    <AppLayout title="Centro de Ayuda">
      <div className="space-y-12 pb-20">
        
        {/* Search Header */}
        <div className="card-premium bg-slate-900 border-none text-white py-14 flex flex-col items-center justify-center text-center overflow-hidden relative">
           <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 blur-[100px] -mr-32 -mt-32" />
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-500/10 blur-[100px] -ml-32 -mb-32" />
           
           <h2 className="text-3xl font-bold font-display mb-8">¿En qué podemos ayudarte?</h2>
           <div className="relative w-full max-w-lg group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
              <input type="text" placeholder="Buscar tutoriales, guías..." className="w-full bg-white/10 border border-white/20 rounded-[32px] h-14 pl-14 pr-6 text-sm text-white focus:bg-white/20 transition-all outline-none focus:ring-4 focus:ring-teal-500/10" />
           </div>
        </div>

        {/* Support Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           <div className="card-premium h-full flex flex-col gap-6 group hover:border-teal-400 transition-all cursor-pointer">
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center shadow-sm"><Book className="w-6 h-6" /></div>
              <div>
                 <h3 className="font-bold text-slate-800">Manual de Uso</h3>
                 <p className="text-xs text-slate-400 mt-2 font-medium">Guía completa paso a paso para dominar ClientPulse.</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-teal-500 transition-all ml-auto mt-auto" />
           </div>
           <div className="card-premium h-full flex flex-col gap-6 group hover:border-sky-400 transition-all cursor-pointer">
              <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center shadow-sm"><Play className="w-6 h-6" /></div>
              <div>
                 <h3 className="font-bold text-slate-800">Video Tutoriales</h3>
                 <p className="text-xs text-slate-400 mt-2 font-medium">Aprende visualmente con nuestras demos rápidas.</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-sky-500 transition-all ml-auto mt-auto" />
           </div>
           <div className="card-premium h-full flex flex-col gap-6 group hover:border-indigo-400 transition-all cursor-pointer border-dashed">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-sm"><Zap className="w-6 h-6" /></div>
              <div>
                 <h3 className="font-bold text-slate-800">Atajos Rápidos</h3>
                 <p className="text-xs text-slate-400 mt-2 font-medium">Trucos y comandos para usuarios avanzados.</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-all ml-auto mt-auto" />
           </div>
           <div className="card-premium h-full flex flex-col gap-6 group hover:border-emerald-400 transition-all cursor-pointer">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-sm"><MessageSquare className="w-6 h-6" /></div>
              <div>
                 <h3 className="font-bold text-slate-800">Soporte Chat</h3>
                 <p className="text-xs text-slate-400 mt-2 font-medium">Habla directamente con nuestro equipo técnico.</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 transition-all ml-auto mt-auto" />
           </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6">
           <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3">
              <FileText className="w-5 h-5 text-teal-500" /> Preguntas Frecuentes
           </h3>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                 { q: "¿Cómo configurar las alertas de WhatsApp?", a: "Debes vincular tu número de teléfono con CallMeBot desde la sección de Perfil y enviar la frase de autorización." },
                 { q: "¿Limites del plan gratuito?", a: "El plan gratuito permite hasta 100 clientes activos y 5 categorías personalizadas sin limite de tiempo." },
                 { q: "¿Cómo funcionan los envíos automáticos?", a: "Usamos una integración con GitHub Actions para procesar tus programaciones una vez al día o a la hora definida." },
                 { q: "¿Qué son las variables {{nombre_cliente}}?", a: "Son etiquetas dinámicas que se reemplazan automáticamente por el dato real del cliente al enviar el mensaje." },
              ].map((faq, i) => (
                 <div key={i} className="card-premium border-slate-100 hover:bg-slate-50 transition-all group cursor-pointer shadow-none">
                    <p className="text-sm font-bold text-slate-800 mb-2">{faq.q}</p>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">{faq.a}</p>
                 </div>
              ))}
           </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Help
