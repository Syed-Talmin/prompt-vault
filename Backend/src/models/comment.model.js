import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    prompt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "prompt",
        required: true,
    },
})


const commentModel = mongoose.model("comment", commentSchema);
export default commentModel