import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import WeatherCard from '../WeatherCard/WeatherCard';
import SearchBar from '../SearchBar/SearchBar';
import RecentSearches from '../RecentSearches/RecentSearches';

const MainComponent = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [recentSearches, setRecentSearches] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const apiKey = process.env.REACT_APP_YOUR_WEATHER_API_KEY;

    const fetchWeatherData = useCallback(async (city, intervalUpdate = false) => {
        if (!city) return;
        setErrorMessage('');
        try {
            const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`);
            if (response.status === 200) {
                setWeatherData(response.data);
            }
        } catch (error) {
            handleFetchError(error, city);
        }
    }, [apiKey]);

    const handleFetchError = (error, city) => {
        if (error.response) {
            switch (error.response.status) {
                case 404:
                    setErrorMessage(`City "${city}" not found.`);
                    break;
                case 401:
                    setErrorMessage("Unauthorized request. Check your API key.");
                    break;
                default:
                    setErrorMessage("Error fetching weather data. Please try again later.");
                    break;
            }
        } else {
            setErrorMessage("Network error: Please check your internet connection.");
        }
    };

    useEffect(() => {
        const storedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
        setRecentSearches(storedSearches);

        const lastSelectedCity = localStorage.getItem('lastSelectedCity');
        if (lastSelectedCity) {
            fetchWeatherData(lastSelectedCity);
        }

        const intervalId = setInterval(() => {
            storedSearches.forEach(search => {
                fetchWeatherData(search.name, true);
            });
        }, 60000);

        return () => clearInterval(intervalId);
    }, [fetchWeatherData]);

    return (
        <div className="app">
            <header className="app__header">
                <h1 className="app__title">My Weather Application</h1>
                <SearchBar fetchWeatherData={fetchWeatherData} setErrorMessage={setErrorMessage} />
            </header>
            <main className="app__main">
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                {weatherData && <WeatherCard data={weatherData} />}
                <RecentSearches searches={recentSearches} fetchWeatherData={fetchWeatherData} />
            </main>
        </div>
    );
}

export default MainComponent;