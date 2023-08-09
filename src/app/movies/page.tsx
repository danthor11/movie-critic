import { MovieList } from "@/components/MovieList";
import { Session } from "@/components/Session";
import React from "react";

const Page = () => {
  return (
    <div className="w-full py-5 mx-auto px-10 text-center">
      <h2 className="text-4xl text-white font-semibold tracking-wide">
        Trending movies
      </h2>

      <MovieList />
    </div>
  );
};

export default Page;
