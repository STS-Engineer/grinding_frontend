import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Form, Input, Button, message } from "antd";




const ToolDetails = () => {
  const [Tools, setTool] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const [formValues, setFormValues] = useState({
    phase: '',
    nom_outil: '',
    dureedevie: ''

  });

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
      dureedevie: values.dureedevie,
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

  const handleFormChange = (changedValues) => {
    setFormValues(prevState => ({
      ...prevState,
      ...changedValues,
    }));
  };

  const onFinish = (values) => {
    handleUpdate(values); // Pass the updated values to the handler
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
          <div className='navbar'>
        <ul className="navbar-links">
          <li><a href="/home">Acceuil</a></li>
          <li><a href="/form">Ajouter Production</a></li>
          <li><a href="/ajouternouvellemachine">Ajouter une machine</a></li>
          <li><a href="/Ajouteroutil">Ajouter un outil</a></li>
          <li><a href="/ajouteroperateur">Ajouter des Opérateurs</a></li>
          <li><a href="/details">Détails des machines</a></li>
          <li><a href="/calendar">Plannification</a></li>
          
        </ul>
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
                  <p><strong>Nom_outil:</strong> {machine.nom_outil}</p>
                  <p><strong>Phase:</strong> {machine.phase}</p>
                  <p><strong>dureedevie:</strong> {machine.dureedevie}</p>
               
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
          initialValues={formValues}
          onFinish={onFinish}
          onValuesChange={handleFormChange} // Capture form changes
          className="machine-form"
        >
          <Form.Item label="Nom_outil" name="nom_outil" rules={[{ required: true }]}>
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Phase" name="phase" rules={[{ required: true }]}>
            <Input type="text" />
          </Form.Item>
          <Form.Item label="DUrée de vie" name="dureedevie" rules={[{ required: true }]}>
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
