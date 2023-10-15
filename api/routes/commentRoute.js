import express from 'express';
import {
  createComment,
  updateComment,
  deleteComment,
  getComment,
  getComments,
  // Add more routes/functions as needed for comments
} from '../controllers/commentController.js';
import Comment from '../models/CommentModel.js';

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

router.get('/pid/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;

    // Use the Comment model to find comments by postId
    const comments = await Comment.find({ postId });

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching comments' });
  }
});


export default router;
