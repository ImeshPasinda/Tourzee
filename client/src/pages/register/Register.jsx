import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const [registrationData, setRegistrationData] = useState({
    username: "",
    password: "",
    email: "",
    country: "",
    city: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegistrationChange = (e) => {
    setRegistrationData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/auth/register", registrationData);
      setLoading(false);

      // Handle successful registration, e.g., redirect to login page
      navigate("/login");
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
    }
  };

  return (
    <div className="register">
      <div className="lContainer">

        <form onSubmit={handleRegistrationSubmit} className="registrationForm">
          <div className="inputContainer">
            <input
              type="text"
              placeholder="Username"
              id="username"
              value={registrationData.username}
              onChange={handleRegistrationChange}
              className="lInput"
              required
            />
          </div>
          <div className="inputContainer">
            <input
              type="password"
              placeholder="Password"
              id="password"
              value={registrationData.password}
              onChange={handleRegistrationChange}
              className="lInput"
              required
            />
          </div>
          <div className="inputContainer">
            <input
              type="text"
              placeholder="Email"
              id="email"
              value={registrationData.email}
              onChange={handleRegistrationChange}
              className="lInput"
              required
            />
          </div>
          <div className="inputContainer">
            <input
              type="text"
              placeholder="Country"
              id="country"
              value={registrationData.country}
              onChange={handleRegistrationChange}
              className="lInput"
              required
            />
          </div>
          <div className="inputContainer">
            <input
              type="text"
              placeholder="City"
              id="city"
              value={registrationData.city}
              onChange={handleRegistrationChange}
              className="lInput"
              required
            />
          </div>
          <div className="inputContainer">
            <input
              type="text"
              placeholder="Phone"
              id="phone"
              value={registrationData.phone}
              onChange={handleRegistrationChange}
              className="lInput"
              required
            />
          </div>
          <div className="inputContainer">
            <button
              type="submit"
              disabled={loading}
              className="lButton"
            >
              Register
            </button>
          </div>
        </form>

        

      </div>
    </div>
  );
};

export default Register;
