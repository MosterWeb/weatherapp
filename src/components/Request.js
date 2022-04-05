import React, { useState, useEffect } from 'react';
import Spinning from './Spinning.js';
import Weather from './Weather.js';

const Request = () => {
    const [isSpinning, setSpinning] = useState(true);
    const [isError, setIsError] = useState(false);
    const [weather, setWeather] = useState({});

    const success = (position) => {
        let lon = position.coords.longitude;
        let lat = position.coords.latitude;
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=255a2683bd5ad3ec6d689e72383cce35`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setSpinning(false);
                setIsError(false);
                console.log(data);
                setWeather({
                    city: data.name,
                    country: data.sys.country,
                    temperature: (data.main.temp - 273.15),
                    description: data.weather[0].description,
                    wind: data.wind.speed,
                    clouds: data.clouds.all,
                    pressure: data.main.pressure,
                    icon: data.weather[0].icon,
                    img: data.weather[0].main
                });
            });
    }

    const error = () => {
        setIsError(true);
        setSpinning(true);
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success, error)
    }, []);

    return (
        <div>
            {(isSpinning) ? <Spinning /> : <Weather city={weather.city} country={weather.country} temperature={weather.temperature} description={weather.description} wind={weather.wind} clouds={weather.clouds} pressure={weather.clouds} icon={weather.icon} img={weather.img} />}
            <p className={(isError) ? "error-message text-center" : "error-message text-center d-none"}>
            Tuvimos un problema para obtener su ubicación, verifique los permisos haciendo clic en <i className="fas fa-lock"></i> en su navegador
            </p>
        </div>
    )
}

export default Request;