import Header from "../components/Header"
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { BE_BASE_URL } from "../constants";
import { Link } from "react-router-dom";

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
      <main className="bg-neutral-50 text-primary py-20 flex flex-col items-center justify-center">
        <div className="my-7 px-5 max-w-4xl text-left md:text-center">
          <h2 className="md:text-3xl text-2xl font-semibold text-primary">Sign in to your Glidee account</h2>
          <p className="mt-3">Yet to have an account? <Link to="/signup" className="text-secondary font-medium">Create an account</Link></p>
          <form onSubmit={handleSubmit(onSubmit)} className="my-7">
            {loginErrors.map((error, index) => (
              <span key={index} className="text-red-500 my-2">{error}</span>
            ))}
            <input {...register("email", { required: true })} type="text" placeholder="Enter your email address" className="border border-gray-300 p-3 rounded-r-full rounded-l-full w-full my-1.5" />
            {errors.email && <span> {errors.email?.message}</span>}
            <input {...register("password", { required: true })} type="password" placeholder="Enter your password" className="border border-gray-300 p-3 rounded-r-full rounded-l-full w-full my-1.5" />
            {errors.password && <span> {errors.password?.message}</span>}
            <button type="submit" className="bg-primary w-full text-neutral-50 p-3 rounded-r-full rounded-l-full mt-7">Sign In</button>
          </form>
        </div>
      </main>
    </>
  )
}

export default Login;

