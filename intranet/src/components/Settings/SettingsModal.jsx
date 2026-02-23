import React from 'react';
import { X, Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import clsx from 'clsx';
import { useEscapeKey } from '../../hooks/useEscapeKey';

const SettingsModal = ({ isOpen, onClose }) => {
    const { theme, isDarkMode, toggleTheme } = useTheme();

    useEscapeKey(onClose, isOpen);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className={`bg-white ${theme.main} rounded-xl shadow-xl w-full max-w-4xl h-[600px] overflow-hidden animate-in fade-in zoom-in duration-200 flex`}>
                {/* Sidebar */}
                <div className={`w-64 bg-gray-50 border-r border-gray-200 p-4 ${theme.sidebar}`}>
                    <h2 className={`text-xl font-bold text-text mb-6`}>Configuración</h2>
                    <nav className="space-y-1">
                        <button className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-primary/10 text-primary ${theme.textMain}`}>
                            <Monitor className="w-5 h-5 mr-3" />
                            Temas
                        </button>
                    </nav>
                </div>

                {/* Content */}
                <div className={`flex-1 flex flex-col ${theme.main}`}>
                    <div className={`p-4 border-b border-gray-200 flex justify-between items-center bg-white ${theme.navbar}`}>
                        <h3 className="text-lg font-bold text-text">Apariencia</h3>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    <div className={`p-8 flex-1 bg-white ${theme.main}`}>
                        <div className="max-w-md">
                            <label className="text-sm font-medium text-gray-700 mb-4 block">
                                Tema de la interfaz
                            </label>

                            <div className="space-y-3">
                                <label className={clsx(
                                    "flex items-center p-4 border rounded-xl cursor-pointer transition-all",
                                    !isDarkMode
                                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                                        : "border-gray-200 hover:border-gray-300"
                                )}>
                                    <input
                                        type="radio"
                                        name="theme"
                                        value="light"
                                        checked={!isDarkMode}
                                        onChange={toggleTheme}
                                        className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                                    />
                                    <div className="ml-3 flex items-center">
                                        <Sun className="w-5 h-5 text-gray-500 mr-3" />
                                        <div>
                                            <p className="font-medium text-text">Claro</p>
                                            <p className="text-xs text-gray-500">Apariencia clásica y luminosa</p>
                                        </div>
                                    </div>
                                </label>

                                <label className={clsx(
                                    "flex items-center p-4 border rounded-xl cursor-pointer transition-all",
                                    isDarkMode
                                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                                        : "border-gray-200 hover:border-gray-300"
                                )}>
                                    <input
                                        type="radio"
                                        name="theme"
                                        value="dark"
                                        checked={isDarkMode}
                                        onChange={toggleTheme}
                                        className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                                    />
                                    <div className="ml-3 flex items-center">
                                        <Moon className="w-5 h-5 text-gray-500 mr-3" />
                                        <div>
                                            <p className="font-medium text-text">Oscuro</p>
                                            <p className="text-xs text-gray-500">Mejor para ambientes con poca luz</p>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
