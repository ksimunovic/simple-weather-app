import React, { createContext, useContext, useState } from 'react';

export const ThemeContext = createContext();

export const useTheme = () => {
    return useContext(ThemeContext);
};

const themes = {
    light: {
        backgroundColor: '#e0e0e0',
        color: '#333',
    },
    dark: {
        backgroundColor: '#333',
        color: '#e0e0e0',
    },
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div style={{ backgroundColor: themes[theme].backgroundColor, color: themes[theme].color }}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};