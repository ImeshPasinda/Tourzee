import "./virtualTourMap.css";
import Navbar from "../../components/navbar/Navbar";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spin } from 'antd';
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import HeaderforVirtualTour from "../../components/headerforVirtualTour/HeaderforVirtualTour";


const VirtualTourMap = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error } = useFetch(`/virtualTour/find/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />
      <HeaderforVirtualTour type="list" />
      <div className="space"></div>
      {loading ? (
        <Spin tip="Loading...">
          <div style={{ minHeight: '200px' }}></div>
        </Spin>
      ) : (
        <div className="placeContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="placeWrapper">

            <h1 className="placeTitle" style={{ fontSize: '30px' }}>{data.title} VR View</h1>

            <div className="space"></div>

            <div className="map-container">
              <iframe
                title="Street View"
                width="100%"
                height="500"
                frameBorder="0"
                style={{ borderRadius: 20 }}
                src={`https://www.google.com/maps/embed/v1/streetview?key=AIzaSyDbEtMrpESGgw6iEoP-FujLUFyrIgkt2QY&location=${data.latitude},${data.longitude}&heading=0&pitch=0`}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
            </div>




          </div>



          <MailList />
          <div className="space"></div>
          <Footer />
        </div>
      )}

    </div>
  );
};

export default VirtualTourMap;
