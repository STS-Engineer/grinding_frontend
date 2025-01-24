import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Input, message, Form, Button, Table } from 'antd'; // Import Ant Design components
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const Listproblemecontrole = () => {
  const [problemecontrole, setProblemecontrole] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [prbelempostecntrole,setProblempostecontrole]= useState([]);

  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Fetch operators on component mount

  const fetchproblemposte= async () => {
    try {
      const response = await axios.get('https://grinding-backend.azurewebsites.net/ajouter/getproblemespostedecontrole', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(response.data); // Debugging the response
      if (Array.isArray(response.data.operateurs)) {
        setProblempostecontrole(response.data.operateurs);
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
    fetchproblemposte();
  }, []);
  
  const handleLogout = () => {
    navigate('/login');
  };

   // Handle the delete operation
   const handleDelete = async (id) => {
    try {
      // Confirm before deleting
      const confirmDelete = window.confirm('Are you sure you want to delete this Post problem?');
      if (confirmDelete) {
        const response = await axios.delete(`https://grinding-backend.azurewebsites.net/ajouter/operateur/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.message === 'Probleme poste de controle a été supprimé') {
          message.success('Probleme poste de controle  has been deleted .');
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
    setIsModalVisible(true); // Show the modal
  };

  // Handle the form submission for editing
  const handleSubmitEdit = async (id) => {
   
    try {
      

      const response = await axios.put(`https://grinding-backend.azurewebsites.net/ajouter/operateur/${id}`, {
        problemecontrole
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.message === 'Operateur updated successfully') {
        message.success('Operator has been updated successfully.');
        setIsModalVisible(false); // Close the modal
     
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
      title: 'problemecontrole',
      dataIndex: 'problemecontrole',
      key: 'problemecontrole',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div>
          <Button
            icon={<EditOutlined />}
    
            style={{ marginRight: '8px' }}
          >
            Modifier
          </Button>
          <Button
            icon={<DeleteOutlined />}
  
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
      <div className="operator-list-container">
        <h2>Liste des opérateurs</h2>
        <Table columns={columns} dataSource={prbelempostecntrole} rowKey="_id" />
      </div>
    </div>

        {/* Modal for editing the regleur */}
          <Modal
            title="Modifier le probléme poste de controle"
            visible={isModalVisible}
            onCancel={() => setIsModalVisible(false)} // Close the modal
            onOk={handleSubmitEdit} // Call handleSubmitEdit when the "OK" button is clicked
          >
            <div>
            <Input
                placeholder="Probléme poste de controle"
                value={problemecontrole}
                onChange={(e) => setProblemecontrole(e.target.value)} // Update nom state
              />
            </div>
          </Modal>
    </div>
  );
};

export default Listproblemecontrole;
