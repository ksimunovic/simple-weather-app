import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

import './Navigation.scss';

const Navigation = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="navbar">
            <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
                <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
            </button>
        </nav>
    );
};

export default Navigation;