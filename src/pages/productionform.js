import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Input, Button, message, Select, Checkbox } from 'antd';
import './productionform.css';
import { useNavigate } from 'react-router-dom';
import{AnimatePresence, motion} from 'framer-motion';

const { Option } = Select;

const Form = () => {
  const [machines, setMachines] = useState([]);
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
  const [typedefautproduction, setTypedefautproduction] = useState('');
  const [totaldefautproduction, setTotaldefaut] = useState('');
  const [typeproblemeproduction, setTypeproblemeproduction] = useState('');
  const [dateproblemeproduction, setDateproblemeproduction] = useState('');
  const [typedefautcf, setTypedefautcf] = useState('');
  const [totaldefautcf, setTotaldefautcf] = useState('');
  const [typeproblemecf, setTypeproblemecf] = useState('');
  const [dateproblemecf, setDateproblemecf] = useState('');
  const [typedefautcsl, setTypedefautcsl] = useState('');
  const [totaldefautcsl, setTotaldefautcsl] = useState('');
  const [typeproblemecsl, setTypeproblemecsl] = useState('');
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
  const navigate = useNavigate();

  // Function to determine current shift
  const getCurrentShift = () => {
    const currentHour = new Date().getHours();
    const shift1Start = 6;
    const shift1End = 14; // 3 PM
    return currentHour >= shift1Start && currentHour < shift1End ? 'Shift 1' : 'Shift 2';
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
    "CF": [
      "DefautEpaisseur Max",
      "DefautEpaisseur min",
      "DefautLargeur",
      "DefautChanfrein",
      "DefautRayonnageSurfacefrottante",
      "DefautCassureAspect",
      "Defaut Blocage",
      "MesureSPC"
    ],
    "CSL": [
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
      const fetchedtotalplanifie = response.data.totalplanifie;
      const fetchedtobjectivecf= response.data.objectivecf;
      const fetchedobjectivecsl= response.data.objectivecsl;
      setTotalplanifie(fetchedtotalplanifie);
      setObjectivecf(fetchedtobjectivecf);
      setObjectivecsl(fetchedobjectivecsl);

    } catch(error){
      console.error("plannification not found")
    }
  
    setIsModalVisible(true);
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
        typedefautproduction: typedefautproduction,
        totaldefautproduction: totaldefautproduction || 0,
        typedeproblemeproduction: typeproblemeproduction,
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
        typedefautcsl: typedefautcsl,
        totaldefautcsl: totaldefautcsl || 0,
        typedeproblemecsl: typeproblemecsl,
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



  

  // Logout handler
  const handleLogout = () => {
    navigate('/login');
  };


  return (
    <div className="body_container">
    <div className='navbar'>
        <ul className="navbar-links">
          <li><a href="/home">Acceuil</a></li>
          <li><a href="/plannification">Plannification de production</a></li>
          <li><a href="/form">Ajouter Production</a></li>
          <li><a href="/ajouteroutil">Ajouter un outil</a></li>
          <li><a href="/machineform">Ajouter un machine</a></li>
          <li><a href="/details">Détails des machines</a></li>
          <button className='logout-button' onClick={handleLogout}>logout</button>
        </ul>
      </div>

      <div className="machine-form-container">
        <h2>Select a Machine to Update</h2>

        <div className="machine-buttons">
          
          {machines.map((machine) => (
            <button
              key={machine.id}
              className="machine-button"
              onClick={() => handleMachineSelect(machine)}
            >
              {machine.nom}
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

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label style={{ fontWeight: 'bold' }}>Objective Production:</label>
        <span>{totalplanifie}</span>
      </div>

      {nommachine && (
        <div className="input-field">
          <label>Production</label>
          <Checkbox.Group
            style={{ width: '100%' }}
            value={phase}
            onChange={(value) => setPhase(value[0])}
          >
            <Checkbox value="Production">Production</Checkbox>
          </Checkbox.Group>
        </div>
      )}

      {phase.includes("Production") && (
        <div className="input-field">
          <label>Total produit</label>
          <Input
            type="text"
            value={totalproduit}
            onChange={(e) => setTotalproduit(e.target.value)}
          />
        </div>
      )}

      <div>
        <div className="form-row">
          <div className="input-field">
            <label>Type de probléme</label>
            <Select
              value={typeproblemeproduction}
              onChange={(value) => setTypeproblemeproduction(value)}
            >
              <Option value="">Select Type de probléme</Option>
              <Option value="Probléme Electrique">Probléme Electrique</Option>
              <Option value="Courtcircuit">Court circuit</Option>
            </Select>
          </div>
        </div>

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
            <p style={{ marginTop: '10px' }}>
              Durée: <strong>{durationproduction}</strong>
            </p>
          )}
        </div>

        <div className="input-field">
          <label>
            Commentaires (
            {parseInt(totalproduit) < parseInt(totalplanifie)
              ? 'Total produit < Objective'
              : ''}
            )
          </label>
          <Input.TextArea
            value={commentaires}
            onChange={(e) => setCommentaires(e.target.value)}
          />
        </div>
      </div>

      <div>
        <div
          className="typedefaut-production"
          style={{ display: 'flex', alignItems: 'center', gap: '20px' }}
        >
          {selectedMachine && defectOptions[phase] && (
            <div className="references-dropdown" style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>
                Type defaut production
              </label>
              <Select
                value={typedefautproduction}
                onChange={(value) => setTypedefautproduction(value)}
                style={{ width: '100%' }}
                placeholder="Select type defaut de production"
              >
                {Array.isArray(defectOptions[phase]) &&
                  defectOptions[phase].map((defaut, index) => (
                    <Option key={index} value={defaut}>
                      {defaut}
                    </Option>
                  ))}
              </Select>
            </div>
          )}

          {phase && (
            <div className="input-field" style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>
                Total defaut production
              </label>
              <Input
                type="number"
                value={totaldefautproduction}
                onChange={(e) => setTotaldefaut(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
          )}
        </div>
      </div>
      <div className="button-step1">
            <button className="custom-button" onClick={()=>handleSubmitproduction()}>Next</button>
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
    <div style={{ display: 'flex',  alignItems: 'center' }}>
    <label style={{ fontWeight: 'bold' }}>Objective CF:</label>
    <span>{objectivecf}</span>
  </div>
   
   <div className="input-field">
   <label>CF</label>
     <Checkbox.Group
      style={{ width: '100%' }}
      value={phase}
      onChange={(value)=>setPhase(value[0])}
    >
      <Checkbox value="CF"></Checkbox>
    </Checkbox.Group>
 </div>

{ phase.includes("CF") && (
                 <div className="input-field">
                 <label>Total produit CSL</label>
                 <Input type="text" value={totalproduitcsl} onChange={(e) => setTotalproduitcsl(e.target.value)} />
               </div>
          )

          }

<div>
 <div className='form-row'>
<div className='input-field'>
<label>Type de probléme</label>
<Select value={typeproblemecsl} onChange={(value)=>setTypeproblemecsl(value)}>
 <Option value=''>select Type de probléme</Option>
 <Option  value="problemmeelectrique">Probléme Electrique</Option>
 <Option value="courtcircuit">Court circuit</Option>
</Select>
</div >
</div>
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
            <p style={{ marginTop: '10px' }}>
              Durée: <strong>{durationcf}</strong>
            </p>
          )}
</div>
<div className="input-field" >
      <label>
        Commentaires  (
        {parseInt(totalproduitcsl) < parseInt(objectivecsl)
          ? 'Total produit  < Objective'
          : ''}
        )
      </label>
      <Input.TextArea
        value={commentairescsl}
        onChange={(e) => setCommentairecsl(e.target.value)}
      />
    </div>





  </div>
  <div className="button-step1">
            <button className="custom-button" onClick={()=>handleSubmitcf()}>Next </button>
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
    <div style={{ display: 'flex',  alignItems: 'center' }}>
    <label style={{ fontWeight: 'bold' }}>Objective CSL:</label>
    <span>{objectivecsl}</span>
  </div>
   
   <div className="input-field">
   <label>CSL</label>
     <Checkbox.Group
      style={{ width: '100%' }}
      value={phase}
      onChange={(value)=>setPhase(value[0])}
    >
      <Checkbox value="CSL"></Checkbox>
   
    </Checkbox.Group>
 </div>


  
{ phase.includes("CSL") && (
                 <div className="input-field">
                 <label>Total produit CSL</label>
                 <Input type="text" value={totalproduitcsl} onChange={(e) => setTotalproduitcsl(e.target.value)} />
               </div>
          )

          }

<div>
 <div className='form-row'>
<div className='input-field'>
<label>Type de probléme</label>
<Select value={typeproblemecsl} onChange={(value)=>setTypeproblemecsl(value)}>
 <Option value=''>select Type de probléme</Option>
 <Option  value="problemmeelectrique">Probléme Electrique</Option>
 <Option value="courtcircuit">Court circuit</Option>
</Select>
</div >
</div>
<div className='form-row'>
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
            <p style={{ marginTop: '10px' }}>
              Durée: <strong>{durationcsl}</strong>
            </p>
          )}
          </div>

<div className="input-field" >
      <label>
        Commentaires  (
        {parseInt(totalproduitcsl) < parseInt(objectivecsl)
          ? 'Total produit  < Objective'
          : ''}
        )
      </label>
      <Input.TextArea
        value={commentairescsl}
        onChange={(e) => setCommentairecsl(e.target.value)}
      />
    </div>


  </div>
  <div className="button-step1">
            <button className="custom-button" onClick={()=>handleSubmitcsl()}>Submit</button>
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
