import { Link } from "react-router-dom";
import Header from "../components/Header";
import auth from "../services/auth";

const Dashboard = () => {

  const user = auth.getCurrentUser()

  return (
    <>
      <Header />
      <main className='flex justify-center py-28 bg-primary text-neutral-50 min-h-screen'>
        <div className="w-full max-w-4xl">
          <h2 className="lg:text-3xl text-2xl font-semibold">Dashboard</h2>
          <h3 className="text-lg mt-10">Hello, {user.sub.user_name}. How can we help you today?</h3>
          <ul className='font-medium my-10 list-disc list-inside'>
            <li className="my-2">
              <Link to="/book-ride" className="text-blue-500 hover:underline">Book Ride</Link>
            </li>
            <li className="my-2">
              <Link to="/order-history" className="text-blue-500 hover:underline">View Order History</Link>
            </li>
          </ul>
        </div>
      </main>
    </>
  )
}

export default Dashboard;
