import { MovieList } from "@/components/MovieList";
import React from "react";

const Page = () => {
  return (
    <div>
      <div>
        <h1>Trending Movies</h1>
      </div>

      <MovieList />
    </div>
  );
};

export default Page;
