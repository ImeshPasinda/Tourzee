import { Link } from "react-router-dom";
import "./searchItem.css";


const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}Km from {item.city}</span>
        <span className="siType">{item.type}</span>
        <span className="siFeatures">{item.descshort}</span>
        {/* <span className="siNoticeHeader">Free cancellation </span> */}
        <span className="siNotice">
          Please refrain from damaging any places during your travel!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && <div className="siRating">
        <span>Ratings for {item.name}</span>
          <button>{item.rating >= 1000 ? '999+' : item.rating}</button>
        </div>}
        <div className="siDetailTexts">
          {/* <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span> */}
          <Link to={`/places/${item._id}`}>
            <button className="siCheckButton">More Info</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
