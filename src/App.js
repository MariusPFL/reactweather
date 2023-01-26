import logo from './logo.svg';
import React from 'react';
// import axios from 'axios';
import './App.css';
import WeatherInfoDisplay from './WeatherInfoDisplay.js';



function App() {
  const APIKEY = "&APPID=8a6ffc5fc9687f07fcfaba425c3bdc66"
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [activeForecastIndex, setActiveForecastIndex] = React.useState();
  const [isForecastSucceeded, setIsForecastSucceeded] = React.useState(false);
  const [forecastData, setForecastData] = React.useState();
  const [isForecastActive, setIsForecastActive] = React.useState(false);
  const [cityName, setCityName] = React.useState("");
  const [weatherData, setWeatherData] = React.useState();
  const[metricFormat, setMetricFormat] = React.useState(true);
  function changeCity(event) {
    setCityName(event.target.value);
  }

  function inCorrectFormatTemp(temp){
    if(metricFormat){
      return Math.round(temp - 273.15) + "°C";
    } else{
      return Math.round(1.8*(temp - 273) + 32) + "°F";
    }
  }
  function inCorrectFormatSpeed(speed){
    if(metricFormat){
      return speed + " km/h";
    }
    else{
      return Math.round(speed * 0.621371192) + " mp/h";
    }
  }
  function getTimeFromTimestamp(timestamp){
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
    // axios.get("https://api.openweathermap.org/data/2.5/weather?" + cityName + "&APPID=8a6ffc5fc9687f07fcfaba425c3bdc66").then((response) => {
    //   setWeatherData(JSON.stringify(response.data);
    // })
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
    index = 0;
    setIsForecastActive(false);
    setIsForecastSucceeded(false);
  }

  // Obsolete
  // function findWeatherByDate(date, dataList) {
  //   dataList.map(item => {
  //     if(item.dt === date){
  //       return item;
  //     }
  //     else{
  //       return "nothing found";
  //     }
  //   })
  // }

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
  }

  let index = 0;
  return (
    <div className="App">
      <h1>Willkommen bei der Wetter App</h1>
      {/* {isSubmitted ? <p>{() => {var currentDate = new Date();alert(currentDate.getHours());return currentDate.getHours() + ":" + currentDate.getMinutes() + ":";}}</p> : ""} */}
      <h4>{isSubmitted ? "" :  "Tippe deine Stadt ein"}</h4>
      <input id="tbcityname" type="textbox" onChange={changeCity} value={cityName} placeholder="Enter your city here..."></input>
      <button onClick={getWeatherFromCity}>Search</button>
      {isSubmitted ?     
      <div>
      <div>
        <a href={"https://www.google.ch/maps/place/" + cityName}>
          <button className='information'>Results for {weatherData.name} {weatherData.sys.country} | {weatherData.coord.lat} : {weatherData.coord.lon}</button>
        </a>
      </div> 
      <p></p>
      <h2 toolTip="Change the Format to Celsius or Fahrenheit" onClick={() => setMetricFormat(prevFormatCelsius => !prevFormatCelsius)}>Click to Change {metricFormat ? "F" : "C"}</h2>
      <p>Temp: {inCorrectFormatTemp(weatherData.main.temp)} Real Feel: {inCorrectFormatTemp(weatherData.main.feels_like)}</p>
      <p>↓ {inCorrectFormatTemp(weatherData.main.temp_min)}  -  ↑ {inCorrectFormatTemp(weatherData.main.temp_max)}</p>
      <p>Wind: {inCorrectFormatSpeed(weatherData.wind.speed)} | pressure: {weatherData.main.pressure} | humidity: {weatherData.main.humidity}%</p>
      {weatherData.weather[0].icon ? <img src = {weatherData.weather[0].icon}/> : ""}
      <p>☀ ↑ {getTimeFromTimestamp(weatherData.sys.sunrise)}</p>
      <p>☀ ↓ {getTimeFromTimestamp(weatherData.sys.sunset)}</p>
      </div>
      : ""}
      <h2 onClick={getForecast}>Forecast</h2>
      <div>
      {isForecastSucceeded ? 
      <div>
      <select name="forecast" id="forecast">
        {
          
          forecastData.list.map(dailyweather => {
            index++;
            // Just one entry a day should be showed
            if(index % 8 == 0){
              return(
                <option key={dailyweather.dt} value={index}>{dailyweather.dt_txt}</option>
                )
            }
            }
        )}
    </select>
    <button onClick={() => {
      if(!isForecastActive){
        setIsForecastActive(true)
        setActiveForecastIndex(document.getElementById("forecast").value - 1);
      }
      else{
        setActiveForecastIndex(document.getElementById("forecast").value - 1);
      }
      }
    }
      >
      {isForecastActive ?  "reload" : "show"}
      </button>
      </div>
      : ""}
    </div>
    {isForecastSucceeded && isForecastActive ? <WeatherInfoDisplay weatherData={forecastData.list[activeForecastIndex]}
      /> : ""}
    </div>
  );
}

export default App;
