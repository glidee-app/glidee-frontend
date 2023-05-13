// import * as React from 'react';
import Header from '../components/Header';
import headerImage from '../assets/images/header.png'
import locationImage from '../assets/images/location-point.png'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Header />
      <main className='flex justify-center items-center py-28 flex-col bg-primary text-neutral-50'>
        <img src={headerImage} className='w-full md:w-1/5' />
        <div className='text-center md:px-10 px-5 my-3'>
          <h2 className='md:text-3xl text-2xl font-semibold md:px-5 px-0'>Move Around Campus Swiftly</h2>
          <span className='text-gray-400'>Experience Stress-Free Commuting On Campus With Glidee</span>
        </div>
        <img src={locationImage} className='w-full md:w-1/5 mt-2' />
        <div className='flex justify-between md:justify-center items-center w-full md:w-2/5 font-medium mt-7'>
          <Link to="/signup" className='p-2 px-4 rounded-r-full rounded-l-full border border-white ml-20 mr-2'>Join Glidee</Link>
          <Link to="/login" className='p-2 px-6 rounded-r-full rounded-l-full border border-secondary bg-secondary mr-20 ml-2'>Sign in</Link>
        </div>
      </main>
    </>
  )
}

export default Home;