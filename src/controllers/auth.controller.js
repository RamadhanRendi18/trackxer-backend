import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    try{
        const { email, password } = req.body;

        // cek user
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if(!user){
            return res.status(404).json({ message: "User tidak ditemukan" });
        }
        
        // cek password
        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch){
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        // generate token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // response
        res.json({
            message: "Login Berhasil",
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        });


    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}