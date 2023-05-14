import { Link } from "react-router-dom";
import Header from "../components/Header";
import auth from "../services/auth";

const Dashboard = () => {

  const user = auth.getCurrentUser()

  return (
    <>
      <Header />
      <main className='flex justify-center items-center py-28 flex-col bg-primary text-neutral-50'>
        <h2>Hello, {user.sub.user_name}</h2>
        <div className='flex justify-between items-center w-full md:w-2/5 font-medium my-28'>
          <Link to="/book-ride" className='p-10 px-4 rounded-lg border border-white'>Book Ride</Link>
          <Link to="/order-history" className='p-10 px-4 rounded-lg border border-secondary bg-secondary'>View Order History</Link>
        </div>
      </main>
    </>
  )
}

export default Dashboard;