import { ProfileInfo } from "@/components/ProfileInfo";
import { useProfile } from "@/hook/useProfile";
import { getCookies, hasCookie } from "cookies-next";
import { cookies } from "next/headers";
import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <div className="px-4 md:px-6 mx-auto">
        <h1 className=" font-bold text-4xl mb-2 mt-4">Profile</h1>
      </div>
      <ProfileInfo id={params.id} />
    </div>
  );
};

export default Page;
