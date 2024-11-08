import React, { useState, useEffect } from "react";
import {
  TiWeatherPartlySunny,
  TiWeatherCloudy,
  TiWeatherSnow,
  TiWeatherStormy,
  TiWeatherShower,
} from "react-icons/ti"; // Added additional icons

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [defaultLocation] = useState("Dallas"); // Default location for initial load

  const apiKey = "65ac0f05a5bca2017ac6e0c7e1d90475";

  useEffect(() => {
    // Fetch weather data for the default location on initial load
    const fetchWeatherData = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=imperial&appid=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
        console.log("Initial weather data:", data);
      } catch (error) {
        console.error("Error fetching the initial weather data:", error);
      }
    };

    fetchWeatherData();
  }, [defaultLocation]);

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          console.log("Searched location data:", data);
        })
        .catch((error) => {
          console.error("Error fetching the weather data:", error);
        });

      setLocation("");
    }
  };

  const getWeatherIcon = (weatherCondition) => {
    switch (weatherCondition) {
      case "Clear":
        return <TiWeatherPartlySunny size={50} />;
      case "Clouds":
        return <TiWeatherCloudy size={50} />;
      case "Snow":
        return <TiWeatherSnow size={50} />;
      case "Rain":
        return <TiWeatherShower size={50} />;
      case "Thunderstorm":
        return <TiWeatherStormy size={50} />;
      default:
        return <TiWeatherCloudy size={50} />; // Default icon for unknown conditions
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed(0)}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
          <div className="weather-icon">
            {/* Display the weather icon based on the condition */}
            {data.weather ? getWeatherIcon(data.weather[0].main) : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed(0)}°F</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed(0)} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
