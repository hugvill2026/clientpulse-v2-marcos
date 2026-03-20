import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Filter, Plus, Clock } from 'lucide-react'
import { Calendar as BigCalendar, dateFnsLocalizer, Views } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { es } from 'date-fns/locale'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import AppLayout from '../components/layout/AppLayout'
import { cn } from '../utils/cn'
import { useAuthStore } from '../store/authStore'
import { ReminderService } from '../services/firebase/firestore'

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
  const { user } = useAuthStore()
  const [view, setView] = useState<any>(Views.MONTH)
  const [date, setDate] = useState(new Date())
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
       if (!user) return
       try {
          const reminders = await ReminderService.getPendingReminders(user.uid)
          const mappedEvents = reminders.map(r => ({
             title: `Impacto: ${r.clientName}`,
             start: new Date(r.scheduledAt),
             end: new Date(new Date(r.scheduledAt).getTime() + 60 * 60 * 1000), // 1 hour duration
             resource: 'whatsapp',
             allDay: false
          }))
          setEvents(mappedEvents)
       } catch (e) {
          console.error(e)
       } finally {
          setLoading(false)
       }
    }
    fetchEvents()
  }, [user])

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white border border-slate-200 rounded-3xl p-4 shadow-sm">
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 bg-slate-50 border border-slate-100 p-1 rounded-2xl">
                 {[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA].map(v => (
                    <button key={v} onClick={() => setView(v)} className={cn("px-4 py-2 rounded-xl text-xs font-bold transition-all", view === v ? "bg-white text-teal-600 shadow-sm" : "text-slate-400 hover:text-slate-600")}>{v === 'month' ? 'Mes' : v === 'week' ? 'Semana' : v === 'day' ? 'Día' : 'Agenda'}</button>
                 ))}
              </div>
           </div>
           <div className="flex items-center gap-3">
              <button className="p-3 bg-slate-50 border border-slate-100 rounded-2xl text-slate-500 hover:bg-slate-100 shadow-sm"><Filter className="w-4 h-4" /></button>
              <button className="btn-primary h-12 px-6 group"><Plus className="w-4 h-4 transition-transform group-hover:rotate-90" /><span>Nueva Programación</span></button>
           </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm overflow-hidden min-h-[700px]">
           {loading ? <div className="h-[600px] bg-slate-50 animate-pulse rounded-2xl" /> : (
             <BigCalendar
               localizer={localizer}
               events={events}
               startAccessor="start"
               endAccessor="end"
               style={{ height: 600 }}
               views={['month', 'week', 'day', 'agenda']}
               view={view}
               onView={setView}
               date={date}
               onNavigate={setDate}
               culture="es"
               messages={{ next: "Siguiente", previous: "Anterior", today: "Hoy", month: "Mes", week: "Semana", day: "Día", agenda: "Agenda", date: "Fecha", time: "Hora", event: "Evento" }}
               components={{ event: EventComponent }}
               toolbar={false}
             />
           )}
        </div>

        <div className="flex flex-wrap items-center gap-6 p-6 border-2 border-dashed border-slate-200 rounded-3xl opacity-60 bg-white/50">
           <p className="text-xs font-bold text-slate-400 flex items-center gap-2 uppercase tracking-widest"><CalendarIcon className="w-3.5 h-3.5" /> Leyenda:</p>
           <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-teal-500 shadow-sm shadow-teal-500/20" /><span className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter">Envío WhatsApp</span></div>
           <div className="flex items-center gap-2 ml-auto"><Clock className="w-3.5 h-3.5 text-slate-400" /><span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Zona Horaria: Institucional (GMT-5)</span></div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Calendar
