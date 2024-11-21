import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import RecentSearches from './components/RecentSearches';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const apiKey = process.env.REACT_APP_YOUR_WEATHER_API_KEY;

  const fetchWeatherData = useCallback(async (city, intervalUpdate = false) => {
    if (!city) return;
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);

      const lastSelectedCity = localStorage.getItem('lastSelectedCity');

      if (lastSelectedCity && city == lastSelectedCity) {
        setWeatherData(response.data);
      }
      const newSearch = { name: city, temp: response.data.current.temp_c };

      setRecentSearches(prevSearches => {
        let exists = false;

        prevSearches.forEach(search => {
          if (search.name === city) {
            search.temp = newSearch.temp; // Update temp if city exists
            exists = true;
          }
        });

        if (!exists) {
          return [newSearch, ...prevSearches]; // Add new search to the front
        }

        return [...prevSearches]; // Return without changes if city exists
      });


    } catch (error) {
      console.error("Error fetching weather data", error);
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
    }, 5000);

    return () => clearInterval(intervalId);
  }, [fetchWeatherData]);

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">My Weather Application</h1>
        <SearchBar fetchWeatherData={fetchWeatherData} />
      </header>
      <main className="app__main">
        {weatherData && <WeatherCard data={weatherData} />}
        <RecentSearches searches={recentSearches} fetchWeatherData={fetchWeatherData} />
      </main>
    </div>
  );
}

export default App;