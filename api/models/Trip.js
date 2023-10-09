import mongoose from "mongoose";
const Tripschema = new mongoose.Schema({
  tripName: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  days: {
    type: Number,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  descshort: {
    type: String,
    required: true,
  },
  desclong: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  budget: {
    type: String,
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
  place: {
    type: String,
    required: true,
  },
  routeOne: {
    type: String,
    required: true,
  },
  routeOneTitle: {
    type: String,
    required: true,
  },
  routeTwo: {
    type: String,
    required: true,
  },
  routeTwoTitle: {
    type: String,
    required: true,
  },
  routeThree: {
    type: String,
    required: true,
  },
  routeThreeTitle: {
    type: String,
    required: true,
  },
  routeFour: {
    type: String,
    required: true,
  },
  routeFourTitle: {
    type: String,
    required: true,
  },


},
  {
    timestamps: true,
  }

);

export default mongoose.model("Trips", Tripschema)