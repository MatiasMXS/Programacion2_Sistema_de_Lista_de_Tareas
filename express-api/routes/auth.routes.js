import { Router } from "express";
import "dotenv/config";
import { register, login } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;
