"use client";
import React, { useEffect, useState } from "react";
import { hasCookie } from "cookies-next";
import { getProfileById } from "@/services/profile";

interface ProfileState {
  avatar: string;
  bio: string;
  id: string;
  location: string;
  name: string;
  user: {
    email: string;
    username: string;
  };
  userId: string;
}

export const useProfile = (id: number) => {
  const [profile, setProfile] = useState<ProfileState>();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await getProfileById(id);
        const data = await res.json();
        console.log(data);

        setProfile(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProfile();
  }, [id]);

  return {
    profile,
  };
};
