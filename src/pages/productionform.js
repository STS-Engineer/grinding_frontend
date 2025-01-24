import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Input, Button, message, Select, Checkbox } from 'antd';
import './productionform.css';
import { useNavigate } from 'react-router-dom';
import{AnimatePresence, motion} from 'framer-motion';

const { Option } = Select;

const Form = () => {
  const [machines, setMachines] = useState([]);
  const [problemes, setProblemes] = useState([]);
  const [problemespostecontrole, setProblemespostecontrole] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [phase, setPhase] = useState('');
  const [phasecf, setPhasecf] = useState('');
  const [phasecsl, setPhasecsl] = useState('');
  const [outil, setOutil] = useState('');
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refprod, setRefprod] = useState('');
  const [shift, setShift] = useState('');
  const [typedefautproduction, setTypedefautproduction] = useState([]);
  const [totaldefautproduction, setTotaldefaut] = useState('');
  const [typeproblemeproduction, setTypeproblemeproduction] = useState([]);
  const [dateproblemeproduction, setDateproblemeproduction] = useState('');
  const [typedefautcf, setTypedefautcf] = useState('');
  const [totaldefautcf, setTotaldefautcf] = useState('');
  const [typeproblemecf, setTypeproblemecf] = useState([]);
  const [dateproblemecf, setDateproblemecf] = useState('');
  const [typedefautcsl, setTypedefautcsl] = useState([]);

  const [totaldefautcsl, setTotaldefautcsl] = useState('');
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
  const [defautinspection, setDefautinspection] = useState([]);
  const [defautproduction, setDefautproduction] = useState([]);
  const [defauts, setDefauts] = useState([{ totaldefautproduction: '', typedefautproduction: [] }]);
  const [defautscf, setDefautscf] = useState([{ totaldefautcf: '', typedefautcf: [] }]);
  const [defautscsl, setDefautscsl] = useState([{ totaldefautcsl: '', typedefautcsl: [] }]);


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
    const shift1End = 14; // 3 PM
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

// Map of machine IDs to corresponding references
  const machineReferences = {
    "MUD6": ["1026188", "1026540", "102629"],
    "NGG3": ["1026649"],
    "NGG4": ["1026577", "1026578 "],
    "NGG6": ["1026648"],
    "SSS 3227": ["1026617"],
    "MUD7": ["473801"],
    "MUD420": ["1026325"],
    "KOJ": ["1029647"],
    "MK100-3": ["1026620", "1026621"],
  };
  const defectOptions = {
    "Production": [
      "DefautreglageUsinagehauteur ",
      "DefautreglageUsinagelargeur",
      "DefautreglageChanfreinage",
      "DefautreglageRayonnage ",  
    ],
    "cf": [
      "DefautEpaisseur Max",
      "DefautEpaisseur min",
      "DefautLargeur",
      "DefautChanfrein",
      "DefautRayonnageSurfacefrottante",
      "DefautCassureAspect",
      "Defaut Blocage",
      "MesureSPC"
    ],
    "csl": [
      "DefautEpaisseur ",
      "DefautLargeur",
      "DefautChanfrein ",
      "DefautRayonnageSurface frottante",
      "DefautCassureAspect",

     
    ],
  };


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
        phase: phase,
        totalplanifie: objectiveProduction.join(','),
        typedefautproduction: typedefautproduction.join(','),
        totaldefautproduction: totaldefautproduction || 0,
        typedeproblemeproduction: typeproblemeproduction.join(','),
        commentaires: commentaires,
        totalrealise: totalproduit || 0,
        machine_id: machineId,
        dureedeproblemeproduction: durationproduction,
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
        phase: phase,
        totalplanifie: objectiveCF.join(','),
        typedefautcf: typedefautcf,
        totaldefautcf: totaldefautcf || 0,
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
  
      setCurrentstep(3);
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
        phase: phase,
        totalplanifie: objectiveCSL.join(','),
        typedefautcsl: typedefautcsl.join(','),
        totaldefautcsl: totaldefautcsl || 0,
        typedeproblemecsl: typeproblemecsl.join(','),
        totalrealise: totalproduit || 0,
        machine_id: machineId,
        dureedeproblemecsl: durationcsl,
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

 
  const fetchPlannificationByPhase = async (phase, shift, date_creation, id_machine) => {
    console.log("Request Params:", { phase, shift, date_creation, id_machine });
  
    try {
      const response = await axios.get("https://grinding-backend.azurewebsites.net/ajouter/plannificationss", {
        params: { phase, shift, date_creation, id_machine },
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
  
  const fetchObjectives = async () => {

   const currentDate = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD" format
    try {
      const [productionObjective, cfObjective, cslObjective] = await Promise.all([
        fetchPlannificationByPhase("chargement", shift, currentDate, selectedMachine.id),
        fetchPlannificationByPhase("cf", shift, currentDate, selectedMachine.id),
        fetchPlannificationByPhase("csl", shift, currentDate, selectedMachine.id),
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
    }
  }, [selectedMachine]);
  
  // Logout handler
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

      {selectedMachine && machineReferences[selectedMachine.nom] && (
        <div className="references-dropdown">
          <label>Ref: PN</label>
          <Select
            value={refprod}
            onChange={(value) => setRefprod(value)}
            style={{ width: '100%', marginBottom: '50px' }}
            placeholder="Select reference"
          >
            {Array.isArray(machineReferences[selectedMachine.nom]) &&
              machineReferences[selectedMachine.nom].map((reference, index) => (
                <Option key={index} value={reference}>
                  {reference}
                </Option>
              ))}
          </Select>
        </div>
      )}

          {/* Display Objective Production */}
       
  
  <div style={{marginBottom:'80px'}}>
  <div className="input-field">
          <label>Déclaration du quantité produit</label>
          <Checkbox.Group
            style={{ width: '100%' }}
            value={phase}
            onChange={(value) => setPhase(value[0])}
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
      !totalproduit || // Disable if totalproduit is empty
      (parseInt(totalproduit) < parseInt(objectiveProduction) &&
        (!typeproblemeproduction.length || // Must have at least one problem type selected
          !startTimeproduction || // Start time must be provided
          !endTimeproduction ||
          !defauts || // Defauts must be provided
          defauts.some(defaut => !defaut.typedefautproduction || !defaut.totaldefautproduction)
          )) // End time must be provided
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
      onChange={(value)=>setPhase(value[0])}
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
  <button className="custom-button" onClick={()=>handleSubmitcf()} 
        disabled={
          !totalproduitcf || // Disable if totalproduit is empty
          (parseInt(totalproduitcf) < parseInt(objectiveCF) &&
            (!typeproblemecf.length || // Must have at least one problem type selected
              !startTimecf || // Start time must be provided
              !defautscf ||
              defautscf.some(defaut => !defaut.typedefautcf || !defaut.totaldefautcf))) 
        }>Next </button>
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
      onChange={(value)=>setPhase(value[0])}
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
                !totalproduitcsl || // Disable if totalproduit is empty
                (parseInt(totalproduitcsl) < parseInt(objectiveCSL) &&
                  (!typeproblemecsl.length || // Must have at least one problem type selected
                    !startTimecsl || // Start time must be provided
                    !endTimecsl ||
                    !defautscsl ||
                    defautscsl.some(defaut => !defaut.typedefautcsl || !defaut.totaldefautcsl))) // End time must be provided
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
