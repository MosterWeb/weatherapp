import React, { useState, useEffect } from 'react';
import '../components.css/Weather.css'

const Weather = ({ city, country, temperature, description, wind, clouds, pressure, icon, img }) => {

    const [temp, setTemp] = useState([0, " °C"]);
    const [iconUrl, setIcon] = useState('');
    const [background, setBackground] = useState('');

    document.body.style = `background: url(${background}) no-repeat center center fixed;
                           -webkit-background-size: cover;
                           background-size: 100% 100%`;


    useEffect(() => {
        setTemp([(Math.round(temperature * 100) / 100), " °C"]);
        changeBackground(icon);
    }, [temperature, icon]);



    const changeBackground = (icon) => {
        if (icon) {
            icon = parseInt(icon.slice(0, 2));

            if (icon === 1) {
                setBackground('img/1.jpg');
                setIcon("fas fa-sun")
            } else if ((icon >= 2 && icon <= 4) || icon === 50) {
                setBackground('img/2.jpg');
                if (icon === 2) {
                    setIcon("fas fa-cloud-sun")
                } else if (icon === 3) {
                    setIcon("fas fa-cloud");
                } else if (icon === 4 || icon === 50) {
                    setIcon("fas fa-cloud");
                }
            } else if (icon >= 9 && icon <= 11) {
                setBackground('img/3.jpg');
                if (icon === 9) {
                    setIcon("fas fa-cloud-showers-heavy")
                } else if (icon === 10) {
                    setIcon("fas fa-cloud-sun-rain");
                } else if (icon === 11) {
                    setIcon("fas fa-poo-storm");
                }
            } else if (icon === 13) {
                setBackground('img/4.jpg');
                setIcon("fas fa-snowflake")
            }
        }
    }

    const handleTemperature = () => {
        let value = 0;
        if (temp[1] === " °C") {
            value = temp[0] + 32;
            setTemp([value, " °F"]);
        } else {
            value = temp[0] - 32;
            setTemp([value, " °C"]);
        }
    }

    // Fecha 

    let d = new Date();
    let date = d.getDate();
    let year = d.getFullYear();
    let month = d.toLocaleString("default", { month: 'long' });
    let day = d.toLocaleString("default", { weekday: 'long' });


    return (
        <div>

            <div className="container display">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card bg-dark text-white text-center border-0 height">
                            <img src={`img/${img}.jpg`} className="card-img" alt="..." />
                            <div className="card-img-overlay  ">

                                <div className="bg-dark bg-opacity-50 py-3 lead">
                                    <h5 className="card-title">{city}, {country}</h5>
                                    <p className="card-text lead">{day}, {month} {date}, {year}

                                    </p>
                                    <hr />

                                    <i className={`fas ${icon} fa-4x`}></i>
                                    <h1 className="fw-bolder mb-5"> {temp[0] + temp[1]}</h1>
                                    <div className="col-sm-6 icon">
                                        <div ><i className={iconUrl + " weather-icon"}></i></div>
                                    </div>
                                    <div className="lead">
                                        <h3>Descripcion</h3>
                                        <p>{description}</p>
                                    </div>

                                    <div className="lead">
                                        <h3>Pressure</h3>
                                        <p>{pressure}</p>
                                    </div>

                                    <div className="lead">
                                        <h3>Clouds</h3>
                                        <p>{clouds} %</p>
                                    </div>

                                    <div className="lead">
                                        <h3>Wind</h3>
                                        <p>{wind} m/s</p>
                                    </div>



                                    <button type="button" onClick={handleTemperature} className="change">
                                        Cambiar valor
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Weather;     