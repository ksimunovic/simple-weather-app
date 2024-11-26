import React, { useEffect, useState } from 'react';
import WeatherCard from '../WeatherCard/WeatherCard';
import SearchBar from '../SearchBar/SearchBar';
import RecentSearches from '../RecentSearches/RecentSearches';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import useFetchWeather from '../../hooks/useFetchWeather';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const MainComponent = () => {
    const { weatherData, errorMessage, fetchWeather } = useFetchWeather();
    const [recentSearches, setRecentSearches] = useState([]);

    useEffect(() => {
        const storedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
        setRecentSearches(storedSearches);

        const lastSelectedCity = localStorage.getItem('lastSelectedCity');
        if (lastSelectedCity) {
            fetchWeather(lastSelectedCity);
        }
    }, [fetchWeather]);

    return (
        <ErrorBoundary>
            <div className="app">
                <header className="app__header">
                    <h1 className="app__title">My Weather Application</h1>
                    <SearchBar fetchWeatherData={fetchWeather} />
                </header>
                <main className="app__main">
                    <ErrorMessage message={errorMessage} />
                    {weatherData && <WeatherCard data={weatherData} />}
                    <RecentSearches searches={recentSearches} fetchWeatherData={fetchWeather} />
                </main>
            </div>
        </ErrorBoundary>
    );
};

export default MainComponent;