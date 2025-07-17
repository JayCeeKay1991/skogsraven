import { create } from "zustand";

type StoreState = {
  query: string;
  showProducts: boolean;
  updateQuery: (newQuery: string) => void;
  updateShowProducts: (updatedShowProducts: boolean) => void;
};

const useStore = create<StoreState>((set) => ({
  query: "",
  showProducts: false,
  updateQuery: (newQuery: string) => set({ query: newQuery }),
  updateShowProducts: (updatedShowProducts) =>
    set({ showProducts: updatedShowProducts }),
}));

export default useStore;
