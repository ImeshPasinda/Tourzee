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
//router.post('/', verifyAdmin, createSafetyTip);
router.post('/', createSafetyTip);

// UPDATE
router.put('/:id', verifyAdmin, updateSafetyTip);

// DELETE
router.delete('/:id', verifyAdmin, deleteSafetyTip);

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

export default router;
