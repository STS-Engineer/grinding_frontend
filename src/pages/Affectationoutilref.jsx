import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { RoleContext } from './RoleContext';

const RferenceUpdater = () => {
  const [machines, setMachines] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState('');
  const [references, setReferences] = useState([]);
  const [selectedReference, setSelectedReference] = useState('');
  const [tools, setTools] = useState([]);
  const [newReference, setNewReference] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Fetch machines data
  useEffect(() => {
    axios.get('https://grinding-backend.azurewebsites.net/ajouter/nommachine')
      .then(response => setMachines(response.data))
      .catch(error => console.error('Error fetching machines:', error));
  }, []);

  // Fetch references when a machine is selected
  useEffect(() => {
    if (selectedMachine) {
      axios.get(`https://grinding-backend.azurewebsites.net/ajouter/get/references/${selectedMachine}`)
        .then(response => setReferences(response.data))
        .catch(error => console.error('Error fetching references:', error));
    } else {
      setReferences([]); // Clear references if no machine is selected
    }
  }, [selectedMachine]);

  // Handle machine selection change
  const handleMachineChange = (machine) => {
    console.log("Selected Machine:", machine); // Debugging line
    setSelectedMachine(machine);
    setReferences([]);
    setSelectedReference('');
    setTools([]);
  };

  // Handle reference selection change
  const handleReferenceChange = (reference, machine) => {
    console.log("Selected Reference:", reference);  // Check selected reference
    console.log("Selected Machine:", machine);  // Check selected machine

    if (!machine) {
      console.error("Machine is not selected.");
      return; // Don't proceed if machine is undefined
    }

    setSelectedReference(reference); // Set selected reference
    setTools([]); // Reset tools before fetching new tools

    // Fetch tools for the selected reference and machine
    axios.get(`https://grinding-backend.azurewebsites.net/ajouter/get/tools/${reference}/${machine}`)
      .then(response => setTools(response.data))
      .catch(error => console.error('Error fetching tools:', error));
  };

  const updateReference = () => {
    if (!selectedMachine || !newReference || !selectedReference) {
      alert('Please select a machine, an old reference, and a new reference.');
      return;
    }
  
    axios
      .put('https://grinding-backend.azurewebsites.net/ajouter/update/reference', {
        nom_machine: selectedMachine,
        old_reference: selectedReference,
        new_reference: newReference
      })
      .then(response => {
        alert('Reference updated successfully!');
        // Refresh references and tools
        handleMachineChange(selectedMachine);
      })
      .catch(error => console.error('Error updating reference:', error));
  };
  

    // Filter out the selected reference from the new reference options
    const filteredReferences = references.filter(
        (ref) => ref.reference !== selectedReference
      );
    
      // Link Style
const linkStyle = {
    textDecoration: "none",
    color: "white",
    fontWeight: "bold",
    display: "block",
    padding: "12px 8px",
    borderRadius: "5px",
    transition: "0.3s",
  };
  const {role}= useContext(RoleContext);

  return (
    <div>
   <div
      style={{
        width: "100%",
        background: "#1b1b1b",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Logo or Title */}
      <h2 style={{ color: "#fff", margin: 0 }}>Change of Reference</h2>

      {/* Hamburger Icon */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          padding: "10px",
        }}
      >
        <div
          style={{
            width: "30px",
            height: "5px ",
            backgroundColor: "#fff",
            margin: "5px 0",
            transition: "0.3s",
            transform: isOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
          }}
        ></div>
        <div
          style={{
            width: "30px",
            height: "4px",
            backgroundColor: "#fff",
            margin: "5px 0",
            opacity: isOpen ? 0 : 1,
            transition: "0.3s",
          }}
        ></div>
        <div
          style={{
            width: "30px",
            height: "4px",
            backgroundColor: "#fff",
            margin: "5px 0",
            transition: "0.3s",
            transform: isOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
          }}
        ></div>
      </div>

      {/* Sidebar Navigation */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: isOpen ? "0" : "-250px",
          width: "250px",
          height: "100vh",
          background: "#282828",
          padding: "20px",
          transition: "left 0.4s ease-in-out",
          boxShadow: isOpen ? "4px 0 10px rgba(0, 0, 0, 0.2)" : "none",
        }}
      >
        <ul style={{ listStyle: "none", padding: 0 }}>
          {(role === "ADMIN" || role === "REGLEUR") && (
            <li style={{ padding: "10px 0" }}>
              <a href="/form" style={linkStyle}>
                Ajouter Production
              </a>
            </li>
          )}
          {role === "ADMIN" && (
            <>
              <li style={{ padding: "10px 0" }}>
                <a href="/calendar" style={linkStyle}>
                  Plannification
                </a>
              </li>
              <li style={{ padding: "10px 0" }}>
                <a href="/history" style={linkStyle}>
                  Historique
                </a>
              </li>
              <li style={{ padding: "10px 0" }}>
                <a href="/ajouternouvellemachine" style={linkStyle}>
                  Ajouter une machine
                </a>
              </li>
              <li style={{ padding: "10px 0" }}>
                <a href="/listregleur" style={linkStyle}>
                  List des régleurs
                </a>
              </li>
              <li style={{ padding: "10px 0" }}>
                <a href="/detailoutil" style={linkStyle}>
                  List des outils
                </a>
              </li>
              <li style={{ padding: "10px 0" }}>
                <a href="/listoperateur" style={linkStyle}>
                  List des Opérateurs
                </a>
              </li>
              <li style={{ padding: "10px 0" }}>
                <a href="/ajouterdefaut" style={linkStyle}>
                  List des défauts
                </a>
              </li>
              <li style={{ padding: "10px 0" }}>
                <a href="/details" style={linkStyle}>
                  Détails des machines
                </a>
              </li>
            </>
          )}
          {(role === "ADMIN" || role === "REGLEUR") && (
            <li style={{ padding: "10px 0" }}>
              <a href="/changementmeules" style={linkStyle}>
                Changement des meules
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
      <h2>Update Machine Reference & Tools</h2>
  
      {/* Machine Dropdown */}
      <label>Machine:</label>
      <select onChange={(e) => handleMachineChange(e.target.value)} value={selectedMachine}>
        <option value="">Select Machine</option>
        {machines.map((machine, index) => (
          <option key={index} value={machine.nom_machine}>
            {machine.nom_machine}
          </option>
        ))}
      </select>
           {/* Reference selection dropdown */}
      <div>
        <label>Select Reference</label>
        <select onChange={(e) => handleReferenceChange(e.target.value, selectedMachine)} value={selectedReference}>
          <option value="">Select Reference</option>
          {references.map((ref) => (
            <option key={ref.reference} value={ref.reference}>
              {ref.reference}
            </option>
          ))}
        </select>
      </div>

      {/* Display tools based on selected reference and machine */}
      <div
  style={{
    padding: '20px',
    backgroundColor: '#f4f4f9',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: '20px auto',
  }}
>
 
  {tools.length > 0 ? (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr', // Two columns
        gap: '15px', // Space between columns
        padding: '0 15px',
      }}
    >
      <div style={{ fontWeight: 'bold', textAlign: 'center' }}>Tool</div>
      <div style={{ fontWeight: 'bold', textAlign: 'center' }}>Durée de vie</div>
      {tools.map((tool, index) => (
        <React.Fragment key={index}>
          <div style={{ textAlign: 'center' }}>{tool.outil}</div>
          <div style={{ textAlign: 'center' }}>{tool.dureedeviepointeur}</div>
        </React.Fragment>
      ))}
    </div>
  ) : (
    <p
      style={{
        textAlign: 'center',
        color: '#888',
        fontSize: '1rem',
        marginTop: '20px',
      }}
    >
      No tools available for the selected reference and machine.
    </p>
  )}
</div>
     {selectedMachine && selectedReference && (
        <>
          <label>New Reference:</label>
          <select
            onChange={(e) => setNewReference(e.target.value)}
            value={newReference}
          >
            <option value="">Select New Reference</option>
            {filteredReferences.map((ref) => (
              <option key={ref.reference} value={ref.reference}>
                {ref.reference}
              </option>
            ))}
          </select>

          <button onClick={updateReference}>Update Reference</button>
        </>
      )}
  
          </div>
  );
};

export default RferenceUpdater;
