// import React from 'react';
// import Sidebar from '../../components/sidebar/Sidebar';
// import Navbar from '../../components/navbar/Navbar';
// import axios from 'axios';
// import { Card } from 'antd';
// import { Grid } from '@mui/material';

// const Reports = () => {
//   return (
//     <div className="new">
//       <Sidebar />
//       <div className="newContainer">
//         <Navbar />
//         <div className="card-container">
//         <br/><br/>
//             <h3>Report Generation</h3><br/><br/>
//           <Grid container spacing={2} justifyContent="center">
//             {/* Card 1 */}
//             <Grid item xs={12} sm={6} md={4}>
//               <Card
//                 type="inner"
//                 extra={<a href="#">More</a>}
//                 title="User Social Activity Report"
//                 bordered={false}
//                 style={{
//                   width: 300,
//                 }}
//                 className="custom-card"
//               >
//                 <p>A summary of user activity,
//                   including the total number of posts, photos,
//                   interactions.</p>

//               </Card>
//             </Grid>

//             <Grid item xs={12} sm={6} md={4}>
//               <Card
//                 type="inner"
//                 extra={<a href="#">More</a>}
//                 title="Virtual Tour Report"
//                 bordered={false}

//                 style={{
//                   width: 300,
//                 }}
//                 className="custom-card"

//               >
//                 <p>Detailed information about  virtual tours.</p>

//               </Card>
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <Card
//                 type="inner"
//                 extra={<a href="#">More</a>}
//                 title=" Report"
//                 bordered={false}
//                 style={{
//                   width: 300,
//                 }}
//                 className="custom-card"
//               >
//                 <p>Detailed information about trip plans </p>

//               </Card>
//             </Grid>

//           </Grid>





//         </div>
//       </div>
//     </div>
//   );
// };

// export default Reports;
import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Card, Modal, Button } from 'antd';
import { Grid } from '@mui/material';

const Reports = () => {
  const [userReportVisible, setUserReportVisible] = useState(false);
  const [tourReportVisible, setTourReportVisible] = useState(false);
  const [tripReportVisible, setTripReportVisible] = useState(false);

  const showUserReportModal = () => {
    setUserReportVisible(true);
  };

  const showTourReportModal = () => {
    setTourReportVisible(true);
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
    // Print the User Social Activity Report modal content
    window.print();
  };

  const handlePrintTourReport = () => {
    // Print the Virtual Tour Report modal content
    window.print();
  };

  const handlePrintTripReport = () => {
    // Print the Trip Plan Report modal content
    window.print();
  };

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
                title="Trip Plan Report"
                bordered={false}
                style={{
                  width: 300,
                }}
                className="custom-card"
              >
                <p>Detailed information about trip plans</p>

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
        {/* Content for the User Social Activity Report Modal */}
        {/* You can add the content for this modal here */}
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
        {/* Content for the Virtual Tour Report Modal */}
        {/* You can add the content for this modal here */}
      </Modal>

      {/* Trip Plan Report Modal */}
      <Modal
        title="Trip Plan Report"
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
      >
        {/* Content for the Trip Plan Report Modal */}
        {/* You can add the content for this modal here */}
      </Modal>
    </div>
  );
};

export default Reports;
