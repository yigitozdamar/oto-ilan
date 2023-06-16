import { create } from "zustand";

const useStoreData = create((set) => ({
  carData: null,
  setCarData: (data) => set({  carData: data }),
}));

export default useStoreData;
