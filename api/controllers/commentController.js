import Comment from '../models/CommentModel.js';

// CREATE COMMENT
export const createComment = async (req, res, next) => {
    const postId = req.params.postId;
    const { comment, username } = req.body;

    try {
        const newComment = new Comment({
            postId,
            comment,
            username: username || 'user',
        });

        const createdComment = await newComment.save();

        res.status(201).json(createdComment);
    } catch (error) {
        next(error);
    }
};

// UPDATE COMMENT
export const updateComment = async (req, res, next) => {
    const commentId = req.params.id;
    const { content } = req.body;

    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        comment.comment = content; // Assuming the field name is 'comment' based on your model
        const updatedComment = await comment.save();
        res.status(200).json(updatedComment);
    } catch (err) {
        next(err);
    }
};

// DELETE COMMENT
export const deleteComment = async (req, res, next) => {
    const commentId = req.params.id;

    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        await comment.remove();
        res.status(200).json('Comment has been deleted.');
    } catch (err) {
        next(err);
    }
};

// GET COMMENT
export const getComment = async (req, res, next) => {
    const commentId = req.params.id;

    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        res.status(200).json(comment);
    } catch (err) {
        next(err);
    }
};

// GET ALL COMMENTS
export const getComments = async (req, res, next) => {
    const postId = req.params.id;

    try {
        if (postId) {
            const comments = await Comment.find({ postId }).sort({ createdAt: 'desc' });
            res.json(comments);
        } else {
            res.status(400).json({ message: 'Invalid or missing postId' });
        }
    } catch (error) {
        next(error);
    }
};
