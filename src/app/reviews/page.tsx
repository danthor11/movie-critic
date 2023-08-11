import { Reviews } from "@/components/Reviews";
import React from "react";

const Page = () => {
  return (
    <div>
      <div className="px-3 my-4 mx-auto max-w-2xl">
        <h1 className="text-2xl text-gray-200 font-medium">Reviews</h1>
      </div>
      <div className="px-3">
        <Reviews />
      </div>
    </div>
  );
};

export default Page;
