import React from 'react';
import './WeatherCard.scss';

const WeatherCard = ({ data }) => {
    const { location, current } = data || {};
    const airQuality = current?.air_quality || {};

    return (
        <div className="weather-card" role="region" aria-labelledby="weather-title">
            <h2 id="weather-title" className="weather-card__title">{location?.name || 'Location not found'}</h2>
            <div className="weather-card__temperature">
                {current ? `${current.temp_c}°` : 'Temperature not available'}
            </div>
            {current?.condition && (
                <>
                    <img
                        src={current.condition.icon}
                        alt={current.condition.text}
                        className="weather-card__icon"
                    />
                    <p className="weather-card__condition">{current.condition.text}</p>
                </>
            )}
            <p className="weather-card__aqi">AQI (PM10): {airQuality.pm10 ? airQuality.pm10 : 'Data not available'} μg/m³</p>
        </div>
    );
};

export default WeatherCard;