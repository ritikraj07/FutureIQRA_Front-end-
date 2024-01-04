import React, { useState, useEffect } from "react";
// import "./ReviewSlider.css"; // CSS file for styling (define animation)

const ReviewSlider = () => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
    const reviews = [
      "Great service!",
      "Excellent product quality!",
      "Superb experience!",
      // Add more reviews as needed
    ];
  useEffect(() => {
    const interval = setInterval(() => {
      // Move to the next review index
      setCurrentReviewIndex((prevIndex) =>
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 1000); // Change review every 3 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, [reviews.length]);
    



  return (
    <div className="review-slider-container">
      <div
        className="review-slide"
        style={{ marginLeft: `-${currentReviewIndex * 50}%` }}
      >
        {reviews.map((review, index) => (
          <div key={index} className="review-item">
            {review}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSlider;
