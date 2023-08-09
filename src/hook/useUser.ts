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
      if (!res.ok) throw Error(JSON.stringify(await res.json()));

      return await res.json();
    } catch (error) {
      if (typeof error === "string")
        setError({
          isError: true,
          message: error,
        });
      else if (error instanceof Error) {
        const objectError = JSON.parse(error.message);
        setError({
          isError: true,
          message: objectError.message,
        });
      }

      setTimeout(() => {
        setError({ isError: false, message: "" });
      }, 4000);
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
