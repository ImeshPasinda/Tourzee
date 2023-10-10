import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navContainer">
      <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
  <span className="logo">
    <img
      src="/logo.png?v=2"
      alt="Tourzee Logo"
      style={{ height: "15%", width: "15%" }}
    />
  </span>
</Link>

        {user ? user.username : (
          <div className="navItems">
             {!user && <Link to="/register" className="linkStyle"><button className="navButton">Register</button></Link>}
             <Link to="/login" className="linkStyle"><button className="navButton">Login</button></Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
