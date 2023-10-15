import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    replies: [{
        author: {
            type: String,
            required: true,
        },
        commentId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        reply: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }]
}, {
    timestamps: true
});

export default mongoose.model("Comment", CommentSchema);
