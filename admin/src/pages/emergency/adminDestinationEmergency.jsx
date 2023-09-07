
import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  Button,
} from '@mui/material';

function AdminDestinationEmergency() {
  const [safetyTips, setSafetyTips] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8800/api/destinationsafetytips/'); // Replace with your actual API URL
        if (response.status !== 200) {
          throw new Error('API request failed');
        }
        setSafetyTips(response.data.safetyTips);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const columns = [
    { field: 'destination', headerName: 'Destination', flex: 1 },
    { field: 'location', headerName: 'Location', flex: 1 },
    { field: 'advicelevel', headerName: 'Advice Level', flex: 1 },
    { field: 'timeperiod', headerName: 'Time Period', flex: 1 },
    { field: 'edit', headerName: 'Edit', flex: 1 },
    { field: 'delete', headerName: 'Delete', flex: 1 },
  ];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleEditClick = (tipId) => {
    // Implement your edit logic here
    console.log(`Edit button clicked for tip with ID: ${tipId}`);
  };

  const handleDeleteClick = (tipId) => {
    // Implement your delete logic here
    console.log(`Delete button clicked for tip with ID: ${tipId}`);
  };

  const filteredTips = safetyTips.filter((tip) =>
    tip.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="safety-tips">
          <Typography variant="h5" gutterBottom>  <br></br>
          Destination Advice Level Management
          </Typography>
          <br></br>
          <TextField
            label="Search Destination"
            variant="outlined"
            onChange={handleSearchChange}
            value={searchQuery}
          />
          <br></br><br></br>
          <TableContainer component={Paper} style={{ maxWidth: '1200px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.field}>{column.headerName}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTips.map((tip) => (
                  <TableRow key={tip._id}>
                    {columns.map((column) => (
                      <TableCell key={column.field}>
                        {column.field === 'edit' ? (
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleEditClick(tip._id)}
                          >
                            Edit
                          </Button>
                        ) : column.field === 'delete' ? (
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleDeleteClick(tip._id)}
                          >
                            Delete
                          </Button>
                        ) : (
                          tip[column.field]
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default AdminDestinationEmergency;
