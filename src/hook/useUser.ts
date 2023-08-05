import { User, registerUser } from "@/services/user";
import { useState } from "react";

interface Error {
  isError: boolean;
  message: string;
}

export const useUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const createUser = async (user: User) => {
    try {
      setIsLoading(true);
      const res = await registerUser(user);
      return await res.json();
    } catch (error) {
      console.log(error);
      if (typeof error === "string")
        setError({
          isError: true,
          message: error,
        });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createUser,
  };
};
