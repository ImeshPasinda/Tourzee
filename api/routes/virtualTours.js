import express from "express";
import {
  createVirtualTour,
  deleteVirtualTour,
  getVirtualTour,
  updateVirtualTour,
} from "../controllers/virtualTour.js";
import VirtualTour from "../models/VirtualTour.js";
// import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/",  createVirtualTour);

// UPDATE
router.put("/:id",  updateVirtualTour);

// DELETE
router.delete("/:id",  deleteVirtualTour);

// GET
router.get("/find/:id", getVirtualTour);

// GET ALL

router.get("/", async (req, res) => {
  try {
      const allTours = await VirtualTour.find(); // Find data from the VirtualTour model
      res.send(allTours);
  } catch (error) {
      return res.status(400).json({ message: error });
  }
});


export default router;
