import "./forecast-details.css";
import { v4 } from "uuid";

function ForecastDetails({ miniList }) {
  const details = miniList.map((elem, index) => {
    const time = elem.dt_txt.split(" ")[1].slice(0, 2);
    const precipitationProbability =
      "pop" in elem ? Math.round(elem.pop * 100) : "0";
    const temperature = (Math.round(elem.main.temp * 10) / 10).toFixed(1);

    function precipitationPresence() {
      if ("rain" in elem) {
        return elem.rain["3h"];
      }
      if ("snow" in elem) {
        return elem.snow["3h"];
      }
      return "absent";
    }

    return (
      <div key={v4()} className="specs">
        <div className="specs-elem">{time}</div>
        <div className="img-container">
          <img
            src={`icons/${elem.weather[0].icon}.png`}
            alt="weather-img"
            className="specs-img"
          />
        </div>
        <div className="specs-elem">{temperature}</div>
        <div className="specs-elem">{Math.round(elem.wind.speed)}</div>
        <div className="specs-elem">{precipitationPresence()}</div>
        <div className="specs-elem">{precipitationProbability}</div>
        <div className="specs-elem">{Math.round(elem.main.feels_like)}</div>
        <div className="specs-elem">{elem.main.humidity}</div>
      </div>
    );
  });

  return (
    <div className="details-container">
      <div className="titles">
        <div className="titles-elem">Time</div>
        <div className="titles-elem">Weather</div>
        <div className="titles-elem">T(°C)</div>
        <div className="titles-elem">Wind(km/h)</div>
        <div className="titles-elem">Precipitation(mm)</div>
        <div className="titles-elem">Precipitation(%)</div>
        <div className="titles-elem">Feels like(°C)</div>
        <div className="titles-elem">Humidity(%)</div>
      </div>
      {details}
    </div>
  );
}

export default ForecastDetails;
