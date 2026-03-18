import React from 'react'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Ghost, Search, HelpCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../utils/cn'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 overflow-hidden relative selection:bg-teal-500">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-500/10 blur-[200px] rounded-full -mr-1/2 -mt-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-500/10 blur-[150px] rounded-full -ml-1/4 -mb-1/4" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[500px] relative z-20 text-center space-y-12 p-10"
      >
        <div className="relative group p-14 bg-white/5 border border-white/10 rounded-[48px] backdrop-blur-3xl shadow-2xl">
           <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-teal-500 rounded-[24px] flex items-center justify-center text-white shadow-lg shadow-teal-500/30 group-hover:rotate-6 transition-transform">
              <Ghost className="w-10 h-10 animate-bounce" />
           </div>
           
           <h1 className="text-[120px] font-bold text-white/10 select-none font-display leading-none mb-4">404</h1>
           <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white font-display tracking-tight">Página no encontrada</h2>
              <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-[300px] mx-auto">Lo sentimos, parece que la ruta que buscas ya no existe o ha sido movida.</p>
           </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
           <Link to="/dashboard" className="w-full sm:w-auto btn-primary h-14 px-10 flex items-center justify-center gap-2 group whitespace-nowrap">
              <Home className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              <span>Volver al Tablero</span>
           </Link>
           <Link to="/help" className="w-full sm:w-auto h-14 px-10 border border-slate-700 rounded-2xl text-slate-400 font-bold text-xs uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all flex items-center justify-center gap-2">
              <HelpCircle className="w-5 h-5" />
              Centro de Ayuda
           </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound
