import promptModel from "../models/prompt.model.js";
export const createPromptController = async (req, res) => {
  try {
    const { title, content, tags, category, isPublic } = req.body;
    const prompt = await promptModel.create({
      title,
      content,
      tags,
      category,
      isPublic,
      owner: req.user._id,
    });

    return res
      .status(201)
      .json({ message: "Prompt created successfully", prompt });
  } catch (error) {
    console.log(error);
    
    res
      .status(500)
      .json({ message: "Something went wrong when creating prompt" });
  }
};

export const getAllPromptController = async (req, res) => {
  try {
    const prompts = await promptModel
      .find({ owner: req.user._id })
      .sort({ createdAt: -1 })
      .populate("owner");
    return res.status(200).json({ prompts });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong when getting prompts" });
  }
};

export const getPromptController = async (req, res) => {
  try {
    const id = req.params.id;
    const prompt = await promptModel.findById(id).populate("owner");
    return res.status(200).json({ prompt });
  } catch (error) {

    res
      .status(500)
      .json({ message: "Something went wrong when getting prompt" });
  }
};

export const updatePromptController = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const prompt = await promptModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return res.status(200).json({ prompt });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong when updating prompt" });
  }
};

export const deletePromptController = async (req, res) => {
  try {
    const id = req.params.id;
    await promptModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Prompt deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong when deleting prompt" });
  }
};
