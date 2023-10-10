import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Switch } from 'antd';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import useFetch from '../../hooks/useFetch';
import { PlusOutlined } from '@ant-design/icons'
import './tripTable.scss';
import axios from 'axios';
import { Link } from "react-router-dom";



const { Search } = Input;

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

const TripTable = () => {
  const { data, loading, error, refetch } = useFetch('/trips');
  const [filteredData, setFilteredData] = useState(data);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedTrip, setEditedTrip] = useState(null);
  const [size, setSize] = useState('large');
  const [form] = Form.useForm();

  const columns = [
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
    {
      title: 'Distance',
      dataIndex: 'distance',
      key: 'distance',
    },
    {
      title: 'Photos',
      dataIndex: 'photos',
      key: 'photos',
      render: (photos) => (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {photos.map((photo, index) => (
            <li key={index}>
              <img
                src={photo}
                alt={`Photo ${index}`}
                style={{ width: '50px', height: 'auto', borderRadius: '5px' }}
              />
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Short Description',
      dataIndex: 'descshort',
      key: 'descshort',
      render: (text) => (
        <span title={text}>{truncateText(text, 20)}</span>
      ),
    },
    {
      title: 'Long Description',
      dataIndex: 'desclong',
      key: 'desclong',
      render: (text) => (
        <span title={text}>{truncateText(text, 20)}</span>
      ),
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
    },
    {
      title: 'Budget',
      dataIndex: 'budget',
      key: 'budget',
    },
    {
      title: 'Latitude',
      dataIndex: 'latitude',
      key: 'latitude',
    },
    {
      title: 'Longitude',
      dataIndex: 'longitude',
      key: 'longitude',
    },
    {
      title: 'Featured',
      dataIndex: 'featured',
      key: 'featured',
    },
    {
      title: 'Route One',
      dataIndex: 'routeOne',
      key: 'routeOne',
      render: (text) => (
        <span title={text}>{truncateText(text, 20)}</span>
      ),
    },
    {
      title: 'Route One Title',
      dataIndex: 'routeOneTitle',
      key: 'routeOneTitle',
    },
    {
      title: 'Route Two',
      dataIndex: 'routeTwo',
      key: 'routeTwo',
      render: (text) => (
        <span title={text}>{truncateText(text, 20)}</span>
      ),
    },
    {
      title: 'Route Two Title',
      dataIndex: 'routeTwoTitle',
      key: 'routeTwoTitle',
    },
    {
      title: 'Route Three',
      dataIndex: 'routeThree',
      key: 'routeThree',
      render: (text) => (
        <span title={text}>{truncateText(text, 20)}</span>
      ),
    },
    {
      title: 'Route Three Title',
      dataIndex: 'routeThreeTitle',
      key: 'routeThreeTitle',
    },
    {
      title: 'Route Four',
      dataIndex: 'routeFour',
      key: 'routeFour',
      render: (text) => (
        <span title={text}>{truncateText(text, 20)}</span>
      ),
    },
    {
      title: 'Route Four Title',
      dataIndex: 'routeFourTitle',
      key: 'routeFourTitle',
    },
    {
      title: 'Edit',
      key: 'edit',
      fixed: 'right',
      width: 100,
      render: (text, record) => (
        <Button type="primary" onClick={() => handleEdit(record)}>
          Edit
        </Button>
      ),
    },
    {
      title: 'Delete',
      key: 'delete',
      fixed: 'right',
      width: 100,
      render: (text, record) => (
        <Button type="primary" onClick={() => showDeleteConfirmation(record)} danger>
          Delete
        </Button>
      ),
    },
  ];


  // Add a state variable to track the item to be deleted
  const [deleteItem, setDeleteItem] = useState(null);

  // Add a state variable to control the delete confirmation modal
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  // Function to show the delete confirmation modal
  const showDeleteConfirmation = (record) => {
    setDeleteItem(record);
    setDeleteModalVisible(true);
  };
  const handleDelete = async () => {
    try {
      // Send a DELETE request to the server to delete the item
      await axios.delete(`/trips/${deleteItem._id}`);
      // Close the modal and refresh the data
      setDeleteModalVisible(false);
      refetch(); // Assuming refetch is a function to refresh your data
    } catch (error) {
      // Handle errors, display an error message, or log them
      console.error('Error deleting trip:', error);
    }
  };

  const handleEdit = (trip) => {
    setEditedTrip(trip);
    setEditModalVisible(true);
    form.setFieldsValue(trip);
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
  };

  const handleEditModalOk = () => {
    // Validate the form fields
    form.validateFields().then(async (values) => {
      try {
        // Send an Axios PUT request to update the trip
        const response = await axios.put(`/trips/${editedTrip._id}`, values);
        if (response.status === 200) {
          // Trip successfully updated, close the modal and possibly refresh the data
          setEditModalVisible(false);
          // You may want to refresh the data in your table here
        } else {
          // Handle any errors from the server
          // You can display an error message to the user
          console.error('Failed to update trip:', response.data);
        }
      } catch (error) {
        // Handle any unexpected errors
        console.error('Error updating trip:', error);
      }
    });
  };

  const handleSearch = (value) => {
    const filtered = data.filter((item) => {
      const tripName = item.tripName.toLowerCase();
      const searchValue = value.toLowerCase();
      return tripName.includes(searchValue);
    });
    setFilteredData(filtered); // Update filteredData, not data
  };



  useEffect(() => {
    setFilteredData(data);
  }, [data]);


  return (
    <div className="new">
      <Sidebar />
      <div className="newTripContainer">
        <Navbar />

        <div className="bottomTrip">
          <div className="search-bar">
            <Search
              placeholder="Search trip name"
              onSearch={handleSearch}
              style={{
                width: 200,
              }}
            />
          </div>
          <br />
          <Table
            dataSource={filteredData} // Use filteredData here
            columns={columns}
            loading={loading}
            pagination={false}
          />
          <br />
          <Link to="/trips/new">
            <Button type="primary" icon={<PlusOutlined />} size={size}>
              Add Trip Plan
            </Button>
          </Link>
        </div>

      </div>

      <Modal
        title="Edit Trip"
        visible={editModalVisible}
        onCancel={handleEditModalCancel}
        onOk={handleEditModalOk}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="tripName" label="Trip Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="place" label="Place" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="days" label="Days" rules={[{ required: true, type: 'number' }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item name="photos" label="Photos">
            <Input />
          </Form.Item>
          <Form.Item name="distance" label="Distance" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="descshort" label="Short Description" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="desclong" label="Long Description" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="rating" label="Rating" rules={[{ required: true, type: 'number' }]}>
            <InputNumber min={0} max={5} />
          </Form.Item>
          <Form.Item name="budget" label="Budget" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="latitude" label="Latitude" rules={[{ required: true, type: 'number' }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item name="longitude" label="Longitude" rules={[{ required: true, type: 'number' }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item name="featured" label="Featured" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item name="routeOne" label="Route One" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="routeOneTitle" label="Route One Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="routeTwo" label="Route Two" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="routeTwoTitle" label="Route Two Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="routeThree" label="Route Three" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="routeThreeTitle" label="Route Three Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="routeFour" label="Route Four" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="routeFourTitle" label="Route Four Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>

      </Modal>
      <Modal
        title="Delete Trip"
        visible={deleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setDeleteModalVisible(false)}
      >
        Are you sure you want to delete this trip?
      </Modal>
    </div>
  );
};

export default TripTable;
