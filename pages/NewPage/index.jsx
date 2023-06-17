import useImageStoreData from "@/hooks/imageStore";
import React from "react";

const NewPage = () => {
  const { imageData } = useImageStoreData();
  console.log(imageData);
  return (
    <div className="flex h-[100vh] items-center w-full justify-center text-3xl">
      <div>{imageData}</div>
    </div>
  );
};

export default NewPage;
