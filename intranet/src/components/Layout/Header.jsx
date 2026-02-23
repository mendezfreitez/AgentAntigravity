import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Menu, Settings, LogOut, FileText, User, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import SettingsModal from '../Settings/SettingsModal';
import NotificationsModal from '../Common/NotificationsModal';
import { useEscapeKey } from '../../hooks/useEscapeKey';

const Header = ({ onMenuClick }) => {
    const { theme, toggleTheme, isDarkMode } = useTheme();
    const { logout } = useAuth();
    const navigate = useNavigate();

    // State for menus and modals
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(true); // Open on mount to act as Welcome

    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEscapeKey(() => setIsMenuOpen(false), isMenuOpen);
    useEscapeKey(() => setIsLogoutModalOpen(false), isLogoutModalOpen);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setIsLogoutModalOpen(false);
    };

    return (
        <>
            <header className={`h-16 flex items-center justify-end px-4 relative z-20 transition-colors duration-200 ${theme.navbar}`}>
                <div className="flex items-center space-x-2 transition-colors duration-200">
                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-lg transition-colors cursor-pointer ${theme.hover} ${theme.textMain}`}
                        title={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                    >
                        {isDarkMode ? (
                            <Sun className="w-5 h-5" />
                        ) : (
                            <Moon className="w-5 h-5" />
                        )}
                    </button>

                    <button
                        onClick={onMenuClick}
                        className={`p-2 mr-4 rounded-lg lg:hidden transition-colors ${theme.hover} ${theme.textMain}`}
                    >
                        <Menu className="w-6 h-6" />
                        <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>

                    <div className="flex items-center space-x-3 pl-4 border-l border-gray-200 relative" ref={menuRef}>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="relative focus:outline-none me-0 flex flex-row items-center cursor-pointer"
                        >
                            <div className="text-right hidden md:block me-2">
                                <p className={`text-sm font-medium ${theme.textMain}`}>Jane Doe</p>
                                <p className={`text-xs ${theme.textSubmain}`}>Product Designer</p>
                            </div>

                            <div className={`w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold hover:bg-primary/30 transition-colors cursor-pointer mr-0 ${theme.bgPrimary} ${theme.textMain}`}>
                                JD
                            </div>
                        </button>

                        {/* User Dropdown Menu */}
                        {isMenuOpen && (
                            <div className={`absolute top-12 right-0 w-56 rounded-xl shadow-lg py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right ${theme.navbar}`}>
                                <div className={`px-4 py-3 border-b md:hidden ${theme.border}`}>
                                    <p className={`text-sm font-medium ${theme.textMain}`}>Jane Doe</p>
                                    <p className={`text-xs ${theme.textSubmain}`}>Product Designer</p>
                                </div>

                                <button
                                    onClick={() => {
                                        setIsNotificationsOpen(true);
                                        setIsMenuOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors cursor-pointer ${theme.textMain} ${theme.hover}`}
                                >
                                    <Bell className={`w-4 h-4 ${theme.textSubmain}`} />
                                    Notificaciones
                                </button>

                                <button
                                    onClick={() => {
                                        setIsSettingsOpen(true);
                                        setIsMenuOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors cursor-pointer ${theme.textMain} ${theme.hover}`}
                                >
                                    <Settings className={`w-4 h-4 ${theme.textSubmain}`} />
                                    Configuración
                                </button>

                                <div className={`border-t my-1 ${theme.border}`}></div>

                                <button
                                    onClick={() => {
                                        setIsLogoutModalOpen(true);
                                        setIsMenuOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-500/10 cursor-pointer flex items-center gap-2 transition-colors`}
                                >
                                    <LogOut className="w-4 h-4" />
                                    Cerrar Sesión
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Modals */}
            <SettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
            />

            <NotificationsModal
                isOpen={isNotificationsOpen}
                onClose={() => setIsNotificationsOpen(false)}
            />

            {/* Logout Confirmation Modal */}
            {isLogoutModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className={`rounded-xl shadow-xl w-full max-w-sm p-6 transform scale-100 ${theme.main} ${theme.border}`}>
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-500/20 mb-4">
                                <LogOut className="h-6 w-6 text-red-500" />
                            </div>
                            <h3 className={`text-lg font-medium mb-2 ${theme.textMain}`}>Cierre de sesión</h3>
                            <p className={`text-sm mb-6 ${theme.textSubmain}`}>
                                ¿Estás seguro de que deseas cerrar sesión? Tendrás que iniciar sesión nuevamente para acceder.
                            </p>
                            <div className="flex gap-3 justify-center">
                                <button
                                    onClick={() => setIsLogoutModalOpen(false)}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${theme.textMain} ${theme.hover} border ${theme.border}`}
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-sm cursor-pointer font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm"
                                >
                                    Cerrar Sesión
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
