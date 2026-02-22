import React, { useContext } from 'react';
import { CalendarPlus, FilePlus, Plane, HelpCircle } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';

const QuickActions = () => {
    const { theme } = useContext(ThemeContext);

    const actions = [
        { icon: CalendarPlus, label: 'Reservar Sala', color: 'bg-blue-100/20 text-blue-500' },
        { icon: FilePlus, label: 'Nueva Solicitud', color: 'bg-green-100/20 text-green-500' },
        { icon: Plane, label: 'Solicitar Vacaciones', color: 'bg-purple-100/20 text-purple-500' },
        { icon: HelpCircle, label: 'Soporte TI', color: 'bg-orange-100/20 text-orange-500' },
    ];

    return (
        <div className={`rounded-xl shadow-sm p-6 border transition-colors duration-200 ${theme.subMain} ${theme.border}`}>
            <h3 className={`text-lg font-bold mb-4 ${theme.textMain}`}>Accesos Rápidos</h3>
            <div className="grid grid-cols-2 gap-4">
                {actions.map((action, index) => (
                    <button
                        key={index}
                        className={`flex flex-col border-gray-200 cursor-pointer rounded-2xl items-center justify-center p-4 transition-colors border ${theme.hover} hover:${theme.border}`}
                    >
                        <div className={`p-3 rounded-full mb-3 ${action.color}`}>
                            <action.icon className="w-6 h-6" />
                        </div>
                        <span className={`text-sm font-medium ${theme.textMain}`}>{action.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuickActions;
