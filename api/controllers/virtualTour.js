import VirtualTour from "../models/VirtualTour.js";
import { createError } from "../utils/error.js";

// export const createVirtualTour = async (req, res, next) => {
//   const newVirtualTour = new VirtualTour(req.body);

//   try {
//     const savedVirtualTour = await newVirtualTour.save();
//     res.status(200).json(savedVirtualTour);
//   } catch (err) {
//     next(err);
//   }
// };

export const updateVirtualTour = async (req, res, next) => {
  try {
    const updatedVirtualTour = await VirtualTour.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedVirtualTour);
  } catch (err) {
    next(err);
  }
};

export const deleteVirtualTour = async (req, res, next) => {
  try {
    await VirtualTour.findByIdAndDelete(req.params.id);
    res.status(200).json("Virtual tour has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getVirtualTour = async (req, res, next) => {
  try {
    const virtualTour = await VirtualTour.findById(req.params.id);
    res.status(200).json(virtualTour);
  } catch (err) {
    next(err);
  }
};

// export const getVirtualTours = async (req, res, next) => {
//   try {
//     const virtualTours = await VirtualTour.find();
//     res.status(200).json(virtualTours);
//   } catch (err) {
//     next(err);
//   }
// };
