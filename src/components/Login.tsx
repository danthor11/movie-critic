"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LoginData {
  username: string;
  password: string;
}
interface Props {
  successCBUrl: string;
}

export const Login = ({ successCBUrl = "/" }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginData>();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data, event) => {
    event?.preventDefault();

    try {
      const res = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
        callbackUrl: successCBUrl,
      });

      if (res?.error) {
        throw Error(res.error);
      }

      router.push(successCBUrl);
    } catch (error) {
      if (error instanceof Error) {
        setError("root", { message: error.message });
      }

      setTimeout(() => {
        setError("root", { message: "" });
      }, 5000);
    }
  });

  return (
    <form className="" onSubmit={onSubmit}>
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
              fill="#6b7280"
            >
              <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full p-2.5 pl-10 my-2  rounded-2xl"
            {...register("username", {
              required: {
                value: true,
                message: "Se requiere el nombre de usuario.",
              },
            })}
            autoComplete="off"
            placeholder="Username"
          />
        </div>
        {errors.username && (
          <span className="text-sm text-red-700 italic block">
            {errors.username.message}
          </span>
        )}
      </div>
      <div className="mb-6">
        <div className="relative ">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
              fill="#6b7280"
            >
              <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
            </svg>
          </div>
          <input
            type="password"
            className="block my-2 w-full p-2.5 pl-10 rounded-2xl"
            {...register("password", {
              required: {
                value: true,
                message: "Se requiere la contraseña.",
              },
            })}
            placeholder="Password"
          />
        </div>

        {errors.password && (
          <span className="text-sm text-red-700 italic  block ">
            {errors.password.message}
          </span>
        )}

        {errors.root && (
          <span className="text-sm text-red-700 italic  block ">
            {errors.root.message}
          </span>
        )}
      </div>
      <button
        disabled={isSubmitting}
        className="rounded-3xl mx-auto block  disabled:bg-blue-950
      py-2 px-6 text-gray-900 font-semibold  transition-colors bg-blue-600 hover:bg-blue-800"
      >
        Login
      </button>
      <p className="text-xs text-gray-500 mt-4 text-center">
        Dont have an account? please{" "}
        <Link href={"/register"} className="text-gray-300">
          sign up
        </Link>{" "}
        first.
      </p>
    </form>
  );
};
