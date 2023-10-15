import {
    faBed,
    faCalendarDays,
    faCar,
    faLocationDot,
    faPerson,
    faRoad,
    faTruckMedical,
    faVrCardboard
} from "@fortawesome/free-solid-svg-icons";
import Badge from '@mui/material/Badge';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./headerforEmergency.css";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const HeaderForEmergency = ({ type }) => {
    const [destination, setDestination] = useState("");
    const [openDate, setOpenDate] = useState(false);
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    });

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);


    const handleOption = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
            };
        });
    };



    const handleSearch = () => {

        navigate("/places", { state: { destination, dates, options } });
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
                        <span style={{ marginLeft: '8px' }} >Attractions</span> </Link>
                    </div>
                    <div className="headerListItem">
                        <Link to="/socialsharing" className="linkStyle">
                            <FontAwesomeIcon icon={faPerson} />
                            <span style={{ marginLeft: '8px' }}>Social</span>
                        </Link>
                    </div>

                    <div className="headerListItem active">
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
                        <h1 className="headerTitle">
                            Tourzee - Safety and Emergency Assistance Service
                        </h1>
                        <p className="headerDesc">
                            "Explore Your Travel Experience Safe and Secure"
                        </p>
                        {!user && <Link to="/register" className="linkStyle"><button className="headerBtn">Sign in / Register</button></Link>}
                        {/* <div className="headerSearch">
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                                <input
                                    type="text"
                                    placeholder="Where are you now?"
                                    className="headerSearchInput"
                                    onChange={(e) => setDestination(e.target.value)}
                                />
                            </div>

                            <div className="space"></div>
                            <div className="headerSearchItem">
                                <button className="headerBtn">
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

export default HeaderForEmergency;
