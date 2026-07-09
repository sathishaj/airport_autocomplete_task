import { useEffect, useState } from "react"


function Toautocomp(){



    const[airportdata , setAirportdata]= useState([])
    const[searchdata , setSearchdata]= useState("")

    const fetchdata = async ()=>{
       
        const response = await fetch("/public/data/airports.json")
        const data = await response.json()

        setAirportdata(data)
    }

    const searchresult = airportdata.filter((airportdata)=>{
         return(
              airportdata.code.toLowerCase().includes(searchdata.toLowerCase()) || 
               airportdata.city.toLowerCase().includes(searchdata.toLowerCase())
         )
    })

    useEffect(()=>{
         fetchdata()
    },[])

    console.log(airportdata)
    return(
        <>
           <label htmlFor="searchinput">to</label>
           <input type="text"value={searchdata} onChange={(e)=>setSearchdata(e.target.value)} />
             
             
            <div>
                {searchresult.slice(0 ,5).map((airport)=>(
                        <div key={airport.code}>
                           <div>{airport.code}</div>
                            <div>{airport.city}</div>
                             <div>{airport.country}</div>
                        </div>
                ))}
            </div>

       
        </>
    )
}

export default Toautocomp