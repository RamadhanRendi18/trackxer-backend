import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main(){
    // hash password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // create admin
    await prisma.user.upsert({
        where: {
            email: "admin@gmail.com"
        },
        update: {},
        create: {
            name: "Admin",
            email: "admin@gmail.com",
            password: hashedPassword,
            role: "admin"
        }
    })

    console.log("Seed Admin Berhasil");
}

main()
    .catch((e) => {
        console.error(e);
    }).finally(async () => {
        await prisma.$disconnect();
    });