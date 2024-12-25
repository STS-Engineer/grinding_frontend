import React, { useState, useEffect } from "react";
import axios from "axios";
import "./machinedetails.css";
import { useNavigate } from "react-router-dom";

const MachineDetails = () => {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchMachines = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://grinding-backend.azurewebsites.net/ajouter/machines", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMachines(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching machines:", error);
      setError("Failed to fetch machine details");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  const getMachineImage = (machineName) => {
    let imageName = '';

    switch (machineName.toUpperCase()) {
      case 'NGG3':
        imageName = 'NGG3';
        break;
     case 'NGG4':
      imageName = 'NGG4';
        break;
      case 'MUD6':
        imageName = 'MUD6';
        break;
      case 'MUD7':
        imageName = 'MUD7';
        break;
      case 'KOJ':
        imageName = 'KOJ';
        break;
      case 'NGG6':
          imageName = 'NGG6';
          break;
      default:
        imageName = 'default';
        break;
    }

    return `/images/machines/${imageName}.png`;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate('/login');
  };

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="machine-details-container">
      <nav className="navbar">
        <div className="navbar-brand">Wheels Time Management</div>
        <ul className="navbar-links">
          <li><a href="/home">Acceuil</a></li>
          <li><a href="/form">Ajouter Production</a></li>
          <li><a href="/machineform">Ajouter un outil</a></li>
          <li><a href="/details">Détails des machines</a></li>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </ul>
      </nav>

      <div className="content-wrapper">
        <h2 className="machine-title"></h2>

        <div className="machine-container">
          {machines.length > 0 ? (
            <div className="machine-cards">
              {machines.map((machine) => (
                <div className="machine-card" key={machine.codemachine}>
                  <div className="machine-card-header">
                    <h3 className="machine-name">{machine.nom}</h3>
                    <img
                      src={getMachineImage(machine.nom)}
                      alt={`Image of ${machine.nom}`}
                      className="machine-image"
                      onError={(e) => e.target.src = '/images/machines/default.png'}
                    />
                  </div>
                  <div className="machine-details">
                    <p><strong>Matricule Utilisateur:</strong> {machine.user_id}</p>
                    <p><strong>Reference:</strong> {machine.referenceproduit}</p>
                    <p><strong>Cadence_horaire_production:</strong> {machine.cadence_horaire}</p>
                    <p><strong>Cadence_horaire_cf:</strong> {machine.cadence_horaire_cf}</p>
                    <p><strong>Cadence_horaire_csl:</strong> {machine.cadence_horaire_csl}</p>
                    <p><strong>Date de creation:</strong> {new Date(machine.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-data">No machines found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MachineDetails;
