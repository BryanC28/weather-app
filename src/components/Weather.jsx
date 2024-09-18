import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faSearch,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";

import DateTime from "./DateTime";
import "../css/Weather.css";
import cloud_icon from "../assets/icons/cloud.png";
import wind_icon from "../assets/icons/wind.png";
import humidity_icon from "../assets/icons/humidity.png";
import clear_icon from "../assets/icons/clear.png";
import rain_icon from "../assets/icons/rain.png";
import drizzle_icon from "../assets/icons/drizzle.png";
import snow_icon from "../assets/icons/snow.png";
import { Alert } from "bootstrap";
import useDebounce from "../hooks/useDebounced";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);
  const [location, setLocation] = useState("Ho Chi Minh");
  const [showAlert, setShowAlert] = useState(false);
  const inputLocation = useRef();
  const debounced = useDebounce(location, 500);
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  useEffect(() => {
    // console.log("api key: " + process.env.CONFIG_API_ID);
    if (!debounced.trim()) {
      setWeatherData(false);
      setShowAlert(true);
      return;
    }
    const search = async (city) => {
      try {
        // https://api.openweathermap.org/data/2.5/weather?q=London&appid={API key}
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=1467a88ebabdade393f53217de49eeb1`;
        const response = await fetch(url);
        const data = await response.json();
        if (data) {
          setShowAlert(!showAlert);
        }
        //   console.log(data);
        const icon = allIcons[data.weather[0].icon] || clear_icon;
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: icon,
        });
      } catch (error) {
        setWeatherData(false);
      }
    };
    search(debounced);
  }, [debounced]);

  return (
    <>
      <div className="weather">
        {showAlert && !weatherData && (
          <div className="alert alert-danger alert-dismissible">
            <FontAwesomeIcon icon={faWarning} /> No Data Found
            <button
              type="button"
              className="btn-close"
              data-dismiss="alert"
              onClick={() => setShowAlert(false)}
            ></button>
          </div>
        )}
        <div className="search-bar">
          <input
            ref={inputLocation}
            value={location}
            onChange={(e) => setLocation(e.target.value.toLowerCase())}
            type="text"
            placeholder="Search...."
          />
          {/* <FontAwesomeIcon
            onClick={() => {
              search(inputLocation.current.value);
            }}
            className="icon"
            icon={faSearch}
          /> */}
        </div>
        {!weatherData ? (
          <></>
        ) : (
          <>
            <DateTime />
            <img src={weatherData.icon} alt="cloud" className="weather-icon" />
            <p className="tempareture">{weatherData.temperature} &deg;C</p>
            <p className="location">
              <FontAwesomeIcon icon={faLocationDot} /> {weatherData.location}
            </p>
            <div className="weather-data">
              <div className="col">
                <img src={humidity_icon} alt="humidity" />
                <div>
                  <p> {weatherData.humidity} %</p>
                  <span>Humidity</span>
                </div>
              </div>
              <div className="col">
                <img src={wind_icon} alt="wind" />
                <div>
                  <p>{weatherData.windSpeed} km/h</p>
                  <span>Wind speed</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <span className="copyright">Copyright &copy; 2024 by GreatStack . </span>
    </>
  );
};

export default Weather;
