import { useState, useCallback } from 'react';
import { fetchWeatherData } from '../services/weatherService';

const useFetchWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchWeather = useCallback(async (city) => {
    setErrorMessage('');
    if (!city) return;

    try {
      const response = await fetchWeatherData(city);
      setWeatherData(response.data);
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
  }, []);

  return { weatherData, errorMessage, fetchWeather };
};

export default useFetchWeather;