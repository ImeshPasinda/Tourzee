import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
    logout();
  };

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

        <div className="navItems">
          {user ? (
            // Display a logout button when the user is logged in
            <>
              <span className="username" onClick={handleLogout}>
                {user.username}
              </span>
              <button className="navButton" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            // Display Register and Login buttons if user is not logged in
            <>
              <Link to="/register" className="linkStyle">
                <button className="navButton">Register</button>
              </Link>
              <Link to="/login" className="linkStyle">
                <button className="navButton">Login</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
