import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";

const GigDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
const stripePromise = loadStripe("pk_test_51RtICOAgjGB2CInK18fgTKLy2rHnLst9RvIJuDzbgE73bcS9NFj4Q8ca1SzJ5OB8O7j8vBgxVERaafrJW5lFCe7I00xy4XY76t"); 

  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const { data } = await API.get(`/gigs/${id}`);
        setGig(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load gig:", err);
        setLoading(false);
      }
    };

    fetchGig();
  }, [id]);

  const handleDelete = async () => {
    try {
      await API.delete(`/gigs/${id}`);
      alert("Gig deleted successfully");
      navigate("/gigs");
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleOrder = async () => {
  const buyerId = localStorage.getItem("userId");
  const orderData = {
    gigId: gig._id,
    buyerId,
    freelancerId: gig.userId._id,
    price: gig.price
  };

  try {
    await API.post("/orders", orderData);
    toast.success("Order placed successfully!");
  } catch (error) {
    console.error(error.response?.data || error.message);
    toast.error("Failed to place order.");
  }
};


const handlePayment = async () => {
  const gigPayload = {
    _id: gig._id,
    title: gig.title,
    description: gig.description,
    price: gig.price,
  };

  try {
    
    const { data } = await API.post("/stripe/create-checkout-session", { gig: gigPayload });
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId: data.id });
  } catch (error) {
    console.error("Stripe Checkout error", error);
    toast.error("Payment failed. Try again.");
  }
};


  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!gig) return <p className="text-center mt-10 text-red-500">Gig not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-blue-800 mb-4">{gig.title}</h2>
      <p className="text-gray-700 mb-4">{gig.description}</p>
      <p className="text-lg font-medium text-gray-900 mb-6">Price: ₹{gig.price}</p>

      {gig.userId?._id !== userId && (
  <button
    onClick={handleOrder}
    className="bg-green-600 text-white py-2 px-4 rounded mt-4 hover:bg-green-700"
  >
    Hire Now
  </button>
)}

{gig.userId?._id !== userId && (
  <button
    onClick={handlePayment}
    className="bg-green-600 text-white py-2 px-4 rounded mt-4 hover:bg-green-700"
  >
    Pay
  </button>
)}


      {gig.userId?._id === userId && (
        <div className="flex gap-4">
          <button
            onClick={() => navigate(`/edit-gig/${id}`)}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded shadow"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded shadow"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default GigDetail;
