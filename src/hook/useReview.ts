import { Review, getAllReviews } from "@/services/reviews";
import { useEffect, useState } from "react";

export const useReview = () => {
  const [reviews, setreviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getReviews = async () => {
      try {
        const res = await getAllReviews();

        setreviews(res);
      } catch (err) {
        console.log(err);
      }
    };
    getReviews();
  }, []);

  return {
    reviews,
    isLoading,
    error,
  };
};
