import React from 'react';
import CloudyImg from './images/cloudy.png';
import FoggyImg from './images/foggy.png';
import NotFoundImg from './images/notfound.png';
import RainImg from './images/rain.png';
import Snowflake from './images/snowflake.png';
import SunImg from './images/sun.png';



export default function WeatherImage(props) {
    switch(props.weatherDescription) {
        case 'Clouds':
            return (
                <img src={CloudyImg} />
            )
            break;
        case 'Foggy':
            return (
                <img src={FoggyImg} />
            )
            break;
        case 'Rain':
            return (
                <img src={RainImg} />
            )
            break;
        case 'Snow':
            return (
                <img src={Snowflake} />
            )
            break;
        case 'Clear':
            return (
                <img src={SunImg} />
            )
            break;
        case 'Drizzle':
            return (
                <img src={RainImg} />
            )
        break;
        case 'Mist':
            return(
                <img src={FoggyImg} />
            )
        break;
        case 'Fog':
            return(
                <img src={FoggyImg} />
            )
        break;
        case 'Haze':
            return(
                <img src={FoggyImg} />
            )
        break;
        default:
            return (
                <img src={NotFoundImg} />
            )
            break;
    }
}