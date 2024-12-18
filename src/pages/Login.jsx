import React, { useState } from "react";
import "./Login.css";
import logo from "../assets/logo-avocarbon.png";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page

    try {
      // Sending POST request to login endpoint
      const response = await axios.post("http://localhost:4000/ajouter/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token; // Extract the token from the response
        // Save the token in local storage
        localStorage.setItem("token", token);
  
        // Optionally, you can store the user's information like email or ID
        localStorage.setItem("userEmail", email);
        navigate('/home')
        // Optionally, navigate to a different page or set a token in local storage
      }
    
    } catch (error) {
      console.error("Failed login", error);
      alert("Invalid email or password. Please try again.");
    }
  };


  return (
    <div>
      <div className="navbar">
        <div className="navbar-brand">Wheels Time Management</div>
    
      </div>

      <div className="container">
        <div className="screen">
          <div className="screen__content">
            <form onSubmit={handleSubmit} className="login">
              <img src={logo} alt="Logo" />

              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="login__input"
                  placeholder="User name / Email"
                />
              </div>

              <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="login__input"
                  placeholder="Password"
                />
              </div>

              <button type="submit" className="button login__submit">
                <span className="button__text">Log In Now</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
            </form>

            <div className="social-login">
              <div className="social-icons">
                <a href="#" className="social-login__icon fab fa-instagram"></a>
                <a href="#" className="social-login__icon fab fa-facebook"></a>
                <a href="#" className="social-login__icon fab fa-twitter"></a>
              </div>
            </div>
          </div>

          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
