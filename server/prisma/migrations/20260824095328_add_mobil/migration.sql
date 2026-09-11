-- CreateTable
CREATE TABLE "Mobil" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "tahun" INTEGER NOT NULL,
    "harga" INTEGER NOT NULL,
    "stok" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Mobil_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Mobil" ADD CONSTRAINT "Mobil_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
