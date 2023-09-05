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
import { SearchContext } from "../../context/SearchContext";
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

    const { dispatch } = useContext(SearchContext);

    const handleSearch = () => {
        dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
        navigate("/hotels", { state: { destination, dates, options } });
    };

    return (
        <div className="header">
            <div
                className={
                    type === "list" ? "headerContainer listMode" : "headerContainer"
                }
            >
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
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faTruckMedical} />
                        <span>Safety</span>
                    </div>
                    <Badge badgeContent={100} classes={{ badge: 'custom-badge' }}>
                        <div className="headerListItem ">
                            <FontAwesomeIcon icon={faLocationDot} />
                            <span>Start a Trip</span>
                        </div>
                    </Badge>
                </div>
                {type !== "list" && (
                    <>
                        <h1 className="headerTitle">
                            Tourzee - Safety and Emergency Assistance Service
                        </h1>
                        <p className="headerDesc">
                            "Explore Your Travel Experience Safe and Secure"
                        </p>
                        {!user && <button className="headerBtn">Sign in / Register</button>}
                        <div className="headerSearch">
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                                <input
                                    type="text"
                                    placeholder="Where are you now?"
                                    className="headerSearchInput"
                                    onChange={(e) => setDestination(e.target.value)}
                                />
                            </div>
                            
                          
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

export default HeaderForEmergency;
