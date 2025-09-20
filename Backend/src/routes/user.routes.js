import {Router} from "express";
import { registerController, loginController, logoutController, userController,updateUserController } from "../controllers/user.controller.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";

const router = Router()

router.post("/register",registerController)
router.post("/login",loginController)
router.post("/logout",logoutController)
router.patch('/update',authMiddleware, updateUserController)
router.get("/profile",authMiddleware,userController)

export default router