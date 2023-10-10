import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import { Card } from 'antd';
import { Grid } from '@mui/material';

const Reports = () => {
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="card-container">
        <br/><br/>
            <h3>Report Generation</h3><br/><br/>
          <Grid container spacing={2} justifyContent="center">
            {/* Card 1 */}
            <Grid item xs={12} sm={6} md={4}>
              <Card
                type="inner"
                extra={<a href="#">More</a>}
                title="User Social Activity Report"
                bordered={false}
                style={{
                  width: 300,
                }}
                className="custom-card"
              >
                <p>A summary of user activity,
                  including the total number of posts, photos,
                  interactions.</p>

              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card
                type="inner"
                extra={<a href="#">More</a>}
                title="Virtual Tour Report"
                bordered={false}

                style={{
                  width: 300,
                }}
                className="custom-card"

              >
                <p>Detailed information about  virtual tours.</p>

              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
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
            </Grid>

          </Grid>





        </div>
      </div>
    </div>
  );
};

export default Reports;
