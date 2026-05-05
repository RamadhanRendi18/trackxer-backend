import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

// SECTION LIST USER
export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            }
        });

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// SECTION DETAIL USER
export const getUserById = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(req.params.id) }
        });

        if(!user){
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        res.json(user);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// SECTION CREATE USER
export const createUser = async (req, res) =>  {
    try {
        const { name, email, password } = req.body;

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        res.status(201).json({
            message: "User berhasil dibuat",
            user
        });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// SECTION UPDATE USER
export const updateUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        const user = await prisma.user.update({
            where: { id: Number(req.params.id) },
            data: { name, email }
        });

        res.status(200).json({
            message: "User berhasil diupdate",
            user
        });
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}

// SECTION DELETE USER
export const deleteUser = async (req, res) => {
    try{
        await prisma.user.delete({
            where: { id: Number(req.params.id) }
        });
        
        res.json({ message: "User berhasil dihapus" });
    } catch (error){
        res.status(500).json({ message: error.message });
    }
}