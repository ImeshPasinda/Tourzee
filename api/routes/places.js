import express from "express";
import {
  countByCity,
  countByType,
  createPlace,
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
router.post("/", verifyAdmin, createPlace);

//UPDATE
router.put("/:id", verifyAdmin, updatePlace);
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
