/* eslint-disable indent */
import React, { useEffect, useState } from "react"
import fetcher from "../utils/fetcher"
import { useNavigate, useParams, Link } from "react-router-dom"
import { useLoginState } from "../state/slices/loginSlice"
import { DateTime } from "luxon"

const EventPage = () => {
  const { eventId } = useParams()
  const navigate = useNavigate()
  const [eventDetails, setEventDetails] = useState(null)

  // const clubAdmins = eventDetails?.club ? eventDetails?.club.admins : []
  const [clubAdmins, setClubAdmins] = useState([])
  const { user } = useLoginState()

  const isClubAdmin = clubAdmins.includes(user?.id) || user?.superAdmin
  const clubId = eventDetails?.club.id

  const eventType = DateTime.fromJSDate(
    new Date(eventDetails?.eventType)
  )

  const handleUpdate = () => {
    navigate(`/event/${eventId}/update`)
  }

  const handleDelete = async () => {
    const response = await fetcher(`api/event/${eventId}`, {
      method: "DELETE",
    })

    if (response.status === 200) {
      alert("Successfully deleted")
    }
    navigate(`/club/${clubId}`)
  }

  const getEventDetails = async () => {
    const response = await fetcher(`api/event/${eventId}`, {
      method: "GET",
    })

    if (response.status === 200) {
      const data = await response.json()
      setEventDetails(data)
    }

    const res = await fetcher(`api/club/${eventDetails.clubId}`, {
      method: "GET",
    })

    if (response.status === 200) {
      const data = await response.json()
      setClubAdmins(data.admins )
    }
  }

  useEffect(() => {
    getEventDetails()
  }, [])

  return (
    eventDetails && (
      <div className="min-h-screen flex w-full justify-center bg-gray-200">
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 m-auto rounded-3xl mt-5 w-3/4 max-w-5xl">
          <div className="font-medium text-4xl text-gray-800 pl-6">
            {eventDetails.name}
          </div>
          <div className=" rounded-xl p-2 flex mt-4 ">
            <div className=" rounded-xl px-4 flex-1 flex-col mt-4  ">
              <div className=" capitalize text-lg  text-gray-600">
                {eventDetails.description}
              </div>
              <div className="flex my-2">
                <span className="text-sm mr-2 font-medium text-gray-500">
                  Event Date
                </span>

                <span className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {eventDetails.eventDate
                    ? eventDetails.eventDate.split("T")[0]
                    : "Not declared"}
                </span>
              </div>
              <div className="flex">
                <div>
                  <div className="mt-4 capitalize self-center text-sm  text-gray-600">
                    <span>Registration Fee : </span>
                    <span>
                      {eventDetails.registrationFee != 0
                        ? eventDetails.registrationFee
                        : "Free"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className=" rounded-xl p-2 flex my-4">
              <img
                alt="event photo"
                src="/images/event.svg"
                className="max-h-48 w-full object-cover "
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-5 w-1/4 m-auto">
          <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl ">
            <div className="font-medium  text-xl sm:text-3xl text-gray-800">
              Team {eventDetails.club.name}
            </div>
            <div className="mt-4">
              <span className="text-sm font-medium text-gray-500">
                Event Type{"  "}
              </span>
              <span className="capitalize mt-1 text-sm text-gray-700 sm:mt-0 sm:col-span-2">
                {eventDetails.type}
              </span>
            </div>

            <div className="flex flex-col mt-2">
              <button
                className="uppercase my-2 rounded-lg py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-base mr-4 hover:bg-gray-900"
                onClick={() => navigate(`/club/${eventDetails.club.id}`)}
              >
                More Events
              </button>
            </div>
          </div>

          {isClubAdmin && (
            <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 mt-4 rounded-3xl ">
              <div className="text-2xl  text-gray-800">Admin Section</div>
              <div className="flex flex-col mt-2">
                <button
                  className=" uppercase my-2 rounded-lg py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-base mr-4 hover:bg-gray-900"
                  onClick={handleUpdate}
                >
                  Update Details
                </button>

                <button
                  className="uppercase my-2 rounded-lg py-2 px-4 bg-red-800 border-2 border-transparent text-white text-base mr-4 hover:bg-red-900"
                  onClick={handleDelete}
                >
                  Delete Event
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  )
}

export default EventPage
