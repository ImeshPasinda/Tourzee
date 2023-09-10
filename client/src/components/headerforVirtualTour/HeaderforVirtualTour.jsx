import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  faBed,
  faCalendarDays,
  faCar,
  faLocationDot,
  faPerson,
  faPlane,
  faTaxi,
  faTruck,
  faTruckMedical,
  faVrCardboard,
  faLocationPin
} from "@fortawesome/free-solid-svg-icons";
import "./headerforVirtualTour.css";
import useFetch from '../../hooks/useFetch';



const HeaderforVirtualTour = () => {
  const [title, setTitle] = useState("");
  
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleSearch = () => { 
    navigate("/virtualTour/virtualTourPlaces", { state: { title } });
  };

  console.log(title)

  return (
    <div className="header">
      <div className="headerContainer">
        <div className="headerList">
          <div className="headerListItem">
            <Link to="/" className="linkStyle">
              <FontAwesomeIcon icon={faBed} className="iconStyle" />
              <span>Stays</span>
            </Link>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPerson} />
            <span>Social</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTruckMedical} />
            <span>Safety</span>
          </div>
          <div className="headerListItem active">
            <Link to="/virtualTour" className="linkStyle">
              <FontAwesomeIcon icon={faVrCardboard} />
              <span className="virtual">Virtual Tour</span>
            </Link>
          </div>
          <Badge badgeContent={100} classes={{ badge: 'custom-badge' }}>
            <div className="headerListItem">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>Start a Trip</span>
            </div>
          </Badge>
        </div>
        <h1 className="headerTitle">Explore Our Virtual Tour</h1>
        <p className="headerDesc">
          "Embark on a transformative journey of exploration, interaction, and immersive experiences as you step into our virtual country"
        </p>
        {!user && <button className="headerBtn">Sign in / Register</button>}
        <div className="headerSearch">
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faLocationPin} className="headerIcon" />
            <input
              type="text"
              placeholder="Where do you plan to go?"
              className="headerSearchInput"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space"></div>
          <div className="headerSearchItem">
            <button className="headerBtn" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderforVirtualTour;
