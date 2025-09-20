import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {jsonExportController, notionExportController, pdfExportController} from "../controllers/export.controller.js"


const router = Router();

router.get("/prompts/json", authMiddleware, jsonExportController);

router.get("/prompts/pdf", authMiddleware, pdfExportController);

router.get("/prompts/notion", authMiddleware, notionExportController);

export default router;
