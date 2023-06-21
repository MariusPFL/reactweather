import React from 'react';

function GetHoursFromTimestamp(timestamp){
  var date = new Date(timestamp * 1000 - 1);
  return date.getHours();
}

export default function Select(props){
    try {
        let index = 0;
        return(
            <select className='input' name="forecast" id="forecast">
            {
              props.forecastData.list.map(dailyweather => {
                // console.log(dailyweather);
                // Just one entry a day should be showed
                index++;
                if(GetHoursFromTimestamp(dailyweather.dt) === 13){
                  return(
                    <option key={dailyweather.dt} value={index}>{dailyweather.dt_txt}</option>
                    )
                  }
                }
            )}
            </select>
        )
    } catch (error) {
        return (<p>Something went wrong {error}</p>)
    }
}

