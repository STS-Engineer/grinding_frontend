import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { message, Modal, Input } from 'antd'; 
import { useNavigate } from 'react-router-dom';
import { RoleContext } from './RoleContext';

const Actualisationoutil = () => {
  const [outils, setOutils] = useState([]);
  const [machines, setMachines] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [isOpen, setIsOpen] = useState(false);
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
    const ratio = dureedeviepointeur / dureedevie;

    if (ratio >= 0.25) {
        return { backgroundColor: "#65D841", color: "white" }; // Green (≥ 25%)
    }
    if (ratio > 0.05) {
        return { backgroundColor: "#F6A623", color: "white" }; // Orange (≥ 5% and < 25%)
    }
    return { backgroundColor: "#F62B2B", color: "white" }; // Red (< 5%)
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
  
  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
    fontWeight: 'bold',
    display: 'block',
    padding: '5px 2px',
    borderRadius: '5px',
    transition: '0.3s',
  };

  return (
    <div className="body_container">
 <div
        style={{
          width: '100%',
          background: '#1b1b1b',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
       <img 
  style={{ width: '150px', height: '40px' }} 
  src="/images/machines/logo-avocarbon.png" 
  alt="Logo" 
     />


        <div
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: 'flex',
            flexDirection: 'column',    
            cursor: 'pointer',
            padding: '10px',
          }}
        >
          <div
            style={{
              width: '30px',
              height: '5px',
              backgroundColor: '#fff',
              margin: '5px 0',
              transition: '0.3s',
              transform: isOpen
                ? 'rotate(45deg) translate(5px, 5px)'
                : 'none',
            }}
          ></div>
          <div
            style={{
              width: '30px',
              height: '4px',
              backgroundColor: '#fff',
              margin: '5px 0',
              opacity: isOpen ? 0 : 1,
              transition: '0.3s',
            }}
          ></div>
          <div
            style={{
              width: '30px',
              height: '4px',
              backgroundColor: '#fff',
              margin: '5px 0',
              transition: '0.3s',
              transform: isOpen
                ? 'rotate(-45deg) translate(5px, -5px)'
                : 'none',
            }}
          ></div>
        </div>

        {/* Sidebar Navigation */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: isOpen ? '0' : '-250px',
            width: '250px',
            height: '100vh',
            background: '#282828',
            padding: '20px',
            transition: 'left 0.4s ease-in-out',
            boxShadow: isOpen ? '4px 0 10px rgba(0, 0, 0, 0.2)' : 'none',
          }}
        >
  <h1 style={{ 
  color: 'white', 
  fontSize: '30px', 
  fontWeight: 'bold', 
  borderBottom: '3px solid #87CEEB', 
  marginBottom: "25px", 

}}>
  Sidebar
</h1>


          <ul style={{ listStyle: 'none', padding: 0 }}>
          {(role === 'ADMIN' || role === 'REGLEUR') && (
              <li style={{ padding: '10px 0' }}>
                <a href="/dashboard" style={linkStyle}>
                Dashboard
                </a>
              </li>
            )}
            {(role === 'ADMIN' || role === 'REGLEUR') && (
              <li style={{ padding: '10px 0' }}>
                <a href="/form" style={linkStyle}>
                  Ajouter Production
                </a>
              </li>
            )}
            {role === 'ADMIN' && (
              <>
                <li style={{ padding: '10px 0' }}>
                  <a href="/calendar" style={linkStyle}>
                    Plannification
                  </a>
                </li>
                <li style={{ padding: '10px 0' }}>
                  <a href="/history" style={linkStyle}>
                    Historique
                  </a>
                </li>
                <li style={{ padding: '10px 0' }}>
                  <a href="/ajouternouvellemachine" style={linkStyle}>
                    Ajouter une machine
                  </a>
                </li>
                <li style={{ padding: '10px 0' }}>
                  <a href="/listregleur" style={linkStyle}>
                    List des régleurs
                  </a>
                </li>
                <li style={{ padding: '10px 0' }}>
                  <a href="/detailoutil" style={linkStyle}>
                    List des outils
                  </a>
                </li>
                <li style={{ padding: '10px 0' }}>
                  <a href="/listoperateur" style={linkStyle}>
                    List des Opérateurs
                  </a>
                </li>
                <li style={{ padding: '10px 0' }}>
                  <a href="/ajouterdefaut" style={linkStyle}>
                    List des défauts
                  </a>
                </li>
                <li style={{ padding: '10px 0' }}>
                  <a href="/details" style={linkStyle}>
                    Détails des machines
                  </a>
                </li>
              </>
            )}
            {(role === 'ADMIN' || role === 'REGLEUR') && (
              <li style={{ padding: '10px 0' }}>
                <a href="/changementmeules" style={linkStyle}>
                  Changement  meules
                </a>
              </li>
            )}
              {(role === 'ADMIN' || role === 'REGLEUR') && (
              <li style={{ padding: '10px 0' }}>
                <a href="/updatereference" style={linkStyle}>
                  Changement  réferences
                </a>
              </li>
            )}
          </ul>
        </div>
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
