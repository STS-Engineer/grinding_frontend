import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Modal, Form, Input, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./machinedetails.css";
import { RoleContext } from "./RoleContext";
import { useNavigate } from "react-router-dom";



const MachineDetails = () => {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    nom: '',
    referenceproduit: '',
    date: '',
    cadence_horaire: '',
    nombre_operateur_chargement: '',
    cadence_horaire_cf: '',
    cadence_horaire_csl: '',
    nombre_operateur_cf: '',
    nombre_operateur_csl: '',
    tools: [],
  });
  const [form]= Form.useForm();

  // Fetch machines from the backend
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
      setError("Failed to fetch machine details");
      setLoading(false);
    }
  };

  // Fetch machines when the component mounts
  useEffect(() => {
    fetchMachines();
  }, []);

  useEffect(() => {
    if (selectedMachine) {
      setFormValues({
        nom: selectedMachine.nom,
        referenceproduit: selectedMachine.referenceproduit,
        date: selectedMachine.date,
        cadence_horaire: selectedMachine.cadence_horaire,
        nombre_operateur_chargement: selectedMachine.nombre_operateur_chargement,
        cadence_horaire_cf: selectedMachine.cadence_horaire_cf,
        cadence_horaire_csl: selectedMachine.cadence_horaire_csl,
        nombre_operateur_cf: selectedMachine.nombre_operateur_cf,
        nombre_operateur_csl: selectedMachine.nombre_operateur_csl,
      
      });
    }
  }, [selectedMachine]);
  

  // Update the machine details in the backend
  const handleUpdate = async (values) => {
    const updatedMachineData = {
      nom: values.nom,
      referenceproduit: values.referenceproduit,
      date: values.date,
      cadence_horaire: values.cadence_horaire,
      nombre_operateur_chargement: values.nombre_operateur_chargement,
      cadence_horaire_cf: values.cadence_horaire_cf,
      cadence_horaire_csl: values.cadence_horaire_csl,
      nombre_operateur_cf: values.nombre_operateur_cf,
      nombre_operateur_csl: values.nombre_operateur_csl,
    
    };

    try {
      const response = await axios.put(
        `https://grinding-backend.azurewebsites.net/ajouter/machinee/${selectedMachine.id}`, // Fixed URL
        updatedMachineData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
    
        setIsModalVisible(false); // Close modal on success
        message.success("Machine updated successfully");
        fetchMachines(); // Refresh the machine list
      } else {
        alert("Error updating machine details");
      }
    } catch (error) {
      console.error("Error updating machine:", error);
      alert("An error occurred while updating the machine");
    }
  };

  const machineImages = {
    NGG3: '/images/machines/NNG3.png',
    NGG4: '/images/machines/NGG4.png',
    KOJ: '/images/machines/KOJ.png',
    MUD6: '/images/machines/MUD6.png',
    MUD7: '/images/machines/MUD7.png',
    NGG6: '/images/machines/NGG6.png'
  };

  const showModal = (machine) => {
    setSelectedMachine(machine);
    setIsModalVisible(true);
    form.setFieldsValue(machine);
  };
  const handleDelete = async (machineId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`https://grinding-backend.azurewebsites.net/ajouter/machinee/${machineId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data.nom);
      if (response.status === 200) {
        alert('Are you sure you want to delete this machine');
        fetchMachines(); // Re-fetch the machine list
      } else {
        alert("Error deleting machine");
      }
    } catch (error) {
      console.error("Error deleting machine:", error);
      alert("An error occurred while deleting the machine");
    }
  };


  const handleCancel = () => {
    setIsModalVisible(false);
  };



 const{role}= useContext(RoleContext);
    const navigate = useNavigate();
    const handleLogout = () => {
      navigate('/login');
    };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;


  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/login');
  };
  return (
    <div>
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

        {/* Logout Button beside the menu */}
         <button  className="logout-button" onClick={handleLogout} style={{ padding: "10px 15px" }}>
          Logout
         </button>
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
  
      <div className="machine-list">
        {machines.map((machine) => {
          const machineImage = machineImages[machine.nom]; // Get the image based on machine name
  
          return (
            <div key={machine.id} className="machine-card">
              <h3>{machine.nom}</h3>
              
  
              <div className="button-container" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <div className="machine-details">
                  <p><strong>Matricule Utilisateur:</strong> {machine.user_id}</p>
                  <p><strong>Reference:</strong> {machine.referenceproduit}</p>
                  <p><strong>Cadence_horaire_production:</strong> {machine.cadence_horaire}</p>
                  <p><strong>Cadence_horaire_cf:</strong> {machine.cadence_horaire_cf}</p>
                  <p><strong>Cadence_horaire_csl:</strong> {machine.cadence_horaire_csl}</p>
                  <p><strong>Date de creation:</strong> {machine.date}</p>
                </div>
              </div>
  
        <div style={{ display: 'flex', gap: '30px', marginTop: '20px' }}>
          <button
            className="update-button"
           onClick={() => showModal(machine)}
           style={{
           padding: '10px 10px',
           backgroundColor: '#3e7da1',
           color: 'white',
           border: 'none',
           cursor: 'pointer',
           fontSize: '14px',
           fontWeight:'bold',
           whiteSpace: 'nowrap', // Prevents text wrapping
            }}
  >
           Update Machine
        </button>
        <button
        className="delete-button"
        onClick={() => handleDelete(machine.id)}
        style={{
        padding: '10px 10px',
        backgroundColor: '#f44336',
        color: 'white',
       border: 'none',
       cursor: 'pointer',
       fontSize: '14px',
       fontWeight:'bold',
       whiteSpace: 'nowrap', 
      }}
       >
      Delete Machine
     </button>
           </div>

            </div>
          );
        })}
      </div>
            {/* Modal for updating machine */}
            <Modal
        title={`Update Machine: ${selectedMachine?.nom}`}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // No footer needed, we handle it manually
        className="machine-modal"
      >
        <Form
         form={form}
          onFinish={handleUpdate}

          className="machine-form"
        >
          <Form.Item label="Machine Name" name="nom" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Reference" name="referenceproduit" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Date" name="date" rules={[{ required: true }]}>
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Cadence Horaire" name="cadence_horaire" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Number of Operators" name="nombre_operateur_chargement" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Cadence Horaire CF" name="cadence_horaire_cf" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Cadence Horaire CSL" name="cadence_horaire_csl" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Number of Operators CF" name="nombre_operateur_cf" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Number of Operators CSL" name="nombre_operateur_csl" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Machine
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MachineDetails;
