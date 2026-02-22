import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

export const TitleView = ({ title, subtitle }) => {
    const { theme } = useContext(ThemeContext);
    return (
        <div>
            <h1 className={`text-2xl font-bold ${theme.textMain}`}>{title}</h1>
            <p className={theme.textSubmain}>{subtitle}</p>
        </div>
    );
};