import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "token tidak ditemukan, silahkan login" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "token tidak valid atau sudah kedaluarsa" });
  }
};

export const verifyAdmin = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    if (!user) {
      return res.status(404).json({ message: "user tidak ditemukan" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Akses ditolak, khusus admin" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "terjadi kesalahan server" });
  }
};
