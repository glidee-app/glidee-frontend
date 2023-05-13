import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { BE_BASE_URL } from "../constants";
import auth from "../services/auth";

const BookRide = () => {
  const { register, handleSubmit } = useForm();
  const [orderErrors, setOrderErrors] = useState([])
  const [orderSuccess, setOrderSuccess] = useState(false)

  const onSubmit = async (data) => {
    data['user_id'] = 1;
    setOrderErrors([]);
    setOrderSuccess(false);
    axios
      .post(`${BE_BASE_URL}/create_order_with_vehicle`, data, {
        headers: auth.getAuthHeader()
      })
      .then(() => {
        setOrderSuccess(true)
        return window.location.replace("/order-history")
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
        <form onSubmit={handleSubmit(onSubmit)} className="px-5 max-w-5xl text-left md:text-center py-8">
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
              <option value="Luxury">Luxury</option>
            </select>
          </div>
          <div className="text-left my-3">
            <label htmlFor="" className="font-medium">Departure date & time</label>
            <input type="datetime-local" {...register("pickup_datetime", { required: true })} className="border border-gray-300 bg-white p-3 rounded-r-full rounded-l-full w-full my-1.5" />
          </div>
          <button type="submit" className="bg-primary w-full text-neutral-50 p-3 rounded-r-full rounded-l-full mt-7">Book Ride</button>
        </form>
      </main>
    </>
  )
}

export default BookRide;