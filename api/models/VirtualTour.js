import mongoose from "mongoose";

const VirtualTourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    photos: {
      type: [String],
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
   
  },
  
  { timestamps: true }
);

export default mongoose.model("VirtualTour", VirtualTourSchema);

