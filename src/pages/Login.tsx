import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Zap,
  ShieldCheck,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { cn } from '../utils/cn'
import { useAuth } from '../services/firebase/auth.provider'
import { UserService } from '../services/firebase/firestore'
import toast from 'react-hot-toast'

const loginSchema = z.object({
  email: z.string().email('Email institucional requerido'),
  password: z.string().min(8, 'Mínimo 8 caracteres para tu seguridad'),
})

type LoginForm = z.infer<typeof loginSchema>

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false)
  const navigate = useNavigate()
  const { loginWithEmail, loginWithGoogle, logout } = useAuth()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  // Mandatory Session Purge for Data Isolation
  React.useEffect(() => {
    const purgeSession = async () => {
       try { await logout(); } catch (e) { /* ignore */ }
    }
    purgeSession();
  }, []);

  // Visual Greeting Cycle
  const [cycle, setCycle] = React.useState(0)
  React.useEffect(() => {
    const timer = setInterval(() => setCycle(c => (c + 1) % 3), 4500)
    return () => clearInterval(timer)
  }, [])

  const onSubmit = async (data: LoginForm) => {
    const toastId = toast.loading('Autenticando en nodo seguro...')
    try {
      await loginWithEmail(data.email, data.password)
      toast.success('Acceso Autorizado 🏛️', { id: toastId })
      navigate('/dashboard')
    } catch (error: any) {
      toast.error('Credenciales no válidas. Verifica tu email institucional.', { id: toastId })
    }
  }

  const handleGoogleLogin = async () => {
    const toastId = toast.loading('Sincronizando Identidad Digital...')
    try {
      const userCredential = await loginWithGoogle()
      const user = userCredential.user
      
      // FORCED IDENTITY UPDATE: Eliminates "Marcos" by prioritizing Google Source of Truth
      const existingProfile = await UserService.getUserProfile(user.uid)
      
      // If profile is fresh OR has the stale "Marcos" name, update it immediately
      if (!existingProfile || existingProfile.fullName === 'Marcos') {
         await UserService.updateUserProfile(user.uid, {
            fullName: user.displayName || user.email?.split('@')[0] || 'Usuario VIP',
            photoURL: user.photoURL || undefined,
            userId: user.uid,
            companyName: 'Sector Independiente'
         })
      }

      toast.success(`¡Bienvenida, ${user.displayName?.split(' ')[0] || 'Usuario'}! Nivel institucional activado.`, { id: toastId })
      navigate('/dashboard')
    } catch (error: any) {
      if (error.code === 'auth/unauthorized-domain') {
        toast.error('Dominio no autorizado. Debes añadir este link en Firebase Console.', { id: toastId })
      } else if (error.code === 'auth/popup-closed-by-user') {
        // Handled in provider
      } else {
        toast.error('Fallo técnico en la conexión Google.', { id: toastId })
      }
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50 overflow-hidden">
      {/* Brand Side (Institutional Visuals) */}
      <div className="hidden lg:flex flex-col relative overflow-hidden bg-slate-950 p-20 justify-between">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-teal-500/10 blur-[180px] rounded-full -mr-1/2 -mt-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/10 blur-[150px] rounded-full -ml-1/4 -mb-1/4" />
        
        <div className="relative z-10">
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center gap-4">
             <div className="w-16 h-16 bg-teal-gradient rounded-3xl flex items-center justify-center shadow-2xl shadow-teal-500/20">
                <Zap className="w-9 h-9 text-white fill-white" />
             </div>
             <div className="flex flex-col">
                <span className="text-white font-black text-3xl tracking-tightest leading-none">CLIENTPULSE</span>
                <span className="text-[11px] font-black text-teal-400 uppercase tracking-[0.5em] mt-1">Institutional Platform</span>
             </div>
          </motion.div>
        </div>

        <div className="relative z-10 max-w-2xl">
           <AnimatePresence mode="wait">
              <motion.div
                key={cycle}
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.8, ease: "circOut" }}
              >
                 {cycle === 0 && <h1 className="text-8xl font-black text-white leading-[0.9] font-display tracking-tightest">Diseño <span className="text-teal-400 italic">Premium</span> para tu éxito.</h1>}
                 {cycle === 1 && <h1 className="text-8xl font-black text-white leading-[0.9] font-display tracking-tightest">Gestión <span className="text-indigo-400 italic">Limpia</span> e inteligente.</h1>}
                 {cycle === 2 && <h1 className="text-8xl font-black text-white leading-[0.9] font-display tracking-tightest">Sin <span className="text-rose-400 italic">Límites</span> operativos.</h1>}
              </motion.div>
           </AnimatePresence>
           <p className="text-slate-500 text-2xl font-bold mt-12 max-w-md leading-relaxed opacity-80 italic">
              "La excelencia es un estándar, no un objetivo."
           </p>
        </div>

        <div className="flex gap-12 relative z-10 border-t border-white/5 pt-12">
           <div className="space-y-2">
              <span className="text-4xl font-black text-white font-display">100%</span>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Aislamiento de Datos</p>
           </div>
           <div className="space-y-2">
              <span className="text-4xl font-black text-white font-display">4K</span>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Interface Design</p>
           </div>
        </div>
      </div>

      {/* Auth Side */}
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col items-center justify-center p-8 md:p-24 bg-white"
      >
        <div className="w-full max-w-[480px] space-y-12">
          
          <div className="text-center lg:text-left space-y-4">
            <h2 className="text-6xl font-black text-slate-950 font-display tracking-tightest leading-none">Acceso Élite</h2>
            <p className="text-xl text-slate-400 font-bold max-w-sm mx-auto lg:mx-0 leading-relaxed italic">Tu centro de mando te espera. Solo para mentes comerciales brillantes.</p>
          </div>

          <div className="space-y-8">
            <button 
              onClick={handleGoogleLogin} 
              className="group relative flex items-center justify-center gap-6 w-full bg-white border-4 border-slate-50 h-[88px] rounded-[32px] font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-slate-200/50 hover:border-teal-500/20 active:scale-95 transition-all"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-8 h-8 group-hover:rotate-12 transition-transform" alt="G" />
              <span className="text-slate-900 group-hover:text-teal-600 transition-colors">Entrar con Google Cloud</span>
            </button>

            <div className="relative h-px flex items-center justify-center">
              <div className="absolute inset-0 bg-slate-100"></div>
              <span className="relative bg-white px-8 text-[11px] font-black text-slate-300 uppercase tracking-[0.4em]">O usa tu correo</span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-4">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-4">Email Corporativo</label>
                <div className="relative group">
                  <Mail className="absolute left-7 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-teal-600 transition-colors" />
                  <input type="email" {...register('email')} placeholder="admin@empresa.com" className={cn("input-premium h-[80px] pl-16 text-lg rounded-[28px] bg-slate-50/50", errors.email && "border-rose-400 ring-rose-100 ring-8")} />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center ml-4 pr-4">
                   <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Contraseña de Enlace</label>
                   <Link to="/forgot-password" title="Recuperar" className="text-teal-600 font-black text-[10px] uppercase tracking-widest hover:underline">Olvidé mi clave</Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-7 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-teal-600 transition-colors" />
                  <input type={showPassword ? 'text' : 'password'} {...register('password')} placeholder="••••••••••••" className={cn("input-premium h-[80px] pl-16 pr-16 text-lg tracking-widest rounded-[28px] bg-slate-50/50", errors.password && "border-rose-400 ring-rose-100 ring-8")} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-7 top-1/2 -translate-y-1/2 p-3 hover:bg-white rounded-2xl transition-all">
                    {showPassword ? <EyeOff className="w-6 h-6 text-slate-300" /> : <Eye className="w-6 h-6 text-slate-300" />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={isSubmitting} className="btn-primary w-full h-[88px] text-xl rounded-[32px] group relative overflow-hidden shadow-2xl shadow-teal-500/20 active:scale-95">
                <Zap className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                <span>Ingresar al Sistema</span>
                <ArrowRight className="w-7 h-7 group-hover:translate-x-3 transition-transform ml-2" />
              </button>
            </form>
          </div>

          <div className="bg-indigo-50/50 p-8 rounded-[40px] border-2 border-indigo-100/50 flex items-center gap-6">
             <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-xl text-indigo-500">
                <ShieldCheck className="w-8 h-8" />
             </div>
             <p className="text-xs font-bold text-slate-500 leading-relaxed uppercase tracking-wider">
                Infraestructura aislada por <span className="text-indigo-600 font-black italic">UID de seguridad</span>. Tu información es privada y soberana.
             </p>
          </div>

          <div className="text-center pt-4">
            <p className="text-slate-400 font-black text-[11px] uppercase tracking-[0.3em]">
              ¿Sin credenciales élite? <Link to="/register" className="text-teal-600 hover:text-teal-700 underline underline-offset-8 decoration-4 decoration-teal-100 hover:decoration-teal-600 transition-all ml-4">Empieza Gratis Ahora</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
