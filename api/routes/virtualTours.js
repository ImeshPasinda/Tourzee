import express from "express";
import {
  deleteVirtualTour,
  getVirtualTour,
  updateVirtualTour,
} from "../controllers/virtualTour.js";
import VirtualTour from "../models/VirtualTour.js";

const router = express.Router();



router.post('/', async (req, res) => {
  try {
    // Extract the data for the new place from the request body
    const {
      title,
      description,
      location,
      photos,
      latitude,
      longitude,
      
    } = req.body;

    
    const newVirtualTour = new VirtualTour({
      title,
      description,
      location,
      photos,
      latitude,
      longitude,
    });

    
    const savedVirtualTour = await newVirtualTour.save();

    res.status(201).json(savedVirtualTour);
  } catch (error) {
    res.status(400).json({ message: 'Could not create VirtualTour', error: error.message });
  }
});













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
