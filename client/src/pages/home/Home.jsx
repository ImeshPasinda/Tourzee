import Featured from "../../components/featured/Featured";
import FeaturedPropertiesHome from "../../components/featuredPropertiesHome/FeaturedPropertiesHome";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header/>
      <div className="homeContainer">
      <h1 className="homeTitle" style={{ paddingTop: '30px' }}>Top 3 most famous landmarks in Sri Lanka</h1>
        <Featured/>
        {/* <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList/> */}
        <h1 className="homeTitle" style={{ paddingTop: '30px' }}>Mirissa</h1>
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
            src="https://thirdeyetraveller.com/wp-content/uploads/COCONUTHILL-7-of-12-2-scaled-scaled.jpg"
            alt="Image Description"
            style={{ maxWidth: '40%', height: 'auto', borderRadius: '10px' }}
          />
        </div>
        {/* <div style={{paddingTop: '15px',
            paddingLeft: '20px',
            paddingRight: '20px',
            width: '100%',
            maxWidth: '1024px',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '20px',
            zIndex: '1', }}>
          <button className="headerBtn">Visit this Place <FontAwesomeIcon icon= {faArrowRight} style={{ marginLeft: '5px' }} /></button>
        </div> */}
        
        <h1 className="homeTitle" style={{ paddingTop: '30px' }}>Popular Places in Sri Lanka</h1>
        <FeaturedPropertiesHome/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
