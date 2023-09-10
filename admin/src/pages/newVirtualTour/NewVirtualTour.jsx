import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { virtualTourInputs } from "../../formSource";
import axios from "axios";

const NewVirtualTour = () => {
  // Define state variables for title and description
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState(""); // State for image file
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "description") {
      setDescription(value);
    }
    else if (name === "location") {
      setLocation(value);
    }
    else if (name === "photo") {
      setPhoto(e.target.files[0]); // Store the selected image file
    }
    else if (name === "latitude") {
      setLatitude(value);
    }
    else if (name === "longitude") {
      setLongitude(value); // Store the selected image file
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your API route
      await axios.post("http://localhost:8800/api/virtualTour", {
        title,
        description,
        location,
        photo,
        latitude,
        longitude
      });

      // Optionally, you can redirect to a different page or show a success message
      console.log("Virtual Tour created successfully!");
    } catch (error) {
      console.error("Error creating Virtual Tour:", error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Virtual Tour</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit}>
              {virtualTourInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  {input.type === "file" ? ( 
                  <input
                      type="file"
                      name={input.id}
                      accept={input.accept} // Specify accepted file types
                      onChange={handleInputChange}
                    />
                    ) : (
                  <input
                    type={input.type}
                    name={input.id} // Use the input.id as the name
                    placeholder={input.placeholder}
                    value={input.id === "title" ? title : input.id === "description" ? description : input.id === "location" ?location : input.id === "latitude" ?latitude:longitude}
                    onChange={handleInputChange}
                  />
                  )}
                </div>
              ))}
              <button type="submit">Create Virtual Tour</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewVirtualTour;
