import React, { useCallback, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import turkishCities from "@/constants/Constants";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-hot-toast";
import useStoreData from "@/hooks/store";

const Homepage = () => {
  const router = useRouter();
  const [carIDResponse, setCarIDResponse] = useState("");
  const [result, setResult] = useState("");
  const { carData, setCarData } = useStoreData();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: carData,
  });

  const onSubmit = useCallback(
    async (carData) => {
      const response = await axios.post("/api/cardataPost", carData);
      setCarData(carData);
      setCarIDResponse(response.data.carId);
      setResult(response.data.result);
      toast.success(`${response.data.carId} id'li ${response.data.result}`);
      router.push({
        pathname: "/CarPhoto",
        query: {
          carId: response.data.carId,
        },
      });
    },
    [router]
  );

  return (
    <div className="w-full bg-gray-200 flex flex-col mx-auto">
      <form
        className="h-full flex flex-col gap-4 w-[250px] mx-auto my-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-neutral-500">ŞEHİR</label>
          <select
            className="h-10 rounded-md p-2"
            {...register("Sehir", { required: false })}
          >
            {turkishCities.map((city) => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-neutral-500">MARKA</label>
          <input
            className="h-10 rounded-md p-2"
            type="text"
            placeholder="Marka"
            {...register("Marka", { required: false, maxLength: 100 })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-neutral-500">MODEL</label>
          <input
            className="h-10 rounded-md p-2"
            type="text"
            placeholder="Model"
            {...register("Model", { required: false, maxLength: 100 })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-neutral-500">YIL</label>
          <input
            className="h-10 rounded-md p-2"
            type="text"
            placeholder="2023"
            {...register("Yil", { required: false, maxLength: 100 })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-neutral-500">KM</label>
          <input
            className="h-10 rounded-md p-2"
            type="text"
            placeholder="KM"
            {...register("Km", { required: false, maxLength: 100 })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-neutral-500">VİTES</label>
          <select
            className="h-10 rounded-md p-2"
            {...register("Vites", { required: false })}
          >
            <option value="Manuel">Manuel</option>
            <option value="Otomatik">Otomatik</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-neutral-500">YAKIT</label>
          <select
            className="h-10 rounded-md p-2"
            {...register("Yakit", { required: false })}
          >
            <option value="Benzin">Benzin</option>
            <option value="Dizel">Dizel</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-neutral-500">TRAMER(TL)</label>
          <input
            className="h-10 rounded-md p-2"
            type="text"
            placeholder="0"
            {...register("Tramer", { required: false, maxLength: 100 })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-neutral-500">DEĞİŞEN</label>
          <input
            className="h-10 rounded-md p-2"
            type="text"
            placeholder="Değişen"
            {...register("Degisen", { required: false, maxLength: 100 })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-neutral-500">BOYA</label>
          <input
            className="h-10 rounded-md p-2"
            type="text"
            placeholder="Boya"
            {...register("Boya", { required: false, maxLength: 100 })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-neutral-500">TAKAS</label>
          <select
            className="h-10 rounded-md p-2"
            {...register("Takas", { required: false })}
          >
            <option value="Sadece Satilik">Sadece Satılık</option>
            <option value="Takasa Acik">Takasa Açık</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-neutral-500">AÇIKLAMA</label>
          <input
            className="h-10 rounded-md p-2"
            type="text"
            placeholder="Açıklama"
            {...register("Aciklama", { required: false, maxLength: 100 })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-neutral-500">FİYAT(TL)</label>
          <input
            className="h-10 rounded-md p-2"
            type="text"
            placeholder="0"
            {...register("Fiyat", { required: false, maxLength: 100 })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-neutral-500">İLETİŞİM</label>
          <input
            className="h-10 rounded-md p-2"
            type="text"
            placeholder="İletişim"
            {...register("Iletisim", { required: false, maxLength: 100 })}
          />
        </div>

        <input
          className="h-12 mt-10 border-2 rounded-md p-2 flex items-center bg-blue-600 text-white"
          type="submit"
          value="Kaydet ve Devam Et"
        />
      </form>
    </div>
  );
};

export default Homepage;
