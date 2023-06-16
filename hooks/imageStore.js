import { create } from "zustand";

const useImageStoreData = create((set) => ({
  imageData: null,
  setImageData: (data) => set({ imageData: data }),
}));

export default useImageStoreData;
