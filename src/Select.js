import React from 'react';


export default function Select(props){
    try {
        let index = 0;
        return(
            <select name="forecast" id="forecast">
            {
              props.forecastData.list.map(dailyweather => {
                // Just one entry a day should be showed
                index++;
                if(index % 8 == 0){
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

