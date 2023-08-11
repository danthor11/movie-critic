import React, { Suspense } from "react";
import Image from "next/image";
import { getPersonInfor } from "@/services/actor";
import { Loading } from "./Loading";
import { MovieCredits } from "./MovieCredits";

interface Props {
  personId: string;
}

const getPerson = async (id: string) => {
  const res = await getPersonInfor(id);
  console.log(res);
  return res;
};

export const ActorInfo = async ({ personId }: Props) => {
  const { movie_credits, person_info } = await getPerson(personId);

  return (
    <div className="mx-auto max-w-5xl">
      <Suspense fallback={<Loading />}>
        {person_info && (
          <>
            <div className="mx-auto px-6">
              <h1 className="text-2xl font-light mb-2">Film starring</h1>
              <h2 className="text-3xl mb-4 font-semibold text-gray-400">
                {person_info.name}
              </h2>
            </div>
            <div className="flex flex-col   md:flex-row md:justify-between gap-y-6 gap-x-4">
              <div className="flex-0 px-2 justify-center flex flex-wrap mx-auto max-w-2xl gap-2 md:gap-4">
                <MovieCredits movie_credits={movie_credits} />
              </div>
              <div className="flex-1  md:min-w-[240px]  md:max-w-[250px] px-8">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${person_info.profile_path}`}
                  alt=""
                  width={200}
                  height={300}
                  className="mx-auto h-auto w-full sm:w-2/3 rounded-md border border-gray-700"
                />
                <p className="mt-4 mx-auto text-justify text-gray-600 text-sm tracking-wide ">
                  {person_info.biography}
                </p>
              </div>
            </div>
          </>
        )}
      </Suspense>
    </div>
  );
};
