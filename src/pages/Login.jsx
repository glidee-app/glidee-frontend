import Header from "../components/Header"
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { BE_BASE_URL } from "../constants";
import { Link, NavLink } from "react-router-dom";

const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginErrors, setLoginErrors] = useState([])
  const onSubmit = async (data) => {
    setLoginErrors([])
    axios
      .post(`${BE_BASE_URL}/login`, data)
      .then(response => {
        if (response.data?.data) {
          localStorage.setItem("user", JSON.stringify(response.data.data));
          alert("Login succesful! Redirecting to dashboard.")
          return window.location.replace("/dashboard")
        } else {
          setLoginErrors(["Login failed. Please try again."])
        }
      })
      .catch(err => {
        setLoginErrors(err.response.data.errors || [err.response.data.message])
      });
  }

  return (
    <>
      <Header />
      <main className="bg-primary text-white py-20 flex flex-col items-center justify-center min-h-screen">
        <div className="my-7 px-5 max-w-4xl text-center -mt-40">
          <h2 className="lg:text-3xl text-2xl font-semibold">Sign in to Glidee</h2>
          <p className="mt-3">Don&apos;t have an account? <Link to="/signup" className="text-blue-500 font-medium">Create an account</Link></p>
          <form onSubmit={handleSubmit(onSubmit)} className="my-7 text-gray-600">
            {loginErrors.map((error, index) => (
              <span key={index} className="text-red-500 my-2">{error}</span>
            ))}
            <input {...register("email", { required: true })} type="text" placeholder="Enter your email address" className="border border-gray-300 p-3 rounded-r-full rounded-l-full w-full my-1.5" />
            {errors.email && <span> {errors.email?.message}</span>}
            <input {...register("password", { required: true })} type="password" placeholder="Enter your password" className="border border-gray-300 p-3 rounded-r-full rounded-l-full w-full my-1.5" />
            {errors.password && <span> {errors.password?.message}</span>}
            <span className="block mt-2 text-white">
              Forgot Password?
              <NavLink to="/reset-password" className='text-blue-500'> Reset</NavLink>
            </span>
            <button type="submit" className="bg-secondary w-full text-neutral-50 p-3 rounded-r-full rounded-l-full mt-7">Sign In</button>
          </form>
        </div>
      </main>
    </>
  )
}

export default Login;

