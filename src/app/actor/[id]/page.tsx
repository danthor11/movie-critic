import { ActorInfo } from "@/components/ActorInfo";
import React from "react";
interface Params {
  params: { id: string };
}

const Page = ({ params }: Params) => {
  return (
    <div>
      <ActorInfo personId={params.id} />
    </div>
  );
};

export default Page;
