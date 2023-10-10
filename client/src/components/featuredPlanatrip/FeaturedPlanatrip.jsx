import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'antd';
import useFetch from '../../hooks/useFetch';
import './featuredPlanatrip.css';

const FeaturedPlanatrip = () => {
  const { data, loading, error } = useFetch('/trips');
  const filteredData = data.filter((trip) => trip.featured === true); 
  const displayedData = filteredData.slice(0, 4); // Slice the first 4 items from the filtered data

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
                    src={trip.photos[1]}
                    style={{ width: '350px', height: '250px' }}
                    alt={trip.tripName}
                  />
                  <div className="featuredTitles">
                    <h2 style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>{trip.tripName}</h2>
                    <h4 style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>LKR {trip.budget}</h4>
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
