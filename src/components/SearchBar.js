import React, { useState, useContext } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { ThemeContext } from '../ThemeContext'; // Adjust the path as needed

const SearchBar = ({ fetchWeatherData, setErrorMessage }) => {
    const [city, setCity] = useState('');
    const [options, setOptions] = useState([]);
    const { theme } = useContext(ThemeContext); // Get the current theme

    const handleInputChange = async (inputValue) => {
        setCity(inputValue);
        if (inputValue.length > 2) {
            try {
                const response = await axios.get(`https://api.weatherapi.com/v1/search.json?key=${process.env.REACT_APP_YOUR_WEATHER_API_KEY}&q=${inputValue}`);
                const cityOptions = await Promise.all(response.data.map(async (city) => {
                    const weatherResponse = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_YOUR_WEATHER_API_KEY}&q=${city.name}`);
                    return {
                        label: (
                            <div>
                                {city.name}{city.region ? `, ${city.region}` : ''} - {weatherResponse.data.current.temp_c}°C
                                <img src={weatherResponse.data.current.condition.icon} alt={weatherResponse.data.current.condition.text} style={{ width: 20, height: 20 }} />
                            </div>
                        ),
                        value: city.name,
                    };
                }));
                setOptions(cityOptions.length > 0 ? cityOptions : [{ label: "No results found", value: "" }]);
            } catch (error) {
                setErrorMessage("An error occurred. Please try again.");
            }
        } else {
            setOptions([]);
        }
    };

    const handleChange = (selectedOption) => {
        if (selectedOption) {
            fetchWeatherData(selectedOption.value);
            setOptions([]);
            localStorage.setItem('lastSelectedCity', selectedOption.value);
        }
    };

    const customStyles = {
        menu: (provided) => ({
            ...provided,
            backgroundColor: theme === 'dark' ? '#333' : '#fff',
        }),
        control: (provided) => ({
            ...provided,
            backgroundColor: theme === 'dark' ? '#444' : '#fff', // Change background color for contrast
            borderColor: theme === 'dark' ? '#555' : '#ccc',
            color: theme === 'dark' ? '#e0e0e0' : '#333',
        }),
        singleValue: (provided) => ({
            ...provided,
            color: theme === 'dark' ? '#e0e0e0' : '#333', // Light text color
        }),
        placeholder: (provided) => ({
            ...provided,
            color: theme === 'dark' ? '#e0e0e0' : '#999', // Light placeholder text
        }),
        input: (provided) => ({
            ...provided,
            color: theme === 'dark' ? '#e0e0e0' : '#333', // Light input text
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? (theme === 'dark' ? '#666' : '#eee') : (theme === 'dark' ? '#333' : '#fff'),
            color: theme === 'dark' ? '#e0e0e0' : '#333',
            '&:hover': {
                backgroundColor: theme === 'dark' ? '#666' : '#f0f0f0',
            },
        }),
    };

    return (
        <div className="search-bar">
            <Select
                styles={customStyles}
                className='search-bar__select'
                inputValue={city}
                onInputChange={handleInputChange}
                options={options}
                onChange={handleChange}
                placeholder="Search for city"
                isClearable
                isSearchable
                noOptionsMessage={() => (city ? "No results found" : "")}
                menuIsOpen={city.length > 0 && options.length > 0}
                aria-label="Search for city weather"
                tabIndex={0}
            />
        </div>
    );
};

export default SearchBar;