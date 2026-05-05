import express from "express";
import {
    getSportType,
    getSportTypeById,
    createSportType,
    updateSportType,
    deleteSportType
} from "../controllers/sportType.controller.js"
import { authenticate, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// auth cek
router.use(authenticate);

router.get("/", isAdmin, getSportType);
router.get("/:id", isAdmin, getSportTypeById);
router.post("/", isAdmin, createSportType);
router.put("/:id", isAdmin, updateSportType);
router.delete("/:id", isAdmin, deleteSportType);

export default router;