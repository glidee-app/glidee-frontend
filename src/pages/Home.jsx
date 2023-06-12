// import * as React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Header />
      <main className='flex justify-center items-center py-28 flex-col bg-primary text-neutral-50 h-screen'>
        <div className='text-center lg:px-10 px-8 mb-3 -mt-40'>
          <h2 className='lg:text-5xl text-3xl font-bold md:px-5 px-0'>REVAMP YOUR DAILY CAMPUS COMMUTE WITH <span className='text-blue-500'>GLIDEE</span></h2>
          <span className='text-gray-400 mt-3 block text-lg'>Move around your campus swiftly, comfortably and connected with Glidee.</span>
        </div>
        <div className="flex justify-center w-full px-8">
          <div className='flex lg:flex-row flex-col flex-wrap justify-center items-center font-medium mt-10 w-full max-w-2xl'>
            <Link to="/book-ride" className='p-2 px-10 rounded-r-full rounded-l-full bg-blue-500 lg:mr-2 mb-3 lg:w-auto w-full text-center'>Book a ride now</Link>
            <Link to="/login" className='p-2 px-10 rounded-r-full rounded-l-full bg-white lg:ml-2 text-primary mb-3 lg:w-auto w-full text-center'>Create an account</Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home;