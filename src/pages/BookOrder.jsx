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
      .get(`${BE_BASE_URL}/rides`, {
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
      .post(`${BE_BASE_URL}/order`, {
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
      <main className='flex items-center justify-center py-28 flex-col bg-neutral-50 text-primary'>
        <h2 className="font-semibold text-lg text-center">Book a ride</h2>
        <form className="px-5 max-w-5xl text-left md:text-center py-8">
          {orderErrors.map((error, index) => (
            <span key={index} className="text-red-500 my-2">{error}</span>
          ))}
          {orderSuccess &&
            <span className="text-green-500 my-2">You ride has been booked! View <Link to="/order-history" className="underline">order history</Link></span>
          }
          <div className="text-left my-3">
            <label htmlFor="" className="font-medium">Where would you like to board?</label>
            <select {...register("pickup_location", { required: true })} className="border border-gray-300 bg-white p-3 rounded-r-full rounded-l-full w-full my-1.5">
              <option value="main gate">Main Gate</option>
              <option value="under g bus stop">Under G bus stop</option>
              <option value="adenike bus stop">Adenike bus stop</option>
              <option value="yoaco bus stop">Yoaco bus stop</option>
            </select>
          </div>
          <div className="text-left my-3">
            <label htmlFor="" className="font-medium">Where would you like to drop?</label>
            <select {...register("destination", { required: true })} className="border border-gray-300 bg-white p-3 rounded-r-full rounded-l-full w-full my-1.5">
              <option value="main gate">Main Gate</option>
              <option value="under g bus stop">Under G bus stop</option>
              <option value="adenike bus stop">Adenike bus stop</option>
              <option value="yoaco bus stop">Yoaco bus stop</option>
            </select>
          </div>
          <div className="text-left my-3">
            <label htmlFor="" className="font-medium">Select ride type</label>
            <select {...register("comfortability", { required: true })} className="border border-gray-300 bg-white p-3 rounded-r-full rounded-l-full w-full my-1.5">
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
            </select>
          </div>
          <div className="text-left my-3">
            <label htmlFor="" className="font-medium">Pickup date & time</label>
            <input type="date" {...register("pickup_date", { required: true })} className="border border-gray-300 bg-white p-3 rounded-r-full rounded-l-full w-full my-1.5" />
          </div>
          <div>
            {
              availableRides.length
                ? <>
                  {availableRides.map((ride, index) => (
                    <div key={index}>
                      <input {...register("ride_id", { required: true })} type="radio" value={ride.id} id={'ride-' + ride?.id} />
                      <label htmlFor={'ride-' + ride.id} className="block bg-white rounded-xl shadow-lg p-3">
                        <div className="flex justify-between items-center">
                          <h2>{ride?.vehicle?.make + ' ' + ride?.vehicle?.model}</h2>
                          <p>₦{ride?.amount}</p>
                        </div>
                        <div className="flex justify-between items-center py-2 text-sm text-gray-500">
                          <span>License Number: {ride?.vehicle?.license_plate}</span>
                          <span>Driver: {ride?.driver?.name}</span>
                        </div>
                        <p className="text-left text-sm">Pickup time: {ride?.pickup_time}</p>
                      </label>
                    </div>
                  ))}
                  <button onClick={handleSubmit(createOrder)} className="bg-primary w-full text-neutral-50 p-3 rounded-r-full rounded-l-full mt-7">Book Ride</button>
                </>
                :
                <button onClick={handleSubmit(fetchRides)} className="bg-primary w-full text-neutral-50 p-3 rounded-r-full rounded-l-full mt-7">Show available rides</button>
            }
          </div>
        </form>
      </main>
    </>
  )
}

export default BookOrder;