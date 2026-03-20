import { motion } from 'framer-motion'
import { 
  User, 
  Mail, 
  Lock, 
  Briefcase, 
  ArrowRight, 
  Zap,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { cn } from '../utils/cn'
import { useAuth } from '../services/firebase/auth.provider'
import { UserService } from '../services/firebase/firestore'
import { GoogleSheetsService } from '../services/googleSheets.service'
import toast from 'react-hot-toast'

const registerSchema = z.object({
  fullName: z.string().min(3, 'Tu identidad profesional es requerida'),
  email: z.string().email('Email institucional válido requerido'),
  companyName: z.string().min(2, 'Nombre de tu organización/negocio'),
  password: z.string().min(8, 'Máxima seguridad: Mínimo 8 caracteres'),
})

type RegisterForm = z.infer<typeof registerSchema>

const Register = () => {
  const navigate = useNavigate()
  const { registerWithEmail, loginWithGoogle } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterForm) => {
    const toastId = toast.loading('Desplegando infraestructura personal...')
    try {
      const userCredential = await registerWithEmail(data.email, data.password)
      const user = userCredential.user

      const profile = {
        fullName: data.fullName,
        companyName: data.companyName,
        email: data.email,
        userId: user.uid,
        createdAt: new Date().toISOString()
      };
      await UserService.updateUserProfile(user.uid, profile)

      // Sync to Master Sheet (Admin Audit)
      await GoogleSheetsService.sync(undefined, 'USER', profile);

      toast.success('¡Academia activada! Bienvenid@ a la Élite.', { id: toastId })
      navigate('/dashboard')
    } catch (error: any) {
      toast.error('Fallo en la creación: El email ya existe o es inválido.', { id: toastId })
    }
  }

  const handleGoogleRegister = async () => {
    const toastId = toast.loading('Sincronizando Identidad Google...')
    try {
      const userCredential = await loginWithGoogle()
      const user = userCredential.user
      
      const profile = {
        fullName: user.displayName || 'Usuario Élite',
        email: user.email || '',
        userId: user.uid,
        photoURL: user.photoURL || undefined,
        companyName: 'Sector Independiente',
        createdAt: new Date().toISOString()
      };
      await UserService.updateUserProfile(user.uid, profile)
      
      // Sync to Master Sheet (Admin Audit)
      await GoogleSheetsService.sync(undefined, 'USER', profile);

      toast.success(`Identidad verificada: ${user.displayName}. Bienvenido al sistema.`, { id: toastId })
      navigate('/dashboard')
    } catch (error: any) {
      toast.error('Cancelado por el usuario o error de red.', { id: toastId })
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50 overflow-hidden">
      <div className="hidden lg:flex flex-col relative overflow-hidden bg-slate-950 p-20 justify-between">
         <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(20,184,166,0.15),transparent)] opacity-50" />
         <div className="relative z-10">
            <Link to="/" className="flex items-center gap-4 group">
               <div className="w-14 h-14 bg-teal-gradient rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-white fill-white" />
               </div>
               <div className="flex flex-col">
                  <span className="text-white font-black text-2xl tracking-tightest leading-none uppercase">CLIENTPULSE</span>
                  <span className="text-[10px] font-black text-teal-400 uppercase tracking-[0.4em] mt-1">Élite Registration</span>
               </div>
            </Link>
         </div>
         <div className="relative z-10">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
               <h1 className="text-8xl font-black text-white leading-tight font-display tracking-tightest">Únete a la <span className="bg-teal-gradient bg-clip-text text-transparent italic text-teal-400">Élite</span> Comercial.</h1>
               <p className="text-slate-500 text-2xl font-bold max-w-lg leading-relaxed opacity-80">Configura tu centro de mando hoy y transforma prospectos en clientes leales.</p>
            </motion.div>
         </div>
         <div className="grid grid-cols-2 gap-8 relative z-10 border-t border-white/5 pt-12">
            {['Cloud Persistence', 'Institutional Design', 'Military Security', 'Zero-Config Bridge'].map((item, idx) => (
               <div key={idx} className="flex items-center gap-3 text-slate-400">
                  <CheckCircle2 className="w-5 h-5 text-teal-500" />
                  <span className="text-[11px] font-black uppercase tracking-widest">{item}</span>
               </div>
            ))}
         </div>
      </div>
      <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col items-center justify-center p-8 md:p-24 bg-white overflow-y-auto">
        <div className="w-full max-w-[520px] space-y-12">
          <div className="text-center lg:text-left space-y-4">
            <h2 className="text-6xl font-black text-slate-950 font-display tracking-tightest leading-none">Alta de Usuario</h2>
            <p className="text-xl text-slate-400 font-bold italic">Infraestructura empresarial personalizada en un clic.</p>
          </div>
          <div className="space-y-10">
            <button onClick={handleGoogleRegister} className="group relative flex items-center justify-center gap-6 w-full bg-white border-4 border-slate-50 h-[88px] rounded-[32px] font-black uppercase text-xs tracking-[0.2em] shadow-2xl hover:border-teal-500/20 transition-all">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-8 h-8 group-hover:rotate-12 transition-transform" alt="G" />
              <span className="text-slate-900 group-hover:text-teal-600 transition-colors">Registro Rápido con Google</span>
            </button>
            <div className="relative h-px flex items-center justify-center"><div className="absolute inset-0 bg-slate-100"></div><span className="relative bg-white px-8 text-[11px] font-black text-slate-300 uppercase tracking-[0.4em]">O vía Credenciales</span></div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-4">Nombre Completo</label>
                  <div className="relative group">
                    <User className="absolute left-7 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-teal-600 transition-colors" />
                    <input {...register('fullName')} placeholder="Ej. Ana Pérez" className={cn("input-premium h-[80px] pl-16 text-lg rounded-[28px] bg-slate-50/50", errors.fullName && "border-rose-400")} />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-4">Tu Negocio</label>
                  <div className="relative group">
                    <Briefcase className="absolute left-7 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-teal-600 transition-colors" />
                    <input {...register('companyName')} placeholder="Tu Empresa" className={cn("input-premium h-[80px] pl-16 text-lg rounded-[28px] bg-slate-50/50", errors.companyName && "border-rose-400")} />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-4">Email Corporativo</label>
                <div className="relative group">
                  <Mail className="absolute left-7 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-teal-600 transition-colors" />
                  <input {...register('email')} placeholder="ana@empresa.com" className={cn("input-premium h-[80px] pl-16 text-lg rounded-[28px] bg-slate-50/50", errors.email && "border-rose-400")} />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-4">Crear Llave de Acceso</label>
                <div className="relative group">
                  <Lock className="absolute left-7 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-teal-600 transition-colors" />
                  <input type="password" {...register('password')} placeholder="••••••••••••" className={cn("input-premium h-[80px] pl-16 text-lg tracking-widest rounded-[28px] bg-slate-50/50", errors.password && "border-rose-400")} />
                </div>
              </div>
              <button type="submit" disabled={isSubmitting} className="btn-primary w-full h-[88px] text-xl rounded-[32px] group relative overflow-hidden shadow-2xl active:scale-95">
                <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                <span>Crear Cuenta PRO</span>
                <ArrowRight className="w-7 h-7 group-hover:translate-x-3 transition-transform ml-2" />
              </button>
            </form>
          </div>
          <div className="bg-emerald-50/50 p-10 rounded-[40px] border-2 border-emerald-100/50 flex items-center gap-6">
             <ShieldCheck className="w-12 h-12 text-emerald-500" />
             <p className="text-xs font-bold text-slate-500 leading-relaxed uppercase tracking-wider">Entorno Institucional Privatizado. Tus datos son 100% seguros y estancos.</p>
          </div>
          <div className="text-center pt-4">
            <p className="text-slate-400 font-black text-[11px] uppercase tracking-[0.4em]">¿Ya eres miembro? <Link to="/login" className="text-teal-600 hover:text-teal-700 underline underline-offset-8 transition-all ml-4">Ingresa Aquí</Link></p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Register
