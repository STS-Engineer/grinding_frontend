import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Input, Button, message, Select, Checkbox } from 'antd'; // Import Ant Design components
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Plannification.css'

const { Option } = Select;

const PlannificationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [machines, setMachines] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [outil, setOutil] = useState('');
  const [operateurs, setOperateurs] = useState([]);
  const [shift, setShift] = useState('');
  const [shift2, setShift2] = useState('');
  const [phasechargement, setPhasechargement] = useState('');
  const [operateurchargement, setOperateurchargement] = useState(null);
  const [phasereguleur, setPhasereguleur] = useState('');
  const [operateurreguleur, setOperateurreguleur] = useState(null);
  const [phasecsl, setPhasecsl] = useState('');
  const [operateur_csl, setOperateur_csl] = useState(null)
  const [phasecf, setPhasecf] = useState('');
  const [operateur_cf, setOperateur_cf] = useState(null);
  const [nombre_heure_shift1, setNombre_heure_shift1] = useState(8);
  const [nombre_heure_shift2, setNombre_heure_shift2] = useState(8);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [machineReferences, setMachineReferences] = useState({
    "MUD6": ["1026188", "1026540", "102629"],
    "NGG3": ["1026649"],
    "NGG4": ["1026577", "1026578"],
    "NGG6": ["1026648"],
    "SSS 3227": ["1026617"],
    "MUD7": ["473801"],
    "MUD 420": ["1026325"],
    "KOJ": ["1029647"],
    "MK100-3": ["1026620", "1026621"],
  });
  const [selectedReference, setSelectedReference] = useState('');
  const [totalproduction, setTotalproduction] = useState(0);
  const [totalcf, setTotalcf] = useState(0);
  const [totalcsl, setTotalcsl] = useState(0);
  const [totalproductionshift2, setTotalproductionshift2] = useState(0);
  const [totalcfshift2, setTotalcfshift2] = useState(0);
  const [totalcslshift2, setTotalcslshift2] = useState(0);
  const [phasechargementshif2, setPhasechargementshif2] = useState('');
  const [operateurchargementshift2, setOperateurchargementshift2] = useState('');
  const [phasereguleurshif2, setPhasereguleurshif2] = useState('');
  const [operateur_reguleurshif2, setOperateur_reguleurshif2] = useState(null);
  const [phasecslshift2, setPhasecslshift2] = useState('');
  const [operateurcslshift2, setOperateurcslshift2] = useState(null);
  const [phasecfshift2, setPhasecfshift2] = useState('');
  const [operateurcfshift2, setOperateurcfshift2] = useState(null);


 
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const machinereponse = await axios.get("http://localhost:4000/ajouter/machines");
        setMachines(machinereponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchoperateur = async()=>{
      try {
        const response = await axios.get("http://localhost:4000/ajouter/getoperateurs");
        setOperateurs(response.data.operateurs);
        console.log(response.data);

      } catch (error){
        console.error("Error fetching data:", error);

      }
    }
    fetchData();
    fetchoperateur();

    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, []);
  useEffect(() => {
    if (selectedMachine) {
      // Calculate total based on selected shifts
      let totalproduction = 0;
      let totalcf = 0;
      let totalcsl = 0;
      let totalproductionshift2 = 0;
      let totalcfshift2 = 0;
      let totalcslshift2 = 0;
       if (shift.includes("shift1")   ){
        totalproduction = selectedMachine.cadence_horaire * nombre_heure_shift1;
       }
       if (shift.includes("shift1") ){
        totalcf = selectedMachine.cadence_horaire_cf * nombre_heure_shift1;
       }
       if (shift.includes("shift1")){
        totalcsl = selectedMachine.cadence_horaire_csl * nombre_heure_shift1;
       }
       if (nombre_heure_shift2 > 0   ){
        totalproductionshift2 = selectedMachine.cadence_horaire * nombre_heure_shift2;
       }
       if (nombre_heure_shift2 > 0){
        totalcfshift2 = selectedMachine.cadence_horaire_cf * nombre_heure_shift2;
       }
       if (nombre_heure_shift2 > 0){
        totalcslshift2 = selectedMachine.cadence_horaire_csl * nombre_heure_shift2;
       }
      
       setTotalproduction(totalproduction);
       setTotalcf(totalcf);
       setTotalcsl(totalcsl);
       setTotalproductionshift2(totalproductionshift2);
       setTotalcfshift2(totalcfshift2);
       setTotalcslshift2(totalcslshift2);
    }
  }, [selectedMachine, shift, nombre_heure_shift1, nombre_heure_shift2]);
  

  const navigate = useNavigate();

  
   // Get the names of non-selected operators
   const getNotSelectedOperators = (selectedId, selectedIds) => {
    return operateurs
      .filter(op => !selectedIds.includes(op.id)) // Exclude all selected operators
      .map(op => `${op.nom} ${op.prenom}`)
      .join(', ');
  };
  
  // Keep track of all selected operator IDs across all phases
  const allSelectedOperators = [
    operateurchargement,
    operateurreguleur,
    operateur_csl,
    operateur_cf,
    operateurchargementshift2,
    operateur_reguleurshif2,
    operateurcfshift2,
    operateurcslshift2
  ].filter(id => id !== null); // Remove null values
  
  // Then, pass this list of selected operators when rendering the "not selected" list
  
  
  const handleMachineSelect = (machine) => {
    setSelectedMachine(machine);
    setPhasechargement('');
    setOutil(machine.outil_id);
    setIsModalVisible(true);
    setCurrentStep(1);
  };

  const handleback = ()=>{
    try{ 
      setCurrentStep(1);

    } catch(error){
      
    }
  }

  const handleSubmit = async () => {
 

    setLoading(true);

    try {
      await axios.put(`http://localhost:4000/ajouter/machine/${selectedMachine.id}/outil`, 
        {
          phasechargement: phasechargement,
          phase: phasechargement,
          phasereguleur: phasereguleur,
          operateur_reguleur: operateurreguleur,
          phasecsl: phasecsl,
          outil_id: outil,
          phase: phasechargement,
          operateur_csl: operateur_csl,
          phasecf: phasecf,
          operateur_cf: operateur_cf,
          operateur_chargement: operateurchargement,
          totalplanifie: totalproduction,
          nombre_heure_shift1: nombre_heure_shift1,
          nombre_heure_shift2: nombre_heure_shift2,
          shift: shift,
          phasechargementshif2: phasechargementshif2,
          phasereguleurshif2: phasereguleurshif2,
          phasecslshift2: phasecslshift2,
          operateurcslshift2: operateurcslshift2,
          phasecfshift2: phasecfshift2,
          operateurcfshift2: operateurcfshift2,
         
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          }
        });

      message.success('Machine updated successfully!');
      setIsModalVisible(false);
    } catch (error) {
      message.error('Failed to update machine.');
    } finally {
      setLoading(false);
    }
  };

  const handlePlannification = async () => {
    setLoading(true);
  
    try {
      const plannificationData = {
        phasechargement: phasechargement,
        id_machine: selectedMachine.id, // Using the state for selected machine ID
        id_operateur: operateurs.id,
        phasereguleur:phasereguleur,
        operateur_reguleur: operateurreguleur,
        phasecsl:phasecsl,
        operateur_csl: operateur_csl,
        phasecf:phasecf,
        operateur_cf:operateur_cf,
        operateur_chargement: operateurchargement,
        totalplanifie: totalproduction,
        nombre_heure_shift1:nombre_heure_shift1,
        nombre_heure_shift2: nombre_heure_shift2,
        shift:shift,
        shift2: shift2,
        phasechargementshif2: phasechargementshif2,
        operateurchargementshift2: operateurchargementshift2,
        phasereguleurshif2: phasereguleurshif2,
        operateur_reguleurshif2:operateur_reguleurshif2,
        phasecslshift2: phasecslshift2,
        operateurcslshift2:operateurcslshift2,
        phasecfshift2:phasecfshift2,
        operateurcfshift2:operateurcfshift2,
        objectiveproductionshift2:totalproductionshift2,
        objectivecslshift2:totalcslshift2,
        objectivecfshift2:totalcfshift2,
        totalproduction:totalproduction,
        objectivecf:totalcf,
        objectivecsl:totalcsl,
      
      };
  
      // Send the data to the backend
      await axios.post("http://localhost:4000/ajouter/plannification", plannificationData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
  
      message.success("Plannification added successfully!");
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to add plannification.");
      console.error(error); // Log error for debugging
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleLogout = () => {
    navigate('/login');
  };



  // Handle reference selection
  const handleReferenceSelect = (value) => {
    setSelectedReference(value);
  };

  
  return (
    <div className='body_container'>
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

      <div className="machine-form-container">
        <h2>Select a Machine to Update</h2>

        <div className="machine-buttons">
          {machines.map((machine) => (
            <button
              key={machine.id}
              className='machine-button'
              onClick={() => handleMachineSelect(machine)}
            >
              {machine.nom}
            </button>
          ))}
        </div>

        <Modal
          title={`Machine: ${selectedMachine?.nom}`}
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
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
      {currentStep === 1 && (  
    <div>  

             {selectedMachine && (
        <div 
       style={{ 
       marginTop: '10px', 
       display: 'flex', 
       flexDirection: 'row', // Ensure the items are in a row
       justifyContent: 'space-between', // Distribute the items evenly
       width: '100%', // Ensure the container takes full width
       paddingBottom: '10px', // Space below the section
       }} 
      key={selectedMachine.id}
       >
    {/* Cadence Horaire */}
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '20px' }}>
      <label style={{ fontWeight: 'bold' }}>Cadence horaire_Production:</label>
      <span>{selectedMachine.cadence_horaire}</span>
    </div>

    {/* Cadence Horaire CF */}
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '20px' }}>
      <label style={{ fontWeight: 'bold' }}>Cadence horaire_CF:</label>
      <span>{selectedMachine.cadence_horaire_cf}</span>
    </div>

    {/* Cadence Horaire CSL */}
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <label style={{ fontWeight: 'bold' }}>Cadence horaire_CSL:</label>
      <span>{selectedMachine.cadence_horaire_csl}</span>
    </div>
  </div>
)}  
 <h1 style={{fontSize:'20px', fontWeight:"bold", display:'flex', justifyContent:'center', alignItems:'center'}}>Shift 1 Plannification</h1>
      
    <div style={{marginBottom:'30px'}}>
    {selectedMachine && machineReferences[selectedMachine.nom] && (
    <div className="references-dropdown">
      <label>References</label>
      <Select
        value={selectedReference}
        onChange={handleReferenceSelect}
        style={{ width: '100%' }}
        placeholder="Select reference"
      >
        {/* Check if references are an array before mapping */}
        {Array.isArray(machineReferences[selectedMachine.nom]) && 
          machineReferences[selectedMachine.nom].map((reference, index) => (
            <Option key={index} value={reference}>
              {reference}
            </Option>
          ))
        }
      </Select>
    </div>
  )}
    </div>

    {selectedReference && (
            <div className="input-field">
              <Checkbox.Group
               style={{ width: '100%' }}
               value={shift}
               onChange={(value)=>setShift(value)}
             >
               <Checkbox value="shift1">Shift1</Checkbox>
           
              
             </Checkbox.Group>
          </div>
          )}
    
    <div className="form-container">
 
         {shift.includes("shift1")  && (
        <div>
        <label>Nombre d'heure shift 1</label>
        <Input type='number' value={nombre_heure_shift1} onChange={(e)=> setNombre_heure_shift1(e.target.value)}></Input>
        </div>
         )}
          
      
          {shift.includes("shift1")  && (
                  <div className="input-field">
                  <Checkbox.Group
                       style={{ width: '100%'}}
                       value={phasechargement}
                       onChange={(value)=>setPhasechargement(value)}
                     >
                      <Checkbox value="Chargement">Phase Chargement</Checkbox>
                       
                      
                     </Checkbox.Group>
                 </div> 
            )

            }


        
         {phasechargement && (
          <div>
          <div className="input-field">
          <label>Objective Production</label>
            <input type="number" value={totalproduction} readOnly />
          </div>
          <div className="input-field">
          <label>Operateur Chargement</label>
          <Select 
            value={operateurchargement} 
            onChange={(value) => setOperateurchargement(value)} 
            placeholder="Select an operator"
          >
            <Option value={null}>Select</Option>
            {operateurs.map((op) => (
              <Option key={op.id} value={op.prenom}>
                {op.nom} {op.prenom}
              </Option>
            ))}
          </Select>
          {/* Display the names of operators not selected */}
          {operateurchargement !== null && (
          <div style={{ marginTop: '10px', fontStyle: 'italic', color: '#888' }}>
          <b>Operateur not affected:</b> 
          {getNotSelectedOperators(operateurchargement, allSelectedOperators)}
           </div>
          )}
        </div>
          </div>
        
               
              )}
           
         { operateurchargement&& (
                 <div className="input-field">
                  <Checkbox.Group
                       style={{ width: '100%'}}
                       value={phasereguleur}
                       onChange={(value)=>setPhasereguleur(value)}
                     >
                      <Checkbox value="reguleur">Phase Reguleur</Checkbox>
                     </Checkbox.Group>
                 </div> 
            )

            }
        
             {phasereguleur && (
                   <div className="input-field">
                   <label>Operateur Reguleur</label>
                   <Select 
                     value={operateurreguleur} 
                     onChange={(value) => setOperateurreguleur(value)} 
                     placeholder="Select an operator"
                   >
                     <Option value={null}>Select</Option>
                     {operateurs.map((op) => (
                       <Option key={op.id} value={op.id}>
                         {op.nom} {op.prenom}
                       </Option>
                     ))}
                   </Select>
                   {/* Display the names of operators not selected */}
                   {operateurreguleur !== null && (
                  <div style={{ marginTop: '10px', fontStyle: 'italic', color: '#888' }}>
                  <b>Operateur not affected:</b> 
                  {getNotSelectedOperators(operateurreguleur, allSelectedOperators)}
                 </div>
                 )}

                 </div>
             )} 
                  
          
              
             { operateurreguleur && (
                 <div className="input-field">
                 <Checkbox.Group
                      style={{ width: '100%'}}
                      value={phasecf}
                      onChange={(value)=>setPhasecf(value)}
                    >
                     <Checkbox value="csl">Phase CF</Checkbox>
                    </Checkbox.Group>
                </div> 
            )
            }
        
          { phasecf && (
            <div>
                          
          <div className="input-field">
          <label>Objective CF</label>
            <input type="number" value={totalcf} readOnly />
          </div>
          <div className="input-field">
                     <label>Operateur CF </label>
                     <Select 
                       value={operateur_cf} 
                       onChange={(value) => setOperateur_cf(value)} 
                       placeholder="Select an operator"
                     >
                       <Option value={null}>Select</Option>
                       {operateurs.map((op) => (
                         <Option key={op.id} value={op.prenom}>
                           {op.nom} {op.prenom}
                         </Option>
                       ))}
                     </Select>
                     {/* Display the names of operators not selected */}
                     {operateur_cf !== null && (
                    <div style={{ marginTop: '10px', fontStyle: 'italic', color: '#888' }}>
                    <b>Operateur not affected:</b> 
                    {getNotSelectedOperators(operateur_cf, allSelectedOperators)}
                   </div>
                     )}
                   </div>
            </div>
                    
          )
          }

           { operateur_cf && (
              <div className="input-field">
              <Checkbox.Group
                   style={{ width: '100%'}}
                   value={phasecsl}
                   onChange={(value)=>setPhasecsl(value)}
                 >
                  <Checkbox value="csl">Phase CSL</Checkbox>
                 </Checkbox.Group>
             </div> 
            )

            }
     
        
          {phasecsl && (

            <div>
            <div className="input-field">
            <label>Objective CSL</label>
            <input type="number" value={totalcsl} readOnly />
            </div>
            <div className="input-field">
                  <label>Operateur CSL </label>
                  <Select 
                    value={operateur_csl} 
                    onChange={(value) => setOperateur_csl(value)} 
                    placeholder="Select an operator"
                  >
                    <Option value={null}>Select</Option>
                    {operateurs.map((op) => (
                      <Option key={op.id} value={op.prenom}>
                        {op.nom} {op.prenom}
                      </Option>
                    ))}
                  </Select>
                  {/* Display the names of operators not selected */}
                  {operateur_csl !== null && (
                  <div style={{ marginTop: '10px', fontStyle: 'italic', color: '#888' }}>
                  <b>Operateur not affected:</b> 
                  {getNotSelectedOperators(operateur_csl, allSelectedOperators)}
                  </div>
                   )}
                </div>
            </div>
                 
          )}


   

          <div className="button-step1">
            <button className="custom-button" onClick={()=>setCurrentStep(2)}>Next To plannify shift 2</button>
          </div>
          </div>
          </div>
       
        )}
        </motion.div>


  <motion.div
      key="step2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 3, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >        
  {currentStep === 2 && (  

    <div>    
     <h1 style={{fontSize: '20px',fontWeight:'bold', display:'flex', alignItems:'center', justifyContent:'center'}}>Shift 2 Plannification</h1> 
    <div>
    {selectedMachine && machineReferences[selectedMachine.nom] && (
    <div className="references-dropdown">
      <label>References</label>
      <Select
        value={selectedReference}
        onChange={handleReferenceSelect}
        style={{ width: '100%' }}
        placeholder="Select reference"
      >
        {/* Check if references are an array before mapping */}
        {Array.isArray(machineReferences[selectedMachine.nom]) && 
          machineReferences[selectedMachine.nom].map((reference, index) => (
            <Option key={index} value={reference}>
              {reference}
            </Option>
          ))
        }
      </Select>
    </div>
  )}
    </div>

    <div className="form-container">


  <div>
    <label>Nombre d'heure shift 2</label>
<Input type='number' value={nombre_heure_shift2} onChange={(e)=> setNombre_heure_shift2(e.target.value)}></Input>
</div>

  

  
  { selectedReference && (
          <div className="input-field">
          <Checkbox.Group
               style={{ width: '100%'}}
               value={phasechargementshif2}
               onChange={(value)=>setPhasechargementshif2(value)}
             >
              <Checkbox value="Chargementshift2">Phase Chargement</Checkbox>
               
              
             </Checkbox.Group>
         </div> 
    )

    }

 {phasechargementshif2 && (
  <div>
  <div className="input-field">
      <label>Objective Production</label>
    <input type="number" value={totalproductionshift2} readOnly />
  </div>
  <div className="input-field">
  <label>Operateur Chargement</label>
  <Select 
    value={operateurchargementshift2} 
    onChange={(value) => setOperateurchargementshift2(value)} 
    placeholder="Select an operator"
  >
    <Option value={null}>Select</Option>
    {operateurs.map((op) => (
      <Option key={op.id} value={op.prenom}>
        {op.nom} {op.prenom}
      </Option>
    ))}
  </Select>
  {/* Display the names of operators not selected */}
  {operateurchargementshift2 !== null && (
  <div style={{ marginTop: '10px', fontStyle: 'italic', color: '#888' }}>
  <b>Operateur not affected:</b> 
  {getNotSelectedOperators(operateurchargementshift2, allSelectedOperators)}
   </div>
  )}
</div>
  </div>

       
      )}
   
 { operateurchargementshift2&& (
         <div className="input-field">
          <Checkbox.Group
               style={{ width: '100%'}}
               value={phasereguleurshif2}
               onChange={(value)=>setPhasereguleurshif2(value)}
             >
              <Checkbox value="reguleur">Phase Reguleur</Checkbox>
             </Checkbox.Group>
         </div> 
    )

    }

     {phasereguleurshif2 && (
           <div className="input-field">
           <label>Operateur Reguleur</label>
           <Select 
             value={operateur_reguleurshif2} 
             onChange={(value) => setOperateur_reguleurshif2(value)} 
             placeholder="Select an operator"
           >
             <Option value={null}>Select</Option>
             {operateurs.map((op) => (
               <Option key={op.id} value={op.prenom}>
                 {op.nom} {op.prenom}
               </Option>
             ))}
           </Select>
           {/* Display the names of operators not selected */}
           {operateur_reguleurshif2 !== null && (
          <div style={{ marginTop: '10px', fontStyle: 'italic', color: '#888' }}>
          <b>Operateur not affected:</b> 
          {getNotSelectedOperators(operateur_reguleurshif2, allSelectedOperators)}
         </div>
         )}

         </div>
     )} 
           
     { operateur_reguleurshif2 && (
         <div className="input-field">
         <Checkbox.Group
              style={{ width: '100%'}}
              value={phasecfshift2}
              onChange={(value)=>setPhasecfshift2(value)}
            >
             <Checkbox value="cfshift2">Phase CF</Checkbox>
            </Checkbox.Group>
        </div> 
    )
    }

  { phasecfshift2 && (
    <div>
    <div className="input-field">
    <label>Objective CF</label>
    <input type="number" value={totalcfshift2} readOnly />
    </div>
    <div className="input-field">
             <label>Operateur CF </label>
             <Select 
               value={operateurcfshift2} 
               onChange={(value) => setOperateurcfshift2(value)} 
               placeholder="Select an operator"
             >
               <Option value={null}>Select</Option>
               {operateurs.map((op) => (
                 <Option key={op.id} value={op.prenom}>
                   {op.nom} {op.prenom}
                 </Option>
               ))}
             </Select>
             {/* Display the names of operators not selected */}
             {operateurcfshift2 !== null && (
            <div style={{ marginTop: '10px', fontStyle: 'italic', color: '#888' }}>
            <b>Operateur not affected:</b> 
            {getNotSelectedOperators(operateurcfshift2, allSelectedOperators)}
           </div>
             )}
           </div>
    </div>
            
  )
  }


{ operateurcfshift2 && (
      <div className="input-field">
      <Checkbox.Group
           style={{ width: '100%'}}
           value={phasecslshift2}
           onChange={(value)=>setPhasecslshift2(value)}
         >
          <Checkbox value="cslshift2">Phase CSL</Checkbox>
         </Checkbox.Group>
     </div> 
    )

    }


  {phasecslshift2 && (
    <div>

   <div className="input-field">
    <label>Objective CSL</label>
    <input type="number" value={totalcslshift2} readOnly />
    </div>
    <div className="input-field">
          <label>Operateur CSL </label>
          <Select 
            value={operateurcslshift2} 
            onChange={(value) => setOperateurcslshift2(value)} 
            placeholder="Select an operator"
          >
            <Option value={null}>Select</Option>
            {operateurs.map((op) => (
              <Option key={op.id} value={op.prenom}>
                {op.nom} {op.prenom}
              </Option>
            ))}
          </Select>
          {/* Display the names of operators not selected */}
          {operateurcslshift2 !== null && (
          <div style={{ marginTop: '10px', fontStyle: 'italic', color: '#888' }}>
          <b>Operateur not affected:</b> 
          {getNotSelectedOperators(operateurcslshift2, allSelectedOperators)}
          </div>
           )}
        </div>
    </div>
         
  )}

    <div className="button-container">
    <button className="custom-button" onClick={()=>handlePlannification()}>Submit</button>
    <button className="custom-button" onClick={()=>handleback()}>Back</button>
    </div>
    </div>
        </div>
        )}
        </motion.div>
        </AnimatePresence>       
         <div>
       </div>
        </Modal>
      </div>
    </div>
  );
};

export default PlannificationForm;
