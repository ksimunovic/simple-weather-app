import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import RecentSearches from './components/RecentSearches';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [errorMessage, setErrorMessage] = useState(''); // New state for error messages
  const apiKey = process.env.REACT_APP_YOUR_WEATHER_API_KEY;

  const fetchWeatherData = useCallback(async (city, intervalUpdate = false) => {
    if (!city) return;
    setErrorMessage(''); // Clear previous error message
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}}&aqi=yes`);

      if (response.status === 200) {
        setWeatherData(response.data);
      }
    } catch (error) {
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
    }
  }, [apiKey]);

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
        {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}
        {weatherData && <WeatherCard data={weatherData} />}
        <RecentSearches searches={recentSearches} fetchWeatherData={fetchWeatherData} />
      </main>
    </div>
  );
}

export default App;