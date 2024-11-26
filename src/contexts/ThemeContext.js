import React, { createContext, useContext, useState } from 'react';
import './ThemeContext.scss';

// Create context
export const ThemeContext = createContext();

// Custom hook for using theme context
export const useTheme = () => {
    return useContext(ThemeContext);
};

// Theme provider component
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light'); // 'light' or 'dark'

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className={theme}>{children}</div>
        </ThemeContext.Provider>
    );
};