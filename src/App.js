import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import MainComponent from './components/MainComponent/MainComponent';
import Navigation from './components/Navigation/Navigation';
import './styles/App.scss';

function App() {
    return (
        <ThemeProvider>
            <MainComponent />
            <Navigation />
        </ThemeProvider>
    );
}

export default App;