import React, { useState } from 'react';
import { Badge, Card, Space, Rate } from 'antd';
import { Link } from 'react-router-dom';
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
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
  
const [value, setValue] = useState(item.rating);
  const truncatedDescription = truncateDescription(item.descshort, 20);
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
              <p style={{ marginBottom: "1px", color: 'black' }}> LKR {item.budget} <span style={{ color: 'gray', fontSize: '12px' }}>(est)</span></p>
              <p style={{ marginBottom: "8px", color: 'black', fontSize: '12px' }}>
                Distance {item.distance} Km <> </>
                <span style={{ color: 'gray' }}>(est)</span>
              </p>
              <p>{item.type}</p>
              <p>{truncatedDescription}</p>


            </>
          }
        />
        <div className='space'></div>
        <Rate tooltips={desc} onChange={setValue} disabled value={item.rating} />
        {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
        <div style={{ marginTop: '20px' }}>
          <Link to={`/trips/${item._id}`}>
            <button className="headerBtn" style={{ width: '100%' }}>Explore More</button>
          </Link>
        </div>
      </Card>
    </Badge.Ribbon>
  );
};

export default TripItem;
