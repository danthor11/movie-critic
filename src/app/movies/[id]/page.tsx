import { MovieDetail } from "@/components/MovieDetail";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

const Page = ({ params }: Props) => {
  return (
    <div>
      <MovieDetail id={parseInt(params.id)} />
    </div>
  );
};

export default Page;
