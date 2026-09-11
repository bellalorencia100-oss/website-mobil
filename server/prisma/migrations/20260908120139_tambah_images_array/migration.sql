/*
  Warnings:

  - You are about to drop the column `image` on the `Mobil` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Mobil" DROP COLUMN "image",
ADD COLUMN     "images" TEXT[];
