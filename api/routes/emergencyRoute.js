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
const router = express.Router();
import EmergencyFacility from '../models/EmergencyFacility.js';

// CREATE
router.post('/', createEmergencyFacility);

// UPDATE
// router.put('/:id', updateEmergencyFacility);

// DELETE
//  router.delete('/:id', deleteEmergencyFacility);

// GET
router.get('/find/:id', getEmergencyFacility);

// GET ALL
router.get('/', getEmergencyFacilities);

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFacility = await EmergencyFacility.findByIdAndRemove(id);

    if (!deletedFacility) {
      return res.status(404).json({ message: 'Emergency facility not found' });
    }

    return res.json({ message: 'Emergency facility deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, type, city, address, contactNumber } = req.body;

    // Create a new emergency facility
    const newFacility = new EmergencyFacility({
      name,
      type,
      city,
      address,
      contactNumber,
    });

    // Save the new facility to the database
    await newFacility.save();

    return res.status(201).json({ message: 'Emergency facility created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, city, address, contactNumber } = req.body;

    // Find the emergency facility by ID
    const facilityToUpdate = await EmergencyFacility.findById(id);

    if (!facilityToUpdate) {
      return res.status(404).json({ message: 'Emergency facility not found' });
    }

    // Update the fields
    facilityToUpdate.name = name;
    facilityToUpdate.type = type;
    facilityToUpdate.city = city;
    facilityToUpdate.address = address;
    facilityToUpdate.contactNumber = contactNumber;

    // Save the updated facility to the database
    await facilityToUpdate.save();

    return res.json({ message: 'Emergency facility updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


export default router;
