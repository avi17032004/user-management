import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Header.css";

const Header = ({ setSearchQuery }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <div className="navbar">
      <h3>User List</h3>
      <input
        type="text"
        placeholder="Search users..."
        onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
        className="search-input"
      />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          {token ? (
            <a className="logout" onClick={handleLogout}>
              Logout
            </a>
          ) : (
            <Link className="login" to="/login">
              Login
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Header;
