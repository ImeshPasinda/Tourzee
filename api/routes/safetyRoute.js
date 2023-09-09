import express from 'express';
import {
  createSafetyTip,
  updateSafetyTip,
  deleteSafetyTip,
  getSafetyTip,
  getSafetyTips,
  // Add more routes/functions as needed for safety tips
} from '../controllers/safetyTipsController.js';
import { verifyAdmin } from '../utils/verifyToken.js';
import SafetyTips from '../models/SafetyTips.js';

const router = express.Router();

// CREATE
//router.post('/', createSafetyTip);

// UPDATE
// router.put('/:id', updateSafetyTip);

// DELETE
// router.delete('/:id', verifyAdmin, deleteSafetyTip);

// GET
router.get('/find/:id', getSafetyTip);

// GET ALL
// router.get('/', getSafetyTips);

// Add more routes/functions as needed for safety tips



router.get('/', async (req, res) => {
  try {
    // Fetch all safety tips from the database
    const safetyTips = await SafetyTips.find();

    if (!safetyTips || safetyTips.length === 0) {
      return res.status(404).json({ error: 'Safety tips not found' });
    }

    res.json({ safetyTips });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Implement the logic to delete the safety tip with the provided ID
    const deletedSafetyTip = await SafetyTips.findByIdAndRemove(id);

    if (!deletedSafetyTip) {
      return res.status(404).json({ error: 'Safety tip not found' });
    }

    res.json({ message: 'Safety tip deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// CREATE
router.post('/', async (req, res) => {
  try {
    const { destination, location, advicelevel, timeperiod } = req.body;

    // Create a new safety tip
    const newSafetyTip = new SafetyTips({
      destination,
      location,
      advicelevel,
      timeperiod,
    });

    // Save the new safety tip to the database
    await newSafetyTip.save();

    return res.status(201).json({ message: 'Safety tip created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


// PUT (Update) - Update an existing safety tip by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { destination, location, advicelevel, timeperiod } = req.body;

    // Find the safety tip by ID
    const safetyTipToUpdate = await SafetyTips.findById(id);

    if (!safetyTipToUpdate) {
      return res.status(404).json({ error: 'Safety tip not found' });
    }

    // Update the fields with new data
    safetyTipToUpdate.destination = destination;
    safetyTipToUpdate.location = location;
    safetyTipToUpdate.advicelevel = advicelevel;
    safetyTipToUpdate.timeperiod = timeperiod;

    // Save the updated safety tip to the database
    await safetyTipToUpdate.save();

    return res.json({ message: 'Safety tip updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
