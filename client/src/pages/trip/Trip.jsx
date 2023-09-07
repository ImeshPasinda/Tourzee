import React, { useState } from 'react';
import { Radio } from 'antd';
import { useLocation } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import TripItem from '../../components/tripItem/TripItem';

const Trip = () => {
  const location = useLocation();
  const [place, setPlace] = useState(location.state.place);
  const [selectedDays, setSelectedDays] = useState(1); // Initialize the selected number of days

  const { data, loading, error, reFetch } = useFetch(`/trips?place=${place}`);

  const handleClick = () => {
    reFetch();
  };

  // Handle radio button change for number of days
  const handleDaysChange = (e) => {
    setSelectedDays(e.target.value);
  };

  // Filter items based on selected number of days
  const filteredData = data.filter((item) => {
    if (selectedDays === 1) {
      return true; // Show all items
    } else if (selectedDays === 4) {
      return item.days >= 4; // Show items with 4 or more days
    } else {
      return item.days === selectedDays; // Show items with the selected number of days
    }
  });

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listResult">
            <Radio.Group onChange={handleDaysChange} value={selectedDays}>
              <Radio value={1}>1 Day</Radio>
              <Radio value={2}>2 Days</Radio>
              <Radio value={3}>3 Days</Radio>
              <Radio value={4}>4+ Days</Radio>
            </Radio.Group>

            <p style={{ paddingBottom: '20px', paddingTop: '20px', fontSize: '16px' }}>
              <span style={{ color: 'gray' }}>Places around,</span> {place} <FontAwesomeIcon icon={faLocationDot} />
            </p>
            {loading ? (
              'Loading'
            ) : (
              <>
                {filteredData.map((item) => (
                  <TripItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trip;
