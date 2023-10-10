import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Rate } from 'antd';
import useFetch from '../../hooks/useFetch';
import './featuredPlanatrip.css';

const FeaturedPlanatrip = () => {
  const { data, loading, error } = useFetch('/trips');
  const filteredData = data.filter((trip) => trip.featured === true);
  const displayedData = filteredData.slice(0, 4); // Slice the first 4 items from the filtered data

  // Create an array of value states, one for each trip item
  const [values, setValues] = useState([]);

  useEffect(() => {
    // Initialize the value states based on the rating of each trip
    const initialValues = displayedData.map((trip) => trip.rating);
    setValues(initialValues);
  }, [displayedData]);

  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

  const handleRateChange = (index, newValue) => {
    // Update the value state for the specific trip item
    const newValues = [...values];
    newValues[index] = newValue;
    setValues(newValues);
  };

  return (
    <div className="featured">
      {loading ? (
        'Loading please wait'
      ) : (
        <>
          {displayedData.map((trip, index) => (
            <Link to={`/trips/${trip._id}`} key={trip._id}>
              <Badge.Ribbon text={`${trip.days} Days Plan`}>
                <div className="featuredItem" style={{ width: '230px', height: '250px' }}>
                  <img
                    src={trip.photos[0]}
                    style={{ width: '350px', height: '250px' }}
                    alt={trip.tripName}
                  />
                  <div className="featuredTitles">
                    <h2 style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>{trip.tripName}</h2>
                    <h4 style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>LKR {trip.budget}</h4>
                    <Rate
                      tooltips={desc}
                      disabled 
                      onChange={(newValue) => handleRateChange(index, newValue)}
                      value={values[index]}
                    />
                    {values[index] ? <span className="ant-rate-text">{desc[values[index] - 1]}</span> : ''}
                  </div>
                </div>
              </Badge.Ribbon>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedPlanatrip;
