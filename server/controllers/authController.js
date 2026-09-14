import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import { ulid } from "ulid";

//LOGIKA REGISTER
export const registerUser = async (req, res) => {
  const { username, password, email, fullName } = req.body;

  if (!username || !email || !password || !fullName) {
    return res.status(400).json({
      message: "nama, email, dan password wajib di isi",
    });
  }
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ username: username }, { email: email }],
    },
  });

  if (existingUser) {
    return res
      .status(409)
      .json({ message: "email atau username sudah terdaftar" });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      id: ulid(),
      username,
      password: hashPassword,
      email,
      fullName,
    },
  });

  const token = jwt.sign(
    { id: newUser.id, username: newUser.username, role: newUser.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  const { password: pw, ...userData } = newUser;
  return res.status(201).json({
    message: "berhasil mendaftar silahkan login",
    token,
    user: userData,
  });
};

//LOGIKA LOGIN
export const loginUser = async (req, res) => {
  const { password, identifier } = req.body;

  if (!identifier || !password) {
    return res
      .status(400)
      .json({ message: "email/username dan password wajib di isi!" });
  }

  const foundUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: identifier }, { username: identifier }],
    },
  });

  if (!foundUser) {
    return res.status(404).json({ message: "email/username tidak ditemukan" });
  }

  const isPasswordvalid = await bcrypt.compare(password, foundUser.password);
  if (!isPasswordvalid) {
    return res
      .status(401)
      .json({ message: "password tidak benar silahkan periksa kembali" });
  }

  const token = jwt.sign(
    { id: foundUser.id, username: foundUser.username, role: foundUser.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  return res.status(200).json({
    message: "Login Berhasil",
    token,
    user: {
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
      fullName: foundUser.fullName,
      role: foundUser.role,
    },
  });
};

//LOGIKA AMBIL DATA PROFIL
export const getProfile = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
  });

  if (!user) {
    return res.status(404).json({ message: "user tidak ditemukan" });
  }
  const { password, ...userData } = user;
  return res.status(200).json({ user: userData });
};

//LOGIKA UPDATE DATA PROFILE
export const updateProfile = async (req, res) => {
  const { fullName, noHp } = req.body;

  const updatedUser = await prisma.user.update({
    where: { id: req.user.id },
    data: { fullName, noHp },
  });

  const { password, ...userData } = updatedUser;
  return res
    .status(200)
    .json({ message: "profile berhasil di perbarui", user: userData });
};

//LOGIKA UBAH PASSWORD
export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: "password lama dan password baru wajib di isi" });
  }

  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
  });

  if (!user) {
    return res.status(404).json({ message: "user tidak ditemukan" });
  }
  const isPasswordvalid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordvalid) {
    return res.status(401).json({ message: "password lama tidak benar" });
  }

  const hashNewPassword = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: req.user.id },
    data: { password: hashNewPassword },
  });
  return res.status(200).json({ message: "password berhasil di ubah" });
};
