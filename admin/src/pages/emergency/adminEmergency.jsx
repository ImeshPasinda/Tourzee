import React from 'react';
import { Grid, Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const cardStyle = {
  maxWidth: 250, // Adjust the card width as needed
  margin: '8px', // Reduce margin between cards
  padding: '2px', // Reduce padding within cards
};

function AdminEmergency() {
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <br/><br/>
        <h3>Safety and Emeregency Assistance Management</h3><br/><br/>
        <Grid container spacing={2} justifyContent="center">
          {/* Card 1 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={cardStyle}>
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

          {/* Card 2 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={cardStyle}>
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

          {/* Card 3 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={cardStyle}>
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
