import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../components/footer/Footer";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import "./socialSharing.css";
import { Link } from "react-router-dom";
import HeaderforSocial from "../../components/headerforSocial/headerforSocial";

const SocialSharing = () => {
  return (
    <div>
      <Navbar />
      <HeaderforSocial />
      <div className="homeContainersocial">
        <h1 className="homeTitle">Share your travel adventures with the world!</h1>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >

          
        </div>
        <div
          style={{
            paddingTop: '15px',
            paddingLeft: '20px',
            paddingRight: '20px',
            width: '100%',
            maxWidth: '1024px',
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            zIndex: '1',
          }}
        >

          <br />
          <div style={{ display: 'flex', flexDirection: 'column' , gap: '50px'}}>
  <p style={{ color: '#888' }}>
    Share your travel experiences effortlessly!
    Our social sharing feature lets you create and post about your memorable attractions,
    complete with photos and descriptions, allowing you to inspire and connect with fellow travelers worldwide.

    <br />
    <br />

    Connect with a global community of adventurers through our community integration feature! <br />
    Comment, ask questions, and offer advice to fellow explorers, plus rate attractions to uncover hidden gems.
    Forge friendships, exchange stories, and create a supportive network of travel enthusiasts.
    Join our vibrant community and let the journey continue!
  </p>
  <Link to="/socialmain">
    <button className="headerBtn">Tour Gallery<FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '5px' }} /></button>
  </Link>
</div>

          <img
            src="https://img.freepik.com/free-vector/travel-destination-choosing-accommodation-booking-system_335657-2503.jpg?size=626&ext=jpg&ga=GA1.1.1164833521.1694068753&semt=ais"
            alt="Image Description"
            style={{ maxWidth: '40%', height: 'auto', borderRadius: '10px' }}
          />
        </div>
        
      </div>
      
      <div className ="centered-maillist">
      <MailList />
      </div>
      <div className ="centered-footer">
      <Footer />
    </div>
    </div>
  );
};

export default SocialSharing;
