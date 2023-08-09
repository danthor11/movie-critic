"use client";
import { useProfile } from "@/hook/useProfile";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
interface ProfileData {
  name: string;
  location: string;
  bio: string;
  avatar: string;
}

interface Props {
  userId: string;
}

export const ProfileForm = ({ userId }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ProfileData>();

  const { isLoading, newProfile } = useProfile(userId);
  const router = useRouter();

  const onSubmit = handleSubmit(async (data, event) => {
    event?.preventDefault();
    await newProfile(data);

    router.push(`/profile/${userId}`);
  });

  return (
    <form onSubmit={onSubmit} className="p-6 flex flex-col gap-y-2">
      <div>
        <h1 className="mb-2 text-gray-300 font-medium text-3xl text-center">
          Profile
        </h1>
      </div>
      <div>
        <label className="text-lg text-gray-200">Name:</label>
        <input
          type="text"
          className="w-full p-2.5"
          placeholder="Write your name..."
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <span className="block text-red-600">{errors.name.message}</span>
        )}
      </div>

      <div>
        <label className="text-lg text-gray-200">Location:</label>
        <input
          type="text"
          className="w-full p-2.5"
          placeholder="Write your location..."
          {...register("location", { required: "Location is required" })}
        />
        {errors.location && (
          <span className="block text-red-600">{errors.location.message}</span>
        )}
      </div>

      <div>
        <label className="text-lg text-gray-200">Bio:</label>

        <textarea
          className="w-full p-2.5 resize-none"
          {...register("bio", {
            required: "Bio is required",
            minLength: { value: 8, message: "Text is too short" },
          })}
          rows={4}
          placeholder="Write a short description about you..."
        />

        {errors.bio && (
          <span className="block text-red-600">{errors.bio.message}</span>
        )}
      </div>

      <button
        disabled={isLoading}
        className="mt-2 rounded-md bg-violet-950 py-2 w-full transition-colors hover:bg-violet-700"
      >
        Send info
      </button>
    </form>
  );
};
