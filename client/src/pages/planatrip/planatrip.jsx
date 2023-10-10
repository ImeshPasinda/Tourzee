import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FeaturedPlanatrip from "../../components/featuredPlanatrip/FeaturedPlanatrip";
import Footer from "../../components/footer/Footer";
import Headerforplanatrip from "../../components/headerforplanatrip/Headerforplanatrip";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import "./planatrip.css";



const Planatrip = () => {


  return (
    <div>
      <Navbar />
      <Headerforplanatrip />
      <div className="homeContainer">
        <h1 className="homeTitle" style={{ paddingTop: '30px' }}>Popular Trip Plans</h1>
        <FeaturedPlanatrip />



        <h1 className="homeTitle" style={{ paddingTop: '50px' }}>Explore Our Trip Plans</h1>
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


          <section>
            <p>Welcome to Tourzee, your gateway to seamless travel planning. Dive into a world of exploration with our extensive collection of thoughtfully curated trip plans, tailored to suit adventurers, culture enthusiasts, relaxation seekers, and everyone in between. We cater to all budgets, from economical to luxurious, ensuring travel is accessible to all.<br /><br />
              Our detailed itineraries offer day-by-day adventures, taking the guesswork out of planning. Interactive maps provide a visual guide, making navigation a breeze as you explore dream destinations, from serene beaches to vibrant cities.<br /><br />
              Safety is our priority; our trip plans include essential emergency contacts, ensuring peace of mind. Embark on your next adventure confidently with Tourzee, where unforgettable travel experiences await. Start your journey today and make your travel dreams a reality.</p>
          </section>

          <img
            src="https://img.freepik.com/free-photo/couple-tourists-with-suitcases-white-background-illustration_1142-32373.jpg?t=st=1696858083~exp=1696861683~hmac=aa18f8f8606a9933de8c455a4103b4eff76ef3f3a16a34f4e92889995defabff&w=740"
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

export default Planatrip;
