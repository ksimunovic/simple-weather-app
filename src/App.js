import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { ThemeProvider } from './contexts/ThemeContext';
import MainComponent from './components/MainComponent/MainComponent';
import Navigation from './components/Navigation/Navigation';
import './styles/App.scss';

const isTouchDevice = 'ontouchstart' in window;

function App() {
    return (
        <DndProvider backend={isTouchDevice ? TouchBackend : HTML5Backend}>
            <ThemeProvider>
                <MainComponent />
                <Navigation />
            </ThemeProvider>
        </DndProvider>
    );
}

export default App;