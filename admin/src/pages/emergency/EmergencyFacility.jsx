import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const EmergencyTour = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [stops, setStops] = useState([]);

  // Replace "/some_api_endpoint" with your actual API endpoint for fetching stops
  const { data, loading, error } = useFetch("/some_api_endpoint");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setStops(value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dzag4jrlo/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const newEmergencyFacility = {
        ...info,
        stops,
        photos: list,
      };

      // Replace "/api/emergencyfacilities" with your actual API endpoint for creating emergency facilities
      await axios.post("/api/emergencyfacilities", newEmergencyFacility);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Emergency Facility</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {/* Emergency Facility Fields */}
              <div className="formInput">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  onChange={handleChange}
                  type="text"
                  placeholder="Emergency Facility Name"
                />
              </div>
              <div className="formInput">
                <label htmlFor="type">Type</label>
                <input
                  id="type"
                  onChange={handleChange}
                  type="text"
                  placeholder="Type of Facility"
                />
              </div>
              <div className="formInput">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  onChange={handleChange}
                  type="text"
                  placeholder="City"
                />
              </div>
              <div className="formInput">
                <label htmlFor="address">Address</label>
                <input
                  id="address"
                  onChange={handleChange}
                  type="text"
                  placeholder="Address"
                />
              </div>
              <div className="formInput">
                <label htmlFor="coordinates">Coordinates</label>
                <input
                  id="coordinates"
                  onChange={handleChange}
                  type="text"
                  placeholder="Coordinates"
                />
              </div>
              <div className="formInput">
                <label htmlFor="contactNumber">Contact Number</label>
                <input
                  id="contactNumber"
                  onChange={handleChange}
                  type="text"
                  placeholder="Contact Number"
                />
              </div>

              {/* Select box for Stops (if applicable) */}
              {/* <div className="selectStops">
                <label>Stops</label>
                <select id="stops" multiple onChange={handleSelect}>
                  {loading
                    ? "Loading"
                    : data &&
                      data.map((stop) => (
                        <option key={stop._id} value={stop._id}>
                          {stop.name}
                        </option>
                      ))}
                </select>
              </div> */}
              <button onClick={handleClick}>Create Emergency Facility</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyTour;
