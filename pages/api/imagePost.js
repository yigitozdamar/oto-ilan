import fs from "fs";
import path from "path";
import prisma from "@/libs/prismadb";
import { withFileUpload, getConfig } from "next-multiparty";

let idNums = 0;
let imagePath = "";

// Function to read the value of idNums from the file
const readIdNums = () => {
  try {
    const idCounterPath = path.join(__dirname, "idCounter.txt");
    const content = fs.readFileSync(idCounterPath, "utf-8");
    return parseInt(content);
  } catch (error) {
    console.log("Error reading idCounter file:", error);
    return 0; // Return 0 if the file doesn't exist or couldn't be read
  }
};

// Function to write the updated value of idNums to the file
const writeIdNums = (value) => {
  try {
    const idCounterPath = path.join(__dirname, "idCounter.txt");
    fs.writeFileSync(idCounterPath, value.toString());
  } catch (error) {
    console.log("Error writing idCounter file:", error);
  }
};

// Initialize idNums with the value from the file on server start
idNums = readIdNums();

export default withFileUpload(async (req, res) => {
  idNums = readIdNums();
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  try {
    const imagefiles = req.files;
    if (imagefiles && imagefiles.length > 0) {
      // Fotoları kayıt için
      const imageObjects = [];

      // image id = imagepathname
      for (const imageUrl of imagefiles) {
        const imageName = path.basename(imageUrl.originalFilename);
        const fileExtension = imageName.substring(imageName.lastIndexOf("."));
        const lastName = idNums + fileExtension;

        imagePath = path.join(
          __dirname,
          "../../../../public",
          "images",
          lastName
        );

        //Fotoları birden fazla olduğunda kayıt yaparken sıkıntı yaşamamak için kullanıyoruz
        const bufferFile = await imageUrl.toBuffer();
        fs.writeFileSync(imagePath, bufferFile);

        const carId = req.fields.carId;
        const sendingImage = await prisma.image.create({
          data: {
            carId: Number(carId),
            imageUrl: imagePath,
          },
        });

        imageObjects.push(sendingImage);
        idNums = idNums + 1;

        // Write the updated idNums value back to the file
        writeIdNums(idNums);
      }

      return res.status(200).json({
        result: `Başarıyla kaydedildi. ${imagePath}`,
        images: imageObjects,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
});

export const config = getConfig();
