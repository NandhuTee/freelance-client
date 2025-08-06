import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const GigDetail = () => {
  const { id } = useParams(); // get gig ID from URL
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔽 Fetch gig by ID on component mount
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

  // ✅ Put console.log outside return
  console.log("gig.userId:", gig?.userId, "userId:", userId);

  if (loading) return <p>Loading...</p>;
  if (!gig) return <p>Gig not found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{gig.title}</h2>
      <p>{gig.description}</p>
      <p>Price: ₹{gig.price}</p>

      {gig.userId?._id === userId && (
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() => navigate(`/edit-gig/${id}`)}
            style={{ marginRight: "10px" }}
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            style={{ backgroundColor: "red", color: "white" }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default GigDetail;
