
import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Card, Modal, Button } from 'antd';
import { Grid } from '@mui/material';

const columns = [
  {
    title: 'Name',
    dataIndex: 'username',
    key: 'username',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
];


const tripColumns = [
  {
    title: 'Trip Name',
    dataIndex: 'tripName',
    key: 'tripName',
  },
  {
    title: 'Place',
    dataIndex: 'place',
    key: 'place',
  },
  {
    title: 'Days',
    dataIndex: 'days',
    key: 'days',
  },
];


const virtualTourColumns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },

  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
  },
  // {
  //   title: 'Latitude',
  //   dataIndex: 'latitude',
  //   key: 'latitude',
  // },
  // {
  //   title: 'Longitude',
  //   dataIndex: 'longitude',
  //   key: 'longitude',
  // },
];
const Reports = () => {
  const [userReportVisible, setUserReportVisible] = useState(false);
  const [tourReportVisible, setTourReportVisible] = useState(false);
  const [tripReportVisible, setTripReportVisible] = useState(false);
  const [additionalModalVisible, setAdditionalModalVisible] = useState(false);
  const [tripData, setTripData] = useState([]);
  const [tripLoading, setTripLoading] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [virtualTourData, setVirtualTourData] = useState([]); // State to hold virtual tour data
  const [virtualTourLoading, setVirtualTourLoading] = useState(true);
  const [totalTrips, setTotalTrips] = useState(0); // State for total trips
  const [totalVirtualTours, setTotalVirtualTours] = useState(0);
  const [uniqueLocations, setUniqueLocations] = useState([]);

  const showUserReportModal = () => {
    setUserReportVisible(true);
  };

  const showTourReportModal = () => {
    setTourReportVisible(true);
    fetchVirtualTourData();
  };

  const showTripReportModal = () => {
    setTripReportVisible(true);
  };

  const handleUserReportOk = () => {
    setUserReportVisible(false);
  };

  const handleTourReportOk = () => {
    setTourReportVisible(false);
  };

  const handleTripReportOk = () => {
    setTripReportVisible(false);
  };

  const handleUserReportCancel = () => {
    setUserReportVisible(false);
  };

  const handleTourReportCancel = () => {
    setTourReportVisible(false);
  };

  const handleTripReportCancel = () => {
    setTripReportVisible(false);
  };

  const handlePrintUserReport = () => {
    window.print();
  };

  const handlePrintTourReport = () => {
    window.print();
  };

  const handlePrintTripReport = () => {
    window.print();
  };
  // Additional modal functions
  const showAdditionalModal = () => {
    setAdditionalModalVisible(true);
    fetchTripData();
  };

  const handleAdditionalModalOk = () => {
    setAdditionalModalVisible(false);
  };

  const handleAdditionalModalCancel = () => {
    setAdditionalModalVisible(false);
  };
  const handlePrintAdditionalReport = () => {
    window.print();
  };

  function calculateUniqueLocations(data) {
    const uniqueLocations = [...new Set(data.map((tour) => tour.location))];
    return uniqueLocations.length;
  }





  useEffect(() => {
    // Fetch user data from your API endpoint
    axios.get('http://localhost:8800/api/users/') // Replace with your API endpoint
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);
  // Function to fetch Trip data
  const fetchTripData = () => {
    axios.get('http://localhost:8800/api/trips/') // Replace with your API endpoint for trips
      .then((response) => {
        setTripData(response.data);
        setTripLoading(false);
        setTotalTrips(response.data.length);

      })
      .catch((error) => {
        console.error('Error fetching trip data:', error);
        setTripLoading(false);
      });
  };

  // Function to fetch virtual tour data
  const fetchVirtualTourData = () => {
    axios.get('http://localhost:8800/api/virtualTour/') // Replace with your API endpoint for virtual tours
      .then((response) => {
        setVirtualTourData(response.data);

        setVirtualTourLoading(false);
        // Calculate the total number of virtual tours
        setTotalVirtualTours(response.data.length);
        const uniqueLocations = calculateUniqueLocations(response.data);
        setUniqueLocations(uniqueLocations);
      })
      .catch((error) => {
        console.error('Error fetching virtual tour data:', error);
        setVirtualTourLoading(false);
      });
  };

  // Calculate the total number of users and unique countries
  const totalUsers = data.length;
  const uniqueCountries = [...new Set(data.map((user) => user.country))].length;

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="card-container">
          <br /><br />
          <h3>Report Generation</h3><br /><br />
          <Grid container spacing={2} justifyContent="center">
            {/* Card 1 */}
            <Grid item xs={12} sm={6} md={4}>
              <Card
                type="inner"
                extra={
                  <Button onClick={showUserReportModal}>More</Button>
                }
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
                extra={
                  <Button onClick={showTourReportModal}>More</Button>
                }
                title="Virtual Tour Report"
                bordered={false}
                style={{
                  width: 300,
                }}
                className="custom-card"
              >
                <p>Detailed information about virtual tours.</p>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card
                type="inner"
                extra={
                  <Button onClick={showTripReportModal}>More</Button>
                }
                title="User Details Report"
                bordered={false}
                style={{
                  width: 300,
                }}
                className="custom-card"
              >
                <p>Detailed information about the users registered in the system.</p>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                type="inner"
                extra={
                  <Button onClick={showAdditionalModal}>More</Button>
                }
                title="Trip Plans and Places Report"
                bordered={false}
                style={{
                  width: 300,
                }}
                className="custom-card"
              >
                <p>Detailed information about the Trip Plans and Places.</p>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>

      {/* User Social Activity Report Modal */}
      <Modal
        title="User Social Activity Report"
        visible={userReportVisible}
        onOk={handleUserReportOk}
        onCancel={handleUserReportCancel}
        footer={[
          <Button key="print" onClick={handlePrintUserReport}>
            Print
          </Button>,
          <Button key="ok" onClick={handleUserReportOk}>
            OK
          </Button>,
        ]}
      >
        Tourzee-Interactive Tour Guide
      </Modal>

      {/* Virtual Tour Report Modal */}
      <Modal
        title="Virtual Tour Report"
        visible={tourReportVisible}
        onOk={handleTourReportOk}
        onCancel={handleTourReportCancel}
        footer={[
          <Button key="print" onClick={handlePrintTourReport}>
            Print
          </Button>,
          <Button key="ok" onClick={handleTourReportOk}>
            OK
          </Button>,
        ]}
      >
        Tourzee-Interactive Tour Guide
        <br></br>2023
        <br></br>
        <hr></hr>
        <br></br>
        <Table columns={virtualTourColumns} dataSource={virtualTourData} loading={virtualTourLoading} />
        <div style={{ marginTop: '20px' }}>
          <p>Total Virtual Tours: {totalVirtualTours}</p>
          <p>Total Unique Locations: {uniqueLocations}</p>        </div>
      </Modal>

      {/* Trip Plan Report Modal */}
      <Modal
        title="User Details Report"
        visible={tripReportVisible}
        onOk={handleTripReportOk}
        onCancel={handleTripReportCancel}
        footer={[
          <Button key="print" onClick={handlePrintTripReport}>
            Print
          </Button>,
          <Button key="ok" onClick={handleTripReportOk}>
            OK
          </Button>,
        ]}
      > Tourzee-Interactive Tour Guide <br></br>2023<br></br>
        <Table columns={columns} dataSource={data} loading={loading} />

        <div style={{ marginTop: '20px' }}>
          <p>Total Users: {totalUsers}</p>
          <p>Unique Countries: {uniqueCountries}</p>
        </div>
      </Modal>

      {/* Additional Modal */}
      <Modal
        title="Trip Plans and Places Report"
        visible={additionalModalVisible}
        onOk={handleAdditionalModalOk}
        onCancel={handleAdditionalModalCancel}
        footer={[
          <Button key="print" onClick={handlePrintAdditionalReport}>
            Print
          </Button>,
          <Button key="ok" onClick={handleTripReportOk}>
            OK
          </Button>,
        ]}
      > Tourzee-Interactive Tour Guide <br></br>2023<br></br>
        <Table columns={tripColumns} dataSource={tripData} loading={tripLoading} />

        <div style={{ marginTop: '20px' }}>
          <p>Total Trip Plans: {totalTrips}</p>
          <p>Unique Locations: { }</p>
        </div>
      </Modal>
    </div>
  );
};

export default Reports;
