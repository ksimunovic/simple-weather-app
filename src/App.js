import React from 'react';
import { ThemeProvider } from './ThemeContext'; // Adjust the path as needed
import MainComponent from './MainComponent';
import Navigation from './Navigation';

function App() {
    return (
        <ThemeProvider>
            <MainComponent />
            <Navigation/>
        </ThemeProvider>
    );
}

export default App;