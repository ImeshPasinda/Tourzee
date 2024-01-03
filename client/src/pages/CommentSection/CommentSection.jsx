import React, { useState, useEffect } from 'react';
import { Button, Form, Input, List, Space } from 'antd';
import './commentSection.css'; // Import the CSS file
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import { useContext } from "react";
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
const { TextArea } = Input;

const CommentSection = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [post, setPost] = useState({ title: '', photos: [] });
    const [comment, setComment] = useState('');
    const [commentCount, setCommentCount] = useState(0);
    const [comments, setComments] = useState([]);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleCommentSubmit = async () => {
        // Validate the comment input
        const form = await formRef.validateFields();

        if (form) {
            try {
                const response = await axios.post(`http://localhost:8800/api/comments/${id}`, {
                    comment: comment,
                    username: user.username, // You can replace this with the actual username if available
                });

                if (response.status === 201) {
                    // Comment creation was successful
                    // Add the new comment to the comments state and clear the input field
                    const newComment = {
                        id: response.data.id, // Replace with the actual ID from the response
                        username: user.username, // Replace with the actual username
                        comment: comment,
                        content: '', // You can update this if needed
                    };

                    setComments([...comments, newComment]);
                    setComment('');

                    // fetchComments(); // If needed, fetch all comments again
                }
            } catch (error) {
                console.error('Error creating comment:', error);
            }
        }
    };

    const [formRef] = Form.useForm();


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
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/api/comments/pid/${id}`);
                if (response.status === 200) {
                    setComments(response.data);
                    setCommentCount(response.data.length);

                }
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        // Call the fetchComments function when the component mounts
        fetchComments();
    }, [id]);

    const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );



    return (
        <div className="form-container">
           
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

                            <span className="postDate">{post?.date}</span>
                        </div>
                    </div>
                    <div className="postCenter">
                        <span className="postText">{post?.desc}</span>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            {post.photos.map((photo, index) => (
                                <img
                                    key={index}
                                    src={photo}
                                    alt={`Photo ${index}`}
                                    style={{ maxWidth: '100%', height: 'auto', marginBottom: '10px' }}
                                />
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
            <Form form={formRef}>
                <Form.Item
                    name="comment"
                    rules={[
                        {
                            required: true,
                            message: 'Please add your comment.',
                        },
                    ]}
                >
                    <TextArea
                        rows={4}
                        placeholder="Add your comment..."
                        value={comment}
                        className="comment-textarea"
                        onChange={(e) => setComment(e.target.value)}
                    />
                </Form.Item>
                <Button type="primary" className="comment-button" onClick={handleCommentSubmit}>
                    Comment
                </Button>
            </Form>
            <div>


                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 3,
                    }}
                    dataSource={comments}
                    footer={
                        <div>
                            <b>Tourzee</b> Comments Section
                        </div>
                    }
                    renderItem={(comment) => (
                        <List.Item
                            key={comment.id} // Replace 'id' with the actual unique identifier for each comment
                            actions={[
                                <IconText icon={StarOutlined} text="0" key="list-vertical-star-o" />,
                                <IconText icon={LikeOutlined} text="0" key="list-vertical-like-o" />,
                                <IconText icon={MessageOutlined} text="0" key="list-vertical-message" />,
                            ]}

                        >
                            <List.Item.Meta
                                avatar={
                                    <Avatar style={{ backgroundColor: '#003580' }} aria-label="recipe">
                                        {comment.username ? comment.username[0].toUpperCase() : ''}
                                    </Avatar>
                                }
                                title={comment.username}
                                description={comment.comment}
                            />
                            {comment.content}
                        </List.Item>
                    )}
                />

            </div>


        </div>
    );
};

export default CommentSection;





