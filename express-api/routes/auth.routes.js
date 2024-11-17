import { Router } from "express";
import "dotenv/config";
import { register, login, actualizar } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.put("/update", actualizar);


export default router;
