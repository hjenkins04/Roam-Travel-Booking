import { create } from "zustand";

interface LoaderStore {
  isLoading: boolean;
  childrenHidden: boolean;
  showChildren: () => void;
  hideChildren: () => void;
  showLoader: () => void;
  hideLoader: () => void;
}

// Zustand store creation
export const useLoaderStore = create<LoaderStore>((set) => ({
  isLoading: false,
  childrenHidden: false,

  showLoader: () => set({ isLoading: true }),
  hideLoader: () => set({ isLoading: false }),
  showChildren: () => set({ childrenHidden: false }),
  hideChildren: () => set({ childrenHidden: true }),
}));
