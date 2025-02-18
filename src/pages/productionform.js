import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Modal, Input, Button, message, Select, Checkbox } from 'antd';
import './productionform.css';
import { useNavigate } from 'react-router-dom';
import{AnimatePresence, motion} from 'framer-motion';
import { RoleContext } from './RoleContext';

const { Option } = Select;
   
const Form = () => {
const [machines, setMachines] = useState([]);
  const [problemes, setProblemes] = useState([]);
  const [problemespostecontrole, setProblemespostecontrole] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [phase, setPhase] = useState('');
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refprod, setRefprod] = useState('');
  const [shift, setShift] = useState('');
  const [typeproblemeproduction, setTypeproblemeproduction] = useState([]);
  const [dateproblemeproduction, setDateproblemeproduction] = useState('');

  const [typeproblemecf, setTypeproblemecf] = useState([]);
  const [dateproblemecf, setDateproblemecf] = useState('');

  const [typeproblemecsl, setTypeproblemecsl] = useState([]);
  const [dateproblemecsl, setdateproblemecsl] = useState('');
  const [commentaires, setCommentaires] = useState('');
  const [totalproduit, setTotalproduit] = useState('');
  const [totalproduitcf, setTotalproduitcf] = useState('');
  const [commentairescf, setCommentairescf] = useState('');
  const [totalproduitcsl, setTotalproduitcsl] = useState('');
  const [commentairescsl, setCommentairecsl] = useState('');
  const [cadencehoraire, setCadencehoraire] = useState('');
  const [nommachine, setNommachine] = useState('');
  const [machineId, setMachineId] = useState(null);
  const [totalplanifie, setTotalplanifie] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [objectivecf, setObjectivecf] = useState(null);
  const [objectivecsl, setObjectivecsl] = useState(null);
  const [selectedReference, setSelectedReference] = useState('');
  const [typedeprobleme, setTypeprobleme] = useState('');
  const [startTimeproduction, setStartTimeproduction] = useState('');
  const [endTimeproduction, setEndTimeproduction] = useState('');
  const [startTimecf, setStartTimecf] = useState('');
  const [endTimecf, setEndTimecf] = useState('');
  const [startTimecsl, setStartTimecsl] = useState('');
  const [endTimecsl, setEndTimecsl] = useState('');
  const[currentstep, setCurrentstep]= useState(0);
  const [durationproduction, setDurationproduction] = useState('');
  const [durationcf, setDurationcf] = useState('');
  const [durationcsl, setDurationcsl] = useState('');
  const [plannifications,setPlannifications]= useState([]);
  const [declarationdefaut,setDecalarationdefaut] = useState(null);
  const [declarationdefautcf,setDecalarationdefautcf] = useState(null);
  const [declarationdefautcsl,setDecalarationdefautcsl] = useState(null);
  const [objectiveProduction, setObjectiveProduction] = useState(null);
  const [objectiveCF, setObjectiveCF] = useState(null);
  const [objectiveCSL, setObjectiveCSL] = useState(null);
  const [Nombreopearateurproduction, setNombreoperateurproduction] = useState(null);
  const [Nombreopearateurcf, setNombreoperateurcf] = useState(null);
  const [Nombreopearateurcsl, setNombreoperateurcsl] = useState(null);
  const [defautinspection, setDefautinspection] = useState([]);
  const [defautproduction, setDefautproduction] = useState([]);
  const [defauts, setDefauts] = useState([{ totaldefautproduction: '', typedefautproduction: [] }]);
  const [defautscf, setDefautscf] = useState([{ totaldefautcf: '', typedefautcf: [] }]);
  const [defautscsl, setDefautscsl] = useState([{ totaldefautcsl: '', typedefautcsl: [] }]);
  const [totaldefautproduction, setTotalDefautproduction] = useState("");
  const [typedefautproduction, setTypeDefautproduction] = useState("");
  const [totaldefautcf, setTotalDefautcf] = useState("");
  const [typedefautcf, setTypeDefautcf] = useState("");
  const [totaldefautcsl ,setTotalDefautcsl] = useState("");
  const [typedefautcsl, setTypeDefautcsl] = useState("");
   const [isOpen, setIsOpen] = useState(false);


  const navigate = useNavigate();




  const fetchProbleme = async () => {
    try {
      const response = await axios.get('https://grinding-backend.azurewebsites.net/ajouter/getproblemes', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProblemes(response.data.operateurs);
      console.log("problemes", response.data.operateurs);
     
    } catch (error) {
      console.error('Error fetching machines:', error);
    }
  };

    const fetchProblemepostecontrole = async () => {
    try {
      const response = await axios.get('https://grinding-backend.azurewebsites.net/ajouter/getproblemespostedecontrole', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProblemespostecontrole(response.data.operateurs);
      console.log("problemes", response.data.operateurs);
     
    } catch (error) {
      console.error('Error fetching machines:', error);
    }
  };

  const fetchdefautproduction = async () => {
    try {
      const response = await axios.get('https://grinding-backend.azurewebsites.net/ajouter/getdefauts', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setDefautproduction(response.data.operateurs);
      console.log("problemes", response.data.operateurs);
     
    } catch (error) {
      console.error('Error fetching machines:', error);
    }
  };


  const fetchinspectiondefaut = async () => {
    try {
      const response = await axios.get('https://grinding-backend.azurewebsites.net/ajouter/getdefautsinspection', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log("inspection", response.data);
      setDefautinspection(response.data.operateurs);
     
    } catch (error) {
      console.error('Error fetching machines:', error);
    }
  };
  // Function to determine current shift
  const getCurrentShift = () => {
    const currentHour = new Date().getHours();
    const shift1Start = 6;
    const shift1End = 16; // 4 PM
    return currentHour >= shift1Start && currentHour < shift1End ? 'shift1' : 'shift2';
  };

  // Fetch machines and outils on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const machinereponse = await axios.get('https://grinding-backend.azurewebsites.net/ajouter/machines');
     
        setMachines(machinereponse.data);
 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    fetchProbleme();
    fetchProblemepostecontrole();
    fetchinspectiondefaut();
    fetchdefautproduction();
    // Automatically set the default date to today's date
    const today = new Date().toISOString().split('T')[0]; // Formats date as YYYY-MM-DD
    setDate(today);
    // Automatically update the shift based on the current time
    const updateShift = () => {
      setShift(getCurrentShift());
    };
    updateShift();
    const interval = setInterval(updateShift, 60000); // Update every minute

    return () => clearInterval(interval); // Cleanup interval
  }, []);

  useEffect(() => {
    const fetchPlannifications = async () => {
      try {
        const response = await axios.get("https://grinding-backend.azurewebsites.net/ajouter/plannifications", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("Plannifications fetched successfully:", response.data);
        setPlannifications(response.data);
      } catch (error) {
        console.error("Internal error while fetching plannifications:", error);
      }
    };

    fetchPlannifications();
  }, []);

 
  
  
  const calculateDuration = (start, end) => {
    if (start && end) {
      const startDate = new Date(`1970-01-01T${start}:00`);
      const endDate = new Date(`1970-01-01T${end}:00`);
      const diffInMs = endDate - startDate;
      const diffInMinutes = diffInMs / 1000 / 60;
      return diffInMinutes > 0 ? `${diffInMinutes} minutes` : 'Invalid interval';
    }
    return '';
  };

  useEffect(() => {
    setDurationproduction(calculateDuration(startTimeproduction, endTimeproduction));
  }, [startTimeproduction, endTimeproduction]);


  // Handle machine selection
  const handleMachineSelect = async (machine) => {
    setSelectedMachine(machine);
    setCurrentstep(1);
    setMachineId(machine.id);
    setNommachine(machine.nom);
    try {
      const response = await axios.get(`https://grinding-backend.azurewebsites.net/ajouter/plannification/${machine.id}`);
      const fetchedtobjectivecf= response.data.objectivecf;
      const fetchedobjectivecsl= response.data.objectivecsl;

      setObjectivecf(fetchedtobjectivecf);
      setObjectivecsl(fetchedobjectivecsl);

    } catch(error){
      console.error("plannification not found")
    }
  
    setIsModalVisible(true);
    setRefprod(machine.referenceproduit);
  };
  
  const handleAddField = () => {
    setDefauts([
      ...defauts,
      { totaldefautproduction: '', typedefautproduction: [] }, // Add new field set
    ]);
  };
  const handleAddFieldcf = () => {
    setDefautscf([
      ...defautscf,
      { totaldefautcf: '', typedefautcf: [] }, // Add new field set
    ]);
  };
  const handleAddFieldcsl = () => {
    setDefautscsl([
      ...defautscsl,
      { totaldefautcsl: '', typedefautcsl: [] }, // Add new field set
    ]);
  };

  const handleFieldChange = (index, value, fieldName) => {
    const newDefauts = [...defauts];
    newDefauts[index][fieldName] = value;
    setDefauts(newDefauts);
  };
  const handleFieldChangecf = (index, value, fieldName) => {
    const newDefauts = [...defautscf];
    newDefauts[index][fieldName] = value;
    setDefauts(newDefauts);
  };
  const handleFieldChangecsl = (index, value, fieldName) => {
    const newDefauts = [...defautscsl];
    newDefauts[index][fieldName] = value;
    setDefauts(newDefauts);
  };
  // Handle form submission
  const handleSubmitproduction = async () => {
    try {
      const token = localStorage.getItem('token');
  
      // Ensure all numeric fields have a valid value (default to 0 if empty)
      const productionData = {
        referenceproduit: refprod,
        date: date,
        shift: shift,
        phase: 'Production',
        totalplanifie: objectiveProduction.join(','),
        typedefautproduction: Array.isArray(typedefautproduction) ? typedefautproduction.join(',') : [],
        totaldefautproduction: Array.isArray(totaldefautproduction) ? totaldefautproduction.join(',') : [],
        typedeproblemeproduction: typeproblemeproduction.join(','),
        commentaires: commentaires,
        totalrealise: totalproduit || 0,
        machine_id: machineId,
        dureedeproblemeproduction: durationproduction,
        nombreoperateur: Nombreopearateurproduction,
      };
  
      await axios.post("https://grinding-backend.azurewebsites.net/ajouter/prod", productionData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      setCurrentstep(2);
    } catch (error) {
      console.error('Error adding production:', error);
      message.error('Failed to add production.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitcf = async () => {
    try {
      const token = localStorage.getItem('token');
  
      // Ensure all numeric fields have a valid value (default to 0 if empty)
      const productionData = {
        referenceproduit: refprod,
        date: date,
        shift: shift,
        phase: 'cf',
        totalplanifie: objectiveCF.join(','),
        typedefautcf: Array.isArray(typedefautcf) ? typedefautcf.join(',') : [],
        totaldefautcf: Array.isArray(totaldefautcf) ? totaldefautcf.join(',') : [],
        typedeproblemecf: typeproblemecf,
        totalrealise: totalproduit || 0,
        machine_id: machineId,
        dureedeproblemecf: durationcf,
        nombreoperateur: Nombreopearateurcf,
      };
  
      await axios.post("https://grinding-backend.azurewebsites.net/ajouter/prod", productionData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      setCurrentstep(3);
    } catch (error) {
      console.error('Error adding production:', error);
      message.error('Failed to add production.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitcflose = async () => {
    try {
      const token = localStorage.getItem('token');
  
      // Ensure all numeric fields have a valid value (default to 0 if empty)
      const productionData = {
        referenceproduit: refprod,
        date: date,
        shift: shift,
        phase: 'cf',
        totalplanifie: objectiveCF.join(','),
        typedefautcf: Array.isArray(typedefautcf) ? typedefautcf.join(',') : [],
        totaldefautcf: Array.isArray(totaldefautcf) ? totaldefautcf.join(',') : [],
        typedeproblemecf: typeproblemecf,
        totalrealise: totalproduit || 0,
        machine_id: machineId,
        dureedeproblemecf: durationcf,
      };
  
      await axios.post("https://grinding-backend.azurewebsites.net/ajouter/prod", productionData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
     setIsModalVisible(false);
     message.success('Production has been added succefully ');
    } catch (error) {
      console.error('Error adding production:', error);
      message.error('Failed to add production.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitcsl = async () => {
    try {
      const token = localStorage.getItem('token');
  
      // Ensure all numeric fields have a valid value (default to 0 if empty)
      const productionData = {
        referenceproduit: refprod,
        date: date,
        shift: shift,
        phase: 'csl',
        totalplanifie: objectiveCSL.join(','),
        typedefautcsl: Array.isArray(typedefautcsl) ? typedefautcsl.join(',') : [],
        totaldefautcsl: Array.isArray(totaldefautcsl) ? totaldefautcsl.join(',') : [],
        typedeproblemecsl: typeproblemecsl.join(','),
        totalrealise: totalproduit || 0,
        machine_id: machineId,
        dureedeproblemecsl: durationcsl,
        nombreoperateur: Nombreopearateurcsl,
      };
  
      await axios.post("https://grinding-backend.azurewebsites.net/ajouter/prod", productionData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      message.success('Production added successfully!');
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error adding production:', error);
      message.error('Failed to add production.');
    } finally {
      setLoading(false);
    }
  };

 
  const fetchPlannificationByPhase = async (phase, shift, startDate, endDate, id_machine, referenceproduit) => {
    console.log("Request Params:", { phase, shift, startDate, endDate, id_machine, referenceproduit });
  
    try {
      const response = await axios.get("https://grinding-backend.azurewebsites.net/ajouter/plannificationss", {
        params: { phase, shift, startDate, endDate, id_machine, referenceproduit },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Response Data:", response.data);
  
      // Extract totalplanifie values
      if (response.data && Array.isArray(response.data)) {
        return response.data.map(record => record.totalplanifie);
      }
      return null;
    } catch (error) {
      console.error(`Error fetching plannification for phase ${phase}:`, error);
      return null;
    }
  };

  
  const fetchPlannificationBynombreoperateur = async (phase, shift, startDate, endDate, id_machine, referenceproduit) => {
    console.log("Request Params:", { phase, shift, startDate, endDate, id_machine, referenceproduit });
  
    try {
      const response = await axios.get("https://grinding-backend.azurewebsites.net/ajouter/plannificationss", {
        params: { phase, shift, startDate, endDate, id_machine, referenceproduit },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Response Data:", response.data);
  
      // Extract totalplanifie values
      if (response.data && Array.isArray(response.data)) {
        return response.data.map(record => record.nombreoperateurprod);
      }
      return null;
    } catch (error) {
      console.error(`Error fetching plannification for phase ${phase}:`, error);
      return null;
    }
  };
  
  
  const getStartAndEndDate = () => {
    const today = new Date();
    
    // Get the first day of the current month (start date)
    const startDate = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
  
    // Get the last day of the current month (end date)
    const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];
  
    return { startDate, endDate };
  };
  
  const fetchObjectives = async () => {
    // Get dynamic start and end dates
    const { startDate, endDate } = getStartAndEndDate();
  
    const referenceproduit = selectedMachine.referenceproduit; // Provide the referenceproduit
  
    try {
      const [productionObjective, cfObjective, cslObjective, Nombreopearateurproduction, Nombreopearateurcf, Nombreopearateurcsl] = await Promise.all([
        fetchPlannificationByPhase("chargement", shift, startDate, endDate, selectedMachine.id, referenceproduit),
        fetchPlannificationByPhase("cf", shift, startDate, endDate, selectedMachine.id, referenceproduit),
        fetchPlannificationByPhase("csl", shift, startDate, endDate, selectedMachine.id, referenceproduit),
        fetchPlannificationBynombreoperateur("chargement", shift, startDate, endDate, selectedMachine.id, referenceproduit),
        fetchPlannificationBynombreoperateur("cf", shift, startDate, endDate, selectedMachine.id, referenceproduit),
        fetchPlannificationBynombreoperateur("csl", shift, startDate, endDate, selectedMachine.id, referenceproduit),
      ]);
  
      setObjectiveProduction(productionObjective);
      setObjectiveCF(cfObjective);
      setObjectiveCSL(cslObjective);
 
  
      console.log("Production Objective:", productionObjective);
      console.log("CF Objective:", cfObjective);
      console.log("CSL Objective:", cslObjective);
    } catch (error) {
      console.error("Error fetching objectives:", error);
    }
  };
  
  
  
  
  useEffect(() => {
    if (selectedMachine && selectedMachine.id) {
      fetchObjectives();
      fetchPlannificationBynombreoperateur();
    }
  }, [selectedMachine]);
  
const handleLogout = () => {
    navigate('/login');
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
    <div className="body_container">
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
       <img 
  style={{ width: '150px', height: '40px' }} 
  src="/images/machines/logo-avocarbon.png" 
  alt="Logo" 
     />


        <div
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: 'flex',
            flexDirection: 'column',    
            cursor: 'pointer',
            padding: '10px',
          }}
        >
          <div
            style={{
              width: '30px',
              height: '5px',
              backgroundColor: '#fff',
              margin: '5px 0',
              transition: '0.3s',
              transform: isOpen
                ? 'rotate(45deg) translate(5px, 5px)'
                : 'none',
            }}
          ></div>
          <div
            style={{
              width: '30px',
              height: '4px',
              backgroundColor: '#fff',
              margin: '5px 0',
              opacity: isOpen ? 0 : 1,
              transition: '0.3s',
            }}
          ></div>
          <div
            style={{
              width: '30px',
              height: '4px',
              backgroundColor: '#fff',
              margin: '5px 0',
              transition: '0.3s',
              transform: isOpen
                ? 'rotate(-45deg) translate(5px, -5px)'
                : 'none',
            }}
          ></div>
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
  <h1 style={{ 
  color: 'white', 
  fontSize: '30px', 
  fontWeight: 'bold', 
  borderBottom: '3px solid #87CEEB', 
  marginBottom: "25px", 

}}>
  Sidebar
</h1>


          <ul style={{ listStyle: 'none', padding: 0 }}>
          {role === 'ADMIN' && (
              <li style={{ padding: '10px 0' }}>
                <a href="/form" style={linkStyle}>
               Dashboard
                </a>
              </li>
            )}
            {(role === 'ADMIN' || role === 'REGLEUR') && (
              <li style={{ padding: '10px 0' }}>
                <a href="/form" style={linkStyle}>
                  Ajouter Production
                </a>
              </li>
            )}
            {role === 'ADMIN' && (
              <>
                <li style={{ padding: '10px 0' }}>
                  <a href="/calendar" style={linkStyle}>
                    Plannification
                  </a>
                </li>
                <li style={{ padding: '10px 0' }}>
                  <a href="/history" style={linkStyle}>
                    Historique
                  </a>
                </li>
                <li style={{ padding: '10px 0' }}>
                  <a href="/ajouternouvellemachine" style={linkStyle}>
                    Ajouter une machine
                  </a>
                </li>
                <li style={{ padding: '10px 0' }}>
                  <a href="/listregleur" style={linkStyle}>
                    List des régleurs
                  </a>
                </li>
                <li style={{ padding: '10px 0' }}>
                  <a href="/detailoutil" style={linkStyle}>
                    List des outils
                  </a>
                </li>
                <li style={{ padding: '10px 0' }}>
                  <a href="/listoperateur" style={linkStyle}>
                    List des Opérateurs
                  </a>
                </li>
                <li style={{ padding: '10px 0' }}>
                  <a href="/ajouterdefaut" style={linkStyle}>
                    List des défauts
                  </a>
                </li>
                <li style={{ padding: '10px 0' }}>
                  <a href="/details" style={linkStyle}>
                    Détails des machines
                  </a>
                </li>
              </>
            )}
            {(role === 'ADMIN' || role === 'REGLEUR') && (
              <li style={{ padding: '10px 0' }}>
                <a href="/changementmeules" style={linkStyle}>
                  Changement  meules
                </a>
              </li>
            )}
              {(role === 'ADMIN' || role === 'REGLEUR') && (
              <li style={{ padding: '10px 0' }}>
                <a href="/updatereference" style={linkStyle}>
                  Changement  réferences
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="machine-form-container">
        <h2>Ajouter Production</h2>

        <div className="machine-buttons">
          
          {machines.map((machine) => (
            <button
              key={machine.id}
              className="machine-button"
              onClick={() => handleMachineSelect(machine)}
            >
             Machine:  {machine.nom} <br/>
             Réference: {machine.referenceproduit}
            </button>
          ))}
        </div>

        {/* Modal for submitting phase and outil */}
        <Modal
          title={`Machine: ${selectedMachine?.nom}`}
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={[null ]}
          width={500}
        >

<AnimatePresence mode="wait">
<motion.div
  key="step1"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.5 }}
>
  {currentstep === 1 && (
    <>
      <h2>Current shift: {shift}</h2>


      {selectedMachine && (
        <div key={selectedMachine.id}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <label style={{ fontWeight: 'bold' }}>Cadence horaire:</label>
            <span>{selectedMachine.cadence_horaire}</span>
          </div>
        </div>
      )}

     <div className="references-dropdown">
        <label>Référence</label>
        <Input
          value={refprod} // Shows selected reference
          readOnly
          style={{ width: "100%", backgroundColor: "#f5f5f5", cursor: "not-allowed" }}
        />
      </div>

  {/* Display Objective Production */}
  <div style={{marginBottom:'80px'}}>
  <div className="input-field">
          <label>Déclaration du quantité produite machine</label>
          <Checkbox.Group
            style={{ width: '100%' }}
            value={phase}
            onChange={(value) => setPhase(value.length ? [value[0]] : [])}
          >
            <Checkbox value="Production"></Checkbox>
          </Checkbox.Group>
        </div>
      {phase.includes("Production") && (
    <div >
    <div style={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <label style={{ fontWeight: 'bold' }}>Total produit</label>
      <Input
        type="text"
        value={totalproduit}
        onChange={(e) => setTotalproduit(e.target.value)}
      />
    </div>
     <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <label style={{ fontWeight: 'bold' }}>Nombre Operateur</label>
      <Input value={Nombreopearateurproduction} onChange={(e)=>setNombreoperateurproduction(e.target.value)}></Input>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <label style={{ fontWeight: 'bold' }}>Objective Production:</label>
      <span>{objectiveProduction !== null ? objectiveProduction : 'No data for today'}</span>
    </div>
  </div>
  {parseInt(totalproduit) < parseInt(objectiveProduction) && (
  <div>
    <div className="input-field">
      <label>Type de probléme</label>
      <Select
        mode="multiple"
        value={typeproblemeproduction}
        onChange={(value) => setTypeproblemeproduction(value)}
        placeholder="Select Type de probléme"
        style={{ width: "100%" }}
      >
        {problemes.map((problemeObj) => (
          <Option
            key={problemeObj.id}
            value={`${problemeObj.id}-${problemeObj.probleme}`}
          >
            {problemeObj.probleme}
          </Option>
        ))}
      </Select>
    </div>

    {typeproblemeproduction.length > 0 && (
      <div className="form-row">
        <div className="input-field">
          <label htmlFor="start-time">Start Time:</label>
          <Input
            id="start-time"
            type="time"
            value={startTimeproduction}
            onChange={(e) => setStartTimeproduction(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="end-time">End Time:</label>
          <Input
            id="end-time"
            type="time"
            value={endTimeproduction}
            onChange={(e) => setEndTimeproduction(e.target.value)}
          />
        </div>
        {durationproduction && (
          <p style={{ marginTop: "10px" }}>
            Durée: <strong>{durationproduction}</strong>
          </p>
        )}
      </div>
    )}

    <div className="input-field">
      <label>
        Commentaires (
        {parseInt(totalproduit) < parseInt(objectiveProduction)
          ? "Total produit < Objective"
          : ""}
        )
      </label>
      <Input.TextArea
        value={commentaires}
        onChange={(e) => setCommentaires(e.target.value)}
      />
    </div>
  </div>
)}
</div>
    )}
   </div>

  <div>
  <Checkbox style={{fontWeight:'bold'}} value={declarationdefaut} onChange={setDecalarationdefaut}>Déclaration des defauts Production</Checkbox>
  {declarationdefaut && (
  <div
    className="typedefaut-production"
    style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
  >
    {defauts.map((defaut, index) => (
      <div
        key={index}
        className="typedefaut-production"
        style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}
      >
        {/* Type defaut production */}
        <div className="input-field" style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Type defaut production
          </label>
          <Select
            mode="multiple"
            value={defaut.typedefautcf}
            onChange={(value) => handleFieldChange(index, value, 'typedefautproduction')}
            style={{ width: '100%' }}
            placeholder="Select type defaut de production"
          >
            {Array.isArray(defautproduction) &&
              defautproduction.map((defautItem) => (
                <Option key={defautItem.id} value={defautItem.id}>
                  {defautItem.defaut}
                </Option>
              ))}
          </Select>
        </div>

        {/* Total defaut production */}
        <div className="input-field" style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Total defaut production
          </label>
          <Input
            type="number"
            value={defaut.totaldefautcf}
            onChange={(e) => handleFieldChange(index, e.target.value, 'totaldefautproduction')}
            style={{ width: '100%' }}
          />
        </div>
      </div>
    ))}

    <button
      onClick={handleAddField}
      style={{
        padding: '10px 20px',
        backgroundColor: '#2196F3',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
     Ajouter des défauts
    </button>
  </div>
)}
  </div>
  <div className="button-step1">
  <div className="button-step1">
  <div className="button-step1">
  <button
    style={{ marginTop: "40px" }}
    className="custom-button"
    onClick={() => handleSubmitproduction()}
    disabled={
       !defauts.length || // Defauts must exist
        defauts.some(defaut => 
          !defaut.typedefautproduction.length || // Must select at least 2 types (typedefautproduction)
          !defaut.totaldefautproduction.trim() // Must enter total defects (totaldefautproduction)
        )
    }
  >
    Next
  </button>
</div>


</div>


</div>
    </>
  )}
</motion.div> 

<div className="form-container">        
<motion.div
  key="step2"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.5 }}>
{ currentstep === 2 && (
  <div>
  <div>
  <div className="input-field">
   <label>Déclaration du quantité produit CF</label>
     <Checkbox.Group
      style={{ width: '100%' }}
      value={phase}
      onChange={(value) => setPhase(value.length ? [value[0]] : [])}
    >
      <Checkbox value="cf"></Checkbox>
    </Checkbox.Group>
 </div>

{phase.includes("cf") &&  (
<div>
<div  style={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>
    <div  style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
    <label style={{ fontWeight: "bold" }}>Total produit CF</label>
    <Input type="text" value={totalproduitcf} onChange={(e) => setTotalproduitcf(e.target.value)} />
    </div>
   <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <label style={{ fontWeight: 'bold' }}>Nombre Operateur</label>
      <Input value={Nombreopearateurcf} onChange={(e)=>setNombreoperateurcf(e.target.value)}></Input>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
    <label style={{ fontWeight: "bold", marginRight: "10px" }}>Objective CF:</label>
        <span>{objectiveCF !== null ? objectiveCF : "No data for today"}</span>
    </div>
  </div>

  {parseInt(totalproduitcf) < parseInt(objectiveCF) && (
  <div>
    <div className="input-field">
      <label>Type de probléme</label>
      <Select
        mode="multiple"
        value={typeproblemecf}
        onChange={(value) => setTypeproblemecf(value)}
        placeholder="Select Type de probléme"
        style={{ width: "100%" }}
      >
        {problemespostecontrole.map((problemeObj) => (
          <Option
            key={problemeObj.id}
            value={`${problemeObj.id}-${problemeObj.problemecontrole}`}
          >
            {problemeObj.problemecontrole}
          </Option>
        ))}
      </Select>
    </div>

    {typeproblemecf.length > 0 && (
      <div className="form-row">
        <div className="input-field">
          <label htmlFor="start-time">Start Time:</label>
          <Input
            id="start-time"
            type="time"
            value={startTimecf}
            onChange={(e) => setStartTimecf(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="end-time">End Time:</label>
          <Input
            id="end-time"
            type="time"
            value={endTimecf}
            onChange={(e) => setEndTimecf(e.target.value)}
          />
        </div>
        {durationcf && (
          <p style={{ marginTop: "10px" }}>
            Durée: <strong>{durationcf}</strong>
          </p>
        )}
      </div>
    )}

    <div className="input-field">
      <label>
        Commentaires (
        {parseInt(totalproduitcf) < parseInt(objectiveCF)
          ? "Total produit CF< Objective"
          : ""}
        )
      </label>
      <Input.TextArea
        value={commentairescf}
        onChange={(e) => setCommentaires(e.target.value)}
      />
    </div>
  </div>
)}

</div>
)}
  </div>

 <div>
 <Checkbox style={{fontWeight:'bold', marginBottom:'30px'}} value={declarationdefautcf} onChange={setDecalarationdefautcf}>Déclaration des defauts CF</Checkbox>

 {declarationdefautcf && (
  <div
    className="typedefaut-production"
    style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
  >
    {defautscf.map((defaut, index) => (
      <div
        key={index}
        className="typedefaut-production"
        style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}
      >
        {/* Type defaut production */}
        <div className="input-field" style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Type defaut CF
          </label>
          <Select
              mode="multiple"
              value={defaut.typedefautcf}
              onChange={(value) => handleFieldChangecf(index, value, 'typedefautcf')}
              style={{ width: '100%' }}
              placeholder="Select type defaut de production"
            >
              {Array.isArray(defautinspection) &&
                defautinspection.map((probleme) => (
                  <Option key={probleme.id} value={probleme.id}>
                    {probleme.inspectiondefaut}  {/* Display the problemecontrole text */}
                  </Option>
                ))}
            </Select>
        </div>

        {/* Total defaut production */}
        <div className="input-field" style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Total defaut CF
          </label>
          <Input
            type="number"
            value={defaut.totaldefautcf}
            onChange={(e) => handleFieldChangecf(index, e.target.value, 'totaldefautcf')}
            style={{ width: '100%' }}
          />
        </div>
      </div>
    ))}

    {/* Add More button */}
    <button
      onClick={handleAddFieldcf}
      style={{
        padding: '10px 20px',
        backgroundColor: '#2196F3',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        marginBottom: '20px',
        cursor: 'pointer',
      }}
    >
     Ajouter des défauts
    </button>
  </div>
)}
 </div>

    
  

 <div className="button-step1">
  <button 
    className="custom-button" 
    onClick={() => handleSubmitcf()} 
    disabled={
       defautscf.some(defaut => 
          !defaut.typedefautcf.length || // Must select at least one typedefautcf
          !defaut.totaldefautcf.trim() // Must enter totaldefautcf (not just whitespace)
        )
    }
  >
    Next To CSL
  </button>

  <button 
    className="custom-button" 
    onClick={() => handleSubmitcflose()} 
    disabled={
       defautscf.some(defaut => 
          !defaut.typedefautcf.length || // Must select at least one typedefautcf
          !defaut.totaldefautcf.trim() // Must enter totaldefautcf (not just whitespace)
        )
    }
  >
    Submit
  </button>
</div>

            
 </div>
)}

</motion.div>
  
<motion.div
  key="step3"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.5 }}>
{ currentstep === 3 && (
 <div>
<div>
<div className="input-field">
   <label>CSL</label>
     <Checkbox.Group
      style={{ width: '100%' }}
      value={phase}
      onChange={(value) => setPhase(value.length ? [value[0]] : [])}
    >
      <Checkbox value="csl"></Checkbox>
   
    </Checkbox.Group>
 </div>
   {phase.includes("csl") && (
   <div>
  <div style={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>
  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }} >
  <label style={{ fontWeight: "bold" }}>Total produit CSL</label>
   <Input type="text" value={totalproduitcsl} onChange={(e) => setTotalproduitcsl(e.target.value)} />
  </div>
  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <label style={{ fontWeight: 'bold' }}>Nombre Operateur:</label>
      <Input value={Nombreopearateurcsl} onChange={(e)=>setNombreoperateurcsl(e.target.value)}></Input>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
    <label style={{ fontWeight: "bold", marginRight: "10px" }}>Objective CSL:</label>
    <span>{objectiveCSL !== null ? objectiveCSL : "No data for today"}</span>
    </div>
  </div>
    </div>
  )}

{parseInt(totalproduitcsl) < parseInt(objectiveCSL) && (
  <div>
    <div className="input-field">
      <label>Type de probléme</label>
      <Select
        mode="multiple"
        value={typeproblemecsl}
        onChange={(value) => setTypeproblemecsl(value)}
        placeholder="Select Type de probléme"
        style={{ width: "100%" }}
      >
        {problemespostecontrole.map((problemeObj) => (
          <Option
            key={problemeObj.id}
            value={`${problemeObj.id}-${problemeObj.problemecontrole}`}
          >
            {problemeObj.problemecontrole}
          </Option>
        ))}
      </Select>
    </div>

    {typeproblemecsl.length > 0 && (
      <div className="form-row">
        <div className="input-field">
          <label htmlFor="start-time">Start Time:</label>
          <Input
            id="start-time"
            type="time"
            value={startTimecsl}
            onChange={(e) => setStartTimecsl(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="end-time">End Time:</label>
          <Input
            id="end-time"
            type="time"
            value={endTimecsl}
            onChange={(e) => setEndTimecsl(e.target.value)}
          />
        </div>
        {durationcsl && (
          <p style={{ marginTop: "10px" }}>
            Durée: <strong>{durationcsl}</strong>
          </p>
        )}
      </div>
    )}

    <div className="input-field">
      <label>
        Commentaires (
        {parseInt(totalproduitcsl) < parseInt(objectiveCSL)
          ? "Total produit CF< Objective"
          : ""}
        )
      </label>
      <Input.TextArea
        value={commentairescf}
        onChange={(e) => setCommentaires(e.target.value)}
      />
    </div>
  </div>
)}   
</div>
   

<div >
 <Checkbox style={{fontWeight:'bold', marginBottom:'30px'}} value={declarationdefautcsl} onChange={setDecalarationdefautcsl}>Déclaration des defauts CSL</Checkbox>

 {declarationdefautcsl && (
  <div
    className="typedefaut-production"
    style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
  >
    {defautscsl.map((defaut, index) => (
      <div
        key={index}  
        className="typedefaut-production"
        style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}
      >
        {/* Type defaut production */}
        <div className="input-field" style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Type defaut CSL
          </label>
          <Select
              mode="multiple"
              value={defaut.typedefautcsl}
              onChange={(value) => handleFieldChangecsl(index, value, 'typedefautcsl')}
              style={{ width: '100%' }}
              placeholder="Select type defaut csl"
            >
              {Array.isArray(defautinspection) &&
                defautinspection.map((probleme) => (
                  <Option key={probleme.id} value={probleme.id}>
                    {probleme.inspectiondefaut}  {/* Display the problemecontrole text */}
                  </Option>
                ))}
            </Select>
        </div>

        {/* Total defaut production */}
        <div className="input-field" style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Total defaut CSL
          </label>
          <Input
            type="number"
            value={defaut.totaldefautcsl}
            onChange={(e) => handleFieldChangecsl(index, e.target.value, 'totaldefautcsl')}
            style={{ width: '100%' }}
          />
        </div>
      </div>
    ))}

    {/* Add More button */}
    <button
      onClick={handleAddFieldcsl}
      style={{
        padding: '10px 20px',
        backgroundColor: '#2196F3',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        marginBottom: '20px',
        cursor: 'pointer',
      }}
    >
     Ajouter des défauts
    </button>
  </div>
)}
 </div>
  <div className="button-step1">
            <button className="custom-button" onClick={()=>handleSubmitcsl()} 
               disabled={
                      defautscsl.some(defaut => 
                      !defaut.typedefautcsl.length || // Must select at least 2 types (typedefautproduction)
                      !defaut.totaldefautcsl.trim() // Must enter total defects (totaldefautproduction)
                    )
              }>Submit</button>
          </div>
            
 </div>
)}

</motion.div>

 </div>
  </AnimatePresence>      
 </Modal>
  </div>
    </div>
  );
};

export default Form;
