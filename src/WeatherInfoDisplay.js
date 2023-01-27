import React from 'react';
import WeatherImage from './WeatherImage';


export default function WeatherInfoDisplay(props){
    const[metricFormat, setMetricFormat] = React.useState(true);
    
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
    return(
        <div>
            <h1>Weather Info</h1>
            <h2 toolTip="Change the Format to Celsius or Fahrenheit" onClick={() => setMetricFormat(prevFormatCelsius => !prevFormatCelsius)}>{metricFormat ? "F" : "C"}</h2>
            <p>Temp: {inCorrectFormatTemp(props.weatherData.main.temp)} Real Feel: {inCorrectFormatTemp(props.weatherData.main.feels_like)}</p>
            <p>↓ {inCorrectFormatTemp(props.weatherData.main.temp_min)}  -  ↑ {inCorrectFormatTemp(props.weatherData.main.temp_max)}</p>
            <p>Wind: {inCorrectFormatSpeed(props.weatherData.wind.speed)} | pressure: {props.weatherData.main.pressure} | humidity: {props.weatherData.main.humidity}%</p>
            <p>{props.weatherData.weather[0].main}</p>
            <WeatherImage weatherDescription={props.weatherData.weather[0].main}/>
      </div>
    )
}