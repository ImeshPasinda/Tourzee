import {
    faLocationDot,
    faRoad,
    faVrCardboard,
    faLocationPin,
    faPerson,
    faTruckMedical,
} from "@fortawesome/free-solid-svg-icons";
import Badge from '@mui/material/Badge';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./headerforSocial.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { TripsContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const HeaderforSocial = ({ type }) => {

    const [place, setPlace] = useState('');

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);


    const handleSearch = () => {
        const capitalizedPlace = place.charAt(0).toUpperCase() + place.slice(1);

    };


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
                            <span style={{ marginLeft: '8px' }}>Attractions</span> </Link>
                    </div>
                    <div className="headerListItem active">
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
                    <div className="headerListItem">
                        <Link to="/virtualTour" className="linkStyle">
                            <FontAwesomeIcon icon={faVrCardboard} />
                            <span style={{ marginLeft: '8px' }}>Virtual Tour</span>
                        </Link>
                    </div>
                    {/* <Badge badgeContent={100} classes={{ badge: 'custom-badge' }}> */}
                    <div className="headerListItem ">
                        <Link to="/planatrip" className="linkStyle">
                            <FontAwesomeIcon icon={faLocationDot} className="iconStyle" />
                            <span>Start a Trip</span>
                        </Link>
                    </div>
                    {/* </Badge> */}
                </div>
                {type !== "list" && (
                    <>
                        <h1 className="headerTitle">
                            Tourzee - Social Sharing and Community Integration
                        </h1>
                        <p className="headerDesc">
                            "Embark on a journey with us"
                        </p>
                        {!user && <Link to="/register" className="linkStyle"><button className="headerBtn">Sign in / Register</button></Link>}
                        {/* <div className="headerSearch">
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faLocationPin} className="headerIcon" />
                                <input
                                    type="text"
                                    placeholder="Where do you plan to go?"
                                    className="headerSearchInput"
                                    onChange={(e) => setPlace(e.target.value)}
                                />
                            </div>
                            <div className="space"></div>
                            <div className="headerSearchItem">
                                <button className="headerBtn" onClick={handleSearch}>
                                    Search
                                </button>
                            </div>
                        </div> */}
                    </>
                )}
            </div>
        </div>
    );
};

export default HeaderforSocial;
