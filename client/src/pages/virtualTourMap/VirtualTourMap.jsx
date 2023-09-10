import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import HeaderforVirtualTour from "../../components/headerforVirtualTour/HeaderforVirtualTour";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { useLocation } from "react-router-dom";
import {
  GoogleMap,
  StreetViewPanorama,
  LoadScript,
} from "@react-google-maps/api";

const googleApiKey = "AIzaSyA44R7M50CvxW25lU6kgdnfptEW-dSsaWs"; // Replace with your actual Google Maps API key

const containerStyle = {
  marginTop: "40px",
  marginLeft: "50px",
  marginRight: "50px",
  width: "80%",
  height: "400px",
};

export default function VirtualTourMap() {
  const [data, setData] = useState([]);
  const location = useLocation();
  const searchQuery = location.state ? location.state.title : "";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8800/api/virtualTour/");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const calculateMapCenter = () => {
    if (data.length === 0) {
      return { lat: 0, lng: 0 }; // Default center if no data
    }

    const bounds = new window.google.maps.LatLngBounds();

    data.forEach((item) => {
      bounds.extend(new window.google.maps.LatLng(item.latitude, item.longitude));
    });

    const center = bounds.getCenter();

    return { lat: center.lat(), lng: center.lng() };
  };

  return (
    <div>
      <Navbar />
      <HeaderforVirtualTour />
      <div className="virtual-tour-details"></div>

      <div style={{ height: "400px", marginTop: "20px" }}>
        <LoadScript googleMapsApiKey={googleApiKey}>
          <GoogleMap
            id="virtualTourMap"
            mapContainerStyle={containerStyle}
            center={calculateMapCenter()}
            zoom={14}
          >
            {data.map((item, index) => (
              <StreetViewPanorama
                key={index}
                position={{
                  lat: parseFloat(item.latitude),
                  lng: parseFloat(item.longitude),
                }}
                visible={true}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>

      <MailList />
      <Footer />
    </div>
  );
}
