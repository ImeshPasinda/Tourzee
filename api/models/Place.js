import mongoose from "mongoose";
const Placeschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  photos: {
    type: [String],
  },
  title: {
    type: String,
    required: true,
  },
  descshort: {
    type: String,
    required: true,
  },
  desclong: {
    type: String,
    required: true,
  },
  descsinhala: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    // min: 0,
    // max: 5,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Place", Placeschema)