
import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import { Card } from 'antd';
import { Grid } from '@mui/material';

const AdminEmergency = () => {
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="card-container">
        <br/><br/>
            <h3>Safety and Emeregency Assistance Management</h3><br/><br/>

          <Grid container spacing={2} justifyContent="center">
            {/* Card 1 */}
            <Grid item xs={12} sm={6} md={4}>
              <Card
                type="inner"
                extra={<a href="/adminDesEmergency">More</a>}
                title="Destination Safety"
                bordered={false}
                style={{
                  width: 300,
                }}
                className="custom-card"
              >
                <p>A summary of Destination Safety,
                Manage safety advice levels</p>

              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card
                type="inner"
                extra={<a href="/adminUrgent">More</a>}
                title=" Urgent Help Desk"
                bordered={false}

                style={{
                  width: 300,
                }}
                className="custom-card"

              >
                <p>Detailed information about Urgent Help Desk,Manage Urgent Help facility</p>

              </Card>
            </Grid>
            {/* <Grid item xs={12} sm={6} md={4}>
              <Card
                type="inner"
                extra={<a href="#">More</a>}
                title=" Report"
                bordered={false}
                style={{
                  width: 300,
                }}
                className="custom-card"
              >
                <p>Detailed information about trip plans </p>

              </Card>
            </Grid> */}

          </Grid>





        </div>
      </div>
    </div>
  );
};

export default AdminEmergency;
