import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Featured from "../../components/featured/Featured";
import Footer from "../../components/footer/Footer";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./emergencySafety.css";
import HeaderForEmergency from "../../components/headerforEmergency/headerforEmergency";


const Emergencysafety = () => {
  return (
    <div>
      <Navbar />
      <HeaderForEmergency />
      <div className="homeContainer">
        {/* <h1 className="homeTitle" style={{ paddingTop: '30px' }}>Emergency Services</h1> */}
        {/* <FeaturedPlanatrip /> */}
        {/* <h1 className="homeTitle" style={{ paddingTop: '50px' }}>Explore Your Travel Experience Safe and Secure</h1> */}
        <div
          style={{
            paddingTop: '15px',
            paddingLeft: '20px',
            paddingRight: '20px',
            width: '100%',
            maxWidth: '1024px',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '15px',
            zIndex: '1',
          }}
        >
          
          <p style={{ color: '#888' }}>

          Tourzee's Safety and Emergency Assistance Service is your trusted travel companion. 
          We prioritize your well-being, offering round-the-clock support and peace of mind. 
          Whether it's a sudden health concern or unexpected travel hiccups,
           we're here to ensure your journey remains smooth and worry-free.
           Your safety, our commitment.

           Our dedicated team is just a call away, ready to assist you in any situation.
            From medical emergencies to lost passports, we've got you covered. With Tourzee, you're not just exploring the world; 
            you're exploring it with the confidence that you're in safe hands.
            Travel smart, travel with Tourzee.
          </p>
          
          <img
            src="https://img.freepik.com/free-vector/urgent-concept-illustration_114360-7740.jpg?w=740&t=st=1693799394~exp=1693799994~hmac=71a49de556122878112c40221ff0b178410714a9ab4e0bf18b949c9436a2a213"
            alt="Image Description"
            style={{ maxWidth: '40%', height: 'auto', borderRadius: '10px' }}
          />
        </div>
        <div style={{paddingTop: '3px',
            paddingLeft: '20px',
            paddingRight: '20px',
            width: '100%',
            maxWidth: '1024px',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '20px',
            zIndex: '1', }}>
          <button className="headerBtn">Ensure Your Security With Us !!!<FontAwesomeIcon icon= {faArrowRight} style={{ marginLeft: '5px' }} /></button>
        </div>
        


        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Emergencysafety;
