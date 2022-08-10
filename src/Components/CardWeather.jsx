import axios from "axios";
import React, { useEffect, useState} from "react";
import LoadingScreen from "./LoadingScreen";

const CardWeather = ({lat, lon}) => {
  
const [weather, setWeather] = useState()
const [temperature, setTemperature] = useState()
const [isCelsius, setIsCelsius] = useState(true)
const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (lat) {
      const APIKey = "6f66147883b636dce91720962b9574ab"
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`

      axios.get(URL)
        .then(res =>{
          setWeather(res.data)
          const temp = {
            celsius: `${Math.round(res.data.main.temp -273.15)} °C`,
            farenheit: `${Math.round((res.data.main.temp -273.15) * 9/5 + 32)} °F`,
          }
          setTemperature(temp)
          setIsLoading(false)
        }) 
        .catch(err => console.log(err))
    }
  }, [lat, lon])

  console.log(weather)

  const handleClick = () => setIsCelsius(!isCelsius)

  if(isLoading){
    return <LoadingScreen />
  }else{

    return(
        <article className='container'>
          <div className='card'>
            <div className='container_title'>
              <h1>Weather App</h1>          
            </div>          
            <div className='container_location'>
              <h2>{` ${weather?.name}, ${weather?.sys.country}`}</h2>              
            </div>
            <div  className='container_weather'>
              <div className='container_weather_image'>
                <h3>&#34;{weather?.weather[0].description}&#34;</h3> 
                <img src={weather && `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="" />
              </div>
              <div className='container_weather_data'>                
                <ul>
                  <li><b className="text_color">Wind Speed: </b>{weather?.wind.speed} m/s</li>
                  <li><b className="text_color">Humidity: </b>{weather?.main.humidity}%</li>
                  <li><b className="text_color">Clouds: </b>{weather?.clouds.all}%</li>
                  {/* <li><b className="text_color">Altitude: </b>{weather?.main.sea_level} msnm</li> */}
                  <li><b className="text_color">Presure: </b>{weather?.main.pressure} PSI</li>
                </ul>
              </div>
            </div>
            <div className='container_temperature'>
              <h2>{isCelsius ? temperature?.celsius : temperature?.farenheit}</h2>
              <button className='btn' onClick={handleClick}>{isCelsius ? 'Temp to °F' : 'Temp to °C'}</button>
            </div>  
            <footer>©️ All rights reserved 2022</footer>             
          </div>  
        </article>
    )
  }
};

export default CardWeather;