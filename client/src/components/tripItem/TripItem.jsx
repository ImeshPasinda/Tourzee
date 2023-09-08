import React from 'react';
import { Badge, Card, Space } from 'antd';
import { Link } from 'react-router-dom';

const TripItem = ({ item }) => {
  const { Meta } = Card;

  // Function to truncate the description to 50 words
  const truncateDescription = (text, limit) => {
    const words = text.split(' ');
    if (words.length <= limit) {
      return text;
    }
    return words.slice(0, limit).join(' ') + '...';
  };

  const truncatedDescription = truncateDescription(item.desc, 20);
  <Space
    direction="vertical"
    size="middle"
    style={{
      width: '100%',
    }}
  ></Space>
  const text = item.days
  return (
    <Badge.Ribbon text={`${text} Days Plan`}>
      <Card
        hoverable
        style={{
          width: 240,
          marginBottom: '20px',
        }}
        cover={<img alt={item.tripName} src={item.photos[0]}
        style={{
          width: '100%', // Set the width to 100% to make it fill the card
          height: '150px', // Adjust the height as needed
          objectFit: 'cover', // Ensure the image covers the entire space without stretching
        }}
        />}
      >
        <Meta
          title={item.tripName}
          description={
            <>
              <p style={{marginBottom:"10px"}}>{item.distance}m from {item.city}</p>
              <p>{item.type}</p>
              <p>{truncatedDescription}</p>

              
            </>
          }
        />
        <div style={{ marginTop: '10px' }}>
          <Link to={`/places/${item._id}`}>
            <button className="headerBtn" style={{ width: '100%' }}>More Info</button>
          </Link>
        </div>
      </Card>
    </Badge.Ribbon>
  );
};

export default TripItem;
