import prisma from "@/libs/prismadb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const {
      Marka,
      Model,
      Yil,
      Km,
      Yakit,
      Vites,
      Tramer,
      Takas,
      Fiyat,
      Iletisim,
      Sehir,
      Boya,
      Degisen,
      Aciklama,
    } = req.body;

    const car = await prisma.car.create({
      data: {
        marka: Marka,
        model: Model,
        yil: Yil,
        km: Km,
        yakit: Yakit,
        vites: Vites,
        tramer: Tramer,
        takas: Takas,
        fiyat: Fiyat,
        iletisim: Iletisim,
        sehir: Sehir,
        boya: Boya,
        degisen: Degisen,
        aciklama: Aciklama,
      },
    });

    return res
      .status(200)
      .json({ carId: car.id, result: "Başarıyla kaydedildi." });
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
