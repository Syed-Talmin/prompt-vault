import express from 'express';
import { genrateTagController, improvePromptController } from '../controllers/ai.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get("/genrate-tag",authMiddleware,genrateTagController)
router.get("/improve-prompt",authMiddleware,improvePromptController)

export default router