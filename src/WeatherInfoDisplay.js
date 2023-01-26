import React from 'react';


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
    return(
        <div>
            <h1>Weather Info</h1>
            <h2 toolTip="Change the Format to Celsius or Fahrenheit" onClick={() => setMetricFormat(prevFormatCelsius => !prevFormatCelsius)}>{metricFormat ? "F" : "C"}</h2>
            <p>Temp: {inCorrectFormatTemp(props.weatherData.main.temp)} Real Feel: {inCorrectFormatTemp(props.weatherData.main.feels_like)}</p>
            <p>↓ {inCorrectFormatTemp(props.weatherData.main.temp_min)}  -  ↑ {inCorrectFormatTemp(props.weatherData.main.temp_max)}</p>
            <p>Wind: {inCorrectFormatSpeed(props.weatherData.wind.speed)} | pressure: {props.weatherData.main.pressure} | humidity: {props.weatherData.main.humidity}%</p>
            {props.weatherData.weather[0].icon ? <img src = {props.weatherData.weather[0].icon}/> : ""}
      </div>
    )
}