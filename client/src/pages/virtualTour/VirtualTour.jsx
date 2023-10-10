import React, { useState, useEffect } from "react";
import "./virtualTour.css";
import Navbar from "../../components/navbar/Navbar";
import HeaderforVirtualTour from "../../components/headerforVirtualTour/HeaderforVirtualTour";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function VirtualTour() {

  return (
    <div>
      <Navbar />
      <HeaderforVirtualTour />
      
      <div className="homeContainer">
        <h1
          className="homeTitle"
          style={{ paddingTop: "30px" }}
        >
          Virtual Reality In Touring World
        </h1>

        {/* <h1 className="homeTitle" style={{ paddingTop: '50px' }}>Mirissa</h1> */}
        <div
          style={{
            paddingTop: "15px",
            paddingLeft: "20px",
            paddingRight: "20px",
            width: "100%",
            maxWidth: "1024px",
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
            zIndex: "1",
          }}
        >
          <p style={{ textAlign: "justify" }}>
            Virtual Reality (VR) is revolutionizing the tourism industry by
            offering immersive virtual tours, 360-degree experiences, and
            live-streamed events, making travel planning, education, and
            entertainment more engaging and accessible.
            <br></br>
            <br></br>
            Tourzee offers virtual tours, enabling users to explore destinations
            conveniently from anywhere. And also it's breaks down travel
            restrictions and barriers. Users can tour destinations that may be
            difficult to access due to political, geographical, or logistical
            challenges.
            <br></br>
            <br></br>
            So guys, Unlock the Wonders, One Virtual Tour at a Time with
            Tourzee...!
          </p>

          <img
            src="https://www.globaltimes.cn/Portals/0/attachment/2021/2021-03-29/ab0664f6-415a-4483-a68f-9bb8a30db595.jpeg"
            alt="Image Description"
            style={{
              maxWidth: "40%",
              height: "auto",
              borderRadius: "10px",
              marginLeft: "10px",
              transition: "transform 0.2s", // Add a smooth transition
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.1)"; // Zoom in on hover
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)"; // Return to normal size on mouse out
            }}
          />
        </div>
        <div
          style={{
            paddingTop: "15px",
            paddingLeft: "20px",
            paddingRight: "20px",
            width: "100%",
            maxWidth: "1024px",
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
            zIndex: "1",
          }}
        >
       <Link to="/virtualTour/virtualTourPlaces">
          <button className="headerBtn">
            Get Virtual Tour{" "}
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{ marginLeft: "5px" }}
            />
          </button>
          </Link>
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
}
