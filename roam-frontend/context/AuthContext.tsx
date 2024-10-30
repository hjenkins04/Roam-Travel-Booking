"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthData {
  guid: string;
  isSignedIn: boolean;
}

interface AuthContextType {
  signIn: (guid: string) => void;
  signOut: () => void;
  authData: AuthData;
  setAuthData: (data: AuthData) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authData, setAuthData] = useState<AuthData>(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("authData");
      return storedData
        ? JSON.parse(storedData)
        : {
            token: null,
            guid: null,
          };
    }
    return {
      token: null,
      guid: null,
    };
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("authData", JSON.stringify(authData));
    }
  }, [authData]);

  const signIn = (guid: string) => {
    setAuthData((prev) => ({ ...prev, isSignedIn: true, guid: guid }));
    console.log("Context login", guid);
    console.log("Is Signed In", authData.isSignedIn);
  };

  const signOut = () => {
    setAuthData((prev) => ({ ...prev, isSignedIn: false, guid: "" }));
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
