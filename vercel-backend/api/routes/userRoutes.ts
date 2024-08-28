import { Router } from "express";
import { auth } from "../middlewares/auth";
import { getUserData, updateUserName, updateUserPassword } from "../controllers/userController";

const router = Router();

router.use(auth);
router.get("/userdata", getUserData);
router.put("/userdata/name", updateUserName);
router.put("/userdata/password", updateUserPassword);

export default router;
