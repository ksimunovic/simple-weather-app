import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

const SearchBar = ({ fetchWeatherData }) => {
    const [city, setCity] = useState('');
    const [options, setOptions] = useState([]);

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
                                {city.name}, {city.region} - {weatherResponse.data.current.temp_c}°C
                                <img src={weatherResponse.data.current.condition.icon} alt={weatherResponse.data.current.condition.text} style={{ width: 20, height: 20 }} />
                            </div>
                        ),
                        value: city.name,
                    };
                }));
                setOptions(cityOptions.length > 0 ? cityOptions : [{ label: "No results found", value: "" }]);
            } catch (error) {
                console.error("Error fetching city suggestions", error);
                setOptions([{ label: "Error fetching suggestions", value: "" }]);
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

    return (
        <div className="search-bar">
            <Select
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
            />
        </div>
    );
};

export default SearchBar;