import "./forecast-details.css";
import { v4 } from "uuid";

function ForecastDetails({ miniList }) {
  const details = miniList.map((elem, index) => {
    const time = elem.dt_txt.split(" ")[1].slice(0, 2);
    const precipitationProbability = "pop" in elem ? Math.round(elem.pop * 100) : "0";
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
      <tr key={v4()} className="specs">
        <td className="specs-elem">{time}</td>
        <td className="img-container">
          <img src={`icons/${elem.weather[0].icon}.png`} className="specs-img" alt="weather-img" />
        </td>
        <td className="specs-elem">{temperature}</td>
        <td className="specs-elem">{Math.round(elem.wind.speed)}</td>
        <td className="specs-elem">{precipitationPresence()}</td>
        <td className="specs-elem">{precipitationProbability}</td>
        <td className="specs-elem">{Math.round(elem.main.feels_like)}</td>
        <td className="specs-elem">{elem.main.humidity}</td>
      </tr>
    );
  });

  return (
    <table className="details-container">
      <thead className="titles">
        <tr>
          <th className="titles-elem">Time</th>
          <th className="titles-elem">Weather</th>
          <th className="titles-elem">T (°C)</th>
          <th className="titles-elem">Wind (km/h)</th>
          <th className="titles-elem">Precipitation (mm)</th>
          <th className="titles-elem">Precipitation (%)</th>
          <th className="titles-elem">Feels like(°C)</th>
          <th className="titles-elem">Humidity (%)</th>
        </tr>
      </thead>
      <tbody>{details}</tbody>
    </table>
  );
}

export default ForecastDetails;
