import { useState, useEffect } from "react";
import { getCookies } from "cookies-next";
import { logoutSession } from "@/services/user";
export const useSession = () => {
  const [isLogged, setIsLogged] = useState(false);
  const cookies = getCookies();

  const logout = async () => {
    try {
      await logoutSession();
      setIsLogged(false);
    } catch (error) {
      console.log(error);
    }
  };

  const login = () => {};

  useEffect(() => {
    if (cookies && cookies?.["logged-in"]) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [cookies]);

  return {
    isLogged,
    logout,
  };
};
