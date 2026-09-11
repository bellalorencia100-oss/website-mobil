import { prisma } from "../lib/prisma.js";
import cloudinary from "../lib/cloudinary.js";
import fs from "fs";
import { ulid } from "ulid";

//LOGIKA TAMBAH KATEGORI
export const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ message: "nama tidak boleh kosong, wajib di isi" });
  }

  let icon = null;
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "websitemobil",
    });
    icon = result.secure_url;
    fs.unlinkSync(req.file.path);
  }

  const newCategory = await prisma.category.create({
    data: {
      id: ulid(),
      name,
      icon,
    },
  });
  return res
    .status(201)
    .json({ message: "berhasil membuat categori baru", newCategory });
};

//LOGIKA MELIHAT SEMUA KATEGORI
export const getAllCategories = async (req, res) => {
  const categories = await prisma.category.findMany({});
  return res.status(200).json({
    message: "berhasil menampilkan semua kategori",
    categories,
  });
};

//LOGIKA MELIHAT KATEGORI BERDASARKAN ID
export const getCategoryById = async (req, res) => {
  const { id } = req.params;
  const category = await prisma.category.findUnique({
    where: { id:id },
  });

  if (!category) {
    return res.status(404).json({
      message: "categori yang kamu cari tidak ditemukan",
      category,
    });
  }
  return res
    .status(200)
    .json({ message: "categori yang kamu cari ketemu", category });
};

//LOGIKA UPDATE KATEGORI
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await prisma.category.findUnique({
    where: { id:id },
  });

  if (!category) {
    return res.status(404).json({ message: "kategori tidak ditemukan" });
  }
  if (!name) {
    return res.status(400).json({ message: "nama kategori wajib di isi" });
  }

  let icon = category.icon;
  if (req.file) {
    if (category.icon){
      const parts =category.icon.split("/");
      const fileNameWithExt = parts[parts.length - 1];
      const folder = parts[parts.length - 2];
      const fileName = fileNameWithExt.split(".")[0];
      const publicId = `${folder}/${fileName}`;

      await cloudinary.uploader.destroy(publicId);
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "websitemobil",
    });
    icon = result.secure_url;
    fs.unlinkSync(req.file.path);
  }
  const updatedCategory = await prisma.category.update({
    where: { id: id },
    data: { name, icon },
  });
  return res
    .status(200)
    .json({ message: "kategori berhasil di update", updatedCategory });
};

//LOGIKA HAPUS KATEGORI
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  const category = await prisma.category.findUnique({
    where: { id: id },
  });
  if (!category) {
    return res.status(404).json({ message: "kategori tidak di temukan" });
  }
  if (category.icon){
    const parts = category.icon.split("/");
    const fileNameWithExt = parts[parts.length - 1];
    const folder = parts[parts.length - 2];
    const fileName = fileNameWithExt.split(".")[0];
    const publicId = `${folder}/${fileName}`;

    await cloudinary.uploader.destroy(publicId)
  }

try {
  await prisma.category.delete({
    where: { id: id },
  });
   return res.status(200).json({ message: "Kategori berhasil di hapus" });
} catch (error) {
  return res.status(400).json({
    message: "Kategori tidak bisa di hapus karena masih di pakai oleh mobil"
});
}
};
