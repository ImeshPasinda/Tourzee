import React, { useState } from 'react';
import { Form, Input, Select, Switch, Upload, Button, Row, Col, Statistic, Table, Modal, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { placeInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import "./adminUrgentHelp.scss";

const { Option } = Select;

const TripTable = () => {
  const [form] = Form.useForm(); // Initialize Ant Design Form

  const { data, loading, error, refetch } = useFetch("/emergencyfacilities");

  

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

      await axios.post('/emergencyfacilities', formData);

      // Reset the form and close the modal
      form.resetFields();
      setIsModalOpen(false);

      // Refetch the data to update the UI after successful creation
      refetch();

    } catch (error) {
      console.error('Error adding facility:', error);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      // Make an API request to delete the facility by ID
      await axios.delete(`/emergencyfacilities/${id}`);

      // Refetch the data to update the UI after successful deletion
      refetch();

    } catch (error) {
      console.error('Error deleting facility:', error);
    }
  };





  //////////////////////////////////////////

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFacilityData, setEditFacilityData] = useState(null);

  const showModal = () => {
    setIsEditModalOpen(true);
  };

  const handleEditClick = (record) => {
    // Set the selected facility data
    setEditFacilityData(record);

    // Open the edit modal
    setIsEditModalOpen(true);
  };

  const handleEditOk = async () => {
    try {
      // Validate the form fields
      await form.validateFields();

      // Get the edited form values
      const editedFormData = form.getFieldsValue();

      // Make a PUT request to update the data on the server using the ID of the facility (editFacilityData._id)
      await axios.put(`/emergencyfacilities/${editFacilityData._id}`, editedFormData);

      // Reset the form, close the edit modal, and reset editFacilityData
      form.resetFields();
      setIsEditModalOpen(false);
      setEditFacilityData(null);


    } catch (error) {
      console.error('Error editing facility:', error);
    }
  };

  const handleEditCancel = () => {
    form.resetFields();
    setIsEditModalOpen(false);
    setEditFacilityData(null);
  };

  //////////////////////////////////////////////
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'typr',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Contact Number',
      dataIndex: 'contactNumber',
      key: 'contactNumber',
    },
    {
      title: 'Edit',
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => handleEditClick(record)}
        >
          Edit
        </Button>
      ),
    },

    {
      title: 'Delete',
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => handleDeleteClick(record._id)}
        >
          Delete
        </Button>
      ),
    },
    

  ];

  return (
    <div className="new">
      <Sidebar />
      <div className="newAUGContainer">
        <Navbar /><br />
        <h2>Admin- Emergency Facility Details Management</h2><br />
        <div className="bottomAUG">
          <Table
            dataSource={data} // This assumes that data is an array of objects with 'place', 'rating', and 'address' properties
            columns={columns}
            loading={loading}
            pagination={false} // Optional: To disable pagination
          />
          <div className="button-container">
            <Button type="primary" onClick={showAddModal}>
              Add Facility Details
            </Button>
          </div>
        </div>

        <Modal title="Basic Modal" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Form form={form} layout="vertical">
            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter Name' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="type" label="Type" rules={[{ required: true, message: 'Please select Type' }]}>
              <Select>
                <Select.Option value="Hospital">Hospital</Select.Option>
                <Select.Option value="Police">Police</Select.Option>
                <Select.Option value="Fire">Fire</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="city" label="City" rules={[{ required: true, message: 'Please enter City' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please enter Address' }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="contactNumber"
              label="Contact Number"
              rules={[{ required: true, message: 'Please enter Contact No' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>



        {/* Edit Data Modal with form */}

        <Modal
          title="Edit Facility"
          visible={isEditModalOpen}
          onOk={handleEditOk}
          onCancel={handleEditCancel}
        >
          <Form form={form} layout="vertical" initialValues={editFacilityData}>
            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter Name' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="type" label="Type" rules={[{ required: true, message: 'Please select Type' }]}>
              <Select>
                <Option value="Hospital">Hospital</Option>
                <Option value="Police">Police</Option>
                <Option value="Fire">Fire</Option>
              </Select>
            </Form.Item>
            <Form.Item name="city" label="City" rules={[{ required: true, message: 'Please enter City' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please enter Address' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="contactNumber" label="Contact Number" rules={[{ required: true, message: 'Please enter Contact No' }]}>
              <Input />
            </Form.Item>
          </Form>
        </Modal>

      </div>
    </div>
  );
};

export default TripTable;

