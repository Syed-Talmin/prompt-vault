import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    bio:{
        type: String,
        default:""
    },
    avatar:{
        type: String,
        default:""
    },

    savedPrompts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"prompt"
    }],

},{
  timestamps: true
})


const user = mongoose.model("user", userSchema)
export default user