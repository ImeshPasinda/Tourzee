

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
import { Form, Input, Select, Switch, Upload, Button, Row, Col, Statistic, Modal, Popconfirm } from 'antd';

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
    // You can navigate to an edit page or open a modal for editing
    console.log(`Edit button clicked for tip with ID: ${tipId}`);
  };

  const handleDeleteClick = async (tipId) => {
    // Implement your delete logic here
    try {
      // Make a DELETE request to your API to delete the safety tip
      const response = await axios.delete(`http://localhost:8800/api/destinationsafetytips/${tipId}`); // Replace with your actual API URL
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

  // ///////////////////////
  const [form] = Form.useForm(); // Initialize Ant Design Form


  const [isModalOpen, setIsModalOpen] = useState(false);


  const showAddModal = () => {
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

      } else {
        console.error('Failed to create safety tip.');
      }
    } catch (error) {
      console.error('Error adding facility:', error);
    }
  };

  //////////////////////////////
  const [editingTip, setEditingTip] = useState(null);

  // Function to open the edit modal
  const showEditModal = (tip) => {
    setEditingTip(tip);
    setIsModalOpen(true);
  };

  // Function to handle the edit save button click
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
      } else {
        console.error('Failed to update safety tip.');
      }
    } catch (error) {
      console.error('Error updating facility:', error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="safety-tips">
          <Typography variant="h5" gutterBottom>
            <br></br>
            Destination Advice Level Management
          </Typography>
          <br></br>
          <TextField
            label="Search Destination"
            variant="outlined"
            onChange={handleSearchChange}
            value={searchQuery}
          />
          <br></br>
          <br></br>
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
                            onClick={() => showEditModal(tip)} // Pass the tip to the edit modal
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



          {/* modal */}
          <div className="button-container">
            <Button type="primary" onClick={showAddModal}>
              Add Advice Levels
            </Button>
          </div>
          <Modal visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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


          {/* Edit modal */}
          <Modal visible={isModalOpen} onOk={handleEditSave} onCancel={handleCancel}>
            <Form form={form} layout="vertical">
              <Form.Item
                name="destination"
                label="Destination"
                rules={[{ required: true, message: 'Please enter Name' }]}
                initialValue={editingTip ? editingTip.destination : ''}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="advicelevel"
                label="Advice Level"
                rules={[{ required: true, message: 'Please select Type' }]}
                initialValue={editingTip ? editingTip.advicelevel : undefined}
              >
                <Select>
                  <Select.Option value="Exercise a High Degree of Caution">Exercise a High Degree of Caution</Select.Option>
                  <Select.Option value="Exercise Normal Safety Precautions">Exercise Normal Safety Precautions</Select.Option>
                  <Select.Option value="Reconsider Your Need to Travel">Reconsider Your Need to Travel</Select.Option>
                  <Select.Option value="Do Not Travel">Do Not Travel</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="location"
                label="Location"
                rules={[{ required: true, message: 'Please enter City' }]}
                initialValue={editingTip ? editingTip.location : ''}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="timeperiod"
                label="Time Period"
                rules={[{ required: true, message: 'Please enter Address' }]}
                initialValue={editingTip ? editingTip.timeperiod : ''}
              >
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
