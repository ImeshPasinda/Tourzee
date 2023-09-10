import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal,Input } from 'antd';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import './virtualTour.css';
import axios from 'axios';

export default function VirtualTour() {
  const [tourData, setTourData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  useEffect(() => {
    // Fetch data from your server
    axios
      .get('/virtualTour')
      .then((response) => {
        console.log('Fetched data:', response.data);
        setTourData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Confirm Deletion',
      content: 'Are you sure you want to delete this item?',
      onOk: () => {
        // Send a DELETE request to your server to delete the record by ID
        axios
          .delete(`/virtualTour/${record._id}`)
          .then(() => {
            // Update the state to remove the deleted record
            setTourData((prevData) =>
              prevData.filter((item) => item._id !== record._id)
            );
          })
          .catch((error) => {
            console.error('Error deleting record:', error);
          });
      },
    });
  };

const handleEdit = (record) => {
    setEditingItem(record);
    setEditModalVisible(true);
  };
  const handleUpdate = () => {
    // Send a PUT request to your server to update the record by ID
    axios
      .put(`/virtualTour/${editingItem._id}`, editingItem)
      .then(() => {
        // Update the state to reflect the changes
        setTourData((prevData) =>
          prevData.map((item) =>
            item._id === editingItem._id ? editingItem : item
          )
        );
        setEditModalVisible(false);
      })
      .catch((error) => {
        console.error('Error updating record:', error);
      });
  };
  const columns = [
    {
      title: 'Title',
      width: 200,
      dataIndex: 'title',
      key: 'title',
      fixed: 'left',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
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
      title: 'Edit',
      key: 'edit',
      fixed: 'right',
      width: 100,
      render: (text, record) => (
        <Button className='edit' onClick={() => handleEdit(record)}>Edit</Button>
      ),
    },
    {
      title: 'Delete',
      key: 'delete',
      fixed: 'right',
      width: 100,
      
      render: (text, record) => (
        <Button className='delete'onClick={() => handleDelete(record)}>Delete</Button>
      ),
    },
  ];

  return (
    <div>
      <div className="new">
        <Sidebar />
        <div className="newContainer">
          <Navbar />
          <h1 className="header-datatable">Virtual Tour Data Table</h1>
          <Table
            className="table-data"
            columns={columns}
            dataSource={tourData}
            scroll={{ x: 1300 }}
            loading={loading}
          />
          <Space wrap>
            <Link to="/virtualTour/new">
              <Button className="button-datatable" type="primary">
                Add Virtual Tour
              </Button>
            </Link>
          </Space>
        </div>
      </div>
 {/* Edit Modal */}
 <Modal
        title="Edit Virtual Tour Details"
        visible={editModalVisible}
        onOk={handleUpdate}
        onCancel={() => setEditModalVisible(false)}
      >
        <h4>Title</h4>
        <Input
          
          placeholder="Title"
          value={editingItem?.title}
          onChange={(e) =>
            setEditingItem({ ...editingItem, title: e.target.value })
          }
        />
        <h4>Description</h4>
        <Input
          placeholder="Description"
          value={editingItem?.description}
          onChange={(e) =>
            setEditingItem({ ...editingItem, description: e.target.value })
          }
        />
        <h4>Location</h4>
        <Input
          placeholder="Location"
          value={editingItem?.location}
          onChange={(e) =>
            setEditingItem({ ...editingItem, location: e.target.value })
          }
        />
        <h4>Latitude</h4>
        <Input
          placeholder="Latitude"
          value={editingItem?.latitude}
          onChange={(e) =>
            setEditingItem({ ...editingItem, latitude: e.target.value })
          }
        />
        <h4>Longitude</h4>
        <Input
          placeholder="Longitude"
          value={editingItem?.longitude}
          onChange={(e) =>
            setEditingItem({ ...editingItem, longitude: e.target.value })
          }
        />
        {/* Add similar input fields for other properties */}
      </Modal>

    </div>
  );
}
