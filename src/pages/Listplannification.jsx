import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Form, Input, Button, message, Select, DatePicker  } from "antd";



const {Option} = Select;
const Listeplannification = () => {
  const [plannifications, setPlannifications] = useState([]);
  const { RangePicker } = DatePicker;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedplannification, setSelectedplannification] = useState(null);
  const [formValues, setFormValues] = useState({
    phase: '',
    operateurs: '',
    problemecontrole: '',
    totalplanifie: '',
    nombre_heure_shift1: '',
    nombre_heure_shift2: '',
    shift: '',
    date_creation: '',
    nombredemanqueoperateur: '',
    start_date: '',
    end_date: '',
    referenceproduit: '',

  });
const [operateurs, setOperateurs] = useState([]);
  const [form] = Form.useForm(); // Use Ant Design form instance

  // Fetch machines from the backend
  const fetchPlannifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://grinding-backend.azurewebsites.net/ajouter/listplannification", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlannifications(response.data.plannifications);
      console.log("Plannification", response.data.plannifications)
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch Plannifications  details");
      setLoading(false);
    }
  };
  const fetchoperateur = async()=>{
    try {
      const response = await axios.get("https://grinding-backend.azurewebsites.net/ajouter/getoperateurs");
      setOperateurs(response.data.operateurs);
      console.log(response.data);

    } catch (error){
      console.error("Error fetching data:", error);

    }
  }
  useEffect(() => {
    fetchoperateur();
  }, []);
  // Fetch machines when the component mounts
  useEffect(() => {
    fetchPlannifications();
  }, []);

  useEffect(() => {
    if (selectedplannification) {
      setFormValues({
        phase:selectedplannification.phase,
        operateurs: selectedplannification.operateurs,
        totalplanifie: selectedplannification.totalplanifie,
        nombre_heure_shift1: selectedplannification.nombre_heure_shift1,
        nombre_heure_shift2: selectedplannification.nombre_heure_shift2,
        shift: selectedplannification.shift,
        date_creation: selectedplannification.date_creation,
        nombredemanqueoperateur: selectedplannification.nombredemanqueoperateur,
        start_date: selectedplannification.start_date,
        end_date: selectedplannification.end_date,
        referenceproduit: selectedplannification.referenceproduit,
    
      });
    }
  }, [selectedplannification]);
  

  // Update the machine details in the backend
  const handleUpdate = async (values) => {
    const updatedMachineData = {
        phase:values.phase,
        operateurs: values.operateurs,
        totalplanifie: values.totalplanifie,
        nombre_heure_shift1: values.nombre_heure_shift1,
        nombre_heure_shift2: values.nombre_heure_shift2,
        shift: values.shift,
        date_creation: values.date_creation,
        nombredemanqueoperateur: values.nombredemanqueoperateur,
        start_date: values.start_date,
        end_date: values.end_date,
        referenceproduit: values.referenceproduit,
    };

    try {
      const response = await axios.put(
        `https://grinding-backend.azurewebsites.net/ajouter/updateplannification/${selectedplannification.id}`, // Fixed URL
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
        message.success("Plannification updated successfully");
        fetchPlannifications(); // Refresh the machine list
      } else {
        alert("Error updating problem control details");
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


  // Show modal and set form values dynamically
  const showModal = (plannification) => {
    setSelectedplannification(plannification);
    setIsModalVisible(true);
    form.setFieldsValue(plannification); // Populate form with existing values
  };

  const handleDelete = async (plannificationId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`https://grinding-backend.azurewebsites.net/ajouter/plannifications/${plannificationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data.nom);
      if (response.status === 200) {
        alert('Are you sure you want to delete this plannification');
        fetchPlannifications(); // Re-fetch the machine list
      } else {
        alert("Error deleting plannification");
      }
    } catch (error) {
      console.error("Error deleting Problem Control:", error);
      alert("An error occurred while deleting the Problem Control");
    }
  };


  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields(); // Reset form when closing
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
      <div>
      <h1 style={{}}>List Plannification</h1>
      </div>
   
      <div className="machine-list">
        {plannifications.map((plannification) => {
          const machineImage = machineImages[plannification.nom]; // Get the image based on machine name
  
          return (
            <div key={plannification.id} className="machine-card">
              
              <h3>{plannification.nom}</h3>
              
              {/* Render the image if it exists */}
              {machineImage && (
                <img
                  src={machineImage}
                  alt={`Machine ${plannification.nom}`}
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
                <div className="Problem-details">
                  <p><strong>Réference produit:</strong> {plannification.referenceproduit}</p>
                  <p><strong>Phase:</strong> {plannification.phase}</p>
                  <p><strong>Operateurs:</strong> {plannification.operateurs}</p>
                  <p><strong>Objective :</strong> {plannification.totalplanifie}</p>
                  <p><strong>Nombre d'heure shift 1:</strong> {plannification.nombre_heure_shift1}</p>
                  <p><strong>Nombre d'heure shift 2:</strong> {plannification.nombre_heure_shift2}</p>
                  <p><strong>Shift:</strong> {plannification.shift}</p>
                  <p><strong>Date de création:</strong> {plannification.date_creation}</p>
                  <p><strong>Nombre de manque:</strong> {plannification.nombredemanqueoperateur}</p>
                  <p><strong>Date de création:</strong> {plannification.date_creation}</p>
                  <p><strong>Start Date:</strong> {plannification.start_date}</p>
                  <p><strong>End Date:</strong> {plannification.end_date}</p>

                </div>
              </div>
  
        <div style={{ display: 'flex', gap: '30px', marginTop: '20px' }}>
          <button
            className="update-button"
           onClick={() => showModal(plannification)}
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
           Update Plannification
        </button>
        <button
        className="delete-button"
        onClick={() => handleDelete(plannification.id)}
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
      Delete Plannification
     </button>
           </div>

            </div>
          );
        })}
      </div>
     {/* Modal for updating machine */}
     <Modal
        title={`Update Plannification: ${selectedplannification?.phase}`}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleUpdate}
          layout="vertical"
        >

          

       <Form.Item label="Refernece Produit" name="referenceproduit" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item
        name="phase"
        label="Phase"
        rules={[{ required: true, message: "Please select a phase!" }]} // Optional validation rule
         >
      <Select
      placeholder="Select a phase"
      >
     <Option value="roueavancement">Roue d'avancement</Option>
      <Option value="Usinagehauteur">Usinage Hauteur</Option>
      <Option value="Usinagelargeur">Usinage Largeur</Option>
      <Option value="Usinagechanfreins">Usinage Chanfreins</Option>
      <Option value="Usinagerainure">Usinage rainure</Option>
      <Option value="Usinagerayonnage">Usinage rayonnage</Option>
      <Option value="Usinagetete">Usinage tete</Option>
     </Select>
      </Form.Item>
      <Form.Item label="Operateurs" name="operateurs" >
      <Select mode="multiple" placeholder="Select Operateurs" style={{ width: "100%" }}>
       {operateurs.length > 0 ? (
       operateurs.map((operateur) => (
       <Option key={operateur.id} value={operateur.nom}>
        {operateur.nom}
      </Option>
        ))
  ) : (
    <Option disabled>No Operateurs Available</Option>
  )}
</Select>

         </Form.Item>

          <Form.Item label="Objective" name="totalplanifie" rules={[{ required: true }]}>
            <Input type="text" />
          </Form.Item>

          <Form.Item label="Nombre d'heure shift 1" name="nombre_heure_shift1" rules={[{ required: true }]}>
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Nombre d'heure shift 2" name="nombre_heure_shift2" rules={[{ required: true }]}>
            <Input type="text" />
          </Form.Item>
         <Form.Item
        name="shift"
        label="Shift"
        rules={[{ required: true, message: "Please select a phase!" }]} // Optional validation rule
         >
        <Select
         placeholder="Select a Shift"
         >
       <Option value="shift1">Shift 1</Option>
       <Option value="shift2">Shift 2</Option>
         </Select>
        </Form.Item>
          <Form.Item label="Nombre de manque" name="nombredemanque" rules={[{ required: true }]}>
            <Input type="text" />
          </Form.Item> 

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Plannification
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Listeplannification;
