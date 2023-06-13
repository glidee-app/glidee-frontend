import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { BE_BASE_URL } from "../constants";
import auth from "../services/auth";

const OrderHistory = () => {
  const [orders, setOrders] = useState([])
  const [orderCancelSuccess, setOrderCancelSuccess] = useState('')
  const [orderCancelErrors, setOrderCancelErrors] = useState([])
  const [orderType, setOrderType] = useState('upcoming_trip')

  const cancelOrder = async (order_id) => {
    setOrderCancelSuccess('')
    setOrderCancelErrors([])
    axios
      .post(`${BE_BASE_URL}/cancel_order`, { order_id }, {
        headers: auth.getAuthHeader(),
      })
      .then(res => {
        setOrderCancelSuccess(res.data?.message || 'Order cancelled successfully.')
      })
      .catch(err => {
        setOrderCancelErrors(err.response.data.errors || [err.response.data.message])
      })
  }

  useEffect(() => {
    fetchOrders()
  }, [orderType, orderCancelSuccess])

  const fetchOrders = async () => {
    setOrderCancelSuccess('')
    setOrderCancelErrors([])
    axios
      .get(`${BE_BASE_URL}/order_history`, {
        headers: auth.getAuthHeader(),
        params: {
          'status': orderType,
        }
      })
      .then(res => {
        const orders = res.data?.data?.orders || []
        setOrders(orders)
      })
  }

  return (
    <>
      <Header />
      <main className='flex items-center py-24 px-4 flex-col bg-primary min-h-screen'>
        <div className="max-w-2xl w-full">
          <div className="flex justify-between items-center text-white mb-3">
            <h2 className="font-semibold text-2xl lg:text-3xl">My Bookings</h2>
            <select onChange={e => setOrderType(e.target.value)} name="" id="" className="bg-secondary rounded-l-full rounded-r-full py-2 px-3">
              <option value="upcoming_trip">Upcoming trips</option>
              <option value="completed_trip">Completed trips</option>
              <option value="cancelled_trip">Cancelled trips</option>
            </select>
          </div>
          {orderCancelErrors.map((error, index) => (
            <span key={index} className="text-red-500 my-2">{error}</span>
          ))}
          {orderCancelSuccess &&
            <span className="text-green-500 my-2">{orderCancelSuccess}</span>
          }
          {
            orders.length
              ? orders.map((order, index) => (
                <div key={index} className="shadow p-3 px-5 my-10 flex flex-col items-between bg-white rounded-2xl">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <h2 className="font-medium text-lg">{order?.vehicle?.make + ' ' + order?.vehicle?.model}</h2>
                      <p> <span className="font-medium">License No: </span> {order?.vehicle?.license_plate}</p>
                      <p className="text-left text-sm">
                        <span className="font-medium">Date | Time: </span>
                        {order?.pickup_date} | {order?.pickup_time}
                      </p>
                      <div className="text-white mt-5">
                        <span className="text-sm rounded-l-full rounded-r-full bg-blue-500 p-2">Pickup: {order?.pickup_location}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-lg">₦{order?.amount}</p>
                      <p><span className="font-medium">Driver:</span> {order?.vehicle?.driver?.name}</p>
                      <p><span className="font-medium">Contact No:</span> {order?.vehicle?.driver?.phone_number}</p>
                      <div className="text-white mt-5">
                        <span className="text-sm rounded-l-full rounded-r-full bg-blue-500 p-2">Drop-off: {order?.destination}</span>
                      </div>
                    </div>
                  </div>
                  {
                    order.status == 'upcoming_trip' ?
                      <button onClick={() => cancelOrder(order.id)} className="bg-red-800 rounded text-white text-center mt-5">Cancel</button>
                      : ''
                  }
                </div>
              ))
              :
              <div>
                <p className="text-gray-500 text-center my-10">This user is yet does not have any {orderType}.</p>
              </div>
          }
        </div>
      </main>
    </>
  )
}

export default OrderHistory;