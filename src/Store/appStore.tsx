import { create } from "zustand";

interface AppStore {
  search: string;
  setSearch: (val: string) => void;
}
export const appStore = create<AppStore>((set) => ({
  search: "",
  setSearch: (val: string) => set(() => ({ search: val })),
}));
