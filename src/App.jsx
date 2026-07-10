import { useEffect, useState } from "react"
import AirportAutocomplete from "./components/AirportAutocomplete"
import "./App.css"
import Toautocomp from "./Toautocomp"
import { use } from "react"
import "./styles/searchbutton.css"
import "./styles/flightcard.css"

function App() {

  const [airportdata, setAirportData] = useState([])
  const [searchdata, SetSearchData] = useState("")
  const [formdata, setFormdata] = useState({ from: "", to: "", })
  const[flightdata , setFlightdata]=useState([])
  const[avilableflight , setAvilableflight]=useState([])
  const[openlist , setOpenlist]=useState(false)


  const fetchflightdata = async()=>{
      const response = await fetch("/data/flights.json")
      const data = await response.json()
      setFlightdata(data)
  }

  console.log(avilableflight)

  const onchangehandle = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value
    })
  }


  const handleselectairport = (name, value) => {
    setFormdata( {
      ...formdata,
      [name]: value
    })
  }

  console.log(formdata)

  const fetchdata = async () => {
    const response = await fetch("/data/airports.json")
    const data = await response.json()
    setAirportData(data)
  }

  const onsubmit = (e) => {
    e.preventDefault()
    formdata
    setOpenlist(true)
    const filterflight = flightdata.filter((flight)=>{
      return( flight.from === formdata.from && flight.to === formdata.to)
    })
      
    setAvilableflight(filterflight)
  }

 

  useEffect(() => {
    fetchdata()
    fetchflightdata()
  }, [])

  return (


    <>

<div className="app-container" >
      <form action="" onSubmit={onsubmit} className="form" >       
          <AirportAutocomplete
            name={"from"}
            lable={"from"}
            option={airportdata}
            value={formdata.from}
            onchange={(e, name) => onchangehandle(e, name)}
            onclick={handleselectairport}
          />
          <AirportAutocomplete
            lable={"to"}
            name={"to"}
            option={airportdata}
            value={formdata.to}
            onchange={(e, name) => onchangehandle(e, name)}
            onclick={handleselectairport}
          />
          <button type="submit" className="search-btn" >serach</button>
     
      </form>

      {openlist && (
         avilableflight.length > 0 ?(
               <div className="flight-result" >
                {avilableflight.map((flight)=>(
                  <div key={flight.id} className="flight-card" >
                     <h3>{flight.airline}</h3>
                    <p>{flight.from} → {flight.to}</p>
                   <p>Departure: {flight.departure}</p>
                  <p>Arrival: {flight.arrival}</p>
                   <p>Price: ₹{flight.price}</p>
                  </div>
                ))}
               </div>
           ):(<p>No flights available</p>) 
      ) }

     
</div>
      
         
         
      
           


    </>
  )
}

export default App
