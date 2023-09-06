import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Featured from "../../components/featured/Featured";
import Footer from "../../components/footer/Footer";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./emergencySafety.css";
import HeaderForEmergency from "../../components/headerforEmergency/headerforEmergency";
import { Link } from "react-router-dom";

const Emergencysafety = () => {
  return (
    <div>
      <Navbar />
      <HeaderForEmergency />
      <div className="homeContainer">
        <h1 className="homeTitle">Ensure Your Security With Us !</h1>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* <h1 className="homeTitle">        Ensure Your Security With Us !</h1> */}
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/safetybeforego">
              <button className="headerBtn"> Before You Go<FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '5px' }} /></button>
            </Link>
            <Link to="/destinationsemergency">
              <button className="headerBtn">Destinations<FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '5px' }} /></button>
            </Link>
            <Link to="/urgentHelp">
              <button className="headerBtn" style={{ backgroundColor: 'red', color: 'white' }}>
                Need Urgent Help <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '5px' }} />
              </button>
            </Link>
          </div>
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
          <p style={{ color: '#888' }}>
            Tourzee's Safety and Emergency Assistance Service is your trusted travel companion.
            We prioritize your well-being, offering round-the-clock support and peace of mind.
            Whether it's a sudden health concern or unexpected travel hiccups,
            we're here to ensure your journey remains smooth and worry-free.
            Your safety, our commitment.

            <br />
            <br />

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
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Emergencysafety;
