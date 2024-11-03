import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthData {
  guid: string;
  isSignedIn: boolean;
  showPleaseSignInPopup: boolean;
  showBadAccessPopup: boolean;
}

interface AuthStore {
  authData: AuthData;
  signIn: (guid: string) => void;
  signOut: () => void;
  setAuthData: (data: AuthData) => void;
  setShowPleaseSignInPopup: (show: boolean) => void;
  setBadAccessPopup: (show: boolean) => void;
}

// Zustand store creation
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      authData: {
        guid: "",
        isSignedIn: false,
        showPleaseSignInPopup: false,
        showBadAccessPopup: false,
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

      // Function to toggle showPleaseSignInPopup
      setShowPleaseSignInPopup: (show: boolean) =>
        set((state) => ({
          authData: {
            ...state.authData,
            showPleaseSignInPopup: show,
          },
        })),

      setBadAccessPopup: (show: boolean) =>
        set((state) => ({
          authData: {
            ...state.authData,
            showBadAccessPopup: show,
          },
        })),
    }),
    {
      name: "authData-storage", // Local storage key
      partialize: (state) => ({ authData: state.authData }), // Persist only authData
    }
  )
);
