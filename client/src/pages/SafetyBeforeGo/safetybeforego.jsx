
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import HeaderForEmergency from '../../components/headerforEmergency/headerforEmergency';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Footer from "../../components/footer/Footer";
import MailList from "../../components/mailList/MailList";

// Define your OpenWeatherMap API key here
const apiKey = '8bb22a595c9c59025daa28addb2d0b60';

const apiUrl = `https://api.openweathermap.org/data/2.5/weather`;

const tipStyle = {
  marginBottom: '16px', // Add spacing between tips
};

const Safetybeforego = () => {
  // State to store weather data
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Function to fetch weather data
    const fetchWeatherData = async () => {
      try {
        // Make the API request with the API key and specify the location (Sri Lanka in this case)
        const response = await fetch(`${apiUrl}?q=Sri Lanka&appid=${apiKey}`);
        const data = await response.json();

        // Set the weather data to state
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    // Call the fetchWeatherData function when the component mounts
    fetchWeatherData();
  }, []);

  return (
    <div>
      <Navbar />
      <HeaderForEmergency />
      <div className="homeContainer">
        <h1 className="homeTitle">Safety - Before You Go </h1>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', gap: '20px' }}>
            {/* Include your buttons or links here */}
          </div>
        </div>
        <div
          style={{
            paddingTop: '15px',
            paddingLeft: '30px',
            paddingRight: '20px',
            width: '120%',
            maxWidth: '1100px',
            display: 'flex',
            flexDirection: 'column', /* Change to column layout */
            alignItems: 'center', /* Center align content */
            zIndex: '1',
          }}
        >
          {/* Display weather data */}
          {weatherData && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" color="textPrimary" gutterBottom>
                    Current Weather in Sri Lanka
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Temperature: {weatherData.main.temp}°C
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Weather: {weatherData.weather[0].description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Wind Speed: {weatherData.wind.speed} m/s
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Precipitation: {weatherData.rain ? `${weatherData.rain['1h']} mm` : 'N/A'}
                  </Typography>
                </CardContent>
              </Card>
              <img
  src="https://img.freepik.com/free-vector/travel-time-typography-logo-with-travelers-group_1308-88815.jpg?w=740&t=st=1693973471~exp=1693974071~hmac=bdee51c4e13fcd7b17356c5783a2cd250abf3c2fd70897a6742b3e4bc54c721c"
  alt="Image Description"
  style={{ maxWidth: '30%', height: 'auto', borderRadius: '10px', marginLeft: '20px', marginRight: '20px' }}
/>

              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" color="textPrimary" gutterBottom>
                    Travel Safety Tips
                  </Typography>
                  <List>
                    <ListItem style={tipStyle}>
                      <CheckCircleOutlineIcon color="primary" fontSize="small" />
                      <ListItemText
                        primary={<strong>Research:</strong>}
                        secondary="Learn about the place you're going to. 
                        Find out about their rules and how they do things."
                      />
                    </ListItem>
                    <ListItem style={tipStyle}>
                      <CheckCircleOutlineIcon color="primary" fontSize="small" />
                      <ListItemText
                        primary={<strong>Warnings:</strong>}
                        secondary="Check if there are any warnings about going to that place.
                         Sometimes, there can be dangerous situations."
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </div>
          )}
          <br></br>
        </div>

        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Safetybeforego;
