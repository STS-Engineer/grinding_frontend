import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Input, message, Select, Checkbox, Form, Button } from 'antd'; // Import Ant Design components
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const Ajouterregleur = () => {

  const [nom,setNom]= useState('');
  const [prenom,setPrenom]= useState('');



  // Form data state
  const [form] = Form.useForm();


  const navigate = useNavigate();
  const userID = localStorage.getItem("userID")
  console.log(userID);

  const handleSubmit = async (values) => {
    
    try {
      // Sending the request with the correct body format
      await axios.post(
        "https://grinding-backend.azurewebsites.net/ajouter/addregleur",
        {
          nom: nom, // Replace with actual value from the form
          prenom: prenom, // Replace with actual value from the form
          
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is valid
            "Content-Type": "application/json",
          },
        }
      );
      message.success("Régleur added successfully!");
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
          <li><a href="/details">Détails des machines</a></li>
          <li><a href="/calendar">Plannification</a></li>
          <button className='logout-button' onClick={handleLogout}>logout</button>
        </ul>
      </div>
  
      <div className="machine-form-container">
        <h2>Ajouter des nouveaux Régleurs</h2>
        
        <Form
          form={form}
          layout="vertical"
        
        >
          <Form.Item
            name="nom"
            label="Nom"
            rules={[{ required: true, message: 'Veuillez entrer le nom du régleur!' }]}
          >
         <Input
           type="text"
           value={nom}
           onChange={(e) => setNom(e.target.value)}
          placeholder="Entrez le nom du régleur"
          />
          </Form.Item>

          <Form.Item
            name="prenom"
            label="prenom"
            rules={[{ required: true, message: 'Veuillez entrer le prenom du régleur!' }]}
          >
         <Input
           type="text"
           value={prenom}
           onChange={(e) => setPrenom(e.target.value)}
          placeholder="Entrez le prénom du régleur"
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

export default Ajouterregleur;
