import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/"); // Redirect to home
    } catch (error) {
      setError(error, "Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
            placeholder="Password"
          />
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
