import React, { useContext } from 'react';
import { Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';

const EventsWidget = () => {
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);

    const priorities = {
        Baja: { color: 'var(--color-priority-low)', label: 'Baja' },
        Normal: { color: 'var(--color-priority-normal)', label: 'Normal' },
        Alta: { color: 'var(--color-priority-high)', label: 'Alta' },
        Critica: { color: 'var(--color-priority-critical)', label: 'Crítica' }
    };

    const events = [
        { id: 1, title: 'Almuerzo de Equipo', date: 'Nov 24', fullDate: new Date(2025, 10, 24), time: '12:30 PM', type: 'Social', priority: 'Normal' },
        { id: 2, title: 'Revisión de Proyecto', date: 'Nov 25', fullDate: new Date(2025, 10, 25), time: '10:00 AM', type: 'Trabajo', priority: 'Alta' },
        { id: 3, title: 'Reunión General', date: 'Nov 28', fullDate: new Date(2025, 10, 28), time: '04:00 PM', type: 'Compañía', priority: 'Critica' },
    ];

    const handleEventClick = (date) => {
        navigate('/events', { state: { selectedDate: date } });
    };

    return (
        <div className={`rounded-xl shadow-sm p-6 border transition-colors duration-200 h-full ${theme.subMain} ${theme.border}`}>
            <h3 className={`text-lg font-bold mb-4 flex items-center ${theme.textMain}`}>
                <Calendar className={`w-5 h-5 mr-2 ${theme.textSubmain}`} />
                Próximos Eventos
            </h3>
            <div className="space-y-3">
                {events.map((event) => (
                    <div
                        key={event.id}
                        onClick={() => handleEventClick(event.fullDate)}
                        className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all relative overflow-hidden group ${theme.border} ${theme.hover}`}
                        style={{ borderLeft: `4px solid ${priorities[event.priority]?.color}` }}
                    >
                        {/* Background opacity layer */}
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                            style={{ backgroundColor: priorities[event.priority]?.color }}
                        />

                        <div className={`shrink-0 w-12 text-center rounded border p-1 z-10 transition-colors duration-200 ${theme.main} ${theme.border}`}>
                            <span className={`block text-xs uppercase ${theme.textSubmain}`}>{event.date.split(' ')[0]}</span>
                            <span className={`block text-lg font-bold ${theme.textMain}`}>{event.date.split(' ')[1]}</span>
                        </div>
                        <div className="ml-3 flex-1 z-10">
                            <div className="flex justify-between items-start">
                                <h4 className={`text-sm font-bold ${theme.textMain}`}>{event.title}</h4>
                                <span
                                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-${event.priority === "Alta" ? "black" : "white"} ml-2`}
                                    style={{ backgroundColor: priorities[event.priority]?.color }}
                                >
                                    {event.type}
                                </span>
                            </div>
                            <p className={`text-xs mt-1 ${theme.textSubmain}`}>{event.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventsWidget;
