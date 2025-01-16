import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Ajouterregleur.css';
import { Modal, Input, message, Form, Button, Table } from 'antd'; // Import Ant Design components
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const Listoperateur = () => {
  const [matricule, setMatricule] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [currentRegleur, setCurrentRegleur] = useState(null);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [operateurs, setOperateurs] = useState([]); // State to store fetched operators

  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Fetch operators on component mount

  const fetchOperateurs = async () => {
    try {
      const response = await axios.get('https://grinding-backend.azurewebsites.net/ajouter/getoperateurs', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(response.data); // Debugging the response
      if (Array.isArray(response.data.operateurs)) {
        setOperateurs(response.data.operateurs); // Assuming the response is the array directly
      } else {
        console.error('Unexpected response format:', response.data);
        message.error('Failed to fetch operators.');
      }
    } catch (error) {
      console.error('Error fetching operators:', error);
      message.error('Failed to fetch operators.');
    }
  };
  useEffect(() => {
    fetchOperateurs();
  }, []);
  
  const handleLogout = () => {
    navigate('/login');
  };

   // Handle the delete operation
   const handleDelete = async (id) => {
    try {
      // Confirm before deleting
      const confirmDelete = window.confirm('Are you sure you want to delete this Régleur?');
      if (confirmDelete) {
        const response = await axios.delete(`https://grinding-backend.azurewebsites.net/ajouter/operateur/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.message === 'Operateur a été supprimé') {
          message.success('Operator has been deleted .');
          // Fetch updated list after deletion
          fetchOperateurs(); // You can refactor the fetchRegleur function to be reusable
        } else {
          message.error('Failed to delete Régleur.');
        }
      }
    } catch (error) {
      console.error('Error deleting operator:', error);
      message.error('Failed to delete operator.');
    }
  };

  // Handle edit operation
  const handleEdit = (regleur) => {
    setCurrentRegleur(regleur); // Set the current regleur to be edited
    setNom(regleur.nom); // Set the name (nom) to the current regleur's value
    setPrenom(regleur.prenom); // Set the first name (prenom)
    setIsModalVisible(true); // Show the modal
  };

  // Handle the form submission for editing
  const handleSubmitEdit = async () => {
   
    try {
      

      const response = await axios.put(`https://grinding-backend.azurewebsites.net/ajouter/operateur/${currentRegleur.id}`, {
        nom,
        prenom,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.message === 'Operateur updated successfully') {
        message.success('Operator has been updated successfully.');
        setIsModalVisible(false); // Close the modal
        fetchOperateurs(); // Fetch updated list of regleurs
      } else {
        message.error('Failed to update Régleur.');
      }
    } catch (error) {
      console.error('Error updating regleur:', error);
      message.error('Failed to update Régleur: ' + error.response?.data?.message || error.message);
    }
  };

  const columns = [
    {
      title: 'Matricule',
      dataIndex: 'matricule',
      key: 'matricule',
    },
    {
      title: 'Nom',
      dataIndex: 'nom',
      key: 'nom',
    },
    {
      title: 'Prénom',
      dataIndex: 'prenom',
      key: 'prenom',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)} // Pass the whole record to handleEdit
            style={{ marginRight: '8px' }}
          >
            Modifier
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)} // Pass the correct ID to handle delete
            danger
          >
            Supprimer
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="body_container">
  <div className='navbar'>
        <ul className="navbar-links">
          <li><a href="/home">Acceuil</a></li>
          <li><a href="/form">Ajouter Production</a></li>
          <li><a href="/ajouternouvellemachine">Ajouter une machine</a></li>
          <li><a href="/ajouteroperateur">Ajouter des Opérateurs</a></li>
          <li><a href="/listoperateur">List des Opérateurs</a></li>
          <li><a href="/ajouterregleur">Ajouter des Régleurs</a></li>
          <li><a href="/listregleur">List des régleurs</a></li>
          <li><a href="/ajouterprobleme">Ajouter des problémes techniques </a></li>
          <li><a href="/ajouterdefaut">Ajouter des defauts </a></li>
          <li><a href="/details">Détails des machines</a></li>
          <li><a href="/calendar">Plannification</a></li>
          <button className='logout-button' onClick={handleLogout}>logout</button>
        </ul>
      </div>

      <div className="machine-form-container">
      <div className="operator-list-container">
        <h2>Liste des opérateurs</h2>
        <Table columns={columns} dataSource={operateurs} rowKey="_id" />
      </div>
    </div>

        {/* Modal for editing the regleur */}
          <Modal
            title="Modifier le Régleur"
            visible={isModalVisible}
            onCancel={() => setIsModalVisible(false)} // Close the modal
            onOk={handleSubmitEdit} // Call handleSubmitEdit when the "OK" button is clicked
          >
            <div>
            <Input
                placeholder="Matricule"
                value={matricule}
                onChange={(e) => setMatricule(e.target.value)} // Update nom state
              />
              <Input
                placeholder="Nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)} // Update nom state
              />
              <Input
                placeholder="Prénom"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)} // Update prenom state
                style={{ marginTop: '10px' }}
              />
            </div>
          </Modal>
    </div>
  );
};

export default Listoperateur;
