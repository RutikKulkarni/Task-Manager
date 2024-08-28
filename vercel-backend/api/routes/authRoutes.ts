import { Router } from "express";
import { signUp, login } from "../controllers/authController";

const router = Router();
router.post("/signup", signUp);
router.post("/login", login);

export default router;
