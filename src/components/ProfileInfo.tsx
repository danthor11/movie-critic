"use client";
import { useProfile } from "@/hook/useProfile";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  id: number;
}

interface ProfileData {
  name: string;
  username: string;
  email: string;
  bio: string;
  location: string;
}

export const ProfileInfo = ({ id }: Props) => {
  const { profile } = useProfile(id);
  const [isEdit, setIsEdit] = useState(false);

  const { register, handleSubmit, setValue } = useForm<ProfileData>();

  const setForm = () => {
    if (!profile) return;

    setValue("bio", profile?.bio);
    setValue("email", profile?.user.email);
    setValue("location", profile?.location);
    setValue("name", profile?.name);
    setValue("username", profile?.user.username);

    setIsEdit(true);
  };

  const onSubmit = handleSubmit(async (data, event) => {
    event?.preventDefault();
    console.log(data);
    closeForm();
  });

  const closeForm = () => {
    setIsEdit(false);
  };

  return (
    <div className="grid grid-rows-2 md:grid-rows-1 p-4 md:grid-cols-3 md:p-6 mx-auto gap-6">
      {profile && (
        <>
          <form
            onSubmit={onSubmit}
            className="p-8  rounded-md  shadow bg-slate-900 border border-slate-800"
          >
            <div className="flex flex-col ">
              <div>
                <img
                  src={`https://ui-avatars.com/api/?name=${profile.name}`}
                  alt={`avatar-${profile.name}`}
                  className="mx-auto shadow-md  rounded-full border-[4px] border-slate-700 "
                />
              </div>
              <div className="mt-2">
                <h1 className="py-1 mx-auto w-fit my-1 px-4 rounded-xl bg-blue-900 font-semibold text-center uppercase">
                  {profile.user.username}
                </h1>
                <div>
                  <p className="text-gray-400 text-lg font-medium my-1">
                    Name{" "}
                  </p>
                  {!isEdit ? (
                    <h2 className="text-xl capitalize">{profile.name}</h2>
                  ) : (
                    <input
                      type="text"
                      {...register("name", { required: true })}
                      className="bg-gray-900 text-gray-200 border-gray-800 font-medium text-lg"
                    />
                  )}
                </div>
                <div>
                  <p className="text-gray-400 text-lg font-medium my-1">
                    Email address
                  </p>
                  {!isEdit ? (
                    <h3 className="text-gray-50 text-xl">
                      {profile.user.email}
                    </h3>
                  ) : (
                    <input
                      type="text"
                      {...register("email", { required: true })}
                      className="bg-gray-900 text-gray-200 border-gray-800 font-medium text-lg"
                    />
                  )}
                </div>
                <div>
                  <h4 className="text-gray-400 text-lg font-medium my-1">
                    Location
                  </h4>
                  {!isEdit ? (
                    <p className="text-gray-400  uppercase flex items-center ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 384 512"
                        fill="rgb(156 163 175 )"
                      >
                        <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                      </svg>
                      <span className="ml-1  text-gray-50 text-xl capitalize">
                        {profile.location}
                      </span>
                    </p>
                  ) : (
                    <input
                      type="text"
                      {...register("location", { required: true })}
                      className="bg-gray-900 text-gray-200 border-gray-800 font-medium text-lg"
                    />
                  )}
                </div>

                {!isEdit ? (
                  <button
                    onClick={() => setForm()}
                    className="w-fit block mt-4 py-2 mx-auto px-4 rounded-md  bg-blue-500 hover:bg-slate-500 transition-colors"
                  >
                    Edit
                  </button>
                ) : (
                  <div className="flex justify-center">
                    <button
                      className="w-fit block mt-4 py-2 mx-auto px-4 rounded-md  bg-red-600 hover:bg-slate-500 transition-colors "
                      type="submit"
                      onClick={() => closeForm()}
                    >
                      Cancel
                    </button>
                    <button
                      className="w-fit block mt-4 py-2 mx-auto px-4 rounded-md  bg-green-600 hover:bg-slate-500 transition-colors"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>
            </div>
          </form>
          <div className="p-8 w-full right-profile   rounded-md mx-auto shadow bg-slate-900 border border-slate-800">
            <h2 className="text-gray-400 text-lg font-medium my-1">Bio</h2>
            <p className="capitalize">{profile.bio}</p>
          </div>
        </>
      )}
    </div>
  );
};
