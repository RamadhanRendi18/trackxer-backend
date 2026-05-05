import prisma from "../lib/prisma.js";

// SECTION LIST SPORT TYPE
export const getSportType = async (req, res) => {
    try{
        const sportType = await prisma.sportType.findMany({
            select: {
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true,
            }
        });

        res.json(sportType);
    } catch(error){
        res.status(500).json({ message: error.message });
    }
}

// SECTION DETAIL SPORT TYPE
export const getSportTypeById = async (req, res) => {
    try{
        const sportType = await prisma.sportType.findUnique({
            where: { id: Number(req.params.id) }
        });

        if(!sportType){
            return res.status(404).json({ message: "Sport Type tidak ditemukan" });
        }

        res.json(sportType);

    } catch(error){
        res.status(500).json({ message: error.message });
    }
}

// SECTION TAMBAH SPORT TYPE
export const createSportType = async (req, res) => {
    try{
        const { name } = req.body
        
        const sportType = await prisma.sportType.create({
            data: {
                name
            }
        })

        res.status(201).json({
            message: "Sport Type berhasil dibuat",
            sportType
        })
        
    } catch(error){
        res.status(500).json({ message: error.message })
    }
}

// SECTION UBAH SPORT TYPE
export const updateSportType = async (req, res) => {
    try{
        const { name } = req.body;

        const sportType = await prisma.sportType.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                name
            }
        });

        res.status(200).json({
            message: "Sport Type berhasil diubah",
        });
        
    } catch(error){
        res.status(500).json({ message: error.message })
    }
} 

// SECTION HAPUS SPORT TYPE
export const deleteSportType = async (req, res) => {
    try{
        const sportType = await prisma.sportType.delete({
            where: {
                id: Number(req.params.id)
            }
        })

        res.status(200).json({ message: "Sport Type berhasil dihapus", });
    } catch(error){
        res.status(500).json({ message: error.message });
    }
}