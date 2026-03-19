import { useState } from 'react'
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

const steps = [
  { id: 1, title: 'Bienvenida', icon: PartyPopper },
  { id: 2, title: 'Tu Perfil', icon: User },
  { id: 3, title: 'WhatsApp', icon: Smartphone },
  { id: 4, title: 'Email', icon: Mail },
  { id: 5, title: 'Categoría', icon: LayoutGrid },
]

const OnboardingWizard = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const navigate = useNavigate()

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  const finish = () => {
    // TODO: Update user record 'onboardingCompleted: true' in Firestore
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-6 selection:bg-teal-100">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-500/10 blur-[150px] rounded-full -mr-1/3 -mt-1/3" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-sky-500/10 blur-[150px] rounded-full -ml-1/3 -mb-1/3" />
      </div>

      <div className="w-full max-w-[800px] relative z-10">
        {/* Progress Bar */}
        <div className="mb-12 flex items-center justify-between px-2">
           <div className="flex-1 flex items-center gap-2">
              {steps.map(step => (
                 <div key={step.id} className="flex-1 space-y-3">
                    <div className="h-1.5 rounded-full bg-slate-200 relative overflow-hidden ring-1 ring-slate-200 ring-offset-2 ring-offset-slate-100">
                       <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: currentStep >= step.id ? '100%' : '0%' }}
                          className={cn("absolute inset-0 transition-all duration-700", currentStep >= step.id ? "bg-teal-500" : "bg-slate-300")}
                       />
                    </div>
                    {/* Step Label (Desktop) */}
                    <div className={cn(
                      "hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors duration-500",
                      currentStep === step.id ? "text-teal-600" : "text-slate-400"
                    )}>
                       <step.icon className={cn("w-3.5 h-3.5", currentStep === step.id ? "text-teal-500" : "text-slate-300")} />
                       {step.title}
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* Wizard Card */}
        <div className="card-premium min-h-[540px] flex flex-col p-12 border-none shadow-2xl bg-white/80 backdrop-blur-xl relative overflow-hidden group">
           <AnimatePresence mode="wait">
              {currentStep === 1 && (
                 <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="flex-1 flex flex-col items-center justify-center text-center space-y-8"
                 >
                    <div className="w-24 h-24 bg-teal-500 rounded-[40px] flex items-center justify-center text-white shadow-2xl shadow-teal-500/20 animate-bounce group-hover:rotate-6 transition-transform">
                       <PartyPopper className="w-12 h-12" />
                    </div>
                    <div className="space-y-4 max-w-lg mb-4">
                       <h1 className="text-5xl font-black font-display text-slate-900 tracking-tight leading-tight">
                          ¡Bienvenido a <span className="text-teal-500">clientpulse</span>!
                       </h1>
                       <p className="text-slate-500 text-xl leading-relaxed font-interface">
                          Hola, soy tu <span className="text-teal-600 font-bold">Asistente de Cuidado al Cliente</span>. Estoy aquí para ayudarte a transformar tu negocio en una máquina de fidelización en solo 2 minutos.
                       </p>
                    </div>
                    <div className="bg-teal-50 p-6 rounded-3xl border border-teal-100 max-w-md">
                       <p className="text-sm text-teal-800 font-medium">
                          "La clave del éxito no es vender una vez, sino mantener el pulso de la relación con cada cliente." - <span className="font-bold">Coach ClientPulse</span>
                       </p>
                    </div>
                    <button onClick={nextStep} className="btn-primary h-14 text-lg px-12 group">
                       Empezar Configuración <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </button>
                 </motion.div>
              )}

              {currentStep === 2 && (
                 <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="flex-1 space-y-10"
                 >
                    <div className="flex gap-4 p-4 bg-teal-50 rounded-3xl border border-teal-100">
                       <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-teal-600 shadow-sm"><User className="w-6 h-6" /></div>
                       <div>
                          <p className="text-sm font-bold text-teal-900 uppercase tracking-widest leading-none mt-1">Tu Perfil Público</p>
                          <p className="text-[10px] text-teal-700 font-medium">Completa tus datos para que tus clientes te reconozcan.</p>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
                       <div className="md:col-span-4 flex flex-col items-center justify-center gap-4">
                          <div className="relative group/avatar cursor-pointer">
                             <div className="w-40 h-40 rounded-[48px] bg-slate-50 border-4 border-white shadow-2xl flex items-center justify-center text-slate-200 overflow-hidden">
                                <User className="w-20 h-20" />
                             </div>
                             <div className="absolute inset-0 bg-slate-900/40 rounded-[48px] flex flex-col items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                                <Camera className="w-8 h-8 text-white mb-2" />
                                <span className="text-[10px] text-white font-bold uppercase tracking-widest">Subir Foto</span>
                             </div>
                          </div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Formato: JPG / PNG, Max 2MB</p>
                       </div>
                       <div className="md:col-span-8 grid grid-cols-1 gap-6">
                          <div className="space-y-1">
                             <label className="text-xs font-bold text-slate-500 px-1 uppercase tracking-widest leading-none">Tu Nombre *</label>
                             <input type="text" placeholder="Ej: Víctor Villegas" className="input-premium h-14 text-sm" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 px-1 uppercase tracking-widest leading-none">País *</label>
                                <div className="relative">
                                   <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                   <input type="text" placeholder="Ecuador" className="input-premium h-14 pl-11 text-sm font-medium" />
                                </div>
                             </div>
                             <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 px-1 uppercase tracking-widest leading-none">Zona Horaria</label>
                                <input type="text" value="America/Guayaquil (GMT-5)" readOnly className="input-premium h-14 text-sm font-medium bg-slate-50 text-slate-600 cursor-default" />
                             </div>
                          </div>
                       </div>
                    </div>
                 </motion.div>
              )}

              {currentStep === 3 && (
                 <motion.div 
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="flex-1 space-y-8"
                 >
                    <div className="flex gap-4 p-4 bg-emerald-50 rounded-3xl border border-emerald-100 mb-8">
                       <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm"><Smartphone className="w-6 h-6" /></div>
                       <div className="flex-1">
                          <p className="text-sm font-bold text-emerald-900 uppercase tracking-widest leading-none mt-1">Sistema de Alertas WhatsApp</p>
                          <p className="text-[10px] text-emerald-700 font-medium">Recibirás un mensaje en tu WhatsApp cada vez que debas contactar a un cliente.</p>
                       </div>
                       <ShieldCheck className="w-8 h-8 text-emerald-600 m-auto mr-2" />
                    </div>

                    <div className="space-y-8">
                       <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 flex items-center gap-2 mb-2"><CheckCircle2 className="w-4 h-4 text-teal-500" /> Paso A: Tu número</label>
                          <div className="flex gap-4">
                             <div className="w-20">
                                <input type="text" value="+593" readOnly className="input-premium h-14 text-center text-sm font-bold bg-slate-50" />
                             </div>
                             <input type="tel" placeholder="091 234 5678" className="input-premium h-14 flex-1 text-sm font-bold tracking-widest" />
                          </div>
                       </div>

                       <div className="bg-slate-900 rounded-[32px] p-8 space-y-6 text-white overflow-hidden relative">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/20 blur-3xl -mr-16 -mt-16" />
                          <p className="text-xs font-bold text-teal-400 uppercase tracking-widest flex items-center gap-2">Paso B: Conectar CallMeBot</p>
                          <div className="space-y-4">
                             <div className="flex gap-4 items-start group">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex flex-shrink-0 items-center justify-center font-bold text-sm">1</div>
                                <p className="text-xs text-slate-300 leading-relaxed pt-1 flex-1">Envía el mensaje <code className="bg-white/20 px-2 py-0.5 rounded text-white select-all">I allow callmebot to send me messages</code> al número <span className="text-white font-bold tracking-wider">+34 644 59 32 07</span></p>
                             </div>
                             <div className="flex gap-4 items-start group">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex flex-shrink-0 items-center justify-center font-bold text-sm">2</div>
                                <div className="flex-1 space-y-2">
                                   <p className="text-xs text-slate-300 leading-relaxed pt-1">Recibirás una API Key. Pégala aquí:</p>
                                   <input type="password" placeholder="Tu API Key recibida..." className="w-full bg-white/5 border border-white/10 rounded-2xl h-12 px-6 text-sm text-white focus:bg-white/10 transition-all outline-none" />
                                </div>
                             </div>
                          </div>
                          <button className="w-full py-4 bg-teal-500 text-white rounded-2xl font-bold text-sm hover:bg-teal-600 transition-all shadow-xl shadow-teal-500/20">Probar Conexión</button>
                       </div>
                    </div>
                 </motion.div>
              )}

              {currentStep === 4 && (
                 <motion.div 
                    key="step4"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="flex-1 space-y-10"
                 >
                    <div className="flex gap-4 p-4 bg-sky-50 rounded-3xl border border-sky-100 flex-shrink-0">
                       <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-sky-600 shadow-sm"><Mail className="w-6 h-6" /></div>
                       <div>
                          <p className="text-sm font-bold text-sky-900 uppercase tracking-widest leading-none mt-1">Configuración de Email</p>
                          <p className="text-[10px] text-sky-700 font-medium">Recibe un reporte semanal con el estado de salud de tu cartera de clientes.</p>
                       </div>
                    </div>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="card-premium border-2 border-slate-100 h-full p-8 flex flex-col justify-between group active:border-teal-400 transition-all cursor-pointer hover:bg-slate-50 shadow-none">
                          <div className="space-y-6">
                            <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs ring-4 ring-slate-100 group-hover:scale-110 transition-transform">EJS</div>
                            <h3 className="font-bold text-slate-800 text-lg">EmailJS (Recomendado)</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">Gratis hasta 200 correos al mes. Es la opción más rápida de configurar para ClientPulse.</p>
                          </div>
                          <div className="flex items-center gap-2 text-teal-600 text-xs font-bold uppercase tracking-widest mt-8">
                             Configurar <ChevronRight className="w-4 h-4" />
                          </div>
                       </div>
                       <div className="card-premium border-2 border-slate-100 h-full p-8 flex flex-col justify-between group active:border-teal-400 transition-all cursor-pointer hover:bg-slate-50 shadow-none grayscale opacity-50">
                          <div className="space-y-6">
                            <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs ring-4 ring-indigo-50">BR</div>
                            <h3 className="font-bold text-slate-800 text-lg">Brevo</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">Opción enterprise. Requiere cuenta de desarrollador. (Próximamente disponible)</p>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mt-8">
                             Próximamente <Clock className="w-4 h-4" />
                          </div>
                       </div>
                    </div>
                    <button onClick={nextStep} className="w-full text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest">Omitir este paso por ahora</button>
                 </motion.div>
              )}

              {currentStep === 5 && (
                 <motion.div 
                    key="step5"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="flex-1 space-y-10 flex flex-col items-center justify-center"
                 >
                     <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                        className="w-24 h-24 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-[40px] flex items-center justify-center text-white shadow-2xl shadow-teal-500/30 mb-4"
                     >
                        <PartyPopper className="w-12 h-12" />
                     </motion.div>
                     <div className="text-center space-y-4 max-w-sm mb-6">
                        <h2 className="text-4xl font-black font-display text-slate-900 tracking-tight">¡TODO LISTO! 🚀</h2>
                        <p className="text-slate-500 font-medium text-lg">
                           Ya eres parte de la nueva era de gestión de clientes. Tu tablero te espera para empezar a crecer.
                        </p>
                     </div>

                     <div className="w-full max-w-md p-6 bg-slate-900 rounded-[32px] text-white space-y-4 mb-8">
                        <div className="flex items-center gap-3">
                           <ShieldCheck className="w-6 h-6 text-teal-400" />
                           <span className="font-black uppercase tracking-widest text-[10px]">Tu cuenta está protegida y lista</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed font-medium">
                           Hemos sincronizado tus preferencias. Recuerda que puedes cambiar cualquier ajuste desde tu perfil en cualquier momento.
                        </p>
                     </div>
                     
                     <button onClick={finish} className="btn-primary h-16 w-full max-w-md text-lg font-black mt-2 flex items-center justify-center gap-4 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        <span>ENTRAR AL PANEL</span>
                        <Zap className="w-6 h-6 fill-amber-300 text-amber-300" />
                     </button>
                 </motion.div>
              )}
           </AnimatePresence>

           {/* Footer Buttons */}
           {currentStep > 1 && (
             <div className="mt-12 flex items-center justify-between pt-8 border-t border-slate-100 relative z-20">
                <button 
                  onClick={prevStep}
                  className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-all font-bold text-xs uppercase tracking-widest disabled:opacity-0"
                  disabled={currentStep === 1}
                >
                   <ChevronLeft className="w-4 h-4" /> Anterior
                </button>
                {currentStep < steps.length && (
                  <button 
                    onClick={nextStep}
                    className="flex items-center gap-2 text-teal-600 hover:text-teal-900 font-bold text-xs uppercase tracking-widest"
                  >
                     Saltar este paso <ChevronRight className="w-4 h-4" />
                  </button>
                )}
             </div>
           )}
        </div>

        {/* Support Link */}
        <p className="text-center mt-12 text-slate-400 text-xs font-bold uppercase tracking-widest leading-none">
           ¿Necesitas ayuda? <span className="text-teal-500 cursor-pointer hover:underline underline-offset-4">Habla con soporte</span>
        </p>
      </div>
    </div>
  )
}

export default OnboardingWizard
