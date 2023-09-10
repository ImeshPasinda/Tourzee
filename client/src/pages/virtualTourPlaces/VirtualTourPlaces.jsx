import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import HeaderforVirtualTour from "../../components/headerforVirtualTour/HeaderforVirtualTour";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { Card } from "antd";
import { Meta } from "antd/es/list/Item";
import { useLocation } from "react-router-dom";
import {Link} from "react-router-dom"
import {
  GoogleMap,
  StreetViewPanorama,
  LoadScript,
} from "@react-google-maps/api";

const googleApiKey = "AIzaSyA44R7M50CvxW25lU6kgdnfptEW-dSsaWs"; // Replace with your actual Google Maps API key

const containerStyle = {
  width: "100%",
  height: "400px",
};

export default function VirtualTourPlaces() {
  const [data, setData] = useState([]);
  const location = useLocation();
  const searchQuery = location.state ? location.state.title : "";

  useEffect(() => {
    axios
      .get("http://localhost:8800/api/virtualTour/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <HeaderforVirtualTour />
      <div className="virtual-tour-details">
        <Link to="/virtualTour/virtualTourPlaces/virtualTourMap">
        <div
          className="card-container"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {filteredData.map((item, index) => (
            <div
              key={index}
              style={{
                width: "25%",
                padding: "10px",
                boxSizing: "border-box",
              }}
            >
              <Card
                hoverable
                style={{
                  width: "75%",
                  marginTop: "100px",
                  marginLeft: "50px",
                  marginRight: "50px",
                  marginBottom: "50px",
                }}
                cover={
                  <img
                    src={item.photos[0]}
                    style={{
                      width: "100%", // Set the width to 100% to make it fill the card
                      height: "150px", // Adjust the height as needed
                      objectFit: "cover", // Ensure the image covers the entire space without stretching
                    }}
                  />
                }
              >
                <Meta title={item.title} description={item.description} />
                <h3>{item.location}</h3>
              </Card>
            </div>
          ))}
         
        </div>
        </Link>
      </div>

     
      <MailList />
      <Footer />
    </div>
  );
}
