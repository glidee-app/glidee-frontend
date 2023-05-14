import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { BE_BASE_URL } from "../constants";
import auth from "../services/auth";

const BookRide = () => {
  const { register, handleSubmit, reset } = useForm();
  const [orderErrors, setOrderErrors] = useState([])
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [availableVehicles, setAvailableVehicles] = useState([])

  const fetchVehicles = async (data) => {
    setOrderErrors([])
    setOrderSuccess("")
    axios
      .get(`${BE_BASE_URL}/vehicles`, {
        params: {
          comfortability: data.comfortability,
          pickup_datetime: data.pickup_datetime,
        },
        headers: auth.getAuthHeader()
      })
      .then(res => {
        const vehicles = res.data?.data?.vehicles || []
        if (vehicles.length) {
          setAvailableVehicles(vehicles)
        } else {
          setOrderErrors(['No vehicle available at the moment.'])
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
        pickup_location: data.pickup_location,
        vehicle_id: data.vehicle_id,
        pickup_datetime: data.pickup_datetime,
        destination: data.destination,
      }, { headers: auth.getAuthHeader() })
      .then(res => {
        setOrderSuccess(res.data?.message);
        reset()
        setAvailableVehicles([])
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
            <span className="text-green-500 my-2">You ride has been booked! View <Link to="/order-hostory" className="underline">order history</Link></span>
          }
          <div className="text-left my-3">
            <label htmlFor="" className="font-medium">Where would you like to board?</label>
            <select {...register("pickup_location", { required: true })} className="border border-gray-300 bg-white p-3 rounded-r-full rounded-l-full w-full my-1.5">
              <option value="Main Gate">Main Gate</option>
              <option value="Under G">Under G bus stop</option>
              <option value="Adenike">Adenike bus stop</option>
              <option value="Yoaco">Yoaco bus stop</option>
            </select>
          </div>
          <div className="text-left my-3">
            <label htmlFor="" className="font-medium">Where would you like to drop?</label>
            <select {...register("destination", { required: true })} className="border border-gray-300 bg-white p-3 rounded-r-full rounded-l-full w-full my-1.5">
              <option value="Main Gate">Main Gate</option>
              <option value="Under G">Under G bus stop</option>
              <option value="Adenike">Adenike bus stop</option>
              <option value="Yoaco">Yoaco bus stop</option>
            </select>
          </div>
          <div className="text-left my-3">
            <label htmlFor="" className="font-medium">Select ride type</label>
            <select {...register("comfortability", { required: true })} className="border border-gray-300 bg-white p-3 rounded-r-full rounded-l-full w-full my-1.5">
              <option value="Shared">Shared</option>
              <option value="Standard">Standard</option>
            </select>
          </div>
          <div className="text-left my-3">
            <label htmlFor="" className="font-medium">Pickup date & time</label>
            <input type="datetime-local" {...register("pickup_datetime", { required: true })} className="border border-gray-300 bg-white p-3 rounded-r-full rounded-l-full w-full my-1.5" />
          </div>
          <div>
            {
              availableVehicles.length
                ? <>
                  {availableVehicles.map((vehicle, index) => (
                    <div key={index}>
                      <input {...register("vehicle_id", { required: true })} type="radio" value={vehicle.id} id={'vehicle-' + vehicle?.id} />
                      <label htmlFor={'vehicle-' + vehicle.id} className="block bg-white rounded-xl shadow-lg p-3">
                        {/* <div>
                          <span>Pickup</span>
                          <p>Mancot Park, FUNAAB</p>
                        </div>
                        <div>
                          <span>Destination</span>
                          <p>College of engineering, FUNAAB</p>
                        </div> */}
                        <div className="flex justify-between items-center">
                          <h2>{vehicle?.make + ' ' + vehicle?.model}</h2>
                          <p>₦{vehicle?.amount}</p>
                        </div>
                        <div className="flex justify-between items-center py-2 text-sm text-gray-500">
                          <span>License Number: LND 506 CC</span>
                          <span>Driver: {vehicle?.driver?.name}</span>
                        </div>
                      </label>
                    </div>
                  ))}
                  <button onClick={handleSubmit(createOrder)} className="bg-primary w-full text-neutral-50 p-3 rounded-r-full rounded-l-full mt-7">Book Ride</button>
                </>
                :
                <button onClick={handleSubmit(fetchVehicles)} className="bg-primary w-full text-neutral-50 p-3 rounded-r-full rounded-l-full mt-7">Show available rides</button>
            }
          </div>
        </form>
      </main>
    </>
  )
}

export default BookRide;