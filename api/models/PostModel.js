import mongoose from "mongoose";
const Postschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  likes:{
    type: Array,
    default: [],
  },
  email: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Post", Postschema)