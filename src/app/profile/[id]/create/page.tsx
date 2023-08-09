import { ProfileForm } from "@/components/ProfileForm";
import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="mt-2">
      <div className="p-5 max-w-lg mx-auto">
        <h1 className="text-xl text-slate-400 font-light  text-center">
          Write your profile!
        </h1>
        <p className="text-slate-200 text-justify">
          To continue, you have to fill the fields and create your profile.
        </p>
      </div>
      <div className="max-w-lg mx-auto shadow-lg bg-gray-900 rounded-md border border-gray-800">
        <ProfileForm userId={params.id} />
      </div>
    </div>
  );
};

export default Page;
