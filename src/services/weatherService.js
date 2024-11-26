import axios from 'axios';

const apiKey = process.env.REACT_APP_YOUR_WEATHER_API_KEY;

export const fetchWeatherData = async (city) => {
    return await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
};

export const searchCities = async (inputValue) => {
    return await axios.get(`https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${inputValue}`);
};