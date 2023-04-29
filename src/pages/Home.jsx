// import * as React from 'react';
import Header from '../components/Header';
import headerImage from '../assets/images/header.png'

const Home = () => {
  return (
    <>
      <Header />
      <main className='flex justify-center items-center py-20 flex-col'>
        <img src={headerImage} className='w-full md:w-1/5' />
        <div className='text-center md:px-10 px-5'>
          <h2 className='md:text-3xl text-2xl font-semibold md:px-5 px-0'>Move Around Campus Swiftly</h2>
          <span className='text-gray-300'>Experience Stress-Free Commuting On Campus With Glidee</span>
        </div>
      </main>
    </>
  )
}

export default Home;