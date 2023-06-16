import React from "react";
import { useRouter } from "next/router";
import ImageUploader from "@/components/ImageUploader";

const HomePage2 = () => {
  const router = useRouter();
  const { carId } = router.query;

  return (
    <div className="flex flex-col">
      <div className="flex justify-start">
      <button
        onClick={() => router.push(`/`)}
        className="text-white font-semibold bg-red-400 p-2 rounded-md"
        >
        Ana Sayfaya Dön
      </button>
        </div>
      <ImageUploader carId={carId} />
    </div>
  );
};

export default HomePage2;
