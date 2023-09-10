import express from "express";
import {
    deleteTrip,
    getTrip,
    gettrips,
    updateTrip,
} from "../controllers/trip.js";
import { verifyAdmin } from "../utils/verifyToken.js"
const router = express.Router();
import Trip from "../models/Trip.js";

// //CREATE
// router.post("/", verifyAdmin, createTrip);
router.post('/', async (req, res) => {
    try {
      // Extract the data for the new trip from the request body
      const {
        tripName,
        type,
        place,
        days,
        distance,
        photos,
        title,
        descshort,
        desclong,
        rating,
        budget,
        latitude,
        longitude,
        featured,
        routeOne,
        routeOneTitle,
        routeTwo,
        routeTwoTitle,
        routeThree,
        routeThreeTitle,
        routeFour,
        routeFourTitle,
      } = req.body;
  
      // Create a new trip document
      const newTrip = new Trip({
        tripName,
        type,
        place,
        days,
        distance,
        photos,
        title,
        descshort,
        desclong,
        rating,
        budget,
        latitude,
        longitude,
        featured,
        routeOne,
        routeOneTitle,
        routeTwo,
        routeTwoTitle,
        routeThree,
        routeThreeTitle,
        routeFour,
        routeFourTitle,
      });
  
      // Save the new trip to the database
      const savedTrip = await newTrip.save();
  
      res.status(201).json(savedTrip); // Respond with the newly created trip
    } catch (error) {
      res.status(400).json({ message: 'Could not create trip', error: error.message });
    }
  });

//UPDATE
router.put("/:id", updateTrip);
//DELETE
router.delete("/:id", deleteTrip);
//GET

router.get("/find/:id", getTrip);
//GET ALL

router.get("/", gettrips);


export default router;
