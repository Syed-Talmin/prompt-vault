import Prompt from "../models/prompt.model.js";
import userModel from "../models/user.model.js";
import commentModel from "../models/comment.model.js";

export const getAllCommunityPromptController = async (req, res) => {
  try {
    const { search, sort, page = 1, limit = 10 } = req.query;

    let filter = { isPublic: true };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    let sortOption = {};
    if (sort === "popularity") sortOption = { likes: -1 };
    if (sort === "newest") sortOption = { createdAt: -1 };
    if (sort === "oldest") sortOption = { createdAt: 1 };

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [prompts, total] = await Promise.all([
      Prompt.find(filter)
        .populate("owner")
        .sort(sortOption)
        .skip(skip)
        .limit(parseInt(limit)),
      Prompt.countDocuments(filter),
    ]);

    res.json({
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages: Math.ceil(total / limit),
      data: prompts,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const likePromptController = async (req, res) => {
  try {
    const promptId = req.params.id;
    const prompt = await Prompt.findById(promptId).populate("owner");

    if (prompt.likes.includes(req.user._id)) {
      prompt.likes = prompt.likes.filter(
        (id) => JSON.stringify(id) !== JSON.stringify(req.user._id)
      );
    } else {
      prompt.likes.push(req.user._id);
    }
    const updatedPrompt = await prompt.save();
    res.json(updatedPrompt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const savePromptController = async (req, res) => {
  try {
    const promptId = req.params.id;
    const user = await userModel.findById(req.user._id);
    if (user.savedPrompts.includes(promptId)) {
      console.log("prompt already saved", user.savedPrompts);

      user.savedPrompts = user.savedPrompts.filter(
        (id) => JSON.stringify(id) !== JSON.stringify(promptId)
      );
    } else {
      user.savedPrompts.push(promptId);
    }
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSavedPromptController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).populate({
      path: "savedPrompts",
      populate: {
        path: "owner",
      },
    });

    res.json(user.savedPrompts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addCommentController = async (req, res) => {
  try {
    const { content } = req.body;
    const { id } = req.params;
    const user = await userModel.findById(req.user._id);
    const comment = await commentModel.create({
      content,
      owner: req.user._id,
      prompt: id,
    });
    comment.owner = user;
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchedCommentsController = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await commentModel.find({ prompt: id }).populate("owner");
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
