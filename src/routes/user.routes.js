import express from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/user.controller.js"
import { authenticate, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// auth cek
router.use(authenticate);

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", isAdmin, deleteUser);

export default router;