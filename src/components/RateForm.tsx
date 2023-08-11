"use client";
import { createRateMovie } from "@/services/movies";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Movie } from "./MovieList";

interface RateForm {
  rated: number;
  review: string;
  date: Date;
  contains_spoiler: boolean;
}

interface Props {
  profileId: string;
  movie: number;
  title: string;
  poster: string;
  year: string;
  closeModal: (body?: Movie) => void;
}

const RateForm = (props: Props) => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<RateForm>({
    defaultValues: {
      review: "",
      rated: 50,
      contains_spoiler: false,
      date: new Date(),
    },
  });

  const onSubmit = handleSubmit(
    async ({ contains_spoiler, date, rated, review }, event) => {
      event?.preventDefault();

      await createRateMovie({
        contains_spoiler,
        date,
        movieId: props.movie,
        rated,
        review,
        userId: props.profileId,
      });

      props.closeModal();

      //Desplegar un mensaje de creacion
    }
  );

  return (
    <form onSubmit={onSubmit} className="flex flex-col p-3 ">
      <div className="flex justify-between gap-x-3 py-1 items-center border-b border-b-gray-600">
        <h2 className="flex-grow text-base">
          {props.title}{" "}
          <span className=" text-sm text-gray-500">{props.year}</span>
        </h2>
        <div className=" rounded-sm border border-gray-500">
          <Image
            className="w-auto h-16"
            src={`https://image.tmdb.org/t/p/original${props.poster}`}
            alt={props.title}
            width={42}
            height={64}
            quality={50}
          />
        </div>
      </div>

      <div className="flex py-1  items-center justify-between border-b border-b-gray-600">
        <label htmlFor="">Date</label>
        <input
          type="date"
          className="w-fit p-2.5 focus-visible:outline-none"
          {...register("date", {
            required: { value: true, message: "Date is required" },
          })}
        />
      </div>

      <div className="flex flex-col border-b py-1 border-b-gray-600">
        <label className="">Rate:</label>
        <div className="mb-3  border border-gray-600 p-1 rounded-md max-w-[250px] self-center">
          <h3 className="text-center text-sm font-semibold ">
            {watch("rated")}%
          </h3>
          <input
            {...register("rated")}
            type="range"
            min={"0"}
            max={"100"}
            className={`w-full h-1
          ${
            watch("rated") > 70
              ? "bg-green-600"
              : watch("rated") > 25
              ? "bg-orange-700"
              : "bg-red-600"
          } rounded-lg
          transition-colors
          select-none appearance-none cursor-pointer 
           `}
          ></input>
          <div></div>
          <div className="flex justify-between  text-sm px-1 pt-1">
            <p>0</p>
            <p>100</p>
          </div>
        </div>
      </div>

      <div className=" py-1">
        <label htmlFor="">Review: </label>
        <textarea
          id=""
          cols={4}
          rows={4}
          className="focus-visible:outline-none resize-none"
          {...register("review", {
            required: { message: "Review is required", value: true },
          })}
          placeholder="Write your review..."
        />
      </div>

      <div className="flex justify-evenly py-1  border-t border-t-gray-600">
        <label className="relative flex my-2 justify-center gap-x-4 items-center  cursor-pointer">
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Contains spoiler:
          </span>
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only peer"
              {...register("contains_spoiler")}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </div>
        </label>
        <label className="relative flex my-2 justify-center gap-x-4 items-center  cursor-pointer">
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Already watched
          </span>
          <div className="relative">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </div>
        </label>
      </div>

      <button className="py-3 px-4 bg-blue-600 transition-colors hover:bg-blue-700 rounded-md">
        Publish
      </button>
    </form>
  );
};

export default RateForm;
