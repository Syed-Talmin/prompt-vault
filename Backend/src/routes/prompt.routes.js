import {Router} from "express";
import { createPromptController, deletePromptController, getAllPromptController, getPromptController, updatePromptController } from "../controllers/prompt.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router()

router.post("/create",authMiddleware,createPromptController)
router.get("/get-all",authMiddleware,getAllPromptController)
router.get("/get/:id",authMiddleware,getPromptController)
router.put("/update/:id",authMiddleware,updatePromptController)
router.delete("/delete/:id",authMiddleware,deletePromptController)


export default router