"use client";

import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";

const RatingAndReviews = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const limit = 5; // Reviews per page

  // Fetch reviews when the page or productId changes
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:5001/reviews/${productId}?page=${currentPage}&limit=${limit}`);
        setReviews(response.data.reviews);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        setError("Failed to fetch reviews.");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchReviews();
    }
  }, [productId, currentPage]);

  const handleRating = (value) => {
    setRating(value);
  };

  const submitReview = async () => {
    try {
      if (!rating || !comment) {
        console.error("Missing required fields");
        return;
      }

      const response = await axios.post("http://localhost:5001/reviews", {
        productId,
        rating,
        comment,
      });

      console.log("Review submitted:", response.data);
      // Add new review to the state
      setReviews((prevReviews) => [response.data.review, ...prevReviews]);
      setComment("");
      setRating(0);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="mt-6 mb-12 p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-semibold mb-3">Leave a Review</h3>

      {/* Star Rating */}
      <div className="flex space-x-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`cursor-pointer text-xl ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
            onClick={() => handleRating(star)}
          />
        ))}
      </div>

      {/* Comment Input */}
      <textarea
        className="w-full p-2 border rounded-md"
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      {/* Submit Button */}
      <button
        className="mt-3 bg-peach text-white p-2 rounded-md hover:bg-rosy transition"
        onClick={submitReview}
      >
        Submit Review
      </button>

      {/* Display Reviews */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Reviews</h3>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="mb-4 p-3 border rounded-md">
              <div className="flex items-center space-x-1 mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`text-sm ${star <= review.rating ? "text-yellow-500" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-700">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center space-x-2">
        <button
          className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-300" : "bg-goldenYellow text-white hover:bg-peach"}`}
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          Previous
        </button>

        {[...Array(totalPages).keys()].map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-lg ${currentPage === index + 1 ? "bg-goldenYellow text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            onClick={() => goToPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-300" : "bg-goldenYellow text-white hover:bg-peach"}`}
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RatingAndReviews;
