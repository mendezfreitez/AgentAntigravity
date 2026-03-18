import { CalendarPlus, FilePlus, Plane, HelpCircle } from 'lucide-react';

const QuickActions = () => {

    const actions = [
        { icon: CalendarPlus, label: 'Reservar Sala', color: 'bg-blue-100/20 text-blue-500' },
        { icon: FilePlus, label: 'Nueva Solicitud', color: 'bg-green-100/20 text-green-500' },
        { icon: Plane, label: 'Solicitar Vacaciones', color: 'bg-purple-100/20 text-purple-500' },
        { icon: HelpCircle, label: 'Soporte TI', color: 'bg-orange-100/20 text-orange-500' },
    ];

    return (
        <div className={`rounded-xl shadow-sm p-6 border border-text-primary/10 transition-colors duration-200 bg-primary`}>
            <h3 className={`text-lg font-bold mb-4 text-text-primary`}>Accesos Rápidos</h3>
            <div className="grid grid-cols-2 gap-4">
                {actions.map((action, index) => (
                    <button
                        key={index}
                        className="flex flex-col cursor-pointer rounded-2xl items-center justify-center p-4 transition-colors border border-text-primary/10 text-text-primary bg-tertiary/10 hover:bg-tertiary"
                    >
                        <div className="p-3 rounded-full mb-3  text-text-primary bg-button-primary/70">
                            <action.icon className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-medium">{action.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuickActions;
