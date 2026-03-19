import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, Github, ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { cn } from '../utils/cn'
import { useAuth } from '../services/firebase/auth.provider'
import toast from 'react-hot-toast'

// Validation Schema
const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
  rememberMe: z.boolean().optional(),
})

type LoginForm = z.infer<typeof loginSchema>

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false)
  const navigate = useNavigate()
  const { loginWithEmail, loginWithGoogle } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    try {
      await loginWithEmail(data.email, data.password)
      toast.success('Bienvenido de nuevo 🎉')
      navigate('/dashboard')
    } catch (error: any) {
      console.error(error)
      toast.error('Credenciales incorrectas o error de red.')
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle()
      toast.success('Bienvenido de nuevo 🎉')
      navigate('/dashboard')
    } catch (error: any) {
      console.error(error)
      toast.error('Error al iniciar sesión con Google.')
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50 selection:bg-teal-100 selection:text-teal-900 overflow-hidden">
      {/* Branding Side (Visible only on Desktop) */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="hidden lg:flex flex-col relative overflow-hidden bg-slate-900 group"
      >
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/10 blur-[120px] rounded-full -mr-1/2 -mt-1/2 group-hover:bg-teal-500/20 transition-all duration-1000" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-500/10 blur-[100px] rounded-full -ml-1/4 -mb-1/4" />
        
        {/* Particle/Dot Grid */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <div className="relative z-10 flex-1 flex flex-col justify-between p-16">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="flex items-center gap-3"
          >
             <img src="/logo_clientpulse_v2.svg" alt="ClientPulse V2 Logo" className="w-12 h-12" />
             <span className="font-display font-semibold text-2xl text-white tracking-tight">clientpulse</span>
          </motion.div>

          <div className="max-w-md">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl font-bold text-white leading-[1.1] mb-6 font-display"
            >
              La gestión de clientes <span className="text-teal-400">reimaginada</span>.
            </motion.h1>
            <motion.p 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.3 }}
               className="text-slate-400 text-lg leading-relaxed font-interface"
            >
              Automatiza tus recordatorios, centraliza tu base de datos y mejora el pulso de tu negocio con inteligencia real.
            </motion.p>
          </div>

          <div className="flex items-center gap-6 text-slate-500 text-sm font-medium">
            <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group">
               <div className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-teal-500 transition-colors" />
               Empresas
            </span>
            <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group">
               <div className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-teal-500 transition-colors" />
               Freelancers
            </span>
            <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group">
               <div className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-teal-500 transition-colors" />
               Vendedores
            </span>
          </div>
        </div>
      </motion.div>

      {/* Form Side */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center p-6 md:p-12 lg:p-20"
      >
        <div className="w-full max-w-[420px] space-y-8">
          {/* Header Mobile */}
          <div className="lg:hidden flex flex-col items-center mb-8 gap-4">
            <motion.img 
              initial={{ scale: 0.5, rotate: -10, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              src="/logo_clientpulse_v2.svg" 
              alt="ClientPulse Logo" 
              className="w-16 h-16 drop-shadow-xl" 
            />
            <h2 className="text-2xl font-bold text-slate-900 font-display hidden">clientpulse</h2>
          </div>

          <div className="text-left space-y-2">
            <h2 className="text-3xl font-bold text-slate-900 font-display tracking-tight">Bienvenido de nuevo</h2>
            <p className="text-slate-500 font-interface">Ingresa tus credenciales para acceder a tu panel.</p>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-1 gap-4">
            <button 
              onClick={handleGoogleLogin} 
              className="flex items-center justify-center gap-3 w-full bg-white border border-slate-200 text-slate-700 h-14 rounded-2xl font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all hover-scale shadow-sm shadow-slate-200/40 group active:scale-[0.98]"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="Google" />
              <span>Continuar con Google</span>
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-slate-50 px-4 text-slate-400 font-bold tracking-widest">o con tu email</span></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700 ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 transition-colors group-focus-within:text-teal-500" />
                <input 
                  type="email" 
                  {...register('email')}
                  placeholder="ejemplo@correo.com" 
                  className={cn(
                    "input-premium pl-12 h-14",
                    errors.email && "border-red-400 focus:ring-red-500/10 focus:border-red-500"
                  )}
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1 font-medium ml-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between ml-1 pr-1">
                <label className="text-sm font-bold text-slate-700">Contraseña</label>
                <Link to="/forgot-password" className="text-teal-600 font-bold text-xs hover:text-teal-700 transition-colors">¿Olvidaste tu contraseña?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  {...register('password')}
                  placeholder="••••••••••••" 
                  className={cn(
                    "input-premium pl-12 pr-12 h-14",
                    errors.password && "border-red-400 focus:ring-red-500/10 focus:border-red-500"
                  )}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5 text-slate-400" /> : <Eye className="w-5 h-5 text-slate-400" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1 font-medium ml-1">{errors.password.message}</p>}
            </div>

            <div className="flex items-center gap-2 px-1">
              <input 
                type="checkbox" 
                id="remember" 
                {...register('rememberMe')}
                className="w-4 h-4 text-teal-600 rounded-lg border-slate-300 focus:ring-teal-500 cursor-pointer" 
              />
              <label htmlFor="remember" className="text-sm text-slate-500 font-medium cursor-pointer">Mantener mi sesión iniciada</label>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn-primary w-full h-14 text-base relative overflow-hidden flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Iniciar Sesión</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-slate-500 font-medium pt-4">
            ¿Aún no tienes cuenta?{' '}
            <Link to="/register" className="text-teal-600 font-bold hover:text-teal-700 underline-offset-4 hover:underline transition-all">Regístrate ahora</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
