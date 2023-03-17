import { useRef, useState } from "react";
import "./App.css";
import Search from "./components/search/search";
import Forecast from "./components/forecast/forecast";
import CurrentWeather from "./components/current-weather/current-weather";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";
import backgroundImg from "./images/mount-l.jpg";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const containerRef = useRef(null);

  function handleOnSearchChange(searchData) {
    const [lat, lon] = searchData.value.split(" ");

    fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
      .then((response) => response.json())
      .then((json) => setCurrentWeather({ label: searchData.label, ...json }))
      .catch((err) => console.log(err));

    fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
      .then((response) => response.json())
      .then((json) => {
        setForecast({ label: searchData.label, ...json });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container" ref={containerRef}>
      <img src={backgroundImg} className="background-img" alt="Background" />

      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather {...currentWeather} />}
      {forecast && <Forecast data={forecast} />}

      <p className="attribute-img">
        Photo by <a href="https://unsplash.com/@lucamicheli?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Luca Micheli</a> on <a href="https://unsplash.com/photos/ruWkmt3nU58?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
      </p>
    </div>
  );
}

export default App;
