import React, { createContext, useContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const clsTemaOscuro = {
    sidebar: "bgSidebar",
    navbar: "bgNavbar",
    main: "main",
    subMain: "sub-main",
    subMain2: "sub-main",
    textMain: "text-gray-100",
    txtWhite: "text-gray-100",
    textSubmain: "text-gray-300",
    border: "border-[#454545]",
    hover: "hover:bg-[#1e293b]",
    input: "bg-[#15223b] border-[#454545] text-white placeholder-slate-400",
    bgPrimary: "bg-green-800 text-green-200",
};

const objTemaClaro = {
    sidebar: "bg-white border-r border-gray-200",
    navbar: "bg-white border-b border-gray-200",
    main: "bg-gray-50",
    subMain: "bg-white",
    subMain2: "bg-white text-gray-900",
    textMain: "text-gray-900",
    txtWhite: "",
    textSubmain: "text-gray-500",
    border: "border-gray-200",
    hover: "hover:bg-gray-50",
    input: "bg-white border-gray-200 text-gray-900",
    bgPrimary: "bg-green-200 text-green-800",
};

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        try {
            return localStorage.getItem('theme') === 'dark';
        } catch (e) {
            return false;
        }
    });

    const theme = isDarkMode ? clsTemaOscuro : objTemaClaro;

    useEffect(() => {
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(prev => !prev);

    return (
        <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
