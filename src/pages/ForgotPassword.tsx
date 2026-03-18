import React from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowLeft, Send, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../utils/cn'

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[420px] card-premium p-10 border-none shadow-2xl bg-white/90"
      >
        <div className="flex flex-col items-center mb-10 gap-4">
           <div className="w-14 h-14 rounded-2xl bg-sky-500 flex items-center justify-center shadow-lg shadow-sky-500/20 group">
              <Sparkles className="w-6 h-6 text-white group-hover:scale-125 transition-transform" />
           </div>
           <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold font-display text-slate-900 tracking-tight">Restablecer Contraseña</h1>
              <p className="text-slate-500 font-interface text-sm">Te enviaremos un enlace de recuperación a tu email registrado.</p>
           </div>
        </div>

        <form className="space-y-6">
          <div className="space-y-1">
             <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-widest leading-none">Tu Email *</label>
             <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="email" placeholder="ejemplo@correo.com" className="input-premium h-14 pl-11 shadow-sm" />
             </div>
          </div>

          <button className="btn-primary w-full h-14 flex items-center justify-center gap-2 group bg-sky-600 hover:bg-sky-700 shadow-sky-500/20">
             <span>Enviar Enlace</span>
             <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-10 flex flex-col items-center gap-6">
           <Link to="/login" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-bold text-xs uppercase tracking-widest">
              <ArrowLeft className="w-4 h-4" /> Volver al inicio de sesión
           </Link>
           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center max-w-[240px]">
              Si no recibes el correo en 5 minutos, revisa tu carpeta de SPAM.
           </p>
        </div>
      </motion.div>
    </div>
  )
}

export default ForgotPassword
