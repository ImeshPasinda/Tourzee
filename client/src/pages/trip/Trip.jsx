import React, { useState, useEffect } from 'react';
import { Radio, Spin } from 'antd';
import { useLocation } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import TripItem from '../../components/tripItem/TripItem';

import './trip.css'; // Import your custom CSS for styling
import Headerforplanatrip from '../../components/headerforplanatrip/Headerforplanatrip';

const Trip = () => {
  const location = useLocation();
  const [place, setPlace] = useState(location.state.place);
  const [selectedDays, setSelectedDays] = useState('all'); // Initialize the selected number of days with 'all'
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  const { data, loading, error, reFetch } = useFetch(`/trips?place=${place}`);

  useEffect(() => {
    // When data loading is complete, update isLoading state
    setIsLoading(loading);
  }, [loading]);

  const handleClick = () => {
    reFetch();
  };

  // Handle radio button change for the number of days
  const handleDaysChange = (e) => {
    setSelectedDays(e.target.value);
  };

  // Filter items based on the selected number of days
  const filteredData = data.filter((item) => {
    if (selectedDays === 'all') {
      return true; // Show all items
    } else if (selectedDays === '1') {
      return item.days === 1; // Show items with 1 day
    } else if (selectedDays === '4+') {
      return item.days >= 4; // Show items with 4 or more days
    } else {
      return item.days === parseInt(selectedDays); // Show items with the selected number of days
    }
  });

  return (
    <div>
      <Navbar />
      <Headerforplanatrip type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listResult">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ color: 'gray' }}>
                How many days do you expect?
              </div>
              <div>
                <span style={{ color: 'gray' }}>Places around,</span> <span style={{ color: 'black' }}>{place}</span> <FontAwesomeIcon icon={faLocationDot} />
              </div>
            </div>

            <Radio.Group onChange={handleDaysChange} style={{ marginTop: '15px' }} value={selectedDays}>
              <Radio value="all">All</Radio>
              <Radio value="1">1 Day</Radio>
              <Radio value="2">2 Days</Radio>
              <Radio value="3">3 Days</Radio>
              <Radio value="4+">4+ Days</Radio>
            </Radio.Group>
            <div className="space"></div>

            {isLoading ? ( // Display the loading effect using Spin
              <Spin tip="Loading...">
                <div style={{ minHeight: '200px' }}></div>
              </Spin>
            ) : (
              <div className="trip-container">
                {filteredData.map((item) => (
                  <div className="trip-item" key={item._id}>
                    <TripItem item={item} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trip;
