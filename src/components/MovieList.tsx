"use client";
import { useMovie } from "@/hook/useMovie";
import React, { useState } from "react";
import Modal from "./Modal";
import RateForm from "./RateForm";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Movie } from "./Movie";

interface ModalRate {
  isOpen: boolean;
  movie?: Movie;
}
export interface Movie {
  profileId: string;
  movie: number;
  title: string;
  poster: string;
  year: string;
}

export const MovieList = () => {
  const [modal, setModal] = useState<ModalRate>({ isOpen: false });
  const { movies } = useMovie();
  const { status, data } = useSession();

  const toggleModal = (body?: Movie) => {
    if (body) return setModal({ movie: body, isOpen: true });

    return setModal({ isOpen: false });
  };

  return (
    <>
      <div className="w-full gap-x-4 justify-center md:w-5/6 py-10 mx-auto flex flex-wrap gap-y-4 md:gap-5">
        {movies?.map((movie) => (
          <Movie
            key={movie.id}
            movie={movie}
            profileId={data?.user.id!}
            setModal={toggleModal}
          />
        ))}
      </div>

      {modal.movie && (
        <Modal modal={modal.isOpen} toggleModal={toggleModal}>
          <>
            {status === "authenticated" ? (
              <RateForm
                year={modal.movie.year}
                movie={modal.movie.movie}
                poster={modal.movie.poster}
                profileId={data.user.id}
                title={modal.movie.title}
                closeModal={toggleModal}
              />
            ) : (
              ""
            )}

            {status === "unauthenticated" ? (
              <div className="mx-auto ">
                <div className={`relative bg-login-modal `}>
                  <img
                    src={`http://image.tmdb.org/t/p/w500/ueO9MYIOHO7M1PiMUeX74uf8fB9.jpg`}
                    alt=""
                    className="max-h-80 object-cover w-full rounded-t "
                  />
                  <div className="text-center mb-8 absolute bottom-0 left-0 right-0 z-30 lef">
                    <h1 className="text-lg text-white text-shadow  drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]	  font-medium">
                      To make a review you have to be logged in first.
                    </h1>
                    <div className="p-4">
                      <p className="text-md text-gray-100 mt-4 text-center">
                        Go to the{" "}
                        <Link
                          href={"/login"}
                          className="text-gray-400 underline-offset-1 underline"
                        >
                          login
                        </Link>{" "}
                        page first.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        </Modal>
      )}
    </>
  );
};
