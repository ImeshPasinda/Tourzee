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
router.get('/', getSafetyTips);

// Add more routes/functions as needed for safety tips

export default router;
