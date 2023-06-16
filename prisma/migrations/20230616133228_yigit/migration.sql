-- CreateTable
CREATE TABLE "Car" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "marka" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "yil" TEXT NOT NULL,
    "km" TEXT NOT NULL,
    "yakit" TEXT NOT NULL,
    "vites" TEXT NOT NULL,
    "tramer" TEXT NOT NULL,
    "takas" TEXT NOT NULL,
    "fiyat" TEXT NOT NULL,
    "iletisim" TEXT NOT NULL,
    "sehir" TEXT NOT NULL,
    "boya" TEXT NOT NULL,
    "degisen" TEXT NOT NULL,
    "aciklama" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "carId" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    CONSTRAINT "Image_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
