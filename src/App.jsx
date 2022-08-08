import { useEffect, useState } from 'react'
import './App.css'
import CardWeather from './Components/CardWeather'

function App() {

  const [coords, setCoords] = useState()  

  useEffect(() => {

    const success = pos => {
      const latlong ={
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoords(latlong)
    }

    navigator.geolocation.getCurrentPosition(success)
  }, [])
 
  return (
    <div className="App">
      <CardWeather lon={coords?.lon} lat={coords?.lat}/>
    </div>
  )
}

export default App
