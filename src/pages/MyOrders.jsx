import React, { useEffect, useState } from "react";
import API from "../services/api";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await API.get(`/api/orders/buyer/${userId}`);
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div className="max-w-4xl mx-auto mt-10 px-6">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">You haven’t hired anyone yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow p-4 rounded border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-blue-800">{order.gigId?.title}</h3>
              <p className="text-gray-700">{order.gigId?.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Freelancer: {order.freelancerId?.name || "Unknown"}
              </p>
              <p className="text-sm text-gray-500">Price: ₹{order.price}</p>
              <p className="text-xs text-gray-400">Ordered on: {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
