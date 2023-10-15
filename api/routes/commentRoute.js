import express from 'express';
import {
  createComment,
  updateComment,
  deleteComment,
  getComment,
  getComments,
  // Add more routes/functions as needed for comments
} from '../controllers/commentController.js';

const router = express.Router();

// CREATE
router.post('/:postId', createComment);

// UPDATE
router.put('/:id', updateComment);

// DELETE
router.delete('/:id', deleteComment);

// GET
router.get('/:id', getComment);

// GET ALL
router.get('/', getComments);


export default router;
