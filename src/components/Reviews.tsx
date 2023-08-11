"use client";

import { useReview } from "@/hook/useReview";
import React from "react";
import { Rate } from "./Rate";
import Link from "next/link";
export const Reviews = () => {
  const { reviews, isLoading } = useReview();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 max-w-2xl  mx-auto gap-4">
      {reviews.map((review) => (
        <div
          className="flex gap-x-4 rounded-tl-2xl max-h-48 justify-between rounded-xl bg-[rgba(49,49,49,0.3)]"
          key={review.id}
        >
          <img
            src={`https://ui-avatars.com/api/?name=${review.Profile.name}&background=random`}
            alt={review.Profile.name}
            className="rounded-full w-10 h-10"
          />

          <div className="flex flex-col ">
            <h2 className="text-base font-light">
              {review.movie.title}
              {"   "}
              <span className="text-[8px] text-gray-400">
                {new Date(review.movie.releaseDate).getFullYear()}
              </span>
            </h2>

            <div className="flex">
              <p className="text-gray-500 text-xs">
                Reviewed by{" "}
                <span className="text-[#3229df] font-medium">
                  {review.Profile.name}
                </span>{" "}
              </p>
            </div>
            <p className="text-[10px] overflow-y-hidden mt-2 text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              debitis ea eaque doloribus porro? Quis inventore excepturi
              dolorum. Molestiae rerum nemo hic nulla ullam sequi sunt ipsam
              fugiat neque perspiciatis. Voluptas accusantium doloremque quia
              maiores, excepturi tempore atque. Facere, dignissimos. Aspernatur
              nulla praesentium quibusdam earum excepturi, laborum culpa atque
              qui esse laboriosam rem recusandae commodi ipsa. Provident ratione
              ab repellendus!
            </p>
          </div>

          <div className="w-full relative m-0 min-w-[120px]">
            <img
              src={`https://image.tmdb.org/t/p/original${review.movie.poster}`}
              alt={review.movie.title}
              className="rounded-xl h-full w-full m-0"
            />
            <div className="absolute top-0 right-0 mt-1 ml-1 opacity-90">
              <Rate rate={review.rated} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Review = () => {
  return (
    <div className="flex justify-between">
      <div>Avatar</div>
      <div>Movie Review</div>
      <div>Poster Movie</div>
    </div>
  );
};
