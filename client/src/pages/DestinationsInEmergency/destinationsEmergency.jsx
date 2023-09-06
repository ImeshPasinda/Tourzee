// import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Footer from "../../components/footer/Footer";
// import MailList from "../../components/mailList/MailList";
// import Navbar from "../../components/navbar/Navbar";
// import "./destinationsEmergency.css";
// import HeaderForEmergency from "../../components/headerforEmergency/headerforEmergency";
// import { Link } from "react-router-dom";
// import React from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';

// const DestinationsEmergency = () => {
//     return (
//         <div>
//             <Navbar />
//             <HeaderForEmergency />
//             <div className="homeContainer">
//                 <h1 className="homeTitle">Search Your Destination Before You Travel !</h1>

//                 <div
//                     style={{
//                         display: 'flex',
//                         justifyContent: 'space-between',
//                         alignItems: 'center',
//                     }}
//                 >
//                     {/* <h1 className="homeTitle">        Ensure Your Security With Us !</h1> */}
//                     <div style={{ display: 'flex', gap: '20px' }}>
                       
                        
//                     </div>
//                 </div>
//                 <div
//                     style={{
//                         paddingTop: '15px',
//                         paddingLeft: '20px',
//                         paddingRight: '20px',
//                         width: '100%',
//                         maxWidth: '1024px',
//                         display: 'flex',
//                         justifyContent: 'center',
//                         gap: '15px',
//                         zIndex: '1',
//                     }}
//                 >
//                     <Card variant="outlined">
//                         <CardContent>
//                             <Typography variant="h6" color="textPrimary" gutterBottom>
//                                 Overall Travel Advice Levels
//                             </Typography>
//                             <List>
//                                 <ListItem>
//                                     <ListItemText
//                                         primary="Do Not Travel"
//                                         secondary="This level is reserved for areas with extreme safety concerns, 
//                                         such as active conflict zones or natural disasters where the risk to travelers is unacceptably high."
//                                     />
//                                 </ListItem>
//                                 <ListItem>
//                                     <ListItemText
//                                         primary="Exercise a High Degree of Caution"
//                                         secondary="This level indicates that there are specific safety concerns in the area, 
//                                         such as political unrest or localized security issues. Travelers should be vigilant and take necessary precautions."
//                                     />
//                                 </ListItem>
//                                 <ListItem>
//                                     <ListItemText
//                                         primary="Exercise Normal Safety Precautions"
//                                         secondary="This level suggests that the destination is generally safe for travelers, 
//                                         with no specific threats or issues. However, it's always wise to exercise standard safety practices."
//                                     />
//                                 </ListItem>
//                                 <ListItem>
//                                     <ListItemText
//                                         primary="Reconsider Your Need to Travel"
//                                         secondary="This level implies that although travel is not explicitly discouraged, 
//                                         there may be factors, such as weather conditions or seasonal events, that make visiting less desirable."
//                                     />
//                                 </ListItem>
//                             </List>
//                         </CardContent>
//                     </Card>
//                     <img
//                         src="https://img.freepik.com/free-vector/tourists-wearing-face-masks_23-2148596070.jpg?w=740&t=st=1693982547~exp=1693983147~hmac=f4d93a451cb57316e34edc7da710ee8441fc7cdc68f2101b0d1320a55ddec7e3"
//                         alt="Image Description"
//                         style={{ maxWidth: '40%', height: 'auto', borderRadius: '10px' }}
//                     />
//                 </div>
//                 <MailList />
//                 <Footer />
//             </div>
//         </div>
//     );
// };

// export default DestinationsEmergency;
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

const DestinationsEmergency = () => {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8070/api/destinationsafetytips'); // Replace with your actual API URL
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        setTips(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <HeaderForEmergency />
      <div className="homeContainer">
        <h1 className="homeTitle">Search Your Destination Before You Travel !</h1>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', gap: '20px' }}></div>
        </div>
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
              </List>
            </CardContent>
          </Card>
          <img
            src="https://img.freepik.com/free-vector/tourists-wearing-face-masks_23-2148596070.jpg?w=740&t=st=1693982547~exp=1693983147~hmac=f4d93a451cb57316e34edc7da710ee8441fc7cdc68f2101b0d1320a55ddec7e3"
            alt="Image Description"
            style={{ maxWidth: '40%', height: 'auto', borderRadius: '10px' }}
          />
        </div>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
            <TableHead>
              <TableRow>
                <TableCell>Destination</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Advice Level</TableCell>
                <TableCell>Time Period</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tips.map((tip, index) => (
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
