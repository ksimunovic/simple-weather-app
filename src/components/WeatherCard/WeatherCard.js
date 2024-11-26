import React from 'react';
import './WeatherCard.scss';

const WeatherCard = ({ data }) => {
    return (
        <div className="weather-card" role="region" aria-labelledby="weather-title">
            <h2 id="weather-title" className="weather-card__title">{data.location.name}</h2>
            <div className="weather-card__temperature">{data.current.temp_c}°</div>
            <img src={data.current.condition.icon} alt={data.current.condition.text} className="weather-card__icon" />
            <p className="weather-card__condition">{data.current.condition.text}</p>
            <p className="weather-card__aqi">AQI: {data.current.air_quality.pm10} μg/m³</p>
        </div>
    );
};

export default WeatherCard;