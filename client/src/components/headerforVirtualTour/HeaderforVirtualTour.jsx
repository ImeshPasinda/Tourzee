import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {



  faVrCardboard, faLocationDot,
  faPerson,
  faRoad,


  faTruckMedical,

  faLocationPin
} from "@fortawesome/free-solid-svg-icons";
import "./headerforVirtualTour.css";
import useFetch from '../../hooks/useFetch';



const HeaderforVirtualTour = ({ type }) => {
  const [title, setTitle] = useState("");

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleSearch = () => {
    navigate("/virtualTour/virtualTourPlaces", { state: { title } });
  };

  console.log(title)

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">

          <div className="headerListItem ">
            <Link to="/" className="linkStyle">
              <FontAwesomeIcon icon={faRoad} />
              <span style={{ marginLeft: '8px' }} >Attractions</span>
            </Link>
          </div>

          <div className="headerListItem">
            <Link to="/socialsharing" className="linkStyle">
              <FontAwesomeIcon icon={faPerson} />
              <span style={{ marginLeft: '8px' }}>Social</span>
            </Link>
          </div>


          <div className="headerListItem">
            <Link to="/emergencySafety" className="linkStyle">
              <FontAwesomeIcon icon={faTruckMedical} />
              <span style={{ marginLeft: '8px' }}>Safety</span>
            </Link>
          </div>
          <div className="headerListItem active">
            <Link to="/virtualTour" className="linkStyle">
              <FontAwesomeIcon icon={faVrCardboard} />
              <span style={{ marginLeft: '8px' }}>Virtual Tour</span>
            </Link>
          </div>
          {/* <Badge badgeContent={100} classes={{ badge: 'custom-badge' }}> */}
          <div className="headerListItem">
            <Link to="/planatrip" className="linkStyle">
              <FontAwesomeIcon icon={faLocationDot} className="iconStyle" />
              <span>Start a Trip</span>
            </Link>
          </div>
          {/* </Badge> */}
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">Explore Our Virtual Tour</h1>
            <p className="headerDesc">
              "Embark on a transformative journey of exploration, interaction, and immersive experiences as you step into our virtual country"
            </p>
            {!user && <Link to="/register" className="linkStyle"><button className="headerBtn">Sign in / Register</button></Link>}
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
          </>
        )}
      </div>
    </div>
  );
};

export default HeaderforVirtualTour;
