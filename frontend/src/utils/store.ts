import { create } from "zustand";

type QueryState = {
  query: string;
  updateQuery: (newQuery: string) => void;
  clearQuery: () => void;
};

const useStore = create<QueryState>((set) => ({
  query: "",
  updateQuery: (newQuery: string) => set({ query: newQuery }),
  clearQuery: () => set({ query: "" }),
}));

export default useStore;
