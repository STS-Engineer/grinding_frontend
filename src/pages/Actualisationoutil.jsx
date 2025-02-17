import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { message, Modal, Input } from 'antd'; 
import { useNavigate } from 'react-router-dom';
import { RoleContext } from './RoleContext';

const Actualisationoutil = () => {
  const [outils, setOutils] = useState([]);
  const [machines, setMachines] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const navigate = useNavigate();
  const { role } = useContext(RoleContext);

  const handleGetoutil = async () => {
    try {
      const response = await axios.get("https://grinding-backend.azurewebsites.net/ajouter/getoutil", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
  
      console.log("API Response:", response.data);
  
      if (response.data && Array.isArray(response.data.operateurs)) {
        const validData = response.data.operateurs.filter(
          (item) => item && item.outil // Ensure 'outil' exists
        );
        setOutils(validData);
      } else {
        message.error("Unexpected response structure from server.");
      }
    } catch (error) {
      console.error("Error fetching declarations:", error);
      message.error("Failed to fetch declarations.");
    }
  };
  
  useEffect(() => {
    handleGetoutil();
    fetchMachines();
  }, []);

  const fetchMachines = async () => {
    try {
      const response = await axios.get("https://grinding-backend.azurewebsites.net/ajouter/machines", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (response.data && Array.isArray(response.data)) {
        setMachines(response.data);
      } else {
        message.error("Failed to fetch machine data.");
      }
    } catch (error) {
      console.error("Error fetching machines:", error);
      message.error("Could not fetch machines.");
    }
  };



  const getButtonColor = (dureedevie, dureedeviepointeur) => {
    dureedevie = Number(dureedevie);
    dureedeviepointeur = Number(dureedeviepointeur);
  
    if (dureedeviepointeur <= dureedevie * 0.2) {
      return { backgroundColor: 'red', color: 'white' };
    }
    if (dureedeviepointeur <= dureedevie * 0.5) {
      return { backgroundColor: 'orange', color: 'white' };
    }
    return { backgroundColor: 'green', color: 'white' };
  };

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
        handleGetoutil();
      }
    } catch (error) {
      console.error("Error resetting durée de vie:", error);
      message.error("Failed to reset durée de vie.");
    }
  };

  const handleOutilClick = (machine) => {
    Modal.confirm({
      title: `Do you want to refresh the "durée de vie" of the tool "${machine.outil}"?`, // Fixed field name
      onOk() {
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/login');
  };

  // Filter outils based on searchTerm and only show orange or red tools
  const filteredOutils = outils.filter((machine) => {
    const dureedevie = Number(machine.dureedevie);
    const dureedeviepointeur = Number(machine.dureedeviepointeur);

    const isOrange = dureedeviepointeur <= dureedevie * 0.8 && dureedeviepointeur > dureedevie * 0.5;
    const isRed = dureedeviepointeur <= dureedevie * 0.5;

    return (isOrange || isRed) && machine.outil.toLowerCase().includes(searchTerm.toLowerCase()); // Fixed field name
  });

  return (
    <div className="body_container">
      <div className="navbar">
        <ul className="navbar-links">
          {(role === 'ADMIN' || role === 'REGLEUR') && <li><a href="/form">Ajouter Production</a></li>}
          {(role === 'ADMIN' || role === 'REGLEUR') && <li><a href="/changementmeules">Changement des meules</a></li>}
          {role === 'ADMIN' && <li><a href="/ajouternouvellemachine">Ajouter une machine</a></li>}
          {role === 'ADMIN' && <li><a href="/listregleur">List des régleurs</a></li>}
          {role === 'ADMIN' && <li><a href="/detailoutil">List des outils</a></li>}
          {role === 'ADMIN' && <li><a href="/listoperateur">List des Opérateurs</a></li>}
          {role === 'ADMIN' && <li><a href="/ajouterdefaut">List des defauts</a></li>}
          {role === 'ADMIN' && <li><a href="/history">Historique</a></li>}
          {role === 'ADMIN' && <li><a href="/details">Détails des machines</a></li>}
          <button className='logout-button' onClick={handleLogout}>Logout</button>
        </ul>
      </div>

      <div className="machine-form-container">
        <h2>Changement des meules</h2>

        {/* Search Input */}
        <Input
          type="text"
          placeholder="Rechercher un outil par nom..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: "10px", width: "50%", padding: "8px" }}
        />

        <div>
          {filteredOutils.map((outil) => (
            <button 
              key={outil.id} 
              onClick={() => handleOutilClick(outil)}
              style={{
                ...getButtonColor(outil.dureedevie, outil.dureedeviepointeur),
                border: "1px solid white",
                padding: "10px",
                borderRadius: "5px",
                margin: "5px",
                cursor: "pointer",
              }}
            >
              Machine: {outil.nom_machine} <br />
              Référence: {outil.reference} <br />
              Outil: {outil.outil} <br /> {/* Fixed field name */}
              Durée de vie: {outil.dureedeviepointeur} <br />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Actualisationoutil;
