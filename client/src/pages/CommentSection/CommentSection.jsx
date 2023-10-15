import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import './commentSection.css'; // Import the CSS file
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import { useContext } from "react";
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
const { TextArea } = Input;

const CommentSection = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [post, setPost] = useState({ title: '', photos: [] });
    const [comment, setComment] = useState('');
    const [commentCount, setCommentCount] = useState(0);
    const [comments, setComments] = useState([]);

    const handleCommentSubmit = async () => {
        try {
            const response = await axios.post(`http://localhost:8800/api/comments/${id}`, {
                comment: comment,
                username: user.username, // You can replace this with the actual username if available
            });

            if (response.status === 201) {
                // Comment creation was successful
                // You can reset the comment input field or perform any other necessary actions
                setComment('');
                fetchComments();
            }
        } catch (error) {
            console.error('Error creating comment:', error);
        }
    };

    useEffect(() => {
        async function fetchPostData() {
            try {
                const response = await axios.get(`http://localhost:8800/api/posts/${id}`);
                if (response.status !== 200) {
                    throw new Error('API request failed');
                }

                setPost(response.data.post);
            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        }

        fetchPostData();
    }, [id]);

    useEffect(() => {
        // Make an API call to fetch the comment count from your server
        async function fetchCommentCount() {
            try {
                const response = await axios.get(`http://localhost:8800/api/comments/count/${id}`);
                if (response.status === 200) {
                    setCommentCount(response.data.count);
                }
            } catch (error) {
                console.error('Error fetching comment count:', error);
            }
        }

        fetchCommentCount();
    }, [id]);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:8800/api/comments/${id}`);
            if (response.status === 200) {
                setComments(response.data);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    return (
        <div className="form-container">
            {/* Display the fetched post data */}
            {/* <div>
        <h2>{post.title}</h2> */}
            {/* Render other post data as needed */}
            {/* {post.photos.map((photo, index) => (
          <img key={index} src={photo} alt={`Photo ${index}`} />
        ))}
      </div> */}

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


                            />
                            {/* <img
              className="postProfileImg"
              src={Users.filter((u) => u.id === post?.userId)[0].img}
              alt=""
            />
            <span className="postUsername">
              {Users.filter((u) => u.id === post?.userId)[0].username}
            </span> */}
                            <span className="postDate">{post?.date}</span>
                        </div>
                    </div>
                    <div className="postCenter">
                        <span className="postText">{post?.desc}</span>
                        <div className="postCommentImg">
                            {post.photos.map((photo, index) => (
                                <img key={index} src={photo} alt={`Photo ${index}`} />
                            ))}
                        </div>
                    </div>
                    <div className='postCommentContent'>
                        <Typography variant="body3" color="text.primary">
                            {post.content}
                        </Typography>
                    </div>

                </div>
            </div>








            <h1 style={{ marginTop: '75px' }}>({commentCount}) Comments</h1>
            <Form>
                <Form.Item >
                    <TextArea
                        rows={4}
                        placeholder="Add your comment..."
                        value={comment}
                        className="comment-textarea"
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Button type="primary" className="comment-button" onClick={handleCommentSubmit}>
                        Comment
                    </Button>
                </Form.Item>
            </Form>
            <div>
                {/* Display comments here */}
                {comments.map((comment, index) => (
                    <div key={index}>
                        <p>{comment.username} says: {comment.comment}</p>
                    </div>
                ))}
            </div>


        </div>
    );
};

export default CommentSection;





