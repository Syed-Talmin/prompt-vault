import * as aiService from "../services/ai.service.js";

export const genrateTagController = async (req, res) => {
  const { prompt } = req.query;
  const tags = await aiService.generateTag(prompt);
  return res.status(200).json({ tags });
};

export const improvePromptController = async (req, res) => {
  const { prompt } = req.query;
  const improvedPrompt = await aiService.improvePrompt(prompt);
  return res.status(200).json({ improvedPrompt });
};