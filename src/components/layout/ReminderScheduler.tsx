import React, { useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { ReminderService } from '../../services/firebase/firestore';
import { WhatsAppService } from '../../services/whatsapp.service';
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
              <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-teal-500/20 flex gap-4 w-96 max-w-full animate-in slide-in-from-right">
                <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center text-2xl animate-pulse">
                  🔔
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1 text-teal-400">¡Recordatorio Programado!</h3>
                  <p className="text-xs text-slate-300">Es hora de enviar el mensaje a <strong className="text-white">{reminder.clientName}</strong>.</p>
                  <a 
                    href={`https://wa.me/${reminder.clientWhatsapp.replace(/[\s+]/g, '')}?text=${encodeURIComponent(reminder.messageText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 bg-teal-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg hover:bg-teal-500 transition-colors"
                  >
                    Enviar Mensaje Ahora ↗
                  </a>
                </div>
              </div>
            ), { duration: 10000 });

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
