import React, { useEffect, useState } from "react"
import { Forms } from "../components/Forms"
import fetcher from "../utils/fetcher"
import { useNavigate, useParams } from "react-router-dom"



const CreateEvent = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {  getEventData()},[])


  const [category, setCategory] = useState([]);
  const [location, setLocation] = useState([]);
  
  const createEventInputs = [
    { name: "name", type: "text", label: "Event name" },
    {
      name: "description",
      type: "text",
      label: "Description",
    },
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
    {
      name: "registrationFee",
      type: "number",
      label: "Registration Fee",
      defaultValue: 0,
    },
    {
      name: "eventDate",
      type: "date",
      label: "Event Date",
      defaultValue: new Date(),
    },
  ]

  async function registerEvent(formData) {

    const response = await fetcher("api/event/", {
      method: "POST",
      body: JSON.stringify({ ...formData, club: id }),
    })

    if (response.status === 200) {
      const data = await response.json()
      alert("Successfully registered Event")
      navigate(`/event/${data.id}`)
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 ">
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-1/2 max-w-md my-5">
        <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
          Register a Event
        </div>

        <div className="mt-10">
          <Forms inputs={createEventInputs} onSubmit={registerEvent}>
          </Forms>
        </div>
      </div>
    </div>
  )
}

export default CreateEvent

/**
 * Transform create event form data into the format apis accepts
 * @param {{}} formData The form data object that you get on onSubmit of form
 * @returns An object you can pass to the api
 */
const transformFomData = ({
  name,
  description,
  eventDate,
  CategoryId,
  LocationId,
  registrationFee,
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
