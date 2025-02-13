import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { RoleContext } from './RoleContext';

const ReferenceUpdater = () => {
  const [machines, setMachines] = useState([]);
  const [references, setReferences] = useState([]);
  const [tools, setTools] = useState([]);
  
  const [selectedMachine, setSelectedMachine] = useState('');
  const [selectedReference, setSelectedReference] = useState('');
  const [newReference, setNewReference] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Fetch machines
  useEffect(() => {
    axios.get('https://grinding-backend.azurewebsites.net/ajouter/nommachine')
      .then(response => {
        console.log('Fetched Machines:', response.data); // Log the fetched machines
        setMachines(response.data);
      })
      .catch(error => console.error('Error fetching machines:', error));
  }, []);
  
// Step 4: Filter out the selected reference from the list of references
const filteredReferences = references.filter(
    (ref) => ref.reference !== selectedReference
  );

  // Fetch references when a machine is selected
  const handleMachineChange = (machine) => {
    setSelectedMachine(machine);
    setReferences([]);
    setSelectedReference('');
    setTools([]);

    // Fetch references for the selected machine
    axios.get(`https://grinding-backend.azurewebsites.net/ajouter/get/references/${machine}`)
      .then(response => setReferences(response.data))
      .catch(error => console.error('Error fetching references:', error));
  };

  // Fetch tools when a reference is selected
  const handleReferenceChange = (reference) => {
    setSelectedReference(reference);
    setTools([]);

    // Fetch tools for the selected reference
    axios.get(`https://grinding-backend.azurewebsites.net/ajouter/get/tools/${reference}`)
      .then(response => setTools(response.data))
      .catch(error => console.error('Error fetching tools:', error));
  };

  // Update reference and tools
  const updateReference = () => {
    if (!selectedMachine || !newReference) {
      alert('Please select a machine and enter a new reference.');
      return;
    }

    // Make PUT request to update reference
    axios.put('https://grinding-backend.azurewebsites.net/ajouter/update/reference', {
      nom_machine: selectedMachine,
      new_reference: newReference
    })
      .then(response => {
        alert('Reference updated successfully!');
        // Optionally, you can fetch updated tools after reference update
        setTools(response.data.updatedTools || []); // Make sure your backend returns the updated tools if needed
      })
      .catch(error => console.error('Error updating reference:', error));
  };
  const {role}= useContext(RoleContext);

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

  return (
    <div>
   <div
      style={{
        width: "100%",
        background: "#1b1b1b",
        padding: "5px 8px",
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
  
      {/* Reference Dropdown */}
      {selectedMachine && (
        <>
          <label>Reference:</label>
          <select onChange={(e) => handleReferenceChange(e.target.value)} value={selectedReference}>
            <option value="">Select Reference</option>
            {references.map((ref) => (
              <option key={ref.reference} value={ref.reference}>
                {ref.reference}
              </option>
            ))}
          </select>
        </>
      )}
  
      {/* Display Tools and Durée de Vie */}
      {selectedReference && (
        <div>
          <h3>Tools for Selected Reference:</h3>
          <ul>
            {tools.length > 0 ? (
              tools.map((tool, index) => (
                <li key={index}>
                  <strong>Tool:</strong> {tool.outil} | <strong>Durée de Vie:</strong> {tool.dureedeviepointeur}
                </li>
              ))
            ) : (
              <p>No tools found</p>
            )}
          </ul>
        </div>
      )}
  
      {/* New Reference Input */}
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

         {/* Footer */}
    <footer
      style={{
        width: "100%",
        background: "#1b1b1b",
        color: "#fff",
        textAlign: "center",
        padding: "15px",
        position: "fixed",
        bottom: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      
    </footer>
    </div>
  );
  
};

export default ReferenceUpdater;
