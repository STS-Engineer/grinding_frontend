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
      // Step 1: Check if the tool exists
      const checkResponse = await axios.post(
        "https://grinding-backend.azurewebsites.net/ajouter/checkoutil",
        { nom_outil: nomoutil }, // Send the tool name to check
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (checkResponse.data.exists) {
        message.warning("L'outil existe déjà dans la base de données.");
        return; // Stop the submission
      }
  
      // Step 2: Add the tool if it does not exist
      await axios.post(
        "https://grinding-backend.azurewebsites.net/ajouter/ajouteroutil",
        {
          phase: phase,
          nom_outil: nomoutil,
          dureedevie: dureedevie,
          referenceproduit: referenceproduit,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      message.success("L'outil a été ajouté avec succès!");
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to add the tool.");
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
        label="Phase"
        rules={[{ required: true, message: "Please select a phase!" }]} // Optional validation rule
         >
     <Select
      value={phase}
      onChange={(value) => setPhase(value)}
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
