import express from 'express';
import {
  createEmergencyContact,
  updateEmergencyContact,
  deleteEmergencyContact,
  getEmergencyContact,
  getEmergencyContacts,
  // Add more routes/functions as needed for emergency contacts
} from '../controllers/emergencyContactController.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// CREATE
// router.post('/', verifyAdmin, createEmergencyContact);
 router.post('/', createEmergencyContact);

// UPDATE
router.put('/:id', verifyAdmin, updateEmergencyContact);

// DELETE
router.delete('/:id', verifyAdmin, deleteEmergencyContact);

// GET
router.get('/find/:id', getEmergencyContact);

// GET ALL
router.get('/', getEmergencyContacts);

// Add more routes/functions as needed for emergency contacts

export default router;
