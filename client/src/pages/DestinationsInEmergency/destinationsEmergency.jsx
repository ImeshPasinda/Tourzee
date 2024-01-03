

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import HeaderForEmergency from '../../components/headerforEmergency/headerforEmergency';
import Footer from '../../components/footer/Footer';
import MailList from '../../components/mailList/MailList';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField'; // Import MUI TextField
import axios from 'axios'; // Import axios

const DestinationsEmergency = () => {
  const [tips, setTips] = useState([]);
  const [filteredTips, setFilteredTips] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch data from your API endpoint using axios
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/destinationsafetytips/'); // Replace with your actual API URL
        if (response.status !== 200) {
          throw new Error('API request failed');
        }
        setTips(response.data.safetyTips); // Set the 'tips' state with the array of safety tips
        setFilteredTips(response.data.safetyTips); // Initialize filteredTips with all data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Filter tips based on searchQuery whenever it changes
    const filteredData = tips.filter((tip) =>
      tip.destination.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTips(filteredData);
  }, [searchQuery, tips]);

  const columns = [
    { field: 'destination', headerName: 'Destination', flex: 1 },
    { field: 'location', headerName: 'Location', flex: 1 },
    { field: 'advicelevel', headerName: 'Advice Level', flex: 1 },
    { field: 'timeperiod', headerName: 'Time Period', flex: 1 },
  ];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <HeaderForEmergency />
      <div className="homeContainer">
        <h1 className="homeTitle">Search Your Destination Before You Travel !</h1>


        <div
          style={{
            paddingTop: '15px',
            paddingLeft: '20px',
            paddingRight: '20px',
            width: '100%',
            maxWidth: '1024px',
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            zIndex: '1',
          }}
        >



          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                Overall Travel Advice Levels
              </Typography>
              {/* Add your card content here */}
              <List>
                <ListItem>
                  <ListItemText
                    primary="Do Not Travel"
                    secondary="This level is reserved for areas with extreme safety concerns, such as active conflict zones or natural disasters where the risk to travelers is unacceptably high."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Exercise a High Degree of Caution"
                    secondary="This level indicates that there are specific safety concerns in the area, such as political unrest or localized security issues. Travelers should be vigilant and take necessary precautions."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Exercise Normal Safety Precautions"
                    secondary="This level suggests that the destination is generally safe for travelers, with no specific threats or issues. However, it's always wise to exercise standard safety practices."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Reconsider Your Need to Travel"
                    secondary="This level implies that although travel is not explicitly discouraged, there may be factors, such as weather conditions or seasonal events, that make visiting less desirable."
                  />
                </ListItem>
                {/* Add more list items as needed */}
              </List>
            </CardContent>
          </Card>


          <img
            src="https://img.freepik.com/free-vector/tourists-wearing-face-masks_23-2148596070.jpg?w=740&t=st=1693982547~exp=1693983147~hmac=f4d93a451cb57316e34edc7da710ee8441fc7cdc68f2101b0d1320a55ddec7e3"
            alt="Image Description"
            style={{ maxWidth: '40%', height: 'auto', borderRadius: '10px' }}
          />
        </div>


        <TextField
          label="Search Destination"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ marginBottom: '20px', width: '950px' }}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', gap: '20px' }}></div>
        </div>


        <TableContainer style={{ maxWidth: '950px' }}>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
            <TableHead>
              <TableRow>
                <TableCell className="bold-cell">Destination</TableCell>
                <TableCell className="bold-cell">Location</TableCell>
                <TableCell className="bold-cell">Advice Level</TableCell>
                <TableCell className="bold-cell">Time Period</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTips.map((tip, index) => (
                <TableRow key={index}>
                  <TableCell>{tip.destination}</TableCell>
                  <TableCell>{tip.location}</TableCell>
                  <TableCell>{tip.advicelevel}</TableCell>
                  <TableCell>{tip.timeperiod}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>



        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default DestinationsEmergency;
