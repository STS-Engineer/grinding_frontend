import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { message, Modal, Input } from 'antd'; 
import { useNavigate } from 'react-router-dom';
import { RoleContext } from './RoleContext';

const Actualisationoutil = () => {
  const [outils, setOutils] = useState([]);
  const [machines, setMachines] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  // In your component, track the state of the button color
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

      if (response.data && response.data.operateurs) {
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

  useEffect(() => {
    handleGetoutil();
    fetchMachines();
  }, []);

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

  const fetchMachines = async () => {
    try {
      const response = await axios.get("https://grinding-backend.azurewebsites.net/ajouter/machines", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
    console.log(response.data);
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
  
  const getMachineName = (machine_id) => {
    if (!machines.length) return "Loading..."; // Ensures data is loaded first
    const machine = machines.find((m) => m.id === machine_id);
    return machine ? machine.nom : "Unknown"; // Use `nom` instead of `nom_machine`
  };
  

  const getButtonColor = (dureedevie, dureedeviepointeur) => {
    dureedevie = Number(dureedevie);
    dureedeviepointeur = Number(dureedeviepointeur);
  
    // Red persists once reached
    if (dureedeviepointeur <= dureedevie * 0.2) {
      return { backgroundColor: 'red', color: 'white' };
    }
    // Orange persists until red is reached
    if (dureedeviepointeur <= dureedevie * 0.5) {
      return { backgroundColor: 'orange', color: 'white' };
    }
  
    // Default: Green persists until orange is reached
    return { backgroundColor: 'green', color: 'white' };
  };
  
  
  
  const handleOutilClick = (machine) => {
    Modal.confirm({
      title: `Do you want to refresh the "durée de vie" of the tool "${machine.nom_outil}"?`,
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
  const filteredOutils = outils.filter(machine => {
    const dureedevie = Number(machine.dureedevie);
    const dureedeviepointeur = Number(machine.dureedeviepointeur);

    const isOrange = dureedeviepointeur <= dureedevie * 0.8 && dureedeviepointeur > dureedevie * 0.5;
    const isRed = dureedeviepointeur <= dureedevie * 0.5;

    return (isOrange || isRed) && machine.nom_outil.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="body_container">
      <div className="navbar">
        <ul className="navbar-links">
          {(role === 'ADMIN' || role === 'REGLEUR') && <li><a href="/calendar">Plannification</a></li>}
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
        ...getButtonColor(outil.dureedevie, outil.dureedeviepointeur), // Use the function to get the color
        border: "1px solid white",
        padding: "10px",
        borderRadius: "5px",
        margin: "5px",
        cursor: "pointer",
      }}
    >
      Machine: {getMachineName(outil.machine_id)} <br />
      Référence: {outil.referenceproduit} <br />
      Outil: {outil.nom_outil} <br />
      Durée de vie: {outil.dureedeviepointeur} <br />
    
    </button>
    
    ))}
        </div>
      </div>
    </div>
  );
};

export default Actualisationoutil;
