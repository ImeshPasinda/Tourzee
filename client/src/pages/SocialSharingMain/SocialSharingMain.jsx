import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import HeaderforSocial from '../../components/headerforSocial/headerforSocial';
import Footer from '../../components/footer/Footer';
import MailList from '../../components/mailList/MailList';
import { Grid } from '@mui/material';
import PostCard from '../../components/postcard/PostCard';
import Postbox from '../../components/postBox/Postbox';
import axios from 'axios';
import "./socialSharingMain.css";

const SocialSharingMain = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get('http://localhost:8800/api/posts/'); // Replace with your actual API URL
        if (response.status !== 200) {
          throw new Error('API request failed');
        }
        setPosts(response.data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div>
      <Navbar />
      <HeaderforSocial />

      <div className="homeContainersocial" >
        <Postbox />
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid key={post._id} item xs={6} sm={4} md={4} style={{ marginBottom: '-10px' }}>
              <PostCard post={post} />
            </Grid>
          ))}
        </Grid>

      </div>
      <div className="centered-maillist">
        <MailList />
      </div>
      <div className="centered-footer">
        <Footer />
      </div>
    </div>
  );
};

export default SocialSharingMain;

