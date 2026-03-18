import React from 'react'
import { motion } from 'framer-motion'
import { Settings as SettingsIcon, Bell, Shield, Smartphone, Globe, Palette, Moon, Sun, Monitor, Save, ChevronRight, UserCog } from 'lucide-react'
import AppLayout from '../components/layout/AppLayout'
import { cn } from '../utils/cn'

const Settings = () => {
  return (
    <AppLayout title="Configuración del Sistema">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-20">
        
        {/* Settings Navigation */}
        <div className="lg:col-span-3">
           <div className="card-premium p-4 shadow-none border-slate-200">
              <nav className="space-y-1">
                 {[
                    { label: 'General', icon: SettingsIcon, active: true },
                    { label: 'Notificaciones', icon: Bell, active: false },
                    { label: 'Privacidad & Seguridad', icon: Shield, active: false },
                    { label: 'Apariencia', icon: Palette, active: false },
                    { label: 'Idioma & Región', icon: Globe, active: false },
                 ].map((item, i) => (
                    <button 
                      key={i}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all",
                        item.active ? "bg-teal-600 text-white shadow-lg shadow-teal-500/20" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                       <item.icon className="w-4 h-4" />
                       {item.label}
                    </button>
                 ))}
              </nav>
           </div>
        </div>

        {/* Settings Form */}
        <div className="lg:col-span-9 space-y-8">
           {/* Section 1: General */}
           <div className="card-premium">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 shadow-sm border border-teal-100">
                    <UserCog className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="text-xl font-bold text-slate-900 font-display">Preferencia de la Cuenta</h3>
                    <p className="text-xs text-slate-500 font-medium">Configura cómo interactúas con la plataforma.</p>
                 </div>
              </div>

              <div className="space-y-6">
                 <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group transition-all">
                    <div>
                       <p className="text-sm font-bold text-slate-800">Tema del sistema</p>
                       <p className="text-xs text-slate-400 font-medium">Cambia entre modo claro y oscuro.</p>
                    </div>
                    <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200">
                       <button className="p-2 rounded-lg bg-teal-50 text-teal-600"><Sun className="w-4 h-4" /></button>
                       <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600"><Moon className="w-4 h-4" /></button>
                       <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600"><Monitor className="w-4 h-4" /></button>
                    </div>
                 </div>

                 <div className="flex items-center justify-between p-4 group cursor-pointer hover:bg-slate-50 px-2 rounded-xl transition-all">
                    <div className="px-2">
                       <p className="text-sm font-bold text-slate-800">Modo Compacto de Lista</p>
                       <p className="text-xs text-slate-400 font-medium">Muestra más clientes por pantalla reduciendo el espaciado.</p>
                    </div>
                    <button className="w-10 h-5 bg-slate-200 rounded-full flex items-center px-0.5 group-hover:bg-slate-300 transition-colors"><div className="w-4 h-4 bg-white rounded-full shadow-sm" /></button>
                 </div>

                 <div className="flex items-center justify-between p-4 group cursor-pointer hover:bg-slate-50 px-2 rounded-xl transition-all">
                    <div className="px-2">
                       <p className="text-sm font-bold text-slate-800">Confirmación de Envíos Manuales</p>
                       <p className="text-xs text-slate-400 font-medium">Preguntar siempre antes de abrir el enlace de WhatsApp.</p>
                    </div>
                    <button className="w-10 h-5 bg-teal-500 rounded-full flex items-center px-0.5 shadow-inner"><div className="w-4 h-4 bg-white rounded-full shadow-sm ml-auto" /></button>
                 </div>
              </div>
           </div>

           {/* Save Button */}
           <div className="flex justify-end gap-3">
              <button className="btn-secondary">Restaurar</button>
              <button className="btn-primary min-w-[200px] flex items-center justify-center gap-2">
                 <Save className="w-4 h-4" />
                 Aplicar Cambios
              </button>
           </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Settings
