import React from 'react';
import SearchItem from '../SearchItem/SearchItem';
import './RecentSearches.scss';

const RecentSearches = ({ searches, setRecentSearches, fetchWeatherData }) => {
    const moveSearch = (fromIndex, toIndex) => {
        const updatedSearches = [...searches];
        const [movedItem] = updatedSearches.splice(fromIndex, 1);
        updatedSearches.splice(toIndex, 0, movedItem);
        setRecentSearches(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    };

    const handleOnClick = (item) => {
        localStorage.setItem('lastSelectedCity', item.name);
        fetchWeatherData(item.name);
    };

    const removeSearch = (index) => {
        const updatedSearches = searches.filter((_, i) => i !== index);
        setRecentSearches(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    };

    return (
        <div className="recent-searches" role="region" aria-labelledby="recent-searches-title">
            <h3 id="recent-searches-title" className="recent-searches__title">Recent searches</h3>
            <div className="recent-searches__list">
                {searches.map((item, index) => (
                    <SearchItem
                        key={index}
                        item={item}
                        index={index}
                        moveSearch={moveSearch}
                        handleOnClick={handleOnClick}
                        removeSearch={removeSearch}
                    />
                ))}
            </div>
        </div>
    );
};

export default RecentSearches;