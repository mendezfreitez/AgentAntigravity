import React, { useContext } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import { useEscapeKey } from '../../hooks/useEscapeKey';

const NotificationsModal = ({ isOpen, onClose }) => {
    const { theme } = useContext(ThemeContext);

    useEscapeKey(onClose, isOpen);

    // Mock data for pending tasks
    const pendingTasks = [
        { id: 1, text: 'Revisar presupuesto Q4', time: '10:00 AM' },
        { id: 2, text: 'Actualizar documentación de API', time: '2:00 PM' },
        { id: 3, text: 'Reunión de equipo', time: '4:00 PM' }
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="bg-primary rounded-2xl shadow-2xl w-full max-w-md transform scale-100 transition-all overflow-hidden">
                <div className="p-6 bg-primary">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-button-primary/50 rounded-full">
                                <CheckCircle className="w-6 h-6 text-text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-text-primary">Resumen Diario</h3>
                                <p className="text-sm text-text-tertiary">Tienes 3 tareas pendientes hoy</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500 transition-colors p-1 hover:bg-gray-100 rounded-full cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-3 mb-8">
                        {pendingTasks.map(task => (
                            <div key={task.id} className="bg-secondary flex items-center cursor-pointer justify-between p-4 transition-colors rounded-xl border border-text-primary/10 shadow-sm group hover:bg-tertiary">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    <span className="font-medium transition-colors text-text-secondary">{task.text}</span>
                                </div>
                                <span className="text-xs font-semibold bg-tertiary px-2 py-1 rounded-md border border-text-primary/10 text-text-tertiary">{task.time}</span>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-primary_ text-white font-semibold rounded-xl shadow-md transition-all duration-200 active:scale-[0.98]"
                    >
                        Entendido, gracias
                    </button>
                </div >
            </div >
        </div >
    );
};

export default NotificationsModal;
