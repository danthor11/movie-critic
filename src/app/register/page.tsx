import { Register } from "@/components/Register";
import React from "react";

const Page = () => {
  return (
    <div className="max-w-sm mx-auto my-3 border border-zinc-800 rounded-md shadow-lg">
      <div className={`relative bg-login `}>
        <img
          src={`https://a.ltrbxd.com/resized/sm/upload/mm/bt/iu/mk/fRyYKQdsXIjw26MendWxpWmvnBs-1200-1200-675-675-crop-000000.jpg?v=0036da8577`}
          alt=""
          className="max-h-60 object-cover w-full rounded-t bg-login"
        />
        <div className="text-center mb-8 absolute bottom-0 left-0 right-0 z-30 lef">
          <h1 className="text-3xl font-semibold text-gray-200">Sign up</h1>
          <p className="text-sm font-light">Create an account to continue.</p>
        </div>
      </div>
      <div className="p-4">
        <Register />
      </div>
    </div>
  );
};

export default Page;
