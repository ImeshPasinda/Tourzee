import express from "express";
import {
    createTrip,
    deleteTrip,
    getTrip,
    gettrips,
    updateTrip,
} from "../controllers/trip.js";
import { verifyAdmin } from "../utils/verifyToken.js"
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createTrip);

//UPDATE
router.put("/:id", verifyAdmin, updateTrip);
//DELETE
router.delete("/:id", verifyAdmin, deleteTrip);
//GET

router.get("/find/:id", getTrip);
//GET ALL

router.get("/", gettrips);


export default router;
