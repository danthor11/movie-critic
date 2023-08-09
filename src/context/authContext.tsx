import {
  createContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";

interface AuthContext {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export const authContext = createContext<AuthContext>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const AuthProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <authContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </authContext.Provider>
  );
};
