import { useState, useEffect } from "react"
import "../styles/AirportAutocomplete.css"



function useDebounce(value, delay) {
  const [debouncevalue, setDebounceValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncevalue
}




function AirportAutocomplete() {

  const [airportdata, setAirportData] = useState([])
  const [searchdata, SetSearchData] = useState("")
  const [activeindex, setActiveindex] = useState(-1)


  const fetchdata = async () => {

    const response = await fetch("/data/airports.json")
    const data = await response.json()
    setAirportData(data)
  }

  console.log(airportdata)



  useEffect(
    () => {
      fetchdata()
    }, []
  )

  const searchdebounce = useDebounce(searchdata, 300)

  const searchresult = airportdata.filter((airport) => {

    const searchterm = searchdebounce.trim().toLowerCase()
    return (
      airport.city.toLowerCase().includes(searchterm) ||
      airport.code.toLowerCase().includes(searchterm)
    )
  }).slice(0, 5)


  const handlekeydown = (e) => {
    if (searchresult.length === 0) return

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveindex((previndex) => previndex < searchresult.length - 1 ? previndex + 1 : 0)
    }

    if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveindex((previndex) => previndex > 0 ? previndex - 1 : searchresult.length - 1)
    }

    if (e.key === "Enter") {
      e.preventDefault()
      if (activeindex >= 0 && activeindex < searchresult.length) {

        const selectedsearchdata = searchresult[activeindex]
        SetSearchData(`${selectedsearchdata.city}-${selectedsearchdata.code}`)
        setActiveindex(-1)
      }
    }

  }
  return (
    <>

      <div className="autocomplete-container">
        <div>
          <label htmlFor="from-airport" >From</label>
          <input
            id="from-airport"
            type="text"
            className="autocomplete-input"
            value={searchdata}
            onChange={(e) => SetSearchData(e.target.value)}
            placeholder="Search By City or code"
            onKeyDown={handlekeydown}
          />
        </div>

        {searchdata.trim() !== "" && searchresult.length > 0 && (
          <div className="autocomplete-dropdown">
            {searchresult.map((airport, index) => (
              <div
                onClick={() => SetSearchData(`${airport.city}-${airport.code}`)}
                key={airport.code}
                className={`autocomplete-results ${activeindex === index ? "active" : ""}`}
              >
                <div className="airport-left">
                  <div className="airport-code">{airport.code}</div>
                  <div className="airport-city">{airport.city}</div>
                </div>
                <div className="airport-name">{airport.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>

    </>
  )
}

export default AirportAutocomplete