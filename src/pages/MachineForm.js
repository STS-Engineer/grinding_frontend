import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MachineForm.css'
import { Modal, Input, message, Select, Checkbox } from 'antd'; // Import Ant Design components
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

const MachineForm = () => {
  const [machines, setMachines] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [phasechargement, setPhasechargement] = useState('');
  const [phaseroues, setPhaseroues] = useState('');
  const [phaseusinagehauteur, setPhaseusinagehauteur] = useState('');
  const [phaseusinagelargeur, setPhaseusinagelargeur] = useState('');
  const [phaseusinagechanfreins, setPhaseusinagechanfreins] = useState('');
  const [phaseusinagerainure, setPhaseusinagerainure] = useState('');
  const [phaseusinagerayonnage, setPhaseusinagerayonnage] = useState('');
  const [phasecf, setPhasecf] = useState('');
  const [phasecsl, setPhasecsl] = useState('');
  const [nombreoperateurcf, setNombreoperateurcf] = useState('');
  const [nombreoperateurcsl, setNombreoperateurcsl] = useState('');
  const [phaseusinagetete, setPhaseusinagetete] = useState('');
  const [outilphaseroue, setOutilphaseroue] = useState('');
  const [outilphaseusinagehauteur, setOutilphaseusinagehauteur] = useState('');
  const [durrevieoutilphaseusinagehauteur, setdurrevieoutilphaseusinagehauteur] = useState('');
  const [outilphaseusinagelargeur, setOutilphaseusinagelargeur] = useState('');
  const [durrevieoutilphaseusinagelargeur, setdurrevieoutilphaseusinagelargeur] = useState('');
  const [outilphaseusinagechanfreins, setOutilphaseusinagechanfreins] = useState('');
  const [durrevieoutilphaseusinagechanfreins, setdurrevieoutilphaseusinagechanfreins] = useState('');
  const [outilphaseusinagerainure, setOutilphaseusinagerainure] = useState('');
  const [durrevieoutilphaseusinagerainure, setdurrevieoutilphaseusinagerainure] = useState('');
  const [outilphaseusinagerayonnage, setOutilphaseusinagerayonnage] = useState('');
  const [durrevieoutilphaseusinagerayonnage, setdurrevieoutilphaseusinagerayonnage] = useState('');
  const [outilphaseusinagetete, setOutilphaseusinagetete] = useState('');
  const [durrevieoutilphaseusinagetete, setdurrevieoutilphaseusinagetete] = useState('');
  const [outil, setOutil] = useState('');
  const [nombreoperateur, setNombreoperateur] = useState(0);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nombredemeulage_fournisseur, setNombre_meulage_fournisseur] = useState('');
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const machinereponse = await axios.get("https://grinding-backend.azurewebsites.net/ajouter/machines");
        setMachines(machinereponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, []);

  const navigate = useNavigate();

  const handleMachineSelect = (machine) => {
    setSelectedMachine(machine);
    setOutil(machine.outil_id);
    setIsModalVisible(true);
  };


  const handleSubmit = async () => {
    setLoading(true);
  
    const dataToSend = {
      nombre_operateur_chargement: nombreoperateur,
      nombre_operateur_cf: nombreoperateurcf,
      nombre_operateur_csl: nombreoperateurcsl,
      tools: [
        {
          phase: JSON.stringify(phaseusinagehauteur),
          nom_outil: outilphaseusinagehauteur,
          dureedevie: durrevieoutilphaseusinagehauteur,
        },
        {
          phase: JSON.stringify(phaseusinagelargeur),
          nom_outil: outilphaseusinagelargeur,
          dureedevie: durrevieoutilphaseusinagelargeur,
        },
        {
          phase: JSON.stringify(phaseusinagechanfreins),
          nom_outil: outilphaseusinagechanfreins,
          dureedevie: durrevieoutilphaseusinagechanfreins,
        },
        {
          phase: JSON.stringify(phaseusinagerainure),
          nom_outil: outilphaseusinagerainure,
          dureedevie: durrevieoutilphaseusinagerainure,
        },
        {
          phase: JSON.stringify(phaseusinagerayonnage),
          nom_outil: outilphaseusinagerayonnage,
          dureedevie: durrevieoutilphaseusinagerayonnage,
        },
        {
          phase: JSON.stringify(phaseusinagetete),
          nom_outil: outilphaseusinagetete,
          dureedevie: durrevieoutilphaseusinagetete,
        },
      ],
    };
  
    try {
      await axios.put(
        `https://grinding-backend.azurewebsites.net/ajouter/machine/${selectedMachine.id}/outil`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      message.success("Machine updated successfully!");
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to update machine.");
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

              {/* References Dropdown */}
              {selectedMachine && machineReferences[selectedMachine.nom] && (
              <div className="references-dropdown">
                <label>Ref: PN</label>
                <Select
                  value={selectedReference}
                  onChange={handleReferenceSelect}
                  style={{ width: '100%', marginBottom:'50px'  }}
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

         <div className="input-field">
             <Checkbox.Group
                  style={{ width: '100%'}}
                  value={phasechargement}
                  onChange={(value)=>setPhasechargement(value)}
                >
                 <Checkbox value="Chargement">Chargement</Checkbox>
                  
                 
                </Checkbox.Group>
            </div> 

          {phasechargement.includes('Chargement') && (
            <div className="input-field">
            <label>Nombre d'opérateur</label>
            <Input type='number' value={nombreoperateur} onChange={(e)=>setNombreoperateur(e.target.value)}/>
            </div>  
          )}  

         <div className="input-field">
          
              <Checkbox.Group
                  style={{ width: '100%' }}
                  value={phaseroues}
                  onChange={(value)=>setPhaseroues(value)}
                >
                  <Checkbox value="roueavancement">Phase 1 : Roues d'avancement</Checkbox>
                  
                </Checkbox.Group>
            </div> 
           
            {phaseroues.includes('roueavancement') && (
            <div className='phase'>
            <div className="input-field">
            <label>Réf roues</label>
            <Input type='number' value={outilphaseroue} onChange={(e)=>setOutilphaseroue(e.target.value)}/>
            </div> 
        
            <div className="input-field">
             <label>Durée de vie</label>
             <Input type='number' value={durrevieoutilphaseusinagehauteur} onChange={(e)=>setdurrevieoutilphaseusinagehauteur(e.target.value)}/>
             </div>
           
         
            </div>
            
            
          )}  

            <div className="input-field">
          
          <Checkbox.Group
              style={{ width: '100%' }}
              value={phaseusinagehauteur}
              onChange={(value)=>setPhaseusinagehauteur(value)}
            >
              <Checkbox value="usinagehauteur">Phase 2 : Usinage Hauteur</Checkbox>
              
            </Checkbox.Group>
        </div> 
          {(phaseusinagehauteur.includes('usinagehauteur')) && (
            <div className='phase'>
            <div className="input-field">
             <label>Réf meule Hauteur</label>
             <Input type='number' value={outilphaseusinagehauteur} onChange={(e)=>setOutilphaseusinagehauteur(e.target.value)}/>
             </div>
             <div className="input-field">
             <label>Durée de vie</label>
             <Input type='number' value={durrevieoutilphaseusinagehauteur} onChange={(e)=>setdurrevieoutilphaseusinagehauteur(e.target.value)}/>
             </div>
            </div>
           
               
          )

          }
      

        <div className="input-field">
          
          <Checkbox.Group
              style={{ width: '100%' }}
              value={phaseusinagelargeur}
              onChange={(value)=>setPhaseusinagelargeur(value)}
            >
              <Checkbox value="usinagelargeur">Phase 3 : Usinage Largeur</Checkbox>
              
            </Checkbox.Group>
        </div> 

        {(phaseusinagelargeur.includes('usinagelargeur')) && (
            <div className='phase'>
            <div className="input-field">
             <label>Réf meule Hauteur</label>
             <Input type='number' value={outilphaseusinagelargeur} onChange={(e)=>setOutilphaseusinagelargeur(e.target.value)}/>
             </div>
             <div className="input-field">
             <label>Durée de vie</label>
             <Input type='number' value={durrevieoutilphaseusinagelargeur} onChange={(e)=>setdurrevieoutilphaseusinagelargeur(e.target.value)}/>
             </div>
            </div>
           
               
          )

          }

        <div className="input-field">
          
          <Checkbox.Group
              style={{ width: '100%' }}
              value={phaseusinagechanfreins}
              onChange={(value)=>setPhaseusinagechanfreins(value)}
            >
              <Checkbox value="usinagechanfrein">Phase 4 : Usinage Chanfreins</Checkbox>
              
            </Checkbox.Group>
        </div> 

        {(phaseusinagechanfreins.includes('usinagechanfrein')) && (
            <div className='phase'>
            <div className="input-field">
             <label>Réf meule Chanfreins</label>
             <Input type='number' value={outilphaseusinagechanfreins} onChange={(e)=>setOutilphaseusinagechanfreins(e.target.value)}/>
             </div>
             <div className="input-field">
             <label>Durée de vie</label>
             <Input type='number' value={durrevieoutilphaseusinagechanfreins} onChange={(e)=>setdurrevieoutilphaseusinagechanfreins(e.target.value)}/>
             </div>
            </div>
           
               
          )

          }

        <div className="input-field">
          
          <Checkbox.Group
              style={{ width: '100%' }}
              value={phaseusinagerainure}
              onChange={(value)=>setPhaseusinagerainure(value)}
            >
              <Checkbox value="usinagerainure">Phase 5 : Usinage rainure</Checkbox>
              
            </Checkbox.Group>
        </div> 

        {(phaseusinagerainure.includes('usinagerainure')) && (
            <div className='phase'>
            <div className="input-field">
             <label>Outillage d usinage rainure</label>
             <Input type='number' value={outilphaseusinagerainure} onChange={(e)=>setOutilphaseusinagerainure(e.target.value)}/>
             </div>
             <div className="input-field">
             <label>Durée de vie</label>
             <Input type='number' value={durrevieoutilphaseusinagerainure} onChange={(e)=>setdurrevieoutilphaseusinagerainure(e.target.value)}/>
             </div>
            </div>
           
               
          )

          }

        <div className="input-field">
          
          <Checkbox.Group
              style={{ width: '100%' }}
              value={phaseusinagerayonnage}
              onChange={(value)=>setPhaseusinagerayonnage(value)}
            >
              <Checkbox value="usinageroyonnage">Phase 5 : Usinage rayonnage</Checkbox>
              
            </Checkbox.Group>
        </div> 

        {(phaseusinagerayonnage.includes('usinageroyonnage')) && (
            <div className='phase'>
            <div className="input-field">
             <label>Réf meule rayonnage</label>
             <Input type='number' value={outilphaseusinagerayonnage} onChange={(e)=>setOutilphaseusinagerayonnage(e.target.value)}/>
             </div>
             <div className="input-field">
             <label>Durée de vie</label>
             <Input type='number' value={durrevieoutilphaseusinagerayonnage} onChange={(e)=>setdurrevieoutilphaseusinagerayonnage(e.target.value)}/>
             </div>
            </div>
           
               
          )

          }

        <div className="input-field">
          
          <Checkbox.Group
              style={{ width: '100%' }}
              value={phaseusinagetete}
              onChange={(value)=>setPhaseusinagetete(value)}
            >
              <Checkbox value="usinagetete">Phase 5 : Usinage tête</Checkbox>
              
            </Checkbox.Group>
        </div> 
        {(phaseusinagetete.includes('usinagetete')) && (
            <div className='phase'>
            <div className="input-field">
             <label>Outillage d usinage tête</label>
             <Input type='number' value={outilphaseusinagetete} onChange={(e)=>setOutilphaseusinagetete(e.target.value)}/>
             </div>
             <div className="input-field">
             <label>Durée de vie</label>
             <Input type='number' value={durrevieoutilphaseusinagetete} onChange={(e)=>setdurrevieoutilphaseusinagetete(e.target.value)}/>
             </div>
            </div>
           
               
          )

          }

        <div className="input-field">
          
          <Checkbox.Group
              style={{ width: '100%' }}
              value={phasecf}
              onChange={(value)=>setPhasecf(value)}
            >
              <Checkbox value="inspectioncf">Phase 6 : Inspection CF</Checkbox>
              
            </Checkbox.Group>
        </div> 
        {(phasecf.includes('inspectioncf')) && (
               <div className='input-field'>
               <label>Nombre d'operateur CF</label>
               <Input type='number' value={nombreoperateurcf} onChange={(e)=>setNombreoperateurcf(e.target.value)}/>
               </div>
           
               
          )

          }

        <div className="input-field">
          
          <Checkbox.Group
              style={{ width: '100%' }}
              value={phasecsl}
              onChange={(value)=>setPhasecsl(value)}
            >
              <Checkbox value="inspectioncsl1">Phase 6 : Inspection CSL1</Checkbox>
              
            </Checkbox.Group>
        </div> 

        {(phasecsl.includes('inspectioncsl1')) && (
            <div className='input-field'>
             <label>Nombre d'operateur CSL</label>
             <Input type='number' value={nombreoperateurcsl} onChange={(e)=>setNombreoperateurcsl(e.target.value)}/>
             </div>
         
           
               
          )

          }

          <div className="button-container">
            <button className="custom-button" onClick={()=> handleSubmit()}>Submit</button>
          </div>

        </Modal>
      </div>
    </div>
  );
};

export default MachineForm;
