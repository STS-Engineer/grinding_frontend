import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Form, Input, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./machinedetails.css";

const MachineDetails = () => {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);
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
        // Ensure tools is never undefined
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

  const showModal = (machine) => {
    setSelectedMachine(machine);
    setIsModalVisible(true);
  };


    const handleDelete = async (machineId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`https://grinding-backend.azurewebsites.net/ajouter/machinee/${machineId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert("Machine deleted successfully");
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
      <h2>Machine Details</h2>
      <div className="machine-list">
        {machines.map((machine) => (
          <div key={machine.codemachine} className="machine-card">
            <h3>{machine.nom}</h3>
            <button className="update-button" onClick={() => showModal(machine)}>
              Update Machine
            </button>
          </div>
        ))}
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
          initialValues={formValues}
          onFinish={onFinish}
          onValuesChange={handleFormChange} // Capture form changes
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
