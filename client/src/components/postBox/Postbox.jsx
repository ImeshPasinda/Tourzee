import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import "./postbox.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material"
import CreatePost from '../CreatePost/CreatePost'; // Import your CreatePost component

const Postbox = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src="" alt="" />
          <div className="shareInput">
            <p>What's in your mind Safak?</p>
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
      <div style={{ height: '500px' }}> {/* Adjust the height as needed */}
        <CreatePost />
      </div>
    </Modal>
  );
}

export default Postbox;
