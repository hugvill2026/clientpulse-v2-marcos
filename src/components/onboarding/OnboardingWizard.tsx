import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Smartphone, 
  Mail, 
  User, 
  LayoutGrid, 
  Zap, 
  PartyPopper,
  ShieldCheck,
  Globe,
  Camera,
  MessageSquare,
  Clock
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '../../utils/cn'
import { useAuthStore } from '../../store/authStore'
import { UserService } from '../../services/firebase/firestore'
import toast from 'react-hot-toast'

const steps = [
  { id: 1, title: 'Bienvenida', icon: PartyPopper },
  { id: 2, title: 'Tu Perfil', icon: User },
  { id: 3, title: 'WhatsApp', icon: Smartphone },
  { id: 4, title: 'Email', icon: Mail },
  { id: 5, title: 'Categoría', icon: LayoutGrid },
]

const OnboardingWizard = () => {
  const { user } = useAuthStore()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
     fullName: '',
     city: 'Ecuador',
     phone: ''
  })
  const navigate = useNavigate()

  useEffect(() => {
     if (user) {
        setFormData(prev => ({ ...prev, fullName: user.displayName || '', phone: user.phoneNumber || '' }))
     }
  }, [user])

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  const finish = async () => {
    if (user) {
       await UserService.updateUserProfile(user.uid, { 
          fullName: formData.fullName, 
          city: formData.city, 
          phone: formData.phone,
          updatedAt: new Date().toISOString()
       })
       toast.success('¡Identidad configurada! Bienvenido al Centro de Mando.')
    }
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-6 selection:bg-teal-100">
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-500/10 blur-[150px] rounded-full -mr-1/3 -mt-1/3" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-sky-500/10 blur-[150px] rounded-full -ml-1/3 -mb-1/3" />
      </div>

      <div className="w-full max-w-[800px] relative z-10">
        <div className="mb-12 flex items-center justify-between px-2">
           <div className="flex-1 flex items-center gap-2">
              {steps.map(step => (
                 <div key={step.id} className="flex-1 space-y-3">
                    <div className="h-1.5 rounded-full bg-slate-200 relative overflow-hidden ring-1 ring-slate-200 ring-offset-2 ring-offset-slate-100">
                       <motion.div animate={{ width: currentStep >= step.id ? '100%' : '0%' }} className={cn("absolute inset-0 transition-all duration-700", currentStep >= step.id ? "bg-teal-500" : "bg-slate-300")} />
                    </div>
                    <div className={cn("hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors duration-500", currentStep === step.id ? "text-teal-600" : "text-slate-400")}>
                       <step.icon className={cn("w-3.5 h-3.5", currentStep === step.id ? "text-teal-500" : "text-slate-300")} />
                       {step.title}
                    </div>
                 </div>
              ))}
           </div>
        </div>

        <div className="card-premium min-h-[540px] flex flex-col p-12 border-none shadow-2xl bg-white/80 backdrop-blur-xl relative overflow-hidden group">
           <AnimatePresence mode="wait">
              {currentStep === 1 && (
                 <motion.div key="step1" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
                    <div className="w-24 h-24 bg-teal-500 rounded-[40px] flex items-center justify-center text-white shadow-2xl animate-bounce"><PartyPopper className="w-12 h-12" /></div>
                    <div className="space-y-4 max-w-lg mb-4">
                       <h1 className="text-5xl font-black font-display text-slate-900 tracking-tight leading-tight">¡Bienvenido a <span className="text-teal-500 italic">clientpulse</span>!</h1>
                       <p className="text-slate-500 text-xl leading-relaxed font-interface">Hola, soy tu <span className="text-teal-600 font-bold">Asistente de Cuidado al Cliente</span>. Estoy aquí para ayudarte a transformar prospectos en fans leales.</p>
                    </div>
                    <button onClick={nextStep} className="btn-primary h-14 text-lg px-12 group">Empezar Configuración <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" /></button>
                 </motion.div>
              )}

              {currentStep === 2 && (
                 <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="flex-1 space-y-10">
                    <div className="flex gap-4 p-4 bg-teal-50 rounded-3xl border border-teal-100"><div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-teal-600 shadow-sm"><User className="w-6 h-6" /></div><div><p className="text-sm font-bold text-teal-900 uppercase tracking-widest leading-none mt-1">Configura Tu Identidad</p><p className="text-[10px] text-teal-700 font-medium">Define cómo quieres que te reconozca el sistema.</p></div></div>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
                       <div className="md:col-span-4 flex flex-col items-center justify-center gap-4"><div className="relative group/avatar cursor-pointer"><div className="w-40 h-40 rounded-[48px] bg-slate-50 border-4 border-white shadow-2xl flex items-center justify-center text-slate-200 overflow-hidden"><User className="w-20 h-20" /></div></div></div>
                       <div className="md:col-span-8 grid grid-cols-1 gap-6">
                          <div className="space-y-1"><label className="text-xs font-bold text-slate-500 px-1 uppercase tracking-widest leading-none">Tu Nombre *</label><input type="text" placeholder="Tu Nombre Real" className="input-premium h-14 text-sm" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} /></div>
                          <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-1"><label className="text-xs font-bold text-slate-500 px-1 uppercase tracking-widest leading-none">País *</label><div className="relative"><Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="text" placeholder="Ecuador" className="input-premium h-14 pl-11 text-sm font-medium" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} /></div></div>
                             <div className="space-y-1"><label className="text-xs font-bold text-slate-500 px-1 uppercase tracking-widest leading-none">Zona Horaria</label><input type="text" value="GTM-5 (Institucional)" readOnly className="input-premium h-14 text-sm font-medium bg-slate-50 text-slate-600 cursor-default" /></div>
                          </div>
                       </div>
                    </div>
                 </motion.div>
              )}

              {currentStep === 3 && (
                 <motion.div key="step3" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="flex-1 space-y-8">
                    <div className="flex gap-4 p-4 bg-emerald-50 rounded-3xl border border-emerald-100 mb-8"><div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm"><Smartphone className="w-6 h-6" /></div><div className="flex-1"><p className="text-sm font-bold text-emerald-900 uppercase tracking-widest leading-none mt-1">Lanzamiento Vía Enlace</p><p className="text-[10px] text-emerald-700 font-medium">Usarás tu propio WhatsApp sin APIs. 100% Gratuito.</p></div><CheckCircle2 className="w-8 h-8 text-emerald-600 m-auto mr-2" /></div>
                    <div className="card-premium border-2 border-emerald-100 bg-white p-6">
                       <h3 className="font-bold text-slate-800 text-lg mb-2">Protocolo de Despacho</h3>
                       <p className="text-sm text-slate-500 leading-relaxed">Haz click en "Enviar" y se abrirá tu aplicación de WhatsApp con todo listo para impactar al cliente.</p>
                    </div>
                 </motion.div>
              )}

              {currentStep === 4 && (
                 <motion.div key="step4" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="flex-1 space-y-10"><div className="flex gap-4 p-4 bg-sky-50 rounded-3xl border border-sky-100 flex-shrink-0"><div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-sky-600 shadow-sm"><Mail className="w-6 h-6" /></div><div><p className="text-sm font-bold text-sky-900 uppercase tracking-widest leading-none mt-1">Gestión de Email</p><p className="text-[10px] text-sky-700 font-medium">Recibe métricas clave semanales.</p></div></div><div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8"><div className="card-premium border-2 border-slate-100 h-full p-8 flex flex-col justify-between hover:bg-slate-50 shadow-none"><div className="space-y-6"><div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs ring-4 ring-slate-100">EJS</div><h3 className="font-bold text-slate-800 text-lg">EmailJS Integrado</h3><p className="text-xs text-slate-400">Configuración rápida en 1 paso.</p></div></div><div className="card-premium border-2 border-slate-100 h-full p-8 flex flex-col justify-between opacity-50 grayscale shadow-none"><div className="space-y-6"><div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">BR</div><h3 className="font-bold text-slate-800 text-lg">Brevo</h3><p className="text-xs text-slate-400">Próximamente disponible.</p></div></div></div></motion.div>
              )}

              {currentStep === 5 && (
                 <motion.div key="step5" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="flex-1 space-y-10 flex flex-col items-center justify-center"><motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-24 h-24 bg-teal-gradient rounded-[40px] flex items-center justify-center text-white shadow-2xl mb-4"><PartyPopper className="w-12 h-12" /></motion.div><div className="text-center space-y-4 max-w-sm mb-6"><h2 className="text-4xl font-black font-display text-slate-900 tracking-tight">¡LISTO! 🚀</h2><p className="text-slate-500 font-medium text-lg">Tu ecosistema de fidelización está desplegado.</p></div><button onClick={finish} className="btn-primary h-16 w-full max-w-md text-lg font-black mt-2 flex items-center justify-center gap-4 group"><span>ENTRAR AL PANEL</span><Zap className="w-6 h-6 fill-amber-300 text-amber-300" /></button></motion.div>
              )}
           </AnimatePresence>

           {currentStep > 1 && (
             <div className="mt-12 flex items-center justify-between pt-8 border-t border-slate-100 relative z-20">
                <button onClick={prevStep} className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold text-xs uppercase tracking-widest"><ChevronLeft className="w-4 h-4" /> Anterior</button>
                {currentStep < steps.length && <button onClick={nextStep} className="flex items-center gap-2 text-teal-600 hover:text-teal-900 font-bold text-xs uppercase tracking-widest italic font-black">Continuar <ChevronRight className="w-4 h-4" /></button>}
             </div>
           )}
        </div>
      </div>
    </div>
  )
}

export default OnboardingWizard
