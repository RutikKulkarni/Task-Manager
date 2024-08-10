// import { Router } from "express";
// import { auth } from "../middlewares/auth";
// import { getUserData, updateUserName, updateUserPassword } from "../controllers/userController";

// const router = Router();

// router.use(auth);
// router.get("/userdata", getUserData);
// router.put("/userdata/name", updateUserName);
// router.put("/userdata/password", updateUserPassword);

// export default router;

// src/routes/userRoutes.ts
import { Router } from "express";
import { auth } from "../middlewares/auth";
import { getUserData, updateUserName, updateUserPassword } from "../controllers/userController";

const router = Router();

router.use(auth);
router.get("/userdata", getUserData); // Route to get user data
router.put("/userdata/name", updateUserName); // Route to update user name
router.put("/userdata/password", updateUserPassword); // Route to update user password

export default router;
