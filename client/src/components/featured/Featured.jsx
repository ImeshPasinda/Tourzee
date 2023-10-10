import React, { useState } from 'react';
import useFetch from "../../hooks/useFetch";
import "./featured.css";
import { Rate } from 'antd';
const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];

const Featured = () => {
  const { data, loading, error } = useFetch('/trips');
  const [value1, setValue1] = useState(5); // Separate state for the first Rate
  const [value2, setValue2] = useState(5); // Separate state for the second Rate
  const [value3, setValue3] = useState(5); // Separate state for the third Rate

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://i0.wp.com/archaeotravel.eu/wp-content/uploads/2021/08/sigiriya-3785425_960_720.jpg?fit=960%2C640&ssl=1"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h3>Sigiriya</h3>
              <span style={{ fontSize: '14px' }}>
                <Rate
                  tooltips={desc}
                  disabled
                  onChange={setValue1} // Use setValue1 for the first Rate
                  value={value1}
                  style={{ fontSize: '14px' }}
                />
                {value1 ? <span className="ant-rate-text">{desc[value1 - 1]}</span> : ''}
              </span>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://media.istockphoto.com/id/502631824/photo/temple-of-the-tooth-kandy-sri-lanka.jpg?s=612x612&w=0&k=20&c=2ltjIh94gedLEJ0rgu8djEXhrfatIcVBZCH6WVr3z0k="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h3>Dalada Maligawa</h3>
              <span style={{ fontSize: '14px' }}>
                <Rate
                  tooltips={desc}
                  disabled
                  onChange={setValue2} // Use setValue2 for the second Rate
                  value={value2}
                  style={{ fontSize: '14px' }}
                />
                {value2 ? <span className="ant-rate-text">{desc[value2 - 1]}</span> : ''}
              </span>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://www.orienthotelsl.com/wp-content/uploads/2023/02/Nine-Arches-Bridge-Ella-800x600-1.webp"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h3>Nine Arch Bridge</h3>
              <span style={{ fontSize: '14px' }}>
                <Rate
                  tooltips={desc}
                  disabled
                  onChange={setValue3} // Use setValue3 for the third Rate
                  value={value3}
                  style={{ fontSize: '14px' }}
                />
                {value3 ? <span className="ant-rate-text">{desc[value3 - 1]}</span> : ''}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
