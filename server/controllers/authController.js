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

  const { password: pw, ...userData } = newUser;
  return res.status(201).json({
    message: "berhasil mendaftar silahkan login",
    userData,
  });
};

//LOGIKA LOGIN
export const loginUser = async (req, res) => {
  const { password, email } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email dan pasword wajib di isi!" });
  }

  const foundUser = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!foundUser) {
    return res.status(404).json({ message: "email tidak ditemukan" });
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
