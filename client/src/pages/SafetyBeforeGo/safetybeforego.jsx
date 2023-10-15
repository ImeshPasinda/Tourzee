
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
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import EventIcon from '@mui/icons-material/Event';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
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
        console.log(data)

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
        <h1 className="homeTitle">Safety - Before You Go</h1>

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
                    Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C
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
                        secondary="Learn about the place you're going to. Find out about their rules and how they do things."
                      />
                    </ListItem>
                    <ListItem style={tipStyle}>
                      <CheckCircleOutlineIcon color="primary" fontSize="small" />
                      <ListItemText
                        primary={<strong>Warnings:</strong>}
                        secondary="Check if there are any warnings about going to that place. Sometimes, there can be dangerous situations."
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </div>
          )}


          <br></br><br></br><br></br>
          {/* Accordions */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Local Laws</Typography>
            </AccordionSummary>
            <AccordionDetails>


              <InfoIcon color="primary" /> Public Emergencies can be declared, and curfews imposed at short notice.
              Carry relevant travel and photo identification documents with you .
              If you don't, officials may detain you.
              <br></br><br></br>

              <WarningIcon color="primary" /> The legal drinking age is 21.
              It is illegal to drink alcohol or smoke in public.<br></br><br></br>

              <EventIcon color="primary" /> Be careful when taking photos.
              You must not photograph or video inside High-Security Zones (HSZs).
              These include military sites, some government buildings and official residences. HSZs aren't always marked.<br></br><br></br>

              <LocalDrinkIcon color="primary" /> Respect the local culture. It's illegal to mistreat Buddhist images.
              This includes posing for photos with Buddha statues or wearing tattoos, clothing, or jewelry associated with Buddhism.
              Get local advice before photographing places of worship.<br></br><br></br>

              <CameraAltIcon color="primary" /> Sri Lanka has conservative dress and behavior standards.
              Take care not to offend.<br></br><br></br>

            </AccordionDetails>
          </Accordion>


          {/* 2 */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Health</Typography>
            </AccordionSummary>
            <AccordionDetails>




              <DirectionsRunIcon color="primary" />  Crime, including sexual assault, harassment, and robbery, can occur.
              If you're traveling alone, arrange travel through a reputable company.<br></br><br></br>

              <LockIcon color="primary" />  Always carry travel and identification documents.
              Allow additional time to clear security checks, especially at airports.<br></br><br></br>

              <VisibilityIcon color="primary" />   Public demonstrations can occur throughout Sri Lanka and may become violent.
              Avoid areas impacted by demonstrations. Demonstrations can lead to disruptions to traffic and public transport.
              <br></br><br></br>
              <AccessibilityNewIcon color="primary" />   Public emergencies can be declared, and curfews imposed at short notice.
              Carry relevant travel and identification documents with you at all times.<br></br><br></br>

            </AccordionDetails>
          </Accordion>

          {/* 3 */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Travel</Typography>
            </AccordionSummary>
            <AccordionDetails>


              <InfoIcon color="primary" style={{ marginRight: '10px' }} />
              You'll need a visa in the form of an Electronic Travel Authority to enter Sri Lanka.<br></br><br></br>

              <InfoIcon color="primary" style={{ marginRight: '10px' }} />
              Sri Lanka has introduced Digital Arrival & Departure Cards, which can be completed three days prior to travel.<br></br><br></br>

              <InfoIcon color="primary" style={{ marginRight: '10px' }} />
              Entry and exit conditions can change at short notice. You should contact the nearest high commission,
              embassy, or consulate of Sri Lanka for the latest details.<br></br><br></br>

              <InfoIcon color="primary" style={{ marginRight: '10px' }} />
              Airlines may require proof of certain vaccinations to travel. Check requirements with individual airlines prior to travel.<br></br><br></br>

            </AccordionDetails>
          </Accordion>



          {/* End of Accordions */}
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Safetybeforego;
