import React from 'react';
import './RecentSearches.scss';

const RecentSearches = ({ searches, fetchWeatherData }) => {
    const handleOnClick = (item) => {
        localStorage.setItem('lastSelectedCity', item.name);
        fetchWeatherData(item.name);
    };

    const handleOnKeyDown = (event, item) => {
        if (event.key === 'Enter') {
            handleOnClick(item);
        }
    };

    return (
        <div className="recent-searches" role="region" aria-labelledby="recent-searches-title">
            <h3 id="recent-searches-title" className="recent-searches__title">Recent searches</h3>
            <div className="recent-searches__list">
                {searches.map((item, index) => (
                    <div 
                        key={index} 
                        className="recent-searches__item" 
                        onClick={() => handleOnClick(item)}
                        onKeyDown={(event) => handleOnKeyDown(event, item)} 
                        role="button" 
                        tabIndex={0}
                        aria-label={`Search weather for ${item.name} at ${item.temp} degrees`}
                    >
                        {item.name} - {item.temp}°C
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentSearches;