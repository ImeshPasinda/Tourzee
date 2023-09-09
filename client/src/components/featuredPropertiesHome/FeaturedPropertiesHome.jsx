import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import useFetch from '../../hooks/useFetch';
import './featuredPropertiesHome.css';

const FeaturedPropertiesHome = () => {
  const { data, loading, error } = useFetch('/places?featured=true&limit=4');

  return (
    <div className="fp">
      {loading ? (
        'Loading'
      ) : (
        <>
          {data.map((item) => (
            <Link to={`/places/${item._id}`} key={item._id}>
              <div className="fpItem">
                <img src={item.photos[0]} alt="" className="fpImg" />
                <span className="fpName">{item.name}</span>
                <span className="fpCity">{item.city}</span>
                <span className="fpPrice">
                  Starting from ${item.cheapestPrice}
                </span>
                {item.rating && (
                  <div className="fpRating">
                    <button>
                      {item.rating >= 1000 ? '999+' : item.rating}
                    </button>
                    <span>Excellent</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedPropertiesHome;