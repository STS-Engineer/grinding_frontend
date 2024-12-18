import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Ajuterform.css';
import { useNavigate } from 'react-router-dom';


function Ajoutermachine() {
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    codemachine: '',
    nom: '',
    reference: '',
    phase: '',
    date: '',
    outillage: ''


  });
  const navigate= useNavigate();

  // Fetch companies on component mount
  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('http://localhost:4000/ajouter');
      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies: ', error);
    }
  };

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
  };
  const token = localStorage.getItem('token')
  
  // Handle form submission
// Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent default form submission behavior
  
  try {
    // Make a POST request with form data
    const response = await axios.post('http://localhost:4000/ajouter/machine', formData,  {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include JWT token here
      },
     
    });
    
    // Check if the response is successful
    if (response.status === 200) {
      alert('Form submitted successfully');
      
      // Optionally, reset the form data after submission
      setFormData({
        nommachine: '',
        date: '',
        description: '',
        outillage: ''
      });
    } else {
      alert('Failed to submit form');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('An error occurred while submitting the form');
  }
};

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userEmail");
  navigate('/login');
};


  return (

    <div className="page-wrapper"> 
   <div className='navbar'>
        <ul className="navbar-links">
          <li><a href="/home">Acceuil</a></li>
          <li><a href="/plannification">Plannification de production</a></li>
          <li><a href="/form">Ajouter Production</a></li>
          <li><a href="/ajouteroutil">Ajouter un outil</a></li>
          <li><a href="/machineform">Ajouter un machine</a></li>
          <li><a href="/details">Détails des machines</a></li>
          <li><a href="/calendar">Calnedrier</a></li>
          <button className='logout-button' onClick={handleLogout}>logout</button>
        </ul>
      </div>
    <div className="form-page-container">
      {/* Image Section */}
      <div className="image-section">
        <img src="/path/to/your/image.jpg"  className="form-image" />
      </div>


      {/* Form Section */}
      <div className="form-section">
        
        <h2>Ajouter une nouvelle machine</h2>
        <form onSubmit={handleSubmit} className="animated-form">
          <div className="form-row">
            <input
              type="text"
              name="codemachine"
              placeholder="Reference Product"
              value={formData.codemachine}
              onChange={handleChange}
              required
            />
            
            <input
              type="nom"
              name="nom"
              placeholder="nom"
              value={formData.nom}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
          <select
          name="Controle"
          value={formData.Controle}
          onChange={handleChange}
          required
          className="input modern-input"
          >
        <option value="">Select reference</option>
        <option value="1027649">1026649</option>
        <option value="Meuledusinagelargeur">1026577</option>
        <option value="Meuledusinage chanfreinage">1026188</option>
        <option value="Meuledusinagerayonnage">1026617</option>
        <option value="Roueplastiquesdeguidagebalai">1026540</option>
        <option value="Meuledusinagelargeur">1026578</option>
        <option value="Meuledusinage chanfreinage">1999810</option>
        <option value="Meuledusinagerayonnage">1026325</option>
        <option value="Roueplastiquesdeguidagebalai">1029647</option>
        <option value="Meuledusinage chanfreinage">1026648</option>
        </select>
            
            <input
              type="phase"
              name="phase"
              placeholder="phase"
              value={formData.phase}
              onChange={handleChange}
              required
            />
          </div>


          <div className="form-row">
          <input
              type="date"
              name="date"
              placeholder="Date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            
           
        <select
          name="Controle"
          value={formData.Controle}
          onChange={handleChange}
          required
          className="input modern-input"
          >
        <option value="">Select outillage</option>
        <option value="Meuleusinagehauteur">Meule d’usinage hauteur</option>
        <option value="Meuledusinagelargeur">Meule d’usinage largeur</option>
        <option value="Meuledusinage chanfreinage">Meule d’usinage chanfreinage</option>
        <option value="Meuledusinagerayonnage">Meule d’usinage rayonnage</option>
        <option value="Roueplastiquesdeguidagebalai">Roue plastiques de guidage balai</option>
        </select>
          </div>
  
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Ajoutermachine;
