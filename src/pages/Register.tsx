import React from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Lock, Building2, CheckCircle2, ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { cn } from '../utils/cn'

// Validation Schema
const registerSchema = z.object({
  fullName: z.string().min(2, 'Ingresa tu nombre completo'),
  companyName: z.string().optional(),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres').regex(/[A-Z]/, 'Debe incluir una mayúscula').regex(/[0-9]/, 'Debe incluir un número'),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, 'Debes aceptar los términos'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
})

type RegisterForm = z.infer<typeof registerSchema>

const Register = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  })

  const password = watch('password', '')

  const onSubmit = async (data: RegisterForm) => {
    console.log('Register data:', data)
    // TODO: Firebase Registration
    navigate('/onboarding')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 selection:bg-teal-100">
      {/* Background Graphic */}
      <div className="fixed inset-0 pointer-events-none opacity-60 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-teal-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-sky-500/20 blur-[120px] rounded-full" />
        <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-purple-500/10 blur-[90px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[500px] relative z-10"
      >
        <div className="card-premium p-10 border-none shadow-2xl bg-white/90">
          <div className="flex flex-col items-center mb-10 gap-4">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="mb-6"
            >
               <img src="/logo_clientpulse_v2.svg" alt="ClientPulse V2 Logo" className="h-16 w-auto" />
            </motion.div>
             <div className="text-center space-y-3">
                <h1 className="text-4xl font-black font-display text-slate-900 tracking-tight leading-[1.1]">Únete a <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500">la élite</span> comercial</h1>
                <p className="text-slate-500 font-interface text-base max-w-[320px] mx-auto leading-relaxed">Configura tu centro de mando y empieza a transformar prospectos en clientes leales hoy.</p>
             </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-widest leading-none">Nombre Completo *</label>
                  <div className="relative">
                     <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                     <input type="text" {...register('fullName')} placeholder="Víctor Villegas" className="input-premium h-12 pl-11 text-sm shadow-sm" />
                  </div>
                  {errors.fullName && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.fullName.message}</p>}
               </div>
               <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-widest leading-none">Negocio (Opcional)</label>
                  <div className="relative">
                     <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                     <input type="text" {...register('companyName')} placeholder="Tu Empresa" className="input-premium h-12 pl-11 text-sm shadow-sm" />
                  </div>
               </div>
            </div>

            <div className="space-y-1">
               <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-widest leading-none">Email *</label>
               <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="email" {...register('email')} placeholder="ejemplo@correo.com" className="input-premium h-12 pl-11 text-sm shadow-sm" />
               </div>
               {errors.email && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.email.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-widest leading-none">Contraseña *</label>
                  <div className="relative">
                     <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                     <input type="password" {...register('password')} placeholder="••••••••" className="input-premium h-12 pl-11 text-sm shadow-sm" />
                  </div>
                  {errors.password && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.password.message}</p>}
               </div>
               <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-widest leading-none">Confirmar *</label>
                  <div className="relative">
                     <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                     <input type="password" {...register('confirmPassword')} placeholder="••••••••" className="input-premium h-12 pl-11 text-sm shadow-sm" />
                  </div>
                  {errors.confirmPassword && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.confirmPassword.message}</p>}
               </div>
            </div>

            {/* Password Requirement Checklist (Real-time Visual Feedback) */}
            <div className="bg-slate-50 p-4 rounded-2xl space-y-2">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Tu contraseña debe incluir:</p>
               <div className="flex items-center gap-2 text-[10px] font-bold">
                  <div className={cn("w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all", password.length >= 8 ? "bg-teal-500 text-white" : "bg-slate-200 text-slate-400")}>
                     {password.length >= 8 && <CheckCircle2 className="w-2.5 h-2.5" />}
                  </div>
                  <span className={password.length >= 8 ? "text-teal-600" : "text-slate-400"}>Mínimo 8 caracteres</span>
               </div>
               <div className="flex items-center gap-2 text-[10px] font-bold">
                  <div className={cn("w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all", /[A-Z]/.test(password) ? "bg-teal-500 text-white" : "bg-slate-200 text-slate-400")}>
                     {/[A-Z]/.test(password) && <CheckCircle2 className="w-2.5 h-2.5" />}
                  </div>
                  <span className={/[A-Z]/.test(password) ? "text-teal-600" : "text-slate-400"}>Una letra mayúscula</span>
               </div>
               <div className="flex items-center gap-2 text-[10px] font-bold">
                  <div className={cn("w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all", /[0-9]/.test(password) ? "bg-teal-500 text-white" : "bg-slate-200 text-slate-400")}>
                     {/[0-9]/.test(password) && <CheckCircle2 className="w-2.5 h-2.5" />}
                  </div>
                  <span className={/[0-9]/.test(password) ? "text-teal-600" : "text-slate-400"}>Al menos un número</span>
               </div>
            </div>

            <div className="flex items-start gap-3 px-1">
               <input 
                  type="checkbox" 
                  id="terms" 
                  {...register('terms')}
                  className="w-4 h-4 text-teal-600 rounded mt-0.5" 
               />
               <label htmlFor="terms" className="text-xs text-slate-500 leading-tight">
                  Acepto los <Link to="/terms" className="text-teal-600 font-bold underline-offset-2 hover:underline">Términos de Servicio</Link> y la <Link to="/privacy" className="text-teal-600 font-bold underline-offset-2 hover:underline">Política de Privacidad</Link>.
               </label>
            </div>
            {errors.terms && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.terms.message}</p>}

            <button 
               type="submit" 
               disabled={isSubmitting}
               className="btn-primary w-full h-14 text-base relative overflow-hidden flex items-center justify-center gap-2"
            >
               {isSubmitting ? (
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
               ) : (
                  <>
                     <span>Crear mi cuenta</span>
                     <ArrowRight className="w-5 h-5" />
                  </>
               )}
            </button>
          </form>

          <p className="text-center text-slate-500 font-bold text-sm mt-8">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="text-teal-600 hover:text-teal-700 underline underline-offset-4">Inicia sesión</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Register
