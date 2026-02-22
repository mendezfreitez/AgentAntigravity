import React, { useState, useContext } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';

const WelcomeWidget = () => {
    const [showModal, setShowModal] = useState(true);
    const { theme } = useContext(ThemeContext);
    const date = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // Mock data for pending tasks
    const pendingTasks = [
        { id: 1, text: 'Revisar presupuesto Q4', time: '10:00 AM' },
        { id: 2, text: 'Actualizar documentación de API', time: '2:00 PM' },
        { id: 3, text: 'Reunión de equipo', time: '4:00 PM' }
    ];

    return (
        <>

            {/* Pending Tasks Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-300">
                    <div className={`rounded-xl shadow-2xl w-full max-w-md transform scale-100 transition-all overflow-hidden border ${theme.subMain2}`}>
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                                        <CheckCircle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className={`text-xl font-bold ${theme.txtWhite}`}>Resumen Diario____</h3>
                                        <p className={`text-sm ${theme.textSubmain}`}>Tienes 3 tareas pendientes hoy</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className={`text-gray-400 hover:text-gray-500 transition-colors p-1 rounded-full ${theme.hover}`}
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-3 mb-8">
                                {pendingTasks.map(task => (
                                    <div key={task.id} className={`flex items-center justify-between p-4 transition-colors rounded-xl border shadow-sm group ${theme.sidebar}`}>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                            <span className={`font-medium group-hover:text-blue-500 transition-colors ${theme.textMain}`}>{task.text}</span>
                                        </div>
                                        <span className={`text-xs font-semibold px-2 py-1 rounded-md border ${theme.textSubmain} ${theme.border}`}>{task.time}</span>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => setShowModal(false)}
                                className="w-full py-3 bg-primary-green hover:bg-primary-green/90 text-white font-semibold rounded-xl shadow-md transition-all duration-200 active:scale-[0.98]"
                            >
                                Entendido, gracias
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default WelcomeWidget;
