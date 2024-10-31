"use client";
import { useCallback, useEffect, useState } from "react";
import {
  ProfileBody,
  ProfileState,
  createProfile,
  getProfileById,
  updateProfileById,
} from "@/services/profile";
import { updateEmailById } from "@/services/user";

interface ProfileToUpdate extends ProfileBody {
  email: string;
}

export const useProfile = (id: string) => {
  const [profile, setProfile] = useState<ProfileState>();

  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleLoading = useCallback(
    (state: boolean) => {
      if (!profile) {
        setIsFetching(state);
      } else {
        setIsLoading(state);
      }
    },
    [id]
  );

  const getProfile = useCallback(async () => {
    try {
      toggleLoading(true);
      const res = await getProfileById(id);
      console.log(res);
      toggleLoading(false);
      setProfile(res);
    } catch (error) {
      console.log(error, "getProfile");
    }
  }, [id, toggleLoading]);

  useEffect(() => {
    getProfile();
  }, [id, getProfile]);

  const updateProfile = useCallback(
    async (
      { avatar, bio, email, location, name }: ProfileToUpdate,
      profileId: string
    ) => {
      try {
        setIsLoading(true);
        const [_, newProfile] = await Promise.all([
          updateEmailById(id, email),
          updateProfileById(profileId, {
            avatar,
            bio,
            location,
            name,
          }),
        ]);
        setProfile(newProfile);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [id]
  );

  const newProfile = async (body: ProfileBody) => {
    try {
      setIsLoading(true);
      const res = await createProfile(id, body);

      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    profile,
    isLoading,
    isFetching,

    newProfile,
    updateProfile,
  };
};
