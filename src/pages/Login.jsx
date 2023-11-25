// Importing necessary modules and components
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { BE_BASE_URL } from "../constants";
import { Link, NavLink } from "react-router-dom";

// Functional component definition
const Login = () => {
  // Destructuring values from the useForm hook
  const { register, handleSubmit, formState: { errors } } = useForm();

  // State hook to manage login errors
  const [loginErrors, setLoginErrors] = useState([]);

  // Function to handle form submission
  const onSubmit = async (data) => {
    // Clear previous login errors
    setLoginErrors([]);

    // Making a POST request to the backend login endpoint
    axios
      .post(`${BE_BASE_URL}/login`, data)
      .then(response => {
        // If login is successful, store user data in local storage and redirect to dashboard
        if (response.data?.data) {
          localStorage.setItem("user", JSON.stringify(response.data.data));
          alert("Login successful! Redirecting to dashboard.");
          return window.location.replace("/dashboard");
        } else {
          // If login fails, set loginErrors with an error message
          setLoginErrors(["Login failed. Please try again."]);
        }
      })
      .catch(err => {
        // If there's an error with the request, set loginErrors with the error messages
        setLoginErrors(err.response.data.errors || [err.response.data.message]);
      });
  }

  // JSX markup for the login form
  return (
    <>
      <Header />
      <main className="bg-primary text-white py-20 flex flex-col items-center justify-center min-h-screen">
        <div className="my-7 px-5 max-w-4xl text-center -mt-40">
          <h2 className="lg:text-3xl text-2xl font-semibold">Sign in to Glidee</h2>
          <p className="mt-3">Don&apos;t have an account? <Link to="/signup" className="text-blue-500 font-medium">Create an account</Link></p>
          
          {/* Form for user login */}
          <form onSubmit={handleSubmit(onSubmit)} className="my-7 text-gray-600">
            
            {/* Display login errors if any */}
            {loginErrors.map((error, index) => (
              <span key={index} className="text-red-500 my-2">{error}</span>
            ))}

            {/* Input field for email */}
            <input {...register("email", { required: true })} type="text" placeholder="Enter your email address" className="border border-gray-300 p-3 rounded-r-full rounded-l-full w-full my-1.5" />
            {errors.email && <span> {errors.email?.message}</span>}
            
            {/* Input field for password */}
            <input {...register("password", { required: true })} type="password" placeholder="Enter your password" className="border border-gray-300 p-3 rounded-r-full rounded-l-full w-full my-1.5" />
            {errors.password && <span> {errors.password?.message}</span>}
            
            {/* Forgot password link */}
            <span className="block mt-2 text-white">
              Forgot Password?
              <NavLink to="/reset-password" className='text-blue-500'> Reset</NavLink>
            </span>
            
            {/* Sign In button */}
            <button type="submit" className="bg-secondary w-full text-neutral-50 p-3 rounded-r-full rounded-l-full mt-7">Sign In</button>
          </form>
        </div>
      </main>
    </>
  )
}

// Exporting the Login component
export default Login;
