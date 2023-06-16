import fs from "fs";
import path from "path";
import prisma from "@/libs/prismadb";
import { withFileUpload, getConfig } from "next-multiparty";

export default withFileUpload(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  try {
    // Normalde req.body alırız ama burada withUpload kullandığımız için docs'ta req.files demiş.
    const imagefiles = req.files;
    if (imagefiles && imagefiles.length > 0) {
      // Fotoları kayıt için
      const imageObjects = [];

      // image id = imagepathname
      for (const imageUrl of imagefiles) {
        const imageName = path.basename(imageUrl.originalFilename);
        const imagePath = path.join(
          __dirname,
          "../../../../public",
          "images",
          imageName
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
      }

      console.log(res);
      return res.status(200).json({
        result: "Başarıyla kaydedildi. Foto var",
        images: imageObjects,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
});

export const config = getConfig();
