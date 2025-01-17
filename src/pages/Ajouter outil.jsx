import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Input, message, Select,  Form, Button } from 'antd'; // Import Ant Design components
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const Ajouteroutil = () => {

  const [phase,setPhase]= useState('');
  const [nomoutil,setNomoutil]= useState('');
  const [dureedevie,setDureedevie]= useState('');
  const [referenceproduit,setReferenceproduit]= useState('');




  // Form data state
  const [form] = Form.useForm();


  const navigate = useNavigate();
  const userID = localStorage.getItem("userID")
  console.log(userID);

  const handleSubmit = async (values) => {
    
    try {
      // Sending the request with the correct body format
      await axios.post(
        "https://grinding-backend.azurewebsites.net/ajouter/ajouteroutil",
        {
            phase: phase, 
            nom_outil: nomoutil,
            dureedevie: dureedevie,
            referenceproduit: referenceproduit,/// Replace with actual value from the form
  
          
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is valid
            "Content-Type": "application/json",
          },
        }
      );
      message.success("L'outil a été ajouté avec succès!");
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
        <h2>Ajouter des Outils</h2>
        
        <Form
          form={form}
          layout="vertical"
        
        >
          <Form.Item
            name="phase"
            label="phase"
           
          >
         <Input
           type="text"
           value={phase}
           onChange={(e) => setPhase(e.target.value)}
          placeholder="Entrez le phase "
          />
        </Form.Item>
        <Form.Item
            name="Réference Outil"
            label="Réference Outil"
           
          >
         <Input
           type="text"
           value={nomoutil}
           onChange={(e) => setNomoutil(e.target.value)}
          placeholder="Entrez le nom d'outil "
          />
        </Form.Item>

        <Form.Item
            name="Dureé de vie"
            label="Dureé de vie"
           
          >
          <Input
           type="text"
           value={dureedevie}
           onChange={(e) => setDureedevie(e.target.value)}
          placeholder="Entrez le dureé devie "
          />
           </Form.Item>
           <Form.Item
            name="Réference produit"
            label="Réference produit"
           
          >
         <Input
           type="text"
           value={referenceproduit}
           onChange={(e) => setReferenceproduit(e.target.value)}
          placeholder="Entrez la réference "
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

export default Ajouteroutil;
