import React, { useState, useEffect } from "react"
import fetcher from "../utils/fetcher"
import { useNavigate } from "react-router-dom"
import Dropdown from "../components/Dropdown"

const ViewActiveEvents = () => {
  const navigate = useNavigate()
  const [eventsDetails, setEventsDetails] = useState(null)
  const [filterData, setFilterData] = useState(null)

  useEffect(() => {  getEventData()},[])

  const [category, setCategory] = useState([]);
  const [location, setLocation] = useState([]);
  const [CategoryId, setCategoryId] = useState([]);
  const [LocationId, setLocationId] = useState([]);

  const createFilterInputs = [
    {
      name: "CategoryId",
      type: "select",
      label: "Event Category",
      data: category
    },
    {
      name: "LocationId",
      type: "select",
      label: "Event Location",
      data: location
    },
  ]

  async function getEventData() {
    let response = await fetcher("api/category/", {
      method: "GET",
    })
  
    if (response.status === 200) {
     const tempCategory = await response.json()
     setCategory([...tempCategory])
    }
  
    response = await fetcher("api/location/", {
      method: "GET",
    })
  
    if (response.status === 200) {
      const tempLocation = await response.json()
  setLocation([...tempLocation])
    }
  }

  const handleInputChange = (event) => {
    if(event?.target?.name === "LocationId") setLocationId(event?.target?.value)
    if(event?.target?.name === "CategoryId") setCategoryId(event?.target?.value)
  }
  const getEventsDetail = async () => {
    let response;
    console.log(filterData)
    if(filterData !== null) {
      response = await fetcher("api/event/filter", {
        method: "POST",
        body: JSON.stringify({ ...filterData }),
      })
    } else {
      response = await fetcher("api/event/", {
        method: "GET",
      })
    }


    if (response.status === 200) {
      const data = await response.json()
      setEventsDetails(data)
    }
  }
  const handleView = (eventId) => {
    navigate(`/event/${eventId}`)
  }

  const handleSubmit = () => {
    event.preventDefault()
    setFilterData({
      LocationId,
      CategoryId
    })
    getEventsDetail()
  }

  useEffect(() => {
    getEventsDetail()
  }, [])
  return (
    eventsDetails && (
      <div className="min-h-screen flex w-full justify-center bg-gray-200">
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 m-auto rounded-3xl mt-5 w-full max-w-6xl">
          {eventsDetails?.length > 0 || filterData !== null ? (
            <div className="flex items-end justify-between mb-12">
              <div>
                <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
                  Events!!
                </div>
                <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
                  Explore the events of various clubs !!
                </div>
              </div>

              <div className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
                <div className=" relative ">
                <Dropdown item={createFilterInputs[0]} onSelect={handleInputChange} />
                </div>
                <div className=" relative ">
                <Dropdown item={createFilterInputs[1]} onSelect={handleInputChange} />
                </div>
                <button
                  className="uppercase rounded-lg py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-base mr-4 hover:bg-gray-900"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Search
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-4 self-center text-xl sm:text-sm text-gray-800 ">
              There are no active events of any club yet!!
            </div>
          )}
          <div className="flex flex-wrap  w-full p-2 py-8 rounded-xl ">
            {eventsDetails &&
              eventsDetails.map((event, index) => (
                <div
                  key={index}
                  className="overflow-hidden shadow-md bg-gray-100 rounded-lg  w-56  m-2"
                >
                  <img
                    alt="event photo"
                    src="/images/events.svg"
                    className="max-h-40 w-full object-cover p-2"
                  />
                  <div className="  w-full p-4">
                    <p className="text-gray-800 text-lg font-medium">
                      {event.name}
                      {/* problem why how clubs */}
                    </p>
                    <p className="text-gray-600  text-xs font-medium mb-2">
                      {event.club.name}
                    </p>
                    <p className="capitalize text-gray-400  text-xs">
                      {event.description}
                    </p>
                    <div className="flex items-center mt-4">
                      <button
                        className="uppercase rounded-lg py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-base mr-4 hover:bg-gray-900"
                        onClick={() => handleView(event.id)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  )
}

export default ViewActiveEvents

{
  /* <div>
<h1>Below are all active events</h1>
{eventsDetails.map((event, index) => (
  <div className="flex " key={index}>
    <div>{event.name}</div>
    <button
      className=" m-2 py-2 px-1 border-2 rounded-lg uppercase bg-blue-200"
      onClick={() => handleView(event.id)}
    >
      View Details
    </button>
  </div>
))}
</div> */
}
