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
        <div className='transparentblack'>
            <h1 className='infostyle--big'>Weather Info</h1>
            <button className='wheaterbutton' toolTip="Change the Format to Celsius or Fahrenheit" onClick={() => setMetricFormat(prevFormatCelsius => !prevFormatCelsius)}>{metricFormat ? "Imperial" : "Metric"}</button>
            <p className='infostyle--normal'>Temp: {inCorrectFormatTemp(props.weatherData.main.temp)} Real Feel: {inCorrectFormatTemp(props.weatherData.main.feels_like)}</p>
            <p className='infostyle--normal'>↓ {inCorrectFormatTemp(props.weatherData.main.temp_min)}  -  ↑ {inCorrectFormatTemp(props.weatherData.main.temp_max)}</p>
            <p className='infostyle--normal'>Wind: {inCorrectFormatSpeed(props.weatherData.wind.speed)} | pressure: {props.weatherData.main.pressure} | humidity: {props.weatherData.main.humidity}%</p>
            <p className='infostyle--normal'>{props.weatherData.weather[0].main}</p>
            <WeatherImage weatherDescription={props.weatherData.weather[0].main}/>
      </div>
    )
}