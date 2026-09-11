import {prisma} from "../lib/prisma.js";

export const getAllUsers = async (req, res) => {
    const users = await prisma.user.findMany({
        select: {
            id:true,
            username: true,
            email: true,
            fullName: true,
            role: true,
        },
    });
    return res.status(200).json({
        message: "Berhasil menampilkan semua user",
        users,
    });
};


export const updateUser = async(req, res) => {
const {id}= req.params;
const { username, email, fullName, role } =req.body;

const user = await prisma.user.findUnique({
    where: { id: id},
});

if (!user) {
return res.status(404).json({message: "user tidak ditemukan"})
}

if (!username || !email || !fullName){
    return res.status(400).json({ message: "username, email, dan nama lengkap wajib di isi"})
}
const updatedUser = await prisma.user.update({
    where: {id : id},
    data: { username, email, fullName, role },
});


const {password: pw, ...userData} = updatedUser;

return res.status(200).json({message:"user berhasil di update", userData});
};

export const deleteUser = async (req, res) => {
const { id } = req.params;

const user = await prisma.user.findUnique({
where: { id: id},
})
if (!user){
return res.status(404).json({message:"user tidak ditemukan"});

}

await prisma.user.delete({
    where: { id:id },
});
return res.status(200).json({message:"username berhasil di hapus"})
}
