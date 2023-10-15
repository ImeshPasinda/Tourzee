import express from "express";
import Post from "../models/PostModel.js";

const router = express.Router();

// router.post("/", async (req, res) => {
//     try {
//         // Extract the data for the new post from the request body
//         const { title, content, photos } = req.body;

//         // Create a new Post document
//         const newPost = new Post({
//             title,
//             content,
//             photos,
//         });

//         // Save the new post to the database
//         const savedPost = await newPost.save();

//         // Respond with the saved post
//         res.status(201).json(savedPost);
//     } catch (error) {
//         // Handle any errors that occur during the creation process
//         res.status(500).json({ error: "An error occurred while creating the post." });
//     }
// });

// router.get('/', getPosts);
// router.get('/post/:id', getPost);
// router.delete('/:id', deletePost);
// router.put('/:id', updatePost);
// router.put('/comment/post/:id', addComment);
// router.put('/addlike/post/:id', addLike);
// router.put('/removelike/post/:id', removeLike);


//CREATE POST
router.post("/", async (req, res) => {
  try {
    // Extract the data for the new post from the request body
    const { username, title, content, photos, likes, email } = req.body;

    // Create a new Post document
    const newPost = new Post({
      username,
      title,
      content,
      photos,
      likes,
      email,
    });

    // Save the new post to the database
    const savedPost = await newPost.save();

    // Respond with the saved post
    res.status(201).json(savedPost);
  } catch (error) {
    // Handle any errors that occur during the creation process
    res.status(500).json({ error: "An error occurred while creating the post." });
  }
});

//Get posts
router.get('/', async (req, res) => {
  try {
    // Fetch all posts from the database
    const posts = await Post.find();

    if (!posts || posts.length === 0) {
      return res.status(404).json({ error: 'Posts not found' });
    }

    res.json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Get a specific post by ID
router.get('/:id', async (req, res) => {
  try {
    const postId = req.params.id;

    // Find the post by ID
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Update post
router.put('/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content, photos } = req.body;

    // Find the post by ID
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Update the post
    post.title = title;
    post.content = content;
    post.photos = photos;

    // Save the updated post
    const updatedPost = await post.save();

    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//Delete post
router.delete('/:id', async (req, res) => {
  try {
    const postId = req.params.id;

    // Check if the post exists
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Delete the post
    await Post.findByIdAndDelete(postId);

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Like or dislike a post
// router.put("/:id/like", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
    
//     if (!post) {
//       return res.status(404).json({ error: 'Post not found' });
//     }

//     const userId = req.body.userId;
    
//     if (post.likes.includes(userId)) {
//       // User already liked the post, so remove the like
//       await post.updateOne({ $pull: { likes: userId } });
//       res.status(200).json("The post has been disliked");
//     } else {
//       // User has not liked the post, so add the like
//       await post.updateOne({ $push: { likes: userId } });
//       res.status(200).json("The post has been liked");
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const userId = req.body.userId;

    if (post.likes.includes(userId)) {
      // User already liked the post, so remove the like
      await post.updateOne({ $pull: { likes: userId } });
      // Update the likes count in the database
      await post.updateOne({ _id: post._id }, { $inc: { likeCount: -1 } });
      res.status(200).json("The post has been disliked");
    } else {
      // User has not liked the post, so add the like
      await post.updateOne({ $push: { likes: userId } });
      // Update the likes count in the database
      await post.updateOne({ _id: post._id }, { $inc: { likeCount: 1 } });
      res.status(200).json("The post has been liked");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



export default router;