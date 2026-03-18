import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Filter, Plus, Clock, User, MessageCircle } from 'lucide-react'
import { Calendar as BigCalendar, dateFnsLocalizer, Views } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import es from 'date-fns/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import AppLayout from '../components/layout/AppLayout'
import { cn } from '../utils/cn'

const locales = {
  'es': es,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: es }),
  getDay,
  locales,
})

// Mock Events
const myEventsList = [
  {
    title: 'Mensaje VIP: Víctor Villegas',
    allDay: false,
    start: new Date(2024, 2, 20, 10, 0),
    end: new Date(2024, 2, 20, 11, 0),
    resource: 'whatsapp',
  },
  {
    title: 'Recordatorio Pago: María Sánchez',
    allDay: false,
    start: new Date(2024, 2, 21, 14, 30),
    end: new Date(2024, 2, 21, 15, 30),
    resource: 'email',
  },
  {
    title: 'Campaña Primavera: Clientes VIP',
    allDay: true,
    start: new Date(2024, 2, 22),
    end: new Date(2024, 2, 22),
    resource: 'whatsapp',
  },
  {
    title: 'Newsletter Mensual: General',
    allDay: false,
    start: new Date(2024, 2, 25, 0, 0),
    end: new Date(2024, 2, 25, 1, 0),
    resource: 'email',
  },
]

// Custom Event Component
const EventComponent = ({ event }: { event: any }) => (
  <div className={cn(
    "px-2 py-1 rounded-lg text-[10px] font-bold border-l-[3px] shadow-sm flex items-center justify-between group",
    event.resource === 'whatsapp' ? "bg-teal-50 text-teal-700 border-teal-500" : "bg-sky-50 text-sky-700 border-sky-500"
  )}>
    <span className="line-clamp-1">{event.title}</span>
    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
  </div>
)

const Calendar = () => {
  const [view, setView] = useState<any>(Views.MONTH)
  const [date, setDate] = useState(new Date(2024, 2, 18))

  return (
    <AppLayout title="Agenda de Envíos">
      <div className="space-y-6">
        
        {/* Calendar Header / Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white border border-slate-200 rounded-3xl p-4 shadow-sm">
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 bg-slate-50 border border-slate-100 p-1 rounded-2xl">
                 <button 
                  onClick={() => setView(Views.MONTH)}
                  className={cn("px-4 py-2 rounded-xl text-xs font-bold transition-all", view === Views.MONTH ? "bg-white text-teal-600 shadow-sm" : "text-slate-400 hover:text-slate-600")}>
                    Mes
                 </button>
                 <button 
                  onClick={() => setView(Views.WEEK)}
                  className={cn("px-4 py-2 rounded-xl text-xs font-bold transition-all", view === Views.WEEK ? "bg-white text-teal-600 shadow-sm" : "text-slate-400 hover:text-slate-600")}>
                    Semana
                 </button>
                 <button 
                  onClick={() => setView(Views.DAY)}
                  className={cn("px-4 py-2 rounded-xl text-xs font-bold transition-all", view === Views.DAY ? "bg-white text-teal-600 shadow-sm" : "text-slate-400 hover:text-slate-600")}>
                    Día
                 </button>
                 <button 
                  onClick={() => setView(Views.AGENDA)}
                  className={cn("px-4 py-2 rounded-xl text-xs font-bold transition-all", view === Views.AGENDA ? "bg-white text-teal-600 shadow-sm" : "text-slate-400 hover:text-slate-600")}>
                    Agenda
                 </button>
              </div>
              <div className="hidden lg:flex items-center gap-2 text-slate-300">
                 <div className="w-px h-6 bg-slate-200" />
                 <div className="flex items-center gap-4 px-2">
                    <button className="p-2 hover:bg-slate-100 rounded-xl transition-all"><ChevronLeft className="w-4 h-4 text-slate-500" /></button>
                    <span className="text-sm font-bold text-slate-700 min-w-[120px] text-center uppercase tracking-widest">{format(date, 'MMMM yyyy', { locale: es })}</span>
                    <button className="p-2 hover:bg-slate-100 rounded-xl transition-all"><ChevronRight className="w-4 h-4 text-slate-500" /></button>
                 </div>
              </div>
           </div>

           <div className="flex items-center gap-3">
              <button className="p-3 bg-slate-50 border border-slate-100 rounded-2xl text-slate-500 hover:bg-slate-100 transition-all shadow-sm">
                 <Filter className="w-4 h-4" />
              </button>
              <button className="btn-primary flex items-center gap-2 h-12 px-6 group">
                 <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
                 <span>Nueva Programación</span>
              </button>
           </div>
        </div>

        {/* Big Calendar Body */}
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm overflow-hidden min-h-[700px]">
           <BigCalendar
             localizer={localizer}
             events={myEventsList}
             startAccessor="start"
             endAccessor="end"
             style={{ height: 600 }}
             views={['month', 'week', 'day', 'agenda']}
             view={view}
             onView={(v) => setView(v)}
             date={date}
             onNavigate={(d) => setDate(d)}
             culture="es"
             messages={{
               next: "Siguiente",
               previous: "Anterior",
               today: "Hoy",
               month: "Mes",
               week: "Semana",
               day: "Día",
               agenda: "Agenda",
               date: "Fecha",
               time: "Hora",
               event: "Evento"
             }}
             components={{
               event: EventComponent,
             }}
             toolbar={false} // Custom toolbar handled above
           />
        </div>

        {/* Legend / Info */}
        <div className="flex flex-wrap items-center gap-6 p-6 border-2 border-dashed border-slate-200 rounded-3xl opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 bg-white/50">
           <p className="text-xs font-bold text-slate-400 flex items-center gap-2 uppercase tracking-widest">
              <CalendarIcon className="w-3.5 h-3.5" /> Leyenda:
           </p>
           <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-teal-500 shadow-sm shadow-teal-500/20" />
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter">Envío WhatsApp</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-sky-500 shadow-sm shadow-sky-500/20" />
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter">Notificación Email</span>
           </div>
           <div className="flex items-center gap-2 ml-auto">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Zona Horaria: America/Guayaquil (GMT-5)</span>
           </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Calendar
