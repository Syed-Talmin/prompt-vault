import express from "express";
import { getAllCommunityPromptController, likePromptController, savePromptController, getSavedPromptController,fetchedCommentsController,addCommentController  } from "../controllers/communityPrompt.controller.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/prompts",authMiddleware,getAllCommunityPromptController);
router.post("/prompts/:id/like",authMiddleware,likePromptController);
router.post("/prompts/:id/save",authMiddleware,savePromptController);
router.get("/prompts/saved",authMiddleware,getSavedPromptController);
router.route("/prompts/:id/comments")
    .get(authMiddleware,fetchedCommentsController)
    .post(authMiddleware,addCommentController)


    
export default router