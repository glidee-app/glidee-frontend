import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { BE_BASE_URL } from "../constants";
import auth from "../services/auth";

const BookOrder = () => {
  const { register, handleSubmit, reset } = useForm();
  const [orderErrors, setOrderErrors] = useState([])
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [availableRides, setAvailableRides] = useState([])

  const fetchRides = async (data) => {
    setOrderErrors([])
    setOrderSuccess("")
    axios
      .get(`${BE_BASE_URL}/fetch_rides`, {
        params: {
          comfortability: data.comfortability,
          pickup_date: data.pickup_date,
          pickup_location: data.pickup_location,
          destination: data.destination,
        },
        headers: auth.getAuthHeader()
      })
      .then(res => {
        const rides = res.data?.data?.rides || []
        if (rides.length) {
          setAvailableRides(rides)
        } else {
          setOrderErrors(['No ride available at the moment.'])
        }
      })
      .catch(err => {
        setOrderErrors(err.response.data.errors || [err.response.data.message])
      });
  }

  const createOrder = async (data) => {
    setOrderErrors([])
    setOrderSuccess("")
    axios
      .post(`${BE_BASE_URL}/create_order`, {
        ride_id: data.ride_id,
      }, { headers: auth.getAuthHeader() })
      .then(res => {
        setOrderSuccess(res.data?.message);
        reset()
        setAvailableRides([])
      })
      .catch(err => {
        setOrderErrors(err.response.data.errors || [err.response.data.message])
      });
  }

  return (
    <>
      <Header />
      <main className='flex items-center justify-center py-28 flex-col bg-primary text-white'>
        <h2 className="lg:text-3xl text-2xl font-semibold">Let&apos;s Book Your Ride</h2>
        <form className="px-5 w-full max-w-4xl text-left md:text-center py-8">
          {orderErrors.map((error, index) => (
            <span key={index} className="text-red-500 my-2">{error}</span>
          ))}
          {orderSuccess &&
            <span className="text-green-500 my-2">You ride has been booked! View <Link to="/order-history" className="underline">order history</Link></span>
          }
          <div className="text-left my-3">
            <select {...register("pickup_location", { required: true })} className="border border-gray-300 bg-white p-3 rounded-r-full rounded-l-full w-full my-1.5 text-gray-600">
              <option value="">Pickup location</option>
              {
                ["Harmony", "Cele", "Camp", "Accord", "Gate", "Cele", "Oluwo", "Funis", "Gate", "Accord", "Isolu", "Cele", "Funis"].map((place, index) => (
                  <option key={index} value={place}>{place}</option>
                ))
              }
            </select>
          </div>
          <div className="text-left my-3">
            <select {...register("destination", { required: true })} className="border border-gray-300 bg-white p-3 rounded-r-full rounded-l-full w-full my-1.5 text-gray-600">
              <option value="">Drop-off location</option>
              {
                ["Harmony", "Cele", "Camp", "Accord", "Gate", "Cele", "Oluwo", "Funis", "Gate", "Accord", "Isolu", "Cele", "Funis"].map((place, index) => (
                  <option key={index} value={place}>{place}</option>
                ))
              }
            </select>
          </div>
          <div className="text-left my-3">
            <select {...register("comfortability", { required: true })} className="border border-gray-300 bg-white p-3 rounded-r-full rounded-l-full w-full my-1.5 text-gray-600">
              <option value="">Select ride type</option>
              <option value="Shared">Shared</option>
              <option value="Standard">Standard</option>
            </select>
          </div>
          <div className="text-left my-3 text-gray-600">
            <input type="date" placeholder="Pickup date" {...register("pickup_date", { required: true })} className="border border-gray-300 bg-white p-3 rounded-r-full rounded-l-full w-full my-1.5" />
          </div>
          <div>
            {
              availableRides.length
                ? <>
                  {availableRides.map((ride, index) => (
                    <div key={index}>
                      <input {...register("ride_id", { required: true })} type="radio" value={ride.id} id={'ride-' + ride?.id} className="peer" />
                      <label htmlFor={'ride-' + ride.id} className="block bg-white text-gray-600 peer-checked:bg-blue-500 peer-checked:text-white  rounded-2xl shadow-lg p-3 ">
                        <div className="flex justify-between items-center">
                          <h2 className="font-medium">{ride?.vehicle?.make + ' ' + ride?.vehicle?.model}</h2>
                          <p className="font-medium">₦{ride?.amount}</p>
                        </div>
                        <div className="flex justify-between items-center py-2 text-sm">
                          <p> <span className="font-medium">License No:</span>  {ride?.vehicle?.license_plate}</p>
                          <p><span className="font-medium">Driver:</span> {ride?.driver?.name}</p>
                        </div>
                        <div className="flex justify-between items-center py-2 text-sm">
                          <p className="text-left text-sm"> <span className="font-medium">Time:</span>  {ride?.pickup_time}</p>
                          <p><span className="font-medium">Contact No:</span> {ride?.driver?.phone_number}</p>
                        </div>
                      </label>
                    </div>
                  ))}
                  <button onClick={handleSubmit(createOrder)} className="bg-secondary w-full text-neutral-50 p-3 rounded-r-full rounded-l-full mt-7">Book Ride</button>
                </>
                :
                <button onClick={handleSubmit(fetchRides)} className="bg-secondary w-full text-neutral-50 p-3 rounded-r-full rounded-l-full mt-7">Show available rides</button>
            }
          </div>
        </form>
      </main>
    </>
  )
}

export default BookOrder;