import React from 'react';

const RecentSearches = ({ searches, fetchWeatherData }) => {
    const handleOnClick = (item) => {
        localStorage.setItem('lastSelectedCity', item.name);
        fetchWeatherData(item.name);
    };

    return (
        <div className="recent-searches">
            <h3 className="recent-searches__title">Recent searches</h3>
            <div className="recent-searches__list">
                {searches.map((item, index) => (
                    <div key={index} className="recent-searches__item" onClick={() => handleOnClick(item)}>
                        {item.name} - {item.temp}°C
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentSearches;