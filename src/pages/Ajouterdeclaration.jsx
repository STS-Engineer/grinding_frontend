import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RoleContext } from './RoleContext';
import { Modal, Input, message, Select, Form, Button } from 'antd';

const { Option } = Select;

const Ajouterdeclaration = () => {
  const [nom_machine, setNommachine] = useState('');
  const [reference, setReference] = useState('');
  const [outil, setOutil] = useState('');
  const [dureedevie, setDureedevie] = useState('');
  const [phase, setPhase] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const [form] = Form.useForm();

  const navigate = useNavigate();
  const userID = localStorage.getItem('userEmail');
  console.log(userID);

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "https://grinding-backend.azurewebsites.net/ajouter/ajouterdeclaration",
        {
          nom_machine: nom_machine,
          reference: reference,
          outil: outil,
          phase: phase,
          dureedevie: dureedevie,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log(response); // Log the entire response object for debugging
  
      if (response.data.success) {
        message.success("Tool has been added successfully!");
      } else {
        message.error("Failed to add the tool. Response: " + JSON.stringify(response.data));
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("An error occurred while adding the tool.");
    }
  };
  

  const { role } = useContext(RoleContext);

  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
    fontWeight: 'bold',
    display: 'block',
    padding: '12px 8px',
    borderRadius: '5px',
    transition: '0.3s',
  };

  return (
    <div>
      <h1 style={{ fontWeight: 'bold', justifyContent: 'center', alignItems: 'center', fontSize: '40px', marginTop: '20px' }}>
        Ajouter Outil
      </h1>

      <div>
        {/* Top Navigation & Sidebar */}
        <div
          style={{
            width: '100%',
            background: '#1b1b1b',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <img style={{ width: '150px', height: '40px' }} src='/images/machines/logo-avocarbon.png' alt='Logo' />

          <div onClick={() => setIsOpen(!isOpen)} style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer', padding: '10px' }}>
            <div style={{ width: '30px', height: '5px', backgroundColor: '#fff', margin: '5px 0', transition: '0.3s', transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></div>
            <div style={{ width: '30px', height: '4px', backgroundColor: '#fff', margin: '5px 0', opacity: isOpen ? 0 : 1, transition: '0.3s' }}></div>
            <div style={{ width: '30px', height: '4px', backgroundColor: '#fff', margin: '5px 0', transition: '0.3s', transform: isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></div>
          </div>

          {/* Sidebar Navigation */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: isOpen ? '0' : '-250px',
              width: '250px',
              height: '100vh',
              background: '#282828',
              padding: '20px',
              transition: 'left 0.4s ease-in-out',
              boxShadow: isOpen ? '4px 0 10px rgba(0, 0, 0, 0.2)' : 'none',
            }}
          >
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {(role === 'ADMIN' || role === 'REGLEUR') && (
                <li style={{ padding: '10px 0' }}>
                  <a href='/form' style={linkStyle}>
                    Ajouter Production
                  </a>
                </li>
              )}
              {role === 'ADMIN' && (
                <>
                  <li style={{ padding: '10px 0' }}>
                    <a href='/calendar' style={linkStyle}>
                      Plannification
                    </a>
                  </li>
                  <li style={{ padding: '10px 0' }}>
                    <a href='/history' style={linkStyle}>
                      Historique
                    </a>
                  </li>
                  <li style={{ padding: '10px 0' }}>
                    <a href='/ajouternouvellemachine' style={linkStyle}>
                      Ajouter une machine
                    </a>
                  </li>
                  <li style={{ padding: '10px 0' }}>
                    <a href='/listregleur' style={linkStyle}>
                      List des régleurs
                    </a>
                  </li>
                  <li style={{ padding: '10px 0' }}>
                    <a href='/detailoutil' style={linkStyle}>
                      List des outils
                    </a>
                  </li>
                  <li style={{ padding: '10px 0' }}>
                    <a href='/listoperateur' style={linkStyle}>
                      List des Opérateurs
                    </a>
                  </li>
                  <li style={{ padding: '10px 0' }}>
                    <a href='/ajouterdefaut' style={linkStyle}>
                      List des défauts
                    </a>
                  </li>
                  <li style={{ padding: '10px 0' }}>
                    <a href='/details' style={linkStyle}>
                      Détails des machines
                    </a>
                  </li>
                </>
              )}
              {(role === 'ADMIN' || role === 'REGLEUR') && (
                <li style={{ padding: '10px 0' }}>
                  <a href='/changementmeules' style={linkStyle}>
                    Changement des meules
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <form style={styles.form}>
          {/* Nom de machine */}
          <div style={styles.formGroup}>
            <label htmlFor='nom_machine'>Nom de machine</label>
            <input
              type='text'
              id='nom_machine'
              value={nom_machine}
              onChange={(e) => setNommachine(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          {/* Réference */}
          <div style={styles.formGroup}>
            <label htmlFor='reference'>Réference</label>
            <input
              type='text'
              id='reference'
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          {/* Outil */}
          <div style={styles.formGroup}>
            <label htmlFor='outil'>Outil</label>
            <input
              type='text'
              id='outil'
              value={outil}
              onChange={(e) => setOutil(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          {/* Durée de vie */}
          <div style={styles.formGroup}>
            <label htmlFor='dureedevie'>Durée de vie</label>
            <input
              type='text'
              id='dureedevie'
              value={dureedevie}
              onChange={(e) => setDureedevie(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          {/* Phase */}
          <div style={styles.formGroup}>
            <label htmlFor='phase'>Phase</label>
            <select
              value={phase}
              onChange={(values) => setPhase(values)}
              style={styles.input}
              required
            >
              <option value='roueavancement'>Roue d'avancement</option>
              <option value='Usinagehauteur'>Usinage Hauteur</option>
              <option value='Usinagelargeur'>Usinage Largeur</option>
              <option value='Usinagechanfreins'>Usinage Chanfreins</option>
              <option value='Usinagerainure'>Usinage rainure</option>
              <option value='Usinagerayonnage'>Usinage rayonnage</option>
              <option value='Usinagetete'>Usinage tete</option>
            </select>
          </div>

          <Button type='primary' onClick={handleSubmit} style={styles.button}>
            Ajouter
          </Button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
  },
  button: {
    padding: '10px',
    backgroundColor: '#1e90ff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '20px',
  },
};

export default Ajouterdeclaration;
