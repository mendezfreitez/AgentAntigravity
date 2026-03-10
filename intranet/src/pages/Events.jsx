import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TitleView } from '../components/Layout/TitleView';
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    addMonths,
    subMonths,
    addDays,
    isToday
} from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Plus, X, Clock, AlignLeft, AlertCircle, Pencil, Trash2, AlertTriangle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { useEscapeKey } from '../hooks/useEscapeKey';
import clsx from 'clsx';

const Events = () => {
    const location = useLocation();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);
    const [editingEventId, setEditingEventId] = useState(null);
    const { theme } = useContext(ThemeContext);

    const priorities = {
        "0": { color: 'var(--color-priority-low)', label: 'Baja', value: 0 },
        "1": { color: 'var(--color-priority-normal)', label: 'Normal', value: 1 },
        "2": { color: 'var(--color-priority-high)', label: 'Alta', value: 2 },
        "3": { color: 'var(--color-priority-critical)', label: 'Crítica', value: 3 }
    };

    const [events, setEvents] = useState([]);

    // Fetch events from backend whenever the month changes
    useEffect(() => {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(monthStart);
        const rangeStart = startOfWeek(monthStart, { weekStartsOn: 1 });
        const rangeEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

        const startStr = format(rangeStart, 'yyyy-MM-dd');
        const endStr = format(rangeEnd, 'yyyy-MM-dd');

        axios.get(`http://localhost:3001/eventos?start=${startStr}&end=${endStr}`)
            .then(res => {
                // Normalize dates from DB (strings) to Date objects and priority to string
                const normalized = res.data.map(e => ({
                    ...e,
                    id: Number(e.id),
                    date: new Date(e.date),
                    priority: String(e.priority ?? 0)
                }));
                setEvents(normalized);
            })
            .catch(err => console.error('Error al cargar eventos:', err));
    }, [currentDate]);

    const [newEvent, setNewEvent] = useState({ time: '', title: '', description: '', priority: '0' });

    useEffect(() => {
        if (location.state?.selectedDate) {
            const date = new Date(location.state.selectedDate);
            setCurrentDate(date);
            setSelectedDate(date);
            setIsDetailsModalOpen(true);
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Start on Monday
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

    const handleDayClick = (day) => {
        setSelectedDate(day.toISOString().split('T')[0]);
        setIsDetailsModalOpen(true);
    };

    const handleAddEventClick = () => {
        setEditingEventId(null);
        setNewEvent({ time: '', title: '', description: '', priority: '' });
        setIsAddEventModalOpen(true);
    };

    const handleEditEventClick = (event) => {
        setEditingEventId(event.id);
        setNewEvent({
            time: event.time,
            title: event.title,
            description: event.description,
            priority: event.priority
        });
        setIsAddEventModalOpen(true);
    };

    const handleDeleteEventClick = (event) => {
        setEventToDelete(event);
        setIsDeleteModalOpen(true);
    };

    const confirmDeleteEvent = async () => {
        if (eventToDelete) {
            try {
                await axios.post('http://localhost:3001/eliminar_evento', { id: eventToDelete.id });
                setEvents(events.filter(e => e.id !== eventToDelete.id));
                setEventToDelete(null);
                setIsDeleteModalOpen(false);
            } catch (error) {
                console.error('Error al eliminar evento:', error);
            }
        }
    };

    useEscapeKey(() => setIsDetailsModalOpen(false), isDetailsModalOpen);
    useEscapeKey(() => setIsAddEventModalOpen(false), isAddEventModalOpen);
    useEscapeKey(() => setIsDeleteModalOpen(false), isDeleteModalOpen);

    const getEventById = (id) => {
        return events.find(e => e.id === id);
    }

    const handleSaveEvent = async () => {
        let event = {};
        if (!newEvent.title || !newEvent.time) return;

        if (editingEventId) {
            event = { ...getEventById(editingEventId) };
            event.title = newEvent.title;
            event.time = newEvent.time;
            event.description = newEvent.description;
            event.priority = newEvent.priority;
        } else {
            event = {
                // If it's a new event, we don't send an ID so DB creates one
                title: newEvent.title,
                date: selectedDate,
                time: newEvent.time,
                description: newEvent.description,
                priority: newEvent.priority || "0"
            };
        }

        try {
            const endpoint = editingEventId ? 'editar_evento' : 'nuevo_evento';
            const response = await axios.post(`http://localhost:3001/${endpoint}`, event);

            if (editingEventId) {
                setEvents(events.map(e => e.id === editingEventId ? event : e));
            } else {
                // Incorporate the DB generated ID
                event.id = response.data.insertId;
                setEvents([...events, event]);
            }

            setIsAddEventModalOpen(false);
            setNewEvent({ time: '', title: '', description: '', priority: 'Baja' });
            setEditingEventId(null);

        } catch (error) {
            console.error('Error sending event to backend:', error);
        }
    };

    const getEventsForDay = (day) => {
        const formattedDay = typeof day === "object" ? format(day, 'yyyy-MM-dd') : day;
        const mismodia = events.filter(event => {
            const formattedDayEvent = typeof event.date === "object" ? format(event.date, 'yyyy-MM-dd') : event.date;
            return isSameDay(formattedDayEvent, formattedDay);
        });
        return mismodia;
    };

    return (
        <div className="h-[calc(94vh-6rem)] flex flex-col transition-colors duration-200">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <TitleView title="Eventos" subtitle="Calendario de actividades y reuniones" />
                <div className={`flex items-center space-x-4 rounded-lg shadow-sm border p-1 transition-colors duration-200 ${theme.subMain} ${theme.border}`}>
                    <button onClick={prevMonth} className={`p-2 rounded-md transition-colors ${theme.hover}`}>
                        <ChevronLeft className={`w-5 h-5 ${theme.textSubmain}`} />
                    </button>
                    <span className={`text-lg font-bold w-40 text-center capitalize ${theme.textMain}`}>
                        {format(currentDate, 'MMMM yyyy', { locale: es })}
                    </span>
                    <button onClick={nextMonth} className={`p-2 rounded-md transition-colors ${theme.hover}`}>
                        <ChevronRight className={`w-5 h-5 ${theme.textSubmain}`} />
                    </button>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className={`flex-1 rounded-xl shadow-sm border flex flex-col overflow-hidden transition-colors duration-200 ${theme.subMain} ${theme.border}`}>
                {/* Weekdays Header */}
                <div className={`grid grid-cols-7 border-b transition-colors duration-200 ${theme.main} ${theme.border}`}>
                    {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(day => (
                        <div key={day} className={`py-3 text-center text-sm font-semibold uppercase tracking-wider ${theme.textSubmain}`}>
                            {day}
                        </div>
                    ))}
                </div>

                {/* Days */}
                <div className={`flex-1 grid grid-cols-7 ${theme.subMain}`}>
                    {calendarDays.map((day, idx) => {
                        const dayEvents = getEventsForDay(day);
                        return (
                            <div
                                key={day.toString()}
                                onClick={() => handleDayClick(day)}
                                className={clsx(
                                    `border-b border-r p-1 cursor-pointer transition-colors relative group h-[1/5] ${theme.border} ${theme.hover}`,
                                    !isSameMonth(day, monthStart) && "opacity-50",
                                    isToday(day) && "bg-primary-green/5"
                                )}
                            >
                                <div className="flex justify-between items-start">
                                    <span className={clsx(
                                        "text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full",
                                        isToday(day) ? "bg-primary-green text-white" : theme.textMain
                                    )}>
                                        {format(day, 'd')}
                                    </span>
                                    {dayEvents.length > 0 && (
                                        <span className="text-xs font-bold text-primary-green bg-primary-green/10 px-2 py-0.5 rounded-full">
                                            {dayEvents.length}
                                        </span>
                                    )}
                                </div>

                                <div className="mt-2 space-y-1">
                                    {dayEvents.slice(0, 3).map((event) => (
                                        <div
                                            key={event.id}
                                            className="text-xs truncate px-1.5 py-0.5 rounded font-medium"
                                            style={{
                                                backgroundColor: (priorities[event.priority]?.color || priorities.Baja.color),
                                                color: '#263238'
                                            }}
                                        >
                                            {event.time.slice(0, 5)} {event.title}
                                        </div>
                                    ))}
                                    {dayEvents.length > 3 && (
                                        <div className={`text-xs pl-1 ${theme.textSubmain}`}>
                                            + {dayEvents.length - 3} más
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Day Details Modal */}
            {isDetailsModalOpen && selectedDate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className={`border rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200 ${theme.subMain} ${theme.border}`}>
                        <div className={`p-4 border-b flex justify-between items-center ${theme.main} ${theme.border}`}>
                            <h3 className={`text-lg font-bold capitalize ${theme.textMain}`}>
                                {format(addDays(selectedDate, 1), 'EEEE, d MMMM', { locale: es })}
                            </h3>
                            <button
                                onClick={() => setIsDetailsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-500 transition-colors p-1 hover:bg-gray-100 rounded-full cursor-pointer"
                            >
                                <X className={`w-5 h-5 ${theme.textMain}`} />
                            </button>
                        </div>

                        <div className="p-4 max-h-[60vh] overflow-y-auto">
                            {getEventsForDay(selectedDate).length > 0 ? (
                                <div className="space-y-3">
                                    {getEventsForDay(selectedDate).map(event => (
                                        <div
                                            key={event.id}
                                            className={`p-3 rounded-lg border transition-colors relative group ${theme.border} ${theme.subMain} ${theme.hover}`}
                                            style={{ borderLeft: `4px solid ${priorities[event.priority]?.color || priorities.Baja.color}` }}
                                        >
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className={`font-bold ${theme.textMain}`}>{event.title}</h4>
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        data-theme="dark"
                                                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full`}
                                                        style={{ backgroundColor: priorities[event.priority]?.color || priorities.Baja.color }}
                                                    >
                                                        {priorities[event.priority]?.label}
                                                    </span>
                                                    <span className={`text-xs font-medium border px-2 py-0.5 rounded-full ${theme.textSubmain} ${theme.main} ${theme.border} `}>
                                                        {event.time.slice(0, 5)}
                                                    </span>
                                                </div>
                                            </div>
                                            <p className={`text-sm mb-2 ${theme.textSubmain}`}>{event.description}</p>

                                            {/* Edit/Delete Buttons */}
                                            <div className={`flex justify-end gap-2 mt-2 pt-2 border-t ${theme.border}`}>
                                                <button
                                                    onClick={() => handleEditEventClick(event)}
                                                    className="p-1.5 text-green-500 hover:bg-green-500/10 rounded-md transition-colors"
                                                    title="Editar"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteEventClick(event)}
                                                    className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
                                                    title="Eliminar"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className={`text-center py-8 ${theme.textSubmain}`}>
                                    <p>No hay eventos programados para este día.</p>
                                </div>
                            )}
                        </div>

                        <div className={`p-4 border-t ${theme.main} ${theme.border}`}>
                            <button
                                onClick={handleAddEventClick}
                                className="w-full bg-primary-green text-white py-2 rounded-lg font-medium hover:bg-primary-green/90 transition-colors flex items-center justify-center"
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Agregar Evento
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add/Edit Event Modal (Nested) */}
            {isAddEventModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-[1px] p-4">
                    <div className={`rounded-xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200 border ${theme.subMain} ${theme.border}`}>
                        <div className={`p-4 border-b flex justify-between items-center ${theme.main} ${theme.border}`}>
                            <h3 className={`text-lg font-bold ${theme.textMain}`}>{editingEventId ? 'Editar Evento' : 'Nuevo Evento'}</h3>
                            <button
                                onClick={() => setIsAddEventModalOpen(false)}
                                className={`p-1 rounded-full transition-colors ${theme.hover}`}
                            >
                                <X className={`w-5 h-5 ${theme.textSubmain}`} />
                            </button>
                        </div>

                        <div className="p-4 space-y-4">
                            <div>
                                <label className={`block text-sm font-medium mb-1 ${theme.textMain}`}>Hora</label>
                                <div className="relative">
                                    <Clock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${theme.textSubmain}`} />
                                    <input
                                        type="time"
                                        className={`w-full pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green/50 ${theme.input}`}
                                        value={newEvent.time}
                                        onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={`block text-sm font-medium mb-1 ${theme.textMain}`}>Título</label>
                                <input
                                    type="text"
                                    placeholder=""
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green/50 ${theme.input}`}
                                    value={newEvent.title}
                                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className={`block text-sm font-medium mb-1 ${theme.textMain}`}>Prioridad</label>
                                <div className="relative">
                                    <AlertCircle className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${theme.textSubmain}`} />
                                    <select
                                        className={`w-full pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green/50 appearance-none cursor-pointer ${theme.input}`}
                                        value={newEvent.priority}
                                        onChange={(e) => setNewEvent({ ...newEvent, priority: e.target.value })}
                                    >
                                        <option value="">Seleccionar</option>
                                        {Object.values(priorities).map((priority) => (
                                            <option key={priority.value} value={priority.value}>
                                                {priority.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className={`block text-sm font-medium mb-1 ${theme.textMain}`}>Descripción</label>
                                <div className="relative">
                                    <AlignLeft className={`absolute left-3 top-3 w-4 h-4 ${theme.textSubmain}`} />
                                    <textarea
                                        rows="3"
                                        placeholder=""
                                        className={`w-full pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green/50 resize-none ${theme.input}`}
                                        value={newEvent.description}
                                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={`p-4 border-t flex gap-3 ${theme.main} ${theme.border}`}>
                            <button
                                onClick={() => setIsAddEventModalOpen(false)}
                                className={`flex-1 py-2 font-medium bg-transparent border hover:brightness-95 rounded-lg transition-colors ${theme.textMain} ${theme.border}`}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSaveEvent}
                                className="flex-1 bg-primary-green text-white py-2 rounded-lg font-medium hover:bg-primary-green/90 transition-colors"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-[1px] p-4">
                    <div className={`rounded-xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200 border ${theme.subMain} ${theme.border}`}>
                        <div className="p-6 text-center">
                            <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <AlertTriangle className="w-6 h-6 text-red-500" />
                            </div>
                            <h3 className={`text-lg font-bold mb-2 ${theme.textMain}`}>¿Desea eliminar este evento?</h3>
                            <p className={`text-sm ${theme.textSubmain}`}>Esta acción no se puede deshacer.</p>
                        </div>

                        <div className={`p-4 border-t flex gap-3 ${theme.main} ${theme.border}`}>
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className={`flex-1 py-2 font-medium bg-transparent hover:brightness-95 rounded-lg transition-colors border ${theme.textMain} ${theme.border}`}
                            >
                                No
                            </button>
                            <button
                                onClick={confirmDeleteEvent}
                                className="flex-1 bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                            >
                                Sí, eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Events;
