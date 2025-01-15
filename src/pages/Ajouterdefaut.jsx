import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Input, message, Select,  Form, Button } from 'antd'; // Import Ant Design components
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const Ajouterdefaut = () => {

  const [defaut,setDefauts]= useState('');




  // Form data state
  const [form] = Form.useForm();


  const navigate = useNavigate();
  const userID = localStorage.getItem("userID")
  console.log(userID);

  const handleSubmit = async (values) => {
    
    try {
      // Sending the request with the correct body format
      await axios.post(
        "https://grinding-backend.azurewebsites.net/ajouter/ajouterdefaut",
        {
            defaut: defaut, // Replace with actual value from the form
  
          
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is valid
            "Content-Type": "application/json",
          },
        }
      );
      message.success("Le défaut a été ajouté avec succès!");
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to add machine.");
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
          <li><a href="/ajouteroperateur">Ajouter des Opérateurs</a></li>
          <li><a href="/ajouterregleur">Ajouter des Régleurs</a></li>
          <li><a href="/ajouterprobleme">Ajouter des problémes techniques </a></li>
          <li><a href="/details">Détails des machines</a></li>
          <li><a href="/calendar">Plannification</a></li>
          <button className='logout-button' onClick={handleLogout}>logout</button>
        </ul>
      </div>
  
      <div className="machine-form-container">
        <h2>Ajouter des Problémes Techniques</h2>
        
        <Form
          form={form}
          layout="vertical"
        
        >
          <Form.Item
            name="probleme"
            label="probleme"
            rules={[{ required: true, message: 'Veuillez entrer le probléme technique!' }]}
          >
         <Input
           type="text"
           value={defaut}
           onChange={(e) => setDefauts(e.target.value)}
          placeholder="Entrez le type de défaut "
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

export default Ajouterdefaut;
