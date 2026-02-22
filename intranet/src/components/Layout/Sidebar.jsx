import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Newspaper, Calendar, Mail } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import clsx from 'clsx';

const Sidebar = ({ isOpen, onClose }) => {
    const { theme } = useContext(ThemeContext);
    const navItems = [
        { icon: LayoutDashboard, label: 'Inicio', path: '/' },
        { icon: Users, label: 'Directorio', path: '/directory' },
        { icon: FileText, label: 'Documentos', path: '/documents' },
        { icon: Newspaper, label: 'Noticias', path: '/news' },
        { icon: Calendar, label: 'Eventos', path: '/events' },
        { icon: Mail, label: 'Bandeja de entrada', path: '/inbox' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={clsx(
                    "fixed inset-0 z-20 bg-black/50 transition-opacity lg:hidden",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Sidebar */}
            <aside className={clsx(
                `fixed inset-y-0 left-0 z-30 w-64 transform transition-all duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto ${theme.sidebar}`,
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className={`flex items-center justify-center h-16 border-b ${theme.border} ${theme.sidebar}`}>
                    <span className="text-2xl font-bold text-primary-green">Intranet</span>
                </div>

                <nav className="p-4 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => clsx(
                                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${theme.textMain} ${theme.hover}`,
                                isActive
                                    ? "bg-primary-green/10 text-primary-green"
                                    : ""
                            )}
                        >
                            <item.icon className="w-5 h-5 mr-3" />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
