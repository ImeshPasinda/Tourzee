import express from 'express';
import {
  createEmergencyFacility,
  updateEmergencyFacility,
  deleteEmergencyFacility,
  getEmergencyFacility,
  getEmergencyFacilities,
  // Add more routes/functions as needed for emergency facilities
} from '../controllers/emergencyController.js';
import { verifyAdmin } from '../utils/verifyToken.js';
import EmergencyFacility from '../models/EmergencyFacility.js';
const router = express.Router();

// CREATE
router.post('/', verifyAdmin, createEmergencyFacility);
//router.post('/', createEmergencyFacility);

// UPDATE
router.put('/:id', verifyAdmin, updateEmergencyFacility);

// DELETE
router.delete('/:id', verifyAdmin, deleteEmergencyFacility);

// GET
router.get('/find/:id', getEmergencyFacility);

// GET ALL
router.get('/', getEmergencyFacilities);



export default router;
