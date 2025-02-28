import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Modal, Form, Input, Button, message, Select } from "antd";
import { RoleContext } from "./RoleContext";
import { useNavigate } from "react-router-dom";



const{Option} = Select;
const ToolDetails = () => {
  const [Tools, setTool] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const [formValues, setFormValues] = useState({
    phase: '',
    nom_outil: '',
    dureedeviepointeur: ''

  });
   const [form] = Form.useForm(); 
    const [isOpen, setIsOpen] = useState(false);

  // Fetch machines from the backend
  const fetchTool = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://grinding-backend.azurewebsites.net/ajouter/tools", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTool(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch tool details");
      setLoading(false);
    }
  };

  // Fetch machines when the component mounts
  useEffect(() => {
    fetchTool();
  }, []);

  useEffect(() => {
    if (selectedTool) {
      setFormValues({
        nom: selectedTool.nom,
        referenceproduit: selectedTool.referenceproduit,
        date: selectedTool.date,
        cadence_horaire: selectedTool.cadence_horaire,
        nombre_operateur_chargement: selectedTool.nombre_operateur_chargement,
        cadence_horaire_cf: selectedTool.cadence_horaire_cf,
        cadence_horaire_csl: selectedTool.cadence_horaire_csl,
        nombre_operateur_cf: selectedTool.nombre_operateur_cf,
        nombre_operateur_csl: selectedTool.nombre_operateur_csl,
      
      });
    }
  }, [selectedTool]);
  

  // Update the machine details in the backend
  const handleUpdate = async (values) => {
    const updatedMachineData = {
      phase: values.phase,
      nom_outil: values.nom_outil,
      dureedeviepointeur: values.dureedeviepointeur,
    };

    try {
      const response = await axios.put(
        `https://grinding-backend.azurewebsites.net/ajouter/tools/${selectedTool.id}`, // Fixed URL
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
        message.success("Tool updated successfully");
        fetchTool(); // Refresh the machine list
      } else {
        alert("Error updating Tool details");
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
    setSelectedTool(machine);
    setIsModalVisible(true);
    form.setFieldsValue(machine);
  };
  const handleDelete = async (ToolId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`https://grinding-backend.azurewebsites.net/ajouter/tools/${ToolId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data.nom);
      if (response.status === 200) {
        alert('Are you sure you want to delete this Tool');
        fetchTool(); // Re-fetch the machine list
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


  const { role } = useContext(RoleContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/login');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  
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


   <div style={{ display: "flex", alignItems: "center" }}>
      {/* Hamburger Icon (for opening/closing the menu) */}
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
            height: "5px",
            backgroundColor: "#fff",
            margin: "5px 0",
            transition: "0.3s",
            transform: isOpen
              ? "rotate(45deg) translate(5px, 5px)"
              : "none",
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
            transform: isOpen
              ? "rotate(-45deg) translate(5px, -5px)"
              : "none",
          }}
        ></div>
      </div>

      {/* Logout Button beside the menu */}
      <button
        onClick={handleLogout}
        style={{
          marginLeft: "20px",
          paddingRight: "20px",
          marginRight: "30px",
          backgroundColor: "#007bff", // Red color for logout
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          transition: "background-color 0.3s",
        }}
      >
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
                <a href="/form" style={linkStyle}>
                  Ajouter Production
                </a>
              </li>
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
        {Tools.map((machine) => {
          const machineImage = machineImages[machine.nom]; // Get the image based on machine name
  
          return (
            <div key={machine.id} className="machine-card">
              <h3>{machine.nom}</h3>
              
              {/* Render the image if it exists */}
              {machineImage && (
                <img
                  src={machineImage}
                  alt={`Machine ${machine.nom}`}
                  style={{
                    width: '150px',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '5px',
                    marginBottom: '10px',
                  }}
                />
              )}
  
              <div className="button-container" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <div className="machine-details">
                  <p><strong>Nom_outil:</strong> {machine.outil}</p>
                  <p><strong>dureedevie:</strong> {machine.dureedeviepointeur}</p>
                  <p><strong>Réference:</strong> {machine.reference}</p>
               
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
           Update Tool
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
      Delete Tool
     </button>
           </div>

            </div>
          );
        })}
      </div>
            {/* Modal for updating machine */}
            <Modal
        title={`Update Machine: ${selectedTool?.nom}`}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // No footer needed, we handle it manually
        className="machine-modal"
      >
        <Form
          form={form}
          onFinish={handleUpdate}
          layout="vertical"
        >
            <Form.Item label="Nom_outil" name="outil" >
            <Input type="text" />
          </Form.Item>
         
          <Form.Item label="Durée de vie" name="dureedeviepointeur" >
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Réference" name="reference" >
            <Input type="text" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Tool
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ToolDetails;
