"use client";
import { useUser } from "@/hook/useUser";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface RegisterData {
  username: string;
  password: string;
  email: string;
}

export const Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setError,
  } = useForm<RegisterData>();
  const router = useRouter();
  const { isLoading, createUser, error } = useUser();

  const onSubmit = handleSubmit(async (data, event) => {
    event?.preventDefault();
    try {
      const { userSaved } = await createUser(data);

      if (userSaved) {
        reset();

        await signIn("credentials", {
          username: userSaved.username,
          password: userSaved.password,
          redirect: false,
        });
        console.log(`/profile/${userSaved.id}/create`);

        return router.push(`/profile/${userSaved.id}/create`);
      }
    } catch (err) {
      let message = "Algo salio mal";

      setError("root", { message: error?.message || message });

      setTimeout(() => {
        setError("root", {});
      }, 4000);
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
            className="block my-2 p-2.5 w-full pl-10 rounded-2xl"
            {...register("username", {
              required: {
                value: true,
                message: "Se requiere el nombre de usuario.",
              },
            })}
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
              viewBox="0 0 512 512"
              fill="#6b7280"
            >
              <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
            </svg>
          </div>
          <input
            type="text"
            className="block my-2 p-2.5 w-full pl-10 rounded-2xl"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value:
                  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
                message: "Write a valid email address",
              },
            })}
            placeholder="Email"
          />
        </div>

        {errors.email && (
          <span className="text-sm text-red-700 my-1 block">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="mb-2">
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
            className="block my-2 p-2.5 w-full pl-10 rounded-2xl"
            {...register("password", {
              required: {
                value: true,
                message: "Se requiere la contraseña.",
              },
              minLength: {
                value: 8,
                message: "Password require at least 8 characters",
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
      </div>

      {error?.isError && (
        <span className="text-sm text-red-700 italic  block ">
          {error.message}
        </span>
      )}
      <button
        disabled={isLoading}
        className="rounded-3xl mx-auto block 
        disabled:bg-blue-950 mt-3 
      py-2 px-6 text-gray-900 font-semibold  transition-colors bg-blue-600 hover:bg-blue-800"
      >
        Sign up
      </button>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Already have an account? Go to the{" "}
        <Link href={"/login"} className="text-gray-300">
          login
        </Link>{" "}
        page.
      </p>
    </form>
  );
};
