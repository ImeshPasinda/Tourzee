import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Featured from "../../components/featured/Featured";
import FeaturedPlanatrip from "../../components/featuredPlanatrip/FeaturedPlanatrip";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Headerforplanatrip from "../../components/headerforplanatrip/Headerforplanatrip";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./planatrip.css";



const Planatrip = () => {
  return (
    <div>
      <Navbar />
      <Headerforplanatrip />
      <div className="homeContainer">
        <h1 className="homeTitle" style={{ paddingTop: '30px' }}>Popular destinations</h1>
        <FeaturedPlanatrip />
        <h1 className="homeTitle" style={{ paddingTop: '50px' }}>Mirissa</h1>
        <div
          style={{
            paddingTop: '15px',
            paddingLeft: '20px',
            paddingRight: '20px',
            width: '100%',
            maxWidth: '1024px',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '20px',
            zIndex: '1',
          }}
        >
          
          <p style={{ color: '#888' }}>

            Mirissa is a charming coastal town nestled along the southern shores of the picturesque island of Sri Lanka. 
            This idyllic destination, found in the heart of the Matara District within the Southern Province, beckons travelers with its serene beauty and vibrant culture. Located approximately 150 kilometers to the south of the bustling capital city, Colombo, Mirissa is a tranquil escape that sits at a modest elevation of 4 meters above sea level.
            Renowned for its pristine beaches and lively nightlife, Mirissa has rightfully earned its reputation as a coveted hotspot for tourists seeking both relaxation and adventure. The golden sands of its shoreline stretch as far as the eye can see, offering a perfect setting for sunbathing, beachcombing, and engaging in a variety of water sports.
            As the sun dips below the horizon, Mirissa undergoes a captivating transformation, evolving into a vibrant hub of nightlife and entertainment. Beachfront bars and restaurants come to life with the sounds of live music and the tantalizing aromas of fresh seafood delicacies. 
          
          </p>
          
          <img
            src="https://www.theglobetrottergp.com/wp-content/uploads/2019/05/oDZ1LpuSxCdJQd5UhbjSA_thumb_60bb.jpg"
            alt="Image Description"
            style={{ maxWidth: '40%', height: 'auto', borderRadius: '10px' }}
          />
        </div>
        <div style={{paddingTop: '15px',
            paddingLeft: '20px',
            paddingRight: '20px',
            width: '100%',
            maxWidth: '1024px',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '20px',
            zIndex: '1', }}>
          <button className="headerBtn">Visit this Place <FontAwesomeIcon icon= {faArrowRight} style={{ marginLeft: '5px' }} /></button>
        </div>
        



        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Planatrip;
