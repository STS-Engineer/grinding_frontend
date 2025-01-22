import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd'; // Import only the required Ant Design components
import { useNavigate } from 'react-router-dom';

const Actualisationoutil = () => {
  const [outils, setOutils] = useState([]);
  const navigate = useNavigate();
  const userID = localStorage.getItem("userEmail");

  // Fetch the list of outils
  const handleGetoutil = async () => {
    try {
      const response = await axios.get("https://grinding-backend.azurewebsites.net/ajouter/getoutil", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data && response.data.operateurs) {
        // Filter valid outils and update state
        const fetchedOutils = response.data.operateurs.filter(op => op.nom_outil);
        setOutils(fetchedOutils);
      } else {
        message.error("Failed to fetch outils. Unexpected response structure.");
      }
    } catch (error) {
      console.error("Error fetching outils:", error);
      message.error("Failed to fetch outils.");
    }
  };

  // Reset durée de vie for a specific outil
  const updateDureedevie = async (id) => {
    try {
      const response = await axios.put(
        `https://grinding-backend.azurewebsites.net/ajouter/resetdureedevie/${id}`,
        { dureedevie: 0 },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }    
      );

      if (response.status === 200) {
        message.success("La durée de vie est actualisée");
        handleGetoutil(); // Refresh the outils list
      }
    } catch (error) {
      console.error("Error resetting durée de vie:", error);
      message.error("Failed to reset durée de vie.");
    }
  };

  // Handle outil button click
  const handleOutilClick = (machine) => {
    Modal.confirm({
      title: `Do you want to refresh the "durée de vie" of the tool "${machine.nom_outil}"?`,
      onOk() {
        // Reset durée de vie when "Valider" is clicked
        updateDureedevie(machine.id);
      },
      okText: 'Valider',  // Customizing the OK button text to "Valider"
      cancelText: 'Annuler',  // Customizing the Cancel button text
      okButtonProps: {
        style: { backgroundColor: 'green', borderColor: 'green', color: 'white' },  // Green "Valider" button
      },
      cancelButtonProps: {
        style: { borderColor: 'gray' },  // Optional: Customizing the cancel button color
      }
    });
  };

  useEffect(() => {
    handleGetoutil(); // Fetch outils on component mount
  }, []); // Empty dependency array to prevent unnecessary re-renders

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/login');
  };

  return (
    <div className="body_container">
      <div className='navbar'>
        <ul className="navbar-links">
          <li><a href="/home">Acceuil</a></li>
          <li><a href="/form">Ajouter Production</a></li>
          <li><a href="/ajouternouvellemachine">Ajouter une machine</a></li>
          <li><a href="/Ajouteroutil">Ajouter un outil</a></li>
          <li><a href="/ajouteroperateur">Ajouter des Opérateurs</a></li>
          <li><a href="/listoperateur">List des Opérateurs</a></li>
          <li><a href="/ajouterregleur">Ajouter des Régleurs</a></li>
          <li><a href="/listregleur">List des régleurs</a></li>
          <li><a href="/ajouterprobleme">Ajouter des problémes techniques</a></li>
          <li><a href="/Ajouterproblemepostedecontrole">Ajouter des problémes de poste de controle</a></li>
          <li><a href="/ajouterdefaut">Ajouter des defauts</a></li>
          <li><a href="/details">Détails des machines</a></li>
          <li><a href="/calendar">Plannification</a></li>
          <button className='logout-button' onClick={handleLogout}>Logout</button>  
        </ul>
      </div>
  
      <div className="machine-form-container">
        <h2>Changement des meules</h2>
        <div className="machine-buttons">
          {outils.map((machine) => (
            <button
              key={machine.id}
              onClick={() => handleOutilClick(machine)}
              style={{
                backgroundColor: "transparent",
                color: "white",
                border: "1px solid white",
                padding: "10px",
                borderRadius: "5px",
                margin: "5px",
                cursor: "pointer",
              }}
            >
              {machine.nom_outil}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Actualisationoutil;
