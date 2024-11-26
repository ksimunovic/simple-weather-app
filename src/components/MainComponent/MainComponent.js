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
        } else {
            getLocation();
        }
    }, [fetchWeather, weatherData]);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchWeather(`${latitude},${longitude}`);
                },
                () => fallbackToIpApi()
            );
        } else {
            fallbackToIpApi();
        }
    };

    const fallbackToIpApi = async () => {
        try {
            const response = await fetch('http://ip-api.com/json/');
            const ipData = await response.json();
            if (ipData.status === 'success') {
                const { city } = ipData;
                fetchWeather(city);
            } else {
                // Handle case when IP API doesn't return a valid response
                console.error("IP API request failed:", ipData.message);
            }
        } catch (error) {
            console.error("Error fetching location from IP API:", error);
        }
    };

    return (
        <ErrorBoundary>
            <div className="app">
                <header className="app__header">
                    <h1 className="app__title">My Weather Application</h1>
                    <SearchBar fetchWeatherData={fetchWeather} setRecentSearches={setRecentSearches} />
                </header>
                <main className="app__main">
                    <ErrorMessage message={errorMessage} />
                    {weatherData && <WeatherCard data={weatherData} />}
                    <RecentSearches
                        searches={recentSearches}
                        setRecentSearches={setRecentSearches}
                        fetchWeatherData={fetchWeather}
                    />
                </main>
            </div>
        </ErrorBoundary>
    );
};

export default MainComponent;