import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, Modal, Button, TextField } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { MoreVert } from "@mui/icons-material";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useContext } from "react";
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import "./postcard.css";

const PostCard = ({ post }) => {
  const { user } = useContext(AuthContext);
  const [like, setLike] = useState(post.likes)
  const [isLiked, setIsLiked] = useState(false)
  const [comments, setComments] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editedPost, setEditedPost] = useState(post);
  const [anchorEl, setAnchorEl] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // const [users, setUsers] = useState([]);

  const handleLike = async () => {
    try {
      const response = await axios.put(`/posts/${post._id}/like`, { userId: user._id });

      if (response.status === 200) {
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdatePost = async () => {
    try {
      const response = await axios.put(`/posts/${post._id}`, editedPost);
      if (response.status === 200) {
        setIsEditModalOpen(true);
        setEditedPost(response.data);
        toast.success('Post updated successfully', { position: 'top-right' });
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update the post', { position: 'top-right' });
    }
  };


  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPost({ ...editedPost, [name]: value });
  };

  const handleOpenDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
    handleCloseMenu();
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };


  const handleDeletePost = async () => {
    try {
      await axios.delete(`/posts/${post._id}`);
      console.log('Post deleted successfully');
      handleCloseMenu();
      toast.success('Post deleted successfully', { position: 'top-right' });
      // You can add logic here to update your UI, such as removing the deleted post from the list of posts.
    } catch (error) {
      console.error(error);
      // Handle error if the deletion request fails
    }
  };

 

  // function getFirstLetter(username) {
  //   return username.charAt(0).toUpperCase();
  // }
  // const [Users, setUser] = useState(null);

  // useEffect(() => {
  //   // Fetch user data when the component mounts
  //   axios.get(`/${post.userId}`)
  //     .then((response) => {
  //       setUser(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching user data:', error);
  //     });
  // }, [post.userId]);
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <CardHeader
              avatar={
                <Avatar style={{ backgroundColor: '#003580' }} aria-label="recipe">
                  {post.username ? post.username[0].toUpperCase() : ''}
                </Avatar>
              }
              title={<span style={{ fontSize: '20px' }}>{post.title}</span>}
              username={<span style={{ fontSize: '12px' }}>{post.username}</span>}

            />
            {/* <img
              className="postProfileImg"
              src={Users.filter((u) => u.id === post?.userId)[0].img}
              alt=""
            />
            <span className="postUsername">
              {Users.filter((u) => u.id === post?.userId)[0].username}
            </span> */}
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <Box>
              <IconButton aria-label="more" onClick={handleOpenMenu}>
                <MoreVert />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={handleUpdatePost}>Update</MenuItem>
                <MenuItem onClick={handleOpenDeleteDialog}>Delete</MenuItem>
              </Menu>
            </Box>
            <Modal open={isEditModalOpen} onClose={handleCloseEditModal}>
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  bgcolor: 'background.paper',
                  boxshadow: 24,
                  p: 4,
                }}
              >
                <Typography variant="h6" component="div">
                  Edit Post
                </Typography>
                <TextField
                  label="Title"
                  name="title"
                  value={editedPost.title}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Content"
                  name="content"
                  value={editedPost.content}
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  margin="normal"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdatePost}
                >
                  Update Post
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCloseEditModal}
                  style={{ marginLeft: '10px' }}
                >
                  Cancel
                </Button>

              </Box>
            </Modal>
            <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
              <DialogTitle>Delete Post</DialogTitle>
              <Box p={3}>
                <Typography>Are you sure you want to delete this post?</Typography>
              </Box>
              <DialogActions>
                <Button onClick={handleCloseDeleteDialog} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleDeletePost} color="error">
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post.photos?.[0]} alt="" />
        </div>
        <div className='postContent'>
          <Typography variant="body3" color="text.primary">
            {post.content}
          </Typography>
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {isLiked ? (
              <IconButton aria-label="unlike" onClick={handleLike}>
                <FavoriteIcon sx={{ color: 'red' }} />
              </IconButton>
            ) : (
              <IconButton aria-label="like" onClick={handleLike}>
                <FavoriteBorderIcon sx={{ color: 'red' }} />
              </IconButton>
            )}
            {/* {post.likes.length} Like(s) */}
            <span className="postLikeCounter"> {post.likes.length} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">
              <Link to={`/comments/${post._id}`}>
                <CommentIcon className="comment-icon" /> {/* Add the comment icon here */}
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard
