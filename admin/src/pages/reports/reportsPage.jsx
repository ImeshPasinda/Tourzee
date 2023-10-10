import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import { Card } from 'antd';

const Reports = () => {
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="card-container">
          <Card
            title="User Social Activity Report"
            bordered={false}
            style={{
              width: 300,
            }}
            className="custom-card"
          >
            <p>A summary of user activity,
               including the total number of posts, photos shared, 
               interactions (comments), and reviews provided by each user.</p>
           
          </Card>

          <Card
            title="Virtual Tour Report"
            bordered={false}
            style={{
              width: 300,
            }}
            className="custom-card"
          >
            <p>Detailed information about a specific virtual tour.</p>
            
          </Card>

          <Card
            title="Another Report"
            bordered={false}
            style={{
              width: 300,
            }}
            className="custom-card"
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reports;
