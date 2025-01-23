import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Input, message, Select,  Form, Button } from 'antd'; // Import Ant Design components
import { useNavigate } from 'react-router-dom';
import ActionHistory from './ActionHistory ';

const { Option } = Select;

const Ajouterdefautinspection = () => {

  const [inspection,setInspection]= useState('');


  // Form data state
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const userID = localStorage.getItem("userID")
  console.log(userID);

  const handleSubmit = async (values) => {
    
    try {
      // Sending the request with the correct body format
      await axios.post(
        "https://grinding-backend.azurewebsites.net/ajouter/ajouterdefautinspection",
        {
            inspectiondefaut: inspection, // Replace with actual value from the form
  
          
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is valid
            "Content-Type": "application/json",
          },
        }
      );
      message.success("Défaut d'inspection à été ajouté avec succés!");

    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to add inspection default.");
    }
  };
  

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="body_container">
  <div className='navbar'>
        <ul className="navbar-links">
          <li><a href="/home">Acceuil</a></li>
          <li><a href="/form">Ajouter Production</a></li>
          <li><a href="/ajouternouvellemachine">Ajouter une machine</a></li>
          <li><a href="/Ajouteroutil">Ajouter un outil</a></li>
          <li><a href="/ajouteroperateur">Ajouter des Opérateurs</a></li>
          <li><a href="/listoperateur">List des Opérateurs</a></li>
          <li><a href="/ajouterregleur">Ajouter des Régleurs</a></li>
          <li><a href="/listregleur">List des régleurs</a></li>
          <li><a href="/ajouterprobleme">Ajouter des problémes techniques </a></li>
          <li><a href="/Ajouterproblemepostedecontrole">Ajouter des problémes de poste de controle </a></li>
          <li><a href="/ajouterdefaut">Ajouter des defauts </a></li>
          <li><a href="/details">Détails des machines</a></li>
          <li><a href="/calendar">Plannification</a></li>
          <button className='logout-button' onClick={handleLogout}>logout</button>  
        </ul>
      </div>
  
      <div className="machine-form-container">
        <h2>Ajouter des défauts inspection</h2>
        
        <Form
          form={form}
          layout="vertical"
        
        >
          <Form.Item
            name="probleme"
            label="Défaut d'inspection"
    
          >
         <Input
           type="text"
           value={inspection}
           onChange={(e) => setInspection(e.target.value)}
          placeholder="Entrez le defaut d'inspection"
          />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={()=>handleSubmit()} >
              Soumettre
            </Button>
          </Form.Item>
        </Form>
        
      </div>
    </div>
  );
  
};

export default Ajouterdefautinspection;
