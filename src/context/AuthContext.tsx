// AuthContext.tsx
import React, { createContext, useState, useEffect } from "react";
import type {ReactNode} from "react";

interface User {
  email: string;
  password: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (email: string, password: string): boolean => {
    const hardcodedUser: User = {
      email: "praveen@bounteous.com",
      password: "12345",
      name: "Praveen Kumar",
    };

    if (email === hardcodedUser.email && password === hardcodedUser.password) {
      setUser(hardcodedUser);
      localStorage.setItem("user", JSON.stringify(hardcodedUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
