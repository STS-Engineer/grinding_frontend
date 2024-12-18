import React, { useEffect, useState } from "react";
import "./Animatedpage.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

const AnimatedPage = () => {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % 3); // Cycle through 3 images
    }, 2000); // Change every 5 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  const navigate= useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate('/login');
  };
  
  return (
    <div className="animated-page">
    <div className='navbar'>
        <ul className="navbar-links">
          <li><a href="/home">Acceuil</a></li>
          <li><a href="/plannification">Plannification de production</a></li>
          <li><a href="/form">Ajouter Production</a></li>
          <li><a href="/ajouteroutil">Ajouter un outil</a></li>
          <li><a href="/machineform">Ajouter un machine</a></li>
          <li><a href="/details">Détails des machines</a></li>
          <li><a href="/calendar">Calnedrier</a></li>
          <button className='logout-button' onClick={handleLogout}>logout</button>
        </ul>
      </div>
      <div className={`background background-${imageIndex}`}>
        <div className="content">
      
        </div>
      </div>
    </div>
  );
};

export default AnimatedPage;
