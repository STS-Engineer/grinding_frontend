import React, { useState, useEffect, useContext } from 'react';
import { RoleContext } from './RoleContext';
import { Modal, Input, message, Select,  Form, Button } from 'antd';

const UpdateDeclaration = () => {
  const [machines, setMachines] = useState([]);
  const [oldReferences, setOldReferences] = useState([]); // New state to store old references
  const [selectedMachine, setSelectedMachine] = useState('');
  const [oldReference, setOldReference] = useState('');
  const [newReference, setNewReference] = useState('');
  const [tools, setTools] = useState('');
  const [dureedevie, setDureedevie] = useState('');
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { role } = useContext(RoleContext);

  // Fetch the list of machines on mount
  useEffect(() => {
    fetch('https://grinding-backend.azurewebsites.net/ajouter/nommachine')
      .then((response) => response.json())
      .then((data) => {
        setMachines(data);
        if (data.length > 0) {
          setSelectedMachine(data[0].nom_machine || data[0].nom);
        }
      })
      .catch((error) => {
        console.error('Error fetching machines:', error);
      });
  }, []);

  // Fetch old references when the selected machine changes
  useEffect(() => {
    if (selectedMachine) {
      fetch(`https://grinding-backend.azurewebsites.net/ajouter/get/references/${selectedMachine}`)
        .then((response) => response.json())
        .then((data) => {
          setOldReferences(data);
          if (data.length > 0) {
            setOldReference(data[0].reference);
            setDureedevie(data[0].dureedevie); // Set dureedevie for the first old reference
          }
        })
        .catch((error) => {
          console.error('Error fetching old references:', error);
        });
    }
  }, [selectedMachine]);

  // Handle reference change and update dureedevie based on the selected tools
  useEffect(() => {
    if (oldReference && newReference) {
      const oldRef = oldReferences.find((ref) => ref.reference === oldReference);
      const newRef = oldReferences.find((ref) => ref.reference === newReference);
      
      // Check if tools match, if so retain the old dureedevie value
      if (oldRef && newRef && oldRef.tools === newRef.tools) {
        setDureedevie(oldRef.dureedevie);
      } else {
        setDureedevie(''); // Or leave it empty, depending on your requirement
      }
    }
  }, [oldReference, newReference, oldReferences]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toolsArray = tools.split(',').map((tool) => tool.trim()).filter(Boolean);

    const payload = {
      nom_machine: selectedMachine,     
      old_reference: oldReference,
      new_reference: newReference,
      tools: toolsArray,
      dureedevie
    };

    console.log('Payload:', payload);

    try {
      const response = await fetch('https://grinding-backend.azurewebsites.net/ajouter/updateDeclaration', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log('Response:', result);

      if (response.ok) {
      
     alert("Reference has been updated successfully")

      } else {
        setMessage('Error updating declaration');
      }
    } catch (error) {
      console.error('Error updating declaration:', error);
      setMessage('Error updating declaration');
    }
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
    fontWeight: 'bold',
    display: 'block',
    padding: '12px 8px',
    borderRadius: '5px',
    transition: '0.3s',
  };

  return (
    <div style={styles.container}>

           {/* Top Navigation & Sidebar */}
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
          <ul style={{ listStyle: 'none', padding: 0 }}>
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
                  Changement des meules
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <h1 style={{marginBottom:'20px', fontWeight:'bold', fontSize:'25px'}}>Update References</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Machine Dropdown */}
        <div style={styles.formGroup}>
          <label htmlFor="machine">Machine:</label>
          <select
            id="machine"
            value={selectedMachine}
            onChange={(e) => setSelectedMachine(e.target.value)}
            style={styles.input}
            required
          >
            {machines.map((machine, index) => (
              <option key={index} value={machine.nom_machine || machine.nom}>
                {machine.nom_machine || machine.nom}
              </option>
            ))}
          </select>
        </div>

        {/* Old Reference */}
        <div style={styles.formGroup}>
          <label htmlFor="oldReference">Old Reference:</label>
          <select
            id="reference"
            value={oldReference}
            onChange={(e) => setOldReference(e.target.value)}
          >
            {oldReferences.map((reference, index) => (
              <option key={index} value={reference.reference}>
                {reference.reference}
              </option>
            ))}
          </select>
        </div>

        {/* New Reference */}
        <div style={styles.formGroup}>
          <label htmlFor="newReference">New Reference</label>
          <input
            type="text"
            id="newReference"
            value={newReference}
            onChange={(e) => setNewReference(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        {/* Tools */}
        <div style={styles.formGroup}>
          <label htmlFor="tools">Tools</label>
          <input
            type="text"
            id="tools"
            value={tools}
            onChange={(e) => setTools(e.target.value)}
            style={styles.input}
            placeholder=""
            required
          />
        </div>

    

        <button type="submit" style={styles.button}>
          Update Declaration
        </button>
      </form>

  
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full viewport height
    width: '100%', // Full width
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    width: '100%',
    padding: '40px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    backgroundColor: '#1e90ff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default UpdateDeclaration;
