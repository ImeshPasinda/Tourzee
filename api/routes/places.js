import express from "express";
import {
  countByCity,
  countByType,
  deletePlace,
  getPlace,
  getPlaceRooms,
  getplaces,
  updatePlace,
} from "../controllers/place.js";
import Place from "../models/Place.js";
import {verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router();

//CREATE
// router.post("/", verifyAdmin, createPlace);

// Create a new place
router.post('/', async (req, res) => {
  try {
    // Extract the data for the new place from the request body
    const {
      name,
      type,
      city,
      address,
      distance,
      photos,
      title,
      descshort,
      desclong,
      descsinhala,
      rating,
      latitude,
      longitude,
      featured,
    } = req.body;

    // Create a new place document
    const newPlace = new Place({
      name,
      type,
      city,
      address,
      distance,
      photos,
      title,
      descshort,
      desclong,
      descsinhala,
      rating,
      latitude,
      longitude,
      featured,
    });

    // Save the new place to the database
    const savedPlace = await newPlace.save();

    res.status(201).json(savedPlace); // Respond with the newly created place
  } catch (error) {
    res.status(400).json({ message: 'Could not create place', error: error.message });
  }
});



//UPDATE
router.put("/:id", updatePlace);
//DELETE
router.delete("/:id", verifyAdmin, deletePlace);
//GET

router.get("/find/:id", getPlace);
//GET ALL

router.get("/", getplaces);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getPlaceRooms);

export default router;
