import React, { useState, useContext } from 'react';
import Select from 'react-select';
import { ThemeContext } from '../../contexts/ThemeContext';
import { searchCities } from '../../services/weatherService';
import useFetchWeather from '../../hooks/useFetchWeather';
import './SearchBar.scss';

const SearchBar = ({ setRecentSearches }) => {
    const [city, setCity] = useState('');
    const [options, setOptions] = useState([]);
    const { theme } = useContext(ThemeContext);
    const { fetchWeather, setErrorMessage } = useFetchWeather();

    const handleInputChange = async (inputValue) => {
        setCity(inputValue);
        if (inputValue.length > 2) {
            try {
                const response = await searchCities(inputValue);
                const cityOptions = await Promise.all(response.data.map(async (city) => {
                    const weatherResponse = await fetchWeather(city.name);
                    return {
                        label: (
                            <div>
                                {city.name}, {city.region} - {weatherResponse.data.current.temp_c}°C
                                <img src={weatherResponse.data.current.condition.icon} alt={weatherResponse.data.current.condition.text} style={{ width: 20, height: 20 }} />
                            </div>
                        ),
                        value: city.name,
                        temp: weatherResponse.data.current.temp_c
                    };
                }));
                setOptions(cityOptions.length > 0 ? cityOptions : [{ label: "No results found", value: "" }]);
            } catch (error) {
                console.error(error);
                setErrorMessage("Error fetching city data. Please try again.");
            }
        } else {
            setOptions([]);
        }
    };

    const handleChange = (selectedOption) => {
        if (selectedOption) {
            fetchWeather(selectedOption.value);
            setOptions([]);
            localStorage.setItem('lastSelectedCity', selectedOption.value);
            setRecentSearches(prevSearches => {
                const updatedSearches = prevSearches.filter(item => item.name !== selectedOption.value);
                updatedSearches.unshift({ name: selectedOption.value, temp: selectedOption.temp }); // Add to the front
                localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
                return updatedSearches;
            });
        }
    };

    const customStyles = {
        menu: (provided) => ({
            ...provided,
            backgroundColor: theme === 'dark' ? '#333' : '#fff',
        }),
        control: (provided) => ({
            ...provided,
            backgroundColor: theme === 'dark' ? '#444' : '#fff',
            borderColor: theme === 'dark' ? '#555' : '#ccc',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? (theme === 'dark' ? '#666' : '#eee') : (theme === 'dark' ? '#333' : '#fff'),
        }),
    };

    return (
        <div className="search-bar">
            <Select
                styles={customStyles}
                inputValue={city}
                onInputChange={handleInputChange}
                options={options}
                onChange={handleChange}
                placeholder="Search for city"
                isClearable
                isSearchable
            />
        </div>
    );
};

export default SearchBar;