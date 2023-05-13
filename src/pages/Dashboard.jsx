import { Link } from "react-router-dom";
import Header from "../components/Header";

const Dashboard = () => {
  return (
    <>
      <Header />
      <main className='flex justify-center items-center py-28 flex-col bg-primary text-neutral-50'>
        <h2>Hello, Quyum</h2>
        <div className='flex justify-between items-center w-full md:w-2/5 font-medium my-28'>
          <Link to="/book-ride" className='p-10 px-4 rounded-lg border border-white'>Book Ride</Link>
          <Link to="/ride-history" className='p-10 px-4 rounded-lg border border-secondary bg-secondary'>View Order History</Link>
        </div>
      </main>
    </>
  )
}

export default Dashboard;