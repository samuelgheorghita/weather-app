import "./current-weather.css";

function CurrentWeather({ label, main, weather, wind }) {
  return (
    <div className="current-weather">
      <div className="location-icon-container">
        <span className="location">
          <div className="city">{label}</div>
          <div className="brief-desc">{weather[0].description}</div>
        </span>
        <span className="img-container">
          <img src={`icons/${weather[0].icon}.png`} alt="weather" />
        </span>
      </div>
      <div className="temperature-details-container">
        <span className="temperature">{Math.round(main.temp)}°C</span>
        <span className="details">
          <div className="parameter-row">
            <span className="parameter-label">Details</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-value">{main.feels_like}°C</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{wind.speed} m/s</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{main.humidity}%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">{main.pressure} hPa</span>
          </div>
        </span>
      </div>
    </div>
  );
}

export default CurrentWeather;
