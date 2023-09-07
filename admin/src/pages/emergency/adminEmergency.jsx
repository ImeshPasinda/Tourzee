import React from 'react';
import { Grid, Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
const cardStyle = {
  maxWidth: 250, // Adjust the card width as needed
  margin: '8px', // Reduce margin between cards
};

function AdminEmergency() {
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={cardStyle}>
            <img
              src="https://img.freepik.com/premium-vector/two-young-women-make-choice-grocery-store-using-large-screen-smartphone-shop-windows_65580-207.jpg?w=250" // Adjust image width
              alt="Card image cap"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Safety-BeforeGo
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Add safety tips
              </Typography>
            </CardContent>
            <CardActions>
              <Button href="adminSBYG" variant="contained" color="primary">
                See More
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={cardStyle}>
            <img
              src="https://img.freepik.com/free-vector/fire-inspection-abstract-concept-illustration-fire-alarm-detection-building-inspection-checklist-fulfill-requirements-safety-certification-annual-inspection_335657-599.jpg?w=250" // Adjust image width
              alt="Card image cap"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Destination Safety
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage safety advice levels
              </Typography>
            </CardContent>
            <CardActions>
              <Button href="adminDesEmergency" variant="contained" color="primary">
                See More
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={cardStyle}>
            <img
              src="https://img.freepik.com/free-vector/modern-emergency-word-concept-with-flat-design_23-2147938981.jpg?w=250" // Adjust image width
              alt="Card image cap"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Urgent Help Desk
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage Urgent Help facility
              </Typography>
            </CardContent>
            <CardActions>
              <Button href="adminUrgent" variant="contained" color="primary">
                See More
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      </div>
    </div>
  );
}

export default AdminEmergency;
