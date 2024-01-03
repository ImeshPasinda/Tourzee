
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
} from '@mui/material';
import { Form, Input, Select, Button, Modal } from 'antd';

function AdminDestinationEmergency() {
  const [safetyTips, setSafetyTips] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTip, setEditingTip] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8800/api/destinationsafetytips/');
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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const showAddModal = () => {
    form.resetFields(); // Reset the form fields when opening the modal for adding
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = async () => {
    try {
      // Validate the form fields
      await form.validateFields();

      // Get the form values
      const formData = form.getFieldsValue();

      // Send a POST request to your server
      const response = await axios.post('http://localhost:8800/api/destinationsafetytips/', formData);

      if (response.status === 201) {
        // Reset the form and close the modal
        form.resetFields();
        setIsModalOpen(false);

        // Refetch the data to update the UI after successful creation
         fetchData();
      } else {
        console.error('Failed to create safety tip.');
      }
    } catch (error) {
      console.error('Error adding safety tip:', error);
    }
  };

  const handleEditSave = async () => {
    try {
      // Validate the form fields
      await form.validateFields();

      // Get the form values
      const formData = form.getFieldsValue();

      // Send a PUT request to your server to update the safety tip
      const response = await axios.put(`http://localhost:8800/api/destinationsafetytips/${editingTip._id}`, formData);

      if (response.status === 200) {
        // Reset the form, close the modal, and clear the editingTip state
        form.resetFields();
        setIsModalOpen(false);
        setEditingTip(null);

        // Refetch the data to update the UI after successful update
         fetchData();
      } else {
        console.error('Failed to update safety tip.');
      }
    } catch (error) {
      console.error('Error updating safety tip:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8800/api/destinationsafetytips/');
      if (response.status === 200) {
        // If the request is successful (status code 200), update the safetyTips state with the data.
        setSafetyTips(response.data.safetyTips);
      } else {
        console.error('API request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const columns = [
    { field: 'destination', headerName: 'Destination', flex: 1 },
    { field: 'location', headerName: 'Location', flex: 1 },
    { field: 'advicelevel', headerName: 'Advice Level', flex: 1 },
    { field: 'timeperiod', headerName: 'Time Period', flex: 1 },
    { field: 'edit', headerName: 'Edit', flex: 1 },
    { field: 'delete', headerName: 'Delete', flex: 1 },
  ];
  const showEditModal = (tip) => {
    // Set the editingTip to the tip you want to edit
    setEditingTip(tip);
    form.setFieldsValue({
      destination: tip.destination,
      advicelevel: tip.advicelevel,
      location: tip.location,
      timeperiod: tip.timeperiod,
    });
    setIsModalOpen(true);
  };
  
  const handleDeleteClick = async (tipId) => {
    try {
      // Make a DELETE request to your API to delete the safety tip
      const response = await axios.delete(`http://localhost:8800/api/destinationsafetytips/${tipId}`);

      if (response.status === 200) {
        // Remove the deleted safety tip from the local state
        setSafetyTips((prevTips) => prevTips.filter((tip) => tip._id !== tipId));
        console.log(`Safety tip with ID ${tipId} deleted successfully.`);
      } else {
        console.error(`Failed to delete safety tip with ID ${tipId}.`);
      }
    } catch (error) {
      console.error('Error deleting safety tip:', error);
    }
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
          <Typography variant="h5" gutterBottom>
            Destination Advice Level Management
          </Typography>
          <TextField
            label="Search Destination"
            variant="outlined"
            onChange={handleSearchChange}
            value={searchQuery}
          />
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
                             onClick={() => showEditModal(tip)}
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

         <br></br>
            <Button type="primary" onClick={showAddModal}>
              Add Advice Levels
            </Button>

          <Modal visible={isModalOpen} onOk={editingTip ? handleEditSave : handleOk} onCancel={handleCancel}>
            <Form form={form} layout="vertical">
              <Form.Item name="destination" label="Destination" rules={[{ required: true, message: 'Please enter Name' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="advicelevel" label="Advice Level" rules={[{ required: true, message: 'Please select Type' }]}>
                <Select>
                  <Select.Option value="Exercise a High Degree of Caution">Exercise a High Degree of Caution</Select.Option>
                  <Select.Option value="Exercise Normal Safety Precautions">Exercise Normal Safety Precautions</Select.Option>
                  <Select.Option value="Reconsider Your Need to Travel">Reconsider Your Need to Travel</Select.Option>
                  <Select.Option value="Do Not Travel">Do Not Travel</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="location" label="Location" rules={[{ required: true, message: 'Please enter City' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="timeperiod" label="Time Period" rules={[{ required: true, message: 'Please enter Address' }]}>
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default AdminDestinationEmergency;
