import React, { useEffect, useState } from "react"
import { Forms } from "../components/Forms"
import fetcher from "../utils/fetcher"
import { useNavigate, useParams } from "react-router-dom"

const UpdateEvent = () => {
  const navigate = useNavigate()
  const { eventId } = useParams()
  const [eventDetails, setEventDetails] = useState(null)
  const clubId = eventDetails?.club.id

  
  useEffect(() => {  getEventData()},[])


  const [category, setCategory] = useState([]);
  const [location, setLocation] = useState([]);
  

  const updateEventInputs = [
    {
      name: "name",
      type: "text",
      label: "Event name",
      defaultValue: eventDetails?.name,
    },
    {
      name: "description",
      type: "text",
      label: "Description",
      defaultValue: eventDetails?.description,
    },
    {
      name: "CategoryId",
      type: "select",
      label: "Event Category",
      defaultValue: eventDetails?.CategoryId,
      data: category
    },
    {
      name: "LocationId",
      type: "select",
      label: "Event Location",
      defaultValue: eventDetails?.LocationId,
      data: location
    },
    {
      name: "registrationFee",
      type: "text",
      label: "Free",
      defaultValue: eventDetails?.registrationFee,
    },
    {
      name: "eventDate",
      type: "date",
      label: "Event Date",
      defaultValue: eventDetails?.eventDate,
    },
  ]

  async function updateEvent(formData) {

    const response = await fetcher(`api/event/${eventId}`, {
      method: "POST",
      body: JSON.stringify({ ...formData, club: clubId }),
    })

    if (response.status === 200) {
      alert("Successfully updated Event")
      navigate(-1)
    }
  }

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

  const getEventDetails = async () => {
    const response = await fetcher(`api/event/${eventId}`, {
      method: "GET",
    })

    if (response.status === 200) {
      const data = await response.json()
      setEventDetails(data)
    }
  }

  useEffect(() => {
    getEventDetails()
  }, [])

  return (
    eventDetails && (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 ">
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-1/2 max-w-md my-5">
          <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
            Update {eventDetails.name}
          </div>

          <div className="mt-10">
            <Forms inputs={updateEventInputs} onSubmit={updateEvent}>
            </Forms>
          </div>
        </div>
      </div>
    )
  )
}

export default UpdateEvent
const transformFomData = ({
  name,
  description,
  eventDate,
  CategoryId,
  registrationFee,
  LocationId,
}) => {
  return {
    name,
    description,
    CategoryId,
      registrationFee,
      LocationId,
   eventDate,
  }
}
