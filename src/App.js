import React from 'react';
import './App.scss';
import Navbar from './components/Navbar';
import WeatherInfoDisplay from './components/WeatherInfoDisplay.js';
import Select from './components/Select.js';



function App() {
  const APIKEY = "&APPID=8a6ffc5fc9687f07fcfaba425c3bdc66"
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [activeForecastIndex, setActiveForecastIndex] = React.useState();
  const [isForecastSucceeded, setIsForecastSucceeded] = React.useState(false);
  const [forecastData, setForecastData] = React.useState();
  const [isForecastActive, setIsForecastActive] = React.useState(false);
  const [cityName, setCityName] = React.useState("");
  const [weatherData, setWeatherData] = React.useState();
  const [lastUpdated, setLastUpdated] = React.useState();
  const [metricFormat, setMetricFormat] = React.useState(true);

  function changeCity(event) {
    setCityName(event.target.value);
  }
  
  function UpdateLastUpdated(){
    setLastUpdated(getTimeFromTimestampHoursMinutes(Date.now()))
  }

  function getTimeFromTimestampHoursMinutes(timestamp){
    var date = new Date(timestamp * 1000);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    if(metricFormat){
      return hours + ":" + minutes;
    }
    else{
      if(hours > 12){
        hours = hours - 12;
        return hours + ":" + minutes + " PM";
      }
      else{
        return hours + ":" + minutes + " AM";
      }
    }
  }
  function getWeatherFromCity(){
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + APIKEY)
    .then(res => res.json())
    .then(data => setWeatherData(data));
    setIsSubmitted(false);
    switch (weatherData.cod) {
      case 200:
        setIsSubmitted(true);        
        break;
        case 400:
          alert("Please Check your Data");
          break;
        case 404:
          alert("City not found");
          break;
          case 500:
            alert("Something went wrong");
            break;
      default:
        alert("Something went wrong: " + weatherData.cod + " " + weatherData.message);
        break;
    }
    setIsForecastActive(false);
    setIsForecastSucceeded(false);
    UpdateLastUpdated();
  }

  function getForecast(){
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + APIKEY)
    .then(res => res.json())
    .then(data => setForecastData(data));
    switch (forecastData.cod) {
      case "200":
        setIsForecastSucceeded(true);        
        break;
        case 400:
          alert("Please Check your Data");
          break;
        case 404:
          alert("City not found");
          break;
          case 500:
            alert("Something went wrong");
            break;
      default:
        alert("Something went wrong: " + forecastData.cod + " " + forecastData.message);
        break;
    }
    UpdateLastUpdated();
  }

  return (
    <div className="TestStyle">
      <Navbar />
      {isSubmitted ? <p>Last Update: {lastUpdated}</p> : ""}
      <p className='infostyle--normal'>{isSubmitted ? "" :  "Tippe deine Stadt ein"}</p>
      <input className='input' id="tbcityname" type="textbox" onChange={changeCity} value={cityName} placeholder="Enter your city here..."></input>
      <button className='wheaterbutton' onClick={getWeatherFromCity}>Search</button>
      {isSubmitted ?     
      <div>
      <div>
        <a href={"https://www.google.ch/maps/place/" + cityName}>
          <button className='infobutton'>Results for {weatherData.name} {weatherData.sys.country} | {weatherData.coord.lat} : {weatherData.coord.lon}</button>
        </a>
      </div>

      <WeatherInfoDisplay weatherData={weatherData} />
      <h1 className='infostyle--big'>Sun times</h1>
      <p className='infostyle--normal' onClick={() => setMetricFormat(prevMetricFormat => !prevMetricFormat)}>☀ ↑ {getTimeFromTimestampHoursMinutes(weatherData.sys.sunrise)}</p>
      <p className='infostyle--normal' onClick={() => setMetricFormat(prevMetricFormat => !prevMetricFormat)}>☀ ↓ {getTimeFromTimestampHoursMinutes(weatherData.sys.sunset)}</p>
      </div>
      : ""}
      {isSubmitted ? <button className='wheaterbutton' onClick={getForecast}>{isForecastSucceeded ? "Reload Forecast" : "Get Forecast"}</button> : ""}
      <div>
      {isForecastSucceeded ? 
      <div>
        <Select forecastData={forecastData}/>
    <button className='wheaterbutton' onClick={() => {
      if(!isForecastActive){
        setIsForecastActive(true)
        setActiveForecastIndex(document.getElementById("forecast").value);
      }
      else{
        setActiveForecastIndex(document.getElementById("forecast").value);
      }}}>
      {isForecastActive ?  "choose" : "show"}
      </button></div>: ""}
    </div>
    {isForecastSucceeded && isForecastActive ? <WeatherInfoDisplay weatherData={forecastData.list[activeForecastIndex-1]}/> : ""}
    </div>
  );
}
export default App;