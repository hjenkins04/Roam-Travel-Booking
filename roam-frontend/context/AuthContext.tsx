import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthData {
  guid: string;
  isSignedIn: boolean;
}

interface AuthStore {
  authData: AuthData;
  signIn: (guid: string) => void;
  signOut: () => void;
  setAuthData: (data: AuthData) => void;
}

// Zustand store creation
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      authData: {
        guid: "",
        isSignedIn: false,
      },

      // Function to sign in and set guid
      signIn: (guid: string) =>
        set((state) => ({
          authData: { ...state.authData, isSignedIn: true, guid },
        })),

      // Function to sign out and clear guid
      signOut: () =>
        set((state) => ({
          authData: { ...state.authData, isSignedIn: false, guid: "" },
        })),

      // Function to set auth data directly
      setAuthData: (data: AuthData) =>
        set(() => ({
          authData: data,
        })),
    }),
    {
      name: "authData-storage", // Local storage key
      partialize: (state) => ({ authData: state.authData }), // Persist authData
    }
  )
);
