import useFetch from "../../hooks/useFetch";
import "./featuredPlanatrip.css";

const FeaturedPlanatrip = () => {
  const { data, loading, error } = useFetch("/trips");

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          {data.map((trip, index) => (
            <div className="featuredItem" key={index}>
              <img
                src="http://res.cloudinary.com/dzag4jrlo/image/upload/v1694320009/upload/chunzj43kbhg4ojtka91.jpg" // Use the appropriate field from your data for the image URL
                alt=""
                className="featuredImg"
              />
              <div className="featuredTitles">
                <h1>{trip.place}</h1>
                <h2>{trip.descshort}</h2>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedPlanatrip;
