import React from 'react';
import { Table } from 'antd';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import useFetch from "../../hooks/useFetch";
import "./tripTable.scss";


const TripTable = () => {

  const { data, loading, error } = useFetch("/trips");

  const columns = [
    {
      title: 'Place',
      dataIndex: 'place',
      key: 'place',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <div className="new">
      <Sidebar />
      <div className="newTripContainer">
        <Navbar />

        <div className="bottomTrip">
          <Table
            dataSource={data} // This assumes that data is an array of objects with 'place', 'rating', and 'address' properties
            columns={columns}
            loading={loading}
            pagination={false} // Optional: To disable pagination
          />
        </div>
      </div>
    </div>
  );
};

export default TripTable;
