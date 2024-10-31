import { Review, getAllReviews } from "@/services/reviews";
import { useEffect, useState } from "react";

export const useReview = () => {
  const [reviews, setreviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [popularReviews, setPopularReviews] = useState<Review[]>([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        setIsLoading(true);
        const res = await getAllReviews();
        setreviews(res);
        setIsLoading(false);
      } catch (err) {
        // setError(err);
      }
    };
    getReviews();
  }, []);

  useEffect(() => {
    const getPopularReviews = async () => {
      try {
        setIsLoading(true);
        const res = await getAllReviews();
        setPopularReviews(res);
        setIsLoading(false);
      } catch (error) {
        // setError()
      }
    };

    getPopularReviews();
  }, [setPopularReviews]);

  return {
    reviews,
    popularReviews,
    isLoading,
    error,
  };
};
