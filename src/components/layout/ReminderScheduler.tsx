import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { ReminderService } from '../../services/firebase/firestore';
import { WhatsAppService } from '../../services/whatsapp.service';
import { cn } from '../../utils/cn';
import toast from 'react-hot-toast';

export const ReminderScheduler = () => {
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) return;

    // Check every 30 seconds for due reminders
    const interval = setInterval(async () => {
      try {
        const pendingReminders = await ReminderService.getPendingReminders(user.uid);
        const now = new Date();

        for (const reminder of pendingReminders) {
          // If scheduled time has passed
          if (reminder.scheduledAt <= now) {
            
            // 1. Play Sound
            try {
              const audio = new Audio('/notification.mp3');
              audio.play().catch(e => console.log('Audio autoplay blocked', e));
            } catch (err) {}

            // 2. Show Toast Alert
            toast.custom((t) => (
              <motion.div 
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                className={cn(
                  "bg-slate-900 text-white p-5 rounded-[32px] shadow-2xl border-2 border-teal-500/30 flex flex-col gap-4 w-[380px] transition-all",
                  t.visible ? "scale-100" : "scale-95 opacity-0"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-teal-500 rounded-[20px] flex items-center justify-center text-2xl shadow-lg shadow-teal-500/40 animate-bounce">
                      🔔
                    </div>
                    <div>
                      <h3 className="font-black text-sm text-teal-400 uppercase tracking-widest">ALERTA CLIENTPULSE</h3>
                      <p className="text-[10px] text-slate-400 font-bold">ES HORA DE CONTACTAR</p>
                    </div>
                  </div>
                  <button onClick={() => toast.dismiss(t.id)} className="text-slate-500 hover:text-white transition-colors">✕</button>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <p className="text-sm font-bold text-white mb-2 leading-tight">
                       Enviar a: <span className="text-teal-400">{reminder.clientName}</span>
                    </p>
                    <p className="text-xs text-slate-400 line-clamp-2 italic font-interface">
                       "{reminder.messageText}"
                    </p>
                  </div>

                  {reminder.imageUrl && (
                    <div className="relative rounded-2xl overflow-hidden h-32 border border-white/10 group">
                      <img src={reminder.imageUrl} alt="Adjunto" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute bottom-2 left-3 text-[10px] font-bold text-white uppercase tracking-widest">📷 Imagen Adjunta</span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(reminder.messageText);
                        toast.success('Texto copiado', { id: 'copy-text' });
                      }}
                      className="bg-white/10 hover:bg-white/20 text-white text-[10px] font-black py-3 rounded-xl transition-all uppercase tracking-widest"
                    >
                      Copiar Texto
                    </button>
                    <a 
                      href={`https://wa.me/${reminder.clientWhatsapp.replace(/[\s+]/g, '')}?text=${encodeURIComponent(reminder.messageText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-teal-500 hover:bg-teal-400 text-white text-[10px] font-black py-3 rounded-xl transition-all uppercase tracking-widest text-center shadow-lg shadow-teal-500/20"
                    >
                      ENVIAR WA ↗
                    </a>
                  </div>
                </div>
              </motion.div>
            ), { duration: 30000 });

            // 3. Send WhatsApp CallMeBot Alert
            // Get credentials from env (or user settings if implemented)
            const botPhone = import.meta.env.VITE_CALLMEBOT_PHONE;
            const botKey = import.meta.env.VITE_CALLMEBOT_API_KEY;

            if (botPhone && botKey) {
              const waLink = `https://wa.me/${reminder.clientWhatsapp.replace(/[\s+]/g, '')}?text=${encodeURIComponent(reminder.messageText)}`;
              let alertText = `🔔 *Alerta ClientPulse V2*\n\nEs hora de contactar a *${reminder.clientName}*.\n\n*Mensaje Programado:*\n"${reminder.messageText}"\n\n${reminder.imageUrl ? `📷 *Imagen Adjunta:* ${reminder.imageUrl}\n\n` : ''}👉 *Haz clic aqui para enviarlo ahora:*\n${waLink}`;
              
              await WhatsAppService.sendMessage(botPhone, alertText, botKey).catch(e => console.error("CallMeBot error", e));
            }

            // 4. Mark as sent
            await ReminderService.updateReminderStatus(reminder.id!, 'sent');
          }
        }
      } catch (error) {
        console.error("Scheduler Error:", error);
      }
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [user]);

  return null; // Invisible global worker
};
