import { Login } from "@/components/Login";
import React from "react";

const Page = () => {
  return (
    <div className="max-w-sm mx-auto my-3 border border-zinc-800 rounded-md shadow-lg">
      <div className={`relative bg-login `}>
        <img
          src={`https://a.ltrbxd.com/resized/sm/upload/3i/x2/91/bl/oppenheimer-1200-1200-675-675-crop-000000.jpg?v=be2e6dcf9c`}
          alt=""
          className="max-h-60 object-cover w-full rounded-t bg-login"
        />
        <div className="text-center mb-8 absolute bottom-0 left-0 right-0 z-30 lef">
          <h1 className="text-3xl font-semibold text-gray-200">Login</h1>
          <p className="text-sm font-light">Please sign in to continue.</p>
        </div>
      </div>
      <div className="p-4">
        <Login />
      </div>
    </div>
  );
};

export default Page;
