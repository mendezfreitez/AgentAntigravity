import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

export const TitleView = ({ title, subtitle }) => {
    const { theme } = useContext(ThemeContext);
    return (
        <div>
            <h1 className="text-2xl font-bold text-text-primary">{title}</h1>
            <p className="text-text-tertiary">{subtitle}</p>
        </div>
    );
};