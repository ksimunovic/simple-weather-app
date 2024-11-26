import React, { useState, useContext } from 'react';
import Select from 'react-select';
import { ThemeContext } from '../../contexts/ThemeContext';
import useFetchWeather from '../../hooks/useFetchWeather';
import './SearchBar.scss';

const SearchBar = () => {
    const [city, setCity] = useState('');
    const [options, setOptions] = useState([]);
    const { theme } = useContext(ThemeContext);
    const { fetchWeatherData, setErrorMessage } = useFetchWeather();

    const handleInputChange = async (inputValue) => {
        setCity(inputValue);
        if (inputValue.length > 2) {
            try {
                const response = await fetchWeatherData(inputValue);
                if (response.data.length === 0) {
                    setOptions([{ label: "No results found", value: "" }]);
                } else {
                    const cityOptions = response.data.map(city => ({
                        label: `${city.name}, ${city.region || "Unknown"} - ${city.temp_c}°C`,
                        value: city.name,
                    }));
                    setOptions(cityOptions);
                }
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