import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus, Clock } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { ClientService, ReminderService, ClientData } from '../../services/firebase/firestore';
import toast from 'react-hot-toast';

export const QuickActionModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'client' | 'reminder'>('client');
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);

  // Client State
  const [clientName, setClientName] = useState('');
  const [clientWhatsapp, setClientWhatsapp] = useState('');
  
  // Reminder State
  const [selectedClientId, setSelectedClientId] = useState('');
  const [messageText, setMessageText] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [myClients, setMyClients] = useState<ClientData[]>([]);

  // Load clients when opening reminder tab
  React.useEffect(() => {
    if (activeTab === 'reminder' && user) {
      ClientService.getClients(user.uid).then(setMyClients);
    }
  }, [activeTab, user]);

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    try {
      await ClientService.createClient({
        userId: user.uid,
        name: clientName,
        whatsapp: clientWhatsapp,
        category: 'Prospectos',
        status: 'activo',
        company: 'Independiente'
      });
      toast.success('Cliente creado correctamente');
      setClientName('');
      setClientWhatsapp('');
      onClose();
    } catch (err: any) {
      toast.error('Error al crear cliente');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateReminder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const client = myClients.find(c => c.id === selectedClientId);
    if (!client) return toast.error('Selecciona un cliente');
    if (!scheduleTime) return toast.error('Selecciona una hora');

    setLoading(true);
    try {
      await ReminderService.createReminder({
        userId: user.uid,
        clientId: client.id!,
        clientName: client.name,
        clientWhatsapp: client.whatsapp,
        messageText,
        imageUrl: imageLink || undefined,
        scheduledAt: new Date(scheduleTime)
      });
      toast.success('Recordatorio programado con éxito');
      setMessageText('');
      setScheduleTime('');
      onClose();
    } catch (err: any) {
      toast.error('Error al programar');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
             <h3 className="font-display font-bold text-xl text-slate-900">Acción Rápida</h3>
             <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                <X className="w-5 h-5 text-slate-500" />
             </button>
          </div>

          {/* Tabs */}
          <div className="flex p-2 bg-slate-50 border-b border-slate-100">
             <button 
               onClick={() => setActiveTab('client')}
               className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'client' ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
             >
                <UserPlus className="w-4 h-4" /> Cliente
             </button>
             <button 
               onClick={() => setActiveTab('reminder')}
               className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'reminder' ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
             >
                <Clock className="w-4 h-4" /> Recordatorio
             </button>
          </div>

          {/* Forms */}
          <div className="p-6">
            {activeTab === 'client' ? (
              <form onSubmit={handleCreateClient} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 ml-1">Nombre Completo</label>
                  <input required value={clientName} onChange={e => setClientName(e.target.value)} type="text" className="input-premium h-12 mt-1" placeholder="Ej. Ana Pérez" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 ml-1">WhatsApp (con código de país ej: +593)</label>
                  <input required value={clientWhatsapp} onChange={e => setClientWhatsapp(e.target.value)} type="text" className="input-premium h-12 mt-1" placeholder="+593..." />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full h-12 mt-4">
                  {loading ? 'Guardando...' : 'Crear Cliente'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleCreateReminder} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 ml-1">Seleccionar Cliente</label>
                  <select required value={selectedClientId} onChange={e => setSelectedClientId(e.target.value)} className="input-premium h-12 mt-1 bg-white">
                    <option value="">-- Elige un cliente --</option>
                    {myClients.map(c => <option key={c.id} value={c.id}>{c.name} ({c.whatsapp})</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 ml-1">Mensaje</label>
                  <textarea required value={messageText} onChange={e => setMessageText(e.target.value)} className="input-premium p-3 mt-1 min-h-[100px] resize-none" placeholder="Escribe el recordatorio aquí..." />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 ml-1">URL de Imagen (Opcional)</label>
                  <input value={imageLink} onChange={e => setImageLink(e.target.value)} type="url" className="input-premium h-12 mt-1" placeholder="https://..." />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 ml-1">Fecha y Hora</label>
                  <input required value={scheduleTime} onChange={e => setScheduleTime(e.target.value)} type="datetime-local" className="input-premium h-12 mt-1" />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full h-12 mt-4">
                  {loading ? 'Programando...' : 'Programar Envío'}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
