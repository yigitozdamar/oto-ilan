import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import useImageStoreData from "@/hooks/imageStore";

const ImageUploader = ({ carId }) => {
  const [images, setImages] = useState([]);
  const router = useRouter();
  const { imageData, setImageData } = useImageStoreData();
  const onDrop = (acceptedFiles) => {
    // Limit the number of images to 10
    const newImages = acceptedFiles.slice(0, 10 - images.length);
    setImages([...images, ...newImages]);
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "green",
          borderRadius: "50%",
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "green",
          borderRadius: "50%",
        }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    multiple: true,
  });

  const submitImages = useCallback(
    async (cardId) => {
      try {
        if (images.length > 0) {
          const formData = new FormData();
          formData.append("carId", carId);
          images.forEach((image, index) => {
            formData.append(`image${index}`, image);
          });

          const response = await axios.post("/api/imagePost", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          //const message = response.data.result;
          //setImageData(message);
          const textme = "asdasd";
          console.log("CARDID", cardId);
          const secondApi = await axios.post(
            "http://127.0.0.1:5000/metin_post",
            {
              carId,
            }
          );

          // console.log(
          //   "http://127.0.0.1:5000/foto_post:",
          //   secondApi.data.Response
          // );

          setImageData(secondApi.data.Response);

          console.log("Images uploaded successfully");

          toast.success("Kaydınız başarıyla oluşturulmuştur");

          setTimeout(() => {
            router.push("/NewPage");
          }, 2000);
          setImages([]);

          // DENEME API
          // const response = await axios.get(
          //   "https://api.covidtracking.com/v1/us/daily.json"
          // );
          // console.log(response.data[0].date);
          // setImageData(response.data[0]);
          // router.push("/NewPage");
        } else {
          toast.error("Lütfen bir fotoğraf seçiniz");
        }
      } catch (error) {
        console.error("Error uploading images:", error);
      }
    },
    [images]
  );

  return (
    <div className="flex flex-col justify-center items-center">
      <div
        {...getRootProps()}
        className={`dropzone w-1/3 mx-auto border-2 justify-center border-gray-300 border-dashed rounded-lg p-4 text-center ${
          isDragActive ? "bg-gray-100" : "bg-white"
        }`}
      >
        <input accept="image/*" {...getInputProps()} />
        <div className="flex flex-col items-center w-1/3 mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            fill="#000"
            version="1.1"
            viewBox="0 0 460.384 460.384"
            xmlSpace="preserve"
            className=" "
          >
            <path d="M95.252 283.11c-13.807 0-25.039 11.232-25.039 25.039s11.232 25.039 25.039 25.039 25.039-11.233 25.039-25.039-11.232-25.039-25.039-25.039zm0 35.078c-5.536 0-10.039-4.504-10.039-10.039s4.503-10.039 10.039-10.039 10.039 4.503 10.039 10.039-4.503 10.039-10.039 10.039zM357.012 283.11c-13.807 0-25.04 11.232-25.04 25.039s11.233 25.039 25.04 25.039c13.806 0 25.038-11.233 25.038-25.039s-11.232-25.039-25.038-25.039zm0 35.078c-5.536 0-10.04-4.504-10.04-10.039s4.504-10.039 10.04-10.039c5.535 0 10.038 4.503 10.038 10.039s-4.503 10.039-10.038 10.039z"></path>
            <path d="M409.227 196.421l-66.917-7.645-35.714-58.056c-10.905-17.728-30.61-28.741-51.424-28.741H133.676c-34.925 0-65.792 23.518-75.063 57.193l-.948 3.445c-4.607 16.733-17.845 30.052-34.549 34.762C9.506 201.217 0 213.773 0 227.914v83.012a7.5 7.5 0 007.5 7.5h38.557c4.757 22.798 25.006 39.978 49.195 39.978s44.438-17.18 49.195-39.978h163.37c4.757 22.798 25.006 39.978 49.195 39.978s44.438-17.18 49.195-39.978h40.477a7.5 7.5 0 007.452-6.65l5.874-51.483c3.604-31.603-19.176-60.256-50.783-63.872zM15 294.313h31.949a49.96 49.96 0 00-1.724 9.113H15v-9.113zm80.252 49.091c-19.44 0-35.255-15.815-35.255-35.255s15.815-35.256 35.255-35.256 35.255 15.816 35.255 35.256-15.815 35.255-35.255 35.255zm261.76 0c-19.44 0-35.255-15.815-35.255-35.255s15.815-35.256 35.255-35.256 35.255 15.816 35.255 35.256-15.815 35.255-35.255 35.255zm0-85.511c-16.987 0-32.021 8.48-41.122 21.42H182.425a7.5 7.5 0 000 15h126.284a49.96 49.96 0 00-1.724 9.113H145.279c-2.389-25.504-23.909-45.533-50.027-45.533-16.987 0-32.021 8.48-41.122 21.42H15v-51.399c0-7.455 5.012-14.075 12.187-16.098 21.728-6.126 38.947-23.452 44.94-45.218l.948-3.445c7.484-27.186 32.405-46.174 60.601-46.174h121.496c15.643 0 30.452 8.277 38.647 21.6l37.626 61.164a7.503 7.503 0 005.537 3.522l70.541 8.059c16.002 1.831 28.943 12.335 34.67 26.276H418.78a7.5 7.5 0 000 15h26.578a42.894 42.894 0 01-.253 5.993l-2.364 20.72h-44.608c-9.1-12.94-24.135-21.42-41.121-21.42zm50.026 45.533a49.876 49.876 0 00-1.724-9.113h35.716l-1.04 9.113h-32.952z"></path>
            <path d="M255.565 215.222h-15.76a7.5 7.5 0 000 15h15.76a7.5 7.5 0 000-15zM154.846 222.722a7.5 7.5 0 00-7.5-7.5h-15.76a7.5 7.5 0 000 15h15.76a7.5 7.5 0 007.5-7.5zM164.136 283.941c-1.314-3.113-4.658-5.069-8.025-4.546a7.58 7.58 0 00-6.213 5.776c-1.496 6.51 6.051 11.564 11.54 7.829 2.905-1.976 4.038-5.814 2.698-9.059-.19-.45.19.46 0 0zM286.014 143.391c-6.531-10.637-18.348-17.245-30.841-17.245h-121.5c-24.087 0-45.371 16.217-51.761 39.443l-.943 3.438c-2.468 8.956-6.268 24.34-6.429 24.991a7.501 7.501 0 007.281 9.298h227.64a7.499 7.499 0 006.388-11.43l-29.835-48.495zm-86.662-2.246v47.169h-69.054v-47.018a38.526 38.526 0 013.375-.151h65.679zm-103.92 31.857l.944-3.441c2.86-10.395 9.865-18.839 18.922-23.747v42.499H91.432c1.265-4.992 2.81-10.99 4-15.311zm118.92 15.312v-47.169h40.821c7.316 0 14.235 3.868 18.062 10.1l22.807 37.069h-81.69z"></path>
          </svg>
          <p className=" justify-start items-start">
            Fotoğraflarınızı sürekleyerek yada buraya tıklayarak
            yükleyebilirsiniz
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p>
          Yüklenen Fotoğraf Sayısı:{" "}
          <span className="font-bold">{images.length}</span>
        </p>
        {images.length < 1 && (
          <p className="text-red-500">Lütfen en az 1 fotoğraf yükleyiniz</p>
        )}
        <p>Maksimum 10 adet fotoğraf yükleyebilirsiniz</p>
      </div>
      {images.length > 0 && (
        <Slider {...settings} className="w-1/3 mx-auto mt-4 relative ">
          {images.map((image, index) => (
            <div key={index} className="">
              <img
                src={URL.createObjectURL(image)}
                alt={`Image ${index}`}
                className=" h-72 object-contain"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-2 bg-red-500 text-white px-2 py-1 rounded"
              >
                Resmi Sil
              </button>
            </div>
          ))}
        </Slider>
      )}
      <div>
        <button
          onClick={submitImages}
          className="bg-blue-500 mt-10 text-white px-2 py-1 rounded"
        >
          Kaydı Tamamla
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;
