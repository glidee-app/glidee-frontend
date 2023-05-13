import Header from "../components/Header"
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { BE_BASE_URL } from "../constants";
import { Link } from "react-router-dom";

const Signup = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [signupErrors, setSignupErrors] = useState([])
  const onSubmit = async (data) => {
    setSignupErrors([])
    axios
      .post(`${BE_BASE_URL}/signup`, data)
      .then(() => {
        alert("Registration succesful! You can now login.")
        return window.location.replace("/login")
      })
      .catch(err => {
        setSignupErrors(err.response.data.errors || [err.response.data.message])
      });
  }

  return (
    <>
      <Header />
      <main className="bg-neutral-50 text-primary py-20 flex flex-col items-center justify-center">
        <h3 className="text-center text-lg font-medium">Create an account</h3>
        <div className="my-7 px-5 max-w-4xl text-left md:text-center">
          <h2 className="md:text-3xl text-2xl font-semibold text-primary">Glide with us on our smooth rides around campus</h2>
          <p className="mt-3">Already have an account? <Link to="/login" className="text-secondary font-medium">Sign in</Link></p>
          <form onSubmit={handleSubmit(onSubmit)} className="my-7">
            {signupErrors.map((error, index) => (
              <span key={index} className="text-red-500 my-2">{error}</span>
            ))}

            <input {...register("email", { required: true })} type="text" placeholder="Enter your email address" className="border border-gray-300 p-3 rounded-r-full rounded-l-full w-full my-1.5" />
            {errors.email && <span> {errors.email?.message}</span>}
            <input {...register("first_name", { required: true })} type="text" placeholder="Enter your first name" className="border border-gray-300 p-3 rounded-r-full rounded-l-full w-full my-1.5" />
            {errors.first_name && <span> {errors.first_name?.message}</span>}
            <input {...register("last_name", { required: true })} type="text" placeholder="Enter your last name" className="border border-gray-300 p-3 rounded-r-full rounded-l-full w-full my-1.5" />
            {errors.last_name && <span> {errors.last_name?.message}</span>}
            <input {...register("password", { required: true })} type="password" placeholder="Enter your password" className="border border-gray-300 p-3 rounded-r-full rounded-l-full w-full my-1.5" />
            {errors.password && <span> {errors.password?.message}</span>}
            <input {...register("password_confirm", { required: true })} type="text" placeholder="Re-type your password" className="border border-gray-300 p-3 rounded-r-full rounded-l-full w-full my-1.5" />
            {errors.password_confirm && <span> {errors.password_confirm?.message}</span>}
            <button type="submit" className="bg-primary w-full text-neutral-50 p-3 rounded-r-full rounded-l-full mt-7">Sign up</button>
          </form>
        </div>
      </main>
    </>
  )
}

export default Signup;

