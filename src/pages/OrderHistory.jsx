import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { BE_BASE_URL } from "../constants";
import auth from "../services/auth";

const OrderHistory = () => {
  const [orders, setOrders] = useState([])
  const [orderCancelSuccess, setOrderCancelSuccess] = useState('')
  const [orderCancelErrors, setOrderCancelErrors] = useState([])

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
  })

  const fetchOrders = async () => {
    axios
      .get(`${BE_BASE_URL}/orders`, {
        headers: auth.getAuthHeader()
      })
      .then(res => {
        const orders = res.data?.data?.orders || []
        setOrders(orders)
      })
  }

  return (
    <>
      <Header />
      <main className='flex items-center justify-center py-28 flex-col bg-neutral-50 text-primary'>
        <h2 className="font-semibold text-lg text-center">Order History</h2>
        {orderCancelErrors.map((error, index) => (
          <span key={index} className="text-red-500 my-2">{error}</span>
        ))}
        {orderCancelSuccess &&
          <span className="text-green-500 my-2">{orderCancelSuccess}</span>
        }
        <div className="max-w-2xl w-full">
          {
            orders.length
              ? orders.map((order, index) => (
                <div key={index} className="shadow p-3 my-5 flex flex-col items-between">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500 block">Pickup</span>
                      <h2>{order.pickup_location}</h2>
                      <span className="text-sm text-gray-500 block mt-3">Date</span>
                      <p>{order.pickup_datetime}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 block">Destination</span>
                      <h2>{order.destination}</h2>
                      <span className="text-sm text-gray-500 block mt-3">Status</span>
                      {order.status ?
                        <p className="text-green-500">Active</p>
                        :
                        <p className="text-gray-400">Cancelled</p>

                      }
                    </div>
                  </div>
                  {
                    order.status ?
                      <button onClick={() => cancelOrder(order.id)} className="bg-red-800 rounded text-white text-center mt-3">Cancel</button>
                      : ''
                  }
                </div>
              ))
              :
              <div>
                <p className="text-gray-500 text-center my-10">This user is yet to book any ride.</p>
              </div>
          }
        </div>
      </main>
    </>
  )
}

export default OrderHistory;