import React, {useContext, useEffect, useState } from "react";
import "./Animatedpage.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import { RoleContext } from "./RoleContext";


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
  const { role } = useContext(RoleContext);
  
  
  return (
    <div className="animated-page">
     <div className='navbar'>
        <ul className="navbar-links">
        {(role === 'ADMIN' || role=== 'REGLEUR' ) && <li><a href="/form">Ajouter Production</a></li>}
        {role === 'ADMIN'  && <li><a href="/calendar">Plannification</a></li>}
        {(role === 'ADMIN' || role=== 'REGLEUR' ) && <li><a href="/changementmeules">Changement des meules</a></li>}
        {role === 'ADMIN' && <li><a href="/ajouternouvellemachine">Ajouter une machine</a></li>}
        {role === 'ADMIN' &&  <li><a href="/listregleur">List des régleurs</a></li>}
        {role === 'ADMIN' &&  <li><a href="/detailoutil">List des outils</a></li>}
        {role === 'ADMIN' &&  <li><a href="/listoperateur">List des Opérateurs</a></li>}
        {role === 'ADMIN' &&  <li><a href="/ajouterdefaut">List des defauts</a></li>}
        {role === 'ADMIN' &&  <li><a href="/details">Détails des machines</a></li>}
        <button className='logout-button' onClick={handleLogout}>Logout</button>  
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
