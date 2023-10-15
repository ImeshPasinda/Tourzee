import React, { useState, useEffect  } from 'react';
import { Button, Modal } from 'antd';
import Avatar from '@mui/material/Avatar';
import "./postbox.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material"
import { useContext } from "react";
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import CreatePost from '../CreatePost/CreatePost'; // Import your CreatePost component

const Postbox = ( ) => {

  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authorData, setAuthorData] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //  Fetch user data for the post's author
  //  useEffect(() => {
  //   async function fetchAuthorData() {
  //     try {
  //       // Assuming you have an API endpoint to fetch user data by user ID
  //       const response = await axios.get(`/users/${user._id}`);
  //       if (response.status === 200) {
  //         setAuthorData(response.data);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching author data:', error);
  //     }
  //   }

  //   fetchAuthorData();
  // }, [user]); 

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
        <div className="shareProfileImg">
            <Avatar style={{ backgroundColor: '#003580' }} aria-label="recipe">
            {user ? user.username[0].toUpperCase() : ''}
            </Avatar>
          </div>
          <div className="shareInput">
          <p className="shareLargeFont">What's on your mind {user ? user.username : ''}?</p>
          </div>
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photos</span>
            </div>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tags</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button onClick={showModal}
              style={{
                backgroundColor: "#1877f2",
                marginRight: "5%",
                color: "#fff",
                border: "none",
                borderRadius: "0.5rem",
                padding: "0.8rem 2rem",
                cursor: "pointer",
                marginTop: "1rem",
              }}>Share</button>
        </div>
      </div>
      <ShareModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
      />
    </div>
  );
}

const ShareModal = ({ isModalOpen, handleCancel }) => {
  return (
    <Modal
      visible={isModalOpen}
      onCancel={handleCancel}
      width={800} // You can adjust the width to your preferred size
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>
      ]}
    >
      <div style={{ height: '600px' }}> {/* Adjust the height as needed */}
        <CreatePost />
      </div>
    </Modal>
  );
}

export default Postbox;
