import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { message, Modal } from 'antd'; 
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
        alert("Merci de refaire le DMS");
        handleGetoutil(); // Refresh the outils list
      }
    } catch (error) {
      console.error("Error resetting durée de vie:", error);
      message.error("Failed to reset durée de vie.");
    }
  };

  // Get button color based on dureedevie and dureedeviepointeur
  const getButtonColor = (dureedevie, dureedeviepointeur) => {
    dureedevie = Number(dureedevie);
    dureedeviepointeur = Number(dureedeviepointeur);
  
    console.log('Dureedevie:', dureedevie, 'Dureedeviepointeur:', dureedeviepointeur);
  
    if (dureedeviepointeur <= dureedevie * 0.8 && dureedeviepointeur > dureedevie * 0.5) {
      console.log('Color: Orange');
      return { backgroundColor: 'orange', color: 'white' };
    } 
    else if (dureedeviepointeur <= dureedevie * 0.5) {
      console.log('Color: Red');
      return { backgroundColor: 'red', color: 'white' };
    }
  
    console.log('Color: Green');
    return { backgroundColor: 'green', color: 'white' };
  };
  
  
  
  
  // Handle outil button click
  const handleOutilClick = (machine) => {
    Modal.confirm({
      title: `Do you want to refresh the "durée de vie" of the tool "${machine.nom_outil}"?`,
      onOk() {
        // Reset durée de vie when "Valider" is clicked
        updateDureedevie(machine.id);
      },
      okText: 'Valider',  
      cancelText: 'Annuler',
      okButtonProps: {
        style: { backgroundColor: 'green', borderColor: 'green', color: 'white' }, 
      },
      cancelButtonProps: {
        style: { borderColor: 'gray' },
      }
    });
  };

  useEffect(() => {
    handleGetoutil(); // Fetch outils on component mount
  }, []); 

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/login');
  };

  return (
    <div className="body_container">
      <div className='navbar'>
        <ul className="navbar-links">
          <li><a href="/form">Ajouter Production</a></li>
          <li><a href="/">Changement des meules</a></li>
          <button className='logout-button' onClick={handleLogout}>Logout</button>  
        </ul>
      </div>

      <div className="machine-form-container">
        <h2>Changement des meules</h2>
        <div >
          {outils.map((machine) => (
            <button
              key={machine.id}
              onClick={() => handleOutilClick(machine)}
              style={{
                backgroundColor: getButtonColor(machine.dureedevie, machine.dureedeviepointeur).backgroundColor,
                color: getButtonColor(machine.dureedevie, machine.dureedeviepointeur).color,
                border: "1px solid white",
                padding: "10px",
                borderRadius: "5px",
                margin: "5px",
                cursor: "pointer",
              }}
            >
             Outil: {machine.nom_outil} <br/>
             Duré de vie: {machine.dureedeviepointeur} <br/>
             Réference: {machine.referenceproduit} <br/>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Actualisationoutil;
