import React, { useState } from 'react'
import './Weather.css'


const api = {
    key: "67f85f2065e6b8da6def6bc9d4b2ce4f",
    base: "https://api.openweathermap.org/data/2.5/",
}
const Weather = () => {

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = evt => {
        if (evt.key === 'Enter') {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                    console.log(result);
                })
        }
    }

    const dateBuilder = (d) => {
        let months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        let days = [
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }

    return (
        <div>
            <main>
                <div className='search-box'>
                    <input type="text" className="search-bar" placeholder='Search...' onChange={e => setQuery(e.target.value)} value={query}
                        onKeyPress={search} />

                </div>
                <div>
                    <div className="location-box">
                        {weather.main && (
                            <div className="location">
                                {weather.name}, {weather.sys.country}
                                <div className="date">
                                    {dateBuilder(new Date())}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="weather-box">
                        {weather.main &&(
                            <div className="temp">
                                {Math.round(weather.main.temp)}c°
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Weather