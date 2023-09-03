import useFetch from "../../hooks/useFetch";
import "./featuredPlanatrip.css";

const FeaturedPlanatrip = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=berlin,madrid,london"
  );

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
              <h1>Berlin</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://media.istockphoto.com/id/502631824/photo/temple-of-the-tooth-kandy-sri-lanka.jpg?s=612x612&w=0&k=20&c=2ltjIh94gedLEJ0rgu8djEXhrfatIcVBZCH6WVr3z0k="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Madrid</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://www.orienthotelsl.com/wp-content/uploads/2023/02/Nine-Arches-Bridge-Ella-800x600-1.webp"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>London</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://www.orienthotelsl.com/wp-content/uploads/2023/02/Nine-Arches-Bridge-Ella-800x600-1.webp"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>London</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://www.orienthotelsl.com/wp-content/uploads/2023/02/Nine-Arches-Bridge-Ella-800x600-1.webp"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>London</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>

          
        </>
      )}
    </div>
  );
};

export default FeaturedPlanatrip;
