import React, { useState, useEffect } from 'react'
import './App.css'

const api = {
    key: 'abd0d37338d310239edc117edffe0476',
    base: 'https://api.openweathermap.org/data/2.5',
};

function App() {
    const [searchInput, setSearchInput] = useState('');
    const [searchCity, setSearchCity] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [weatherInfo, setWeatherInfo] = useState('' );

    useEffect(() => {
        const fetchWeatherData = async () => {
            if (!searchCity) {
                setErrorMessage(false);
                setWeatherInfo('');
                return;}
            setLoading(true);
            try {
                const url = `${api.base}/weather?q=${searchCity}&units=metric&appid=${api.key}`;
                const response = await fetch(url);
                const data = await response.json();
                if (response.ok) {
                    setWeatherInfo(JSON.stringify(data));
                    setErrorMessage('');
                } else {setErrorMessage(data.message)};
                
            } catch (error) {
                setErrorMessage(error.message);
            }
            setLoading(false);
            
        }
        fetchWeatherData();

    }, [searchCity])

    function RenderWeatherInfo() {
        if (!weatherInfo) return;
        const weatherInfoObject = JSON.parse(weatherInfo);
        return (
            <div id="weather-info">
                <h3>{weatherInfoObject.name}</h3>
                <div id="degree">{weatherInfoObject.main.temp}ºC</div>
                <div id="status">{weatherInfoObject.weather[0].description}</div>
            </div>
        
        
        )
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setSearchCity(searchInput);
    };

    return (
        <>
            <header>
                <h1>Weather Station</h1>
            </header>

            <main>
                <div id="search-box">
                    <form onSubmit={handleSubmit}>
                        <input type='text' placeholder='City name' value={searchInput} onChange={(event) => setSearchInput(event.target.value)} />
                        <button>Search</button>
                    </form>
                </div>
            

                {loading ? ( <div className='loader'></div> ) : (
                    <>
                    {errorMessage ? (<h3>Sorry: {errorMessage}</h3>) 
                    : <RenderWeatherInfo />}
                    </>
                )}
            </main>

        </>
    )
}

export default App;
