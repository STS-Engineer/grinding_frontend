import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Outil.css';
import { Modal, Input, message, Select, Checkbox, Form, Button } from 'antd'; // Import Ant Design components
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const Ajoutermachine = () => {
  const [machines, setMachines] = useState([]);
  const [nommachine,setNommachine]= useState('');
  const [reference,setReferenece]= useState('');
  const [date,setDate]= useState('');
  const [cadence_horaire,setCadence_horaire]= useState('');
  const [nombre_operateur_chargement,setNombre_operateur_chargement]= useState('');
  const [cadence_horaire_cf,setCadence_horaire_cf]= useState('');

  const [cadence_horaire_csl,setCadence_horaire_csl]= useState('');
  const [phase1chargement,setPhase1chargement]= useState('');

  const [phase1roueavancement,setphase1roueavancement]= useState('');
  const [refroueoutil,setRefroueoutil]= useState('');
  const [dureevierefroueoutil,setDureevierefroueoutil]= useState('');
  const [phase2usinagehauteur,setPhase2usinagehauteur]= useState('');
  const [refmeulehauteuroutil,setRefmeulehauteuroutil]= useState('');
  const [dureevierefmeulehauteuroutil,setDureevierefmeulehauteuroutil]= useState('');
  const [phase3usinagelargeur,setPhase3usinagelargeur]= useState('');
  const [refmeulelargeuroutil,setRefmeulelargeuroutil]= useState('');
  const [dureevierefmeulelargeuroutil,setDureevierefmeulelargeuroutil]= useState('');
  const [phase4usinagechanfreins,setPhase4usinagechanfreins]= useState('');
  const [refmeulechanfreinsoutil,setRefmeulechanfreinsoutil]= useState('');
  const [dureevierefmeulerefmeulechanfreinsoutil,setDureevierefmeulerefmeulechanfreinsoutil]= useState('');
  const [phase5usinagerainure,setPhase5usinagerainure]= useState('');
  const [outillageusinagerainureoutil,setOutillageusinagerainureoutil]= useState('');
  const [dureevieoutillageusinagerainureoutil,setDureevieoutillageusinagerainureoutil]= useState('');

  const [phase5usinagerayonnage,setPhase5usinagerayonnage]= useState('');
  const [refmeulerayonnage,setRefmeulerayonnage]= useState('');
  const [dureevierefmeulerayonnageoutil,setDureevierefmeulerayonnageoutil]= useState('');
  const [phase5usinagetete,setPhase5usinagetete]= useState('');
  const [outillageusinagetete,setOutillageusinagetete]= useState('');
  const [dureevieusinagetete, setDureevieusinagetete] = useState('');
  const [phase6inspectioncf, setphase6inspectioncf] = useState('');
  const [nombre_operateur_cf, setNombre_operateur_cf] = useState('');
  const [phase6inspectioncsl, setPhase6inspectioncslf] = useState('');
  const [nombre_operateur_csl, setnombre_operateur_csl] = useState('');
  
  // Form data state
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const machinereponse = await axios.get("http://localhost:4000/ajouter/machine");
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
  const userID = localStorage.getItem("userID")
  console.log(userID);

  const handleSubmit = async (values) => {
    try {
      await axios.post(
       "http://localhost:4000/ajouter/machine",
        {

          nom: nommachine,
          reference:reference,
          date:date,
          user_id: userID,
          cadence_horaire: cadence_horaire,
          nombre_operateur_chargement: nombre_operateur_chargement,
          cadence_horaire_cf: cadence_horaire_cf,
          cadence_horaire_csl:cadence_horaire_csl,
          phase1chargement:phase1chargement,
          phase1roueavancement: phase1roueavancement,
          refroueoutil: refroueoutil,
          dureevierefroueoutil: dureevierefroueoutil,
          phase2usinagehauteur: phase2usinagehauteur,
          refmeulehauteuroutil: refmeulehauteuroutil,
          dureevierefmeulehauteuroutil: dureevierefmeulehauteuroutil,
          phase3usinagelargeur: phase3usinagelargeur,
          refmeulelargeuroutil: refmeulelargeuroutil,
          dureevierefmeulelargeuroutil: dureevierefmeulelargeuroutil,
          phase4usinagechanfreins: phase4usinagechanfreins,
          refmeulechanfreinsoutil: refmeulechanfreinsoutil,
          dureevierefmeulerefmeulechanfreinsoutil: dureevierefmeulerefmeulechanfreinsoutil,
          phase5usinagerainure: phase5usinagerainure,
          outillageusinagerainureoutil: outillageusinagerainureoutil,
          dureevieoutillageusinagerainureoutil: dureevieoutillageusinagerainureoutil,
          phase5usinagerayonnage: phase5usinagerayonnage,
          refmeulerayonnage: refmeulerayonnage,
          dureevierefmeulerayonnageoutil: dureevierefmeulerayonnageoutil,
          phase5usinagetete: phase5usinagetete,
          outillageusinagetete:outillageusinagetete,
          dureevieusinagetete: dureevieusinagetete,
          phase6inspectioncf: phase6inspectioncf,
          nombre_operateur_cf: nombre_operateur_cf,
          phase6inspectioncsl: phase6inspectioncsl,
          nombre_operateur_csl:nombre_operateur_csl
        }, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      message.success("Machine added successfully!");
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to add machine.");
    } finally {
 
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
        <h2>Ajouter une Nouvelle Machine</h2>
        
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            date,
          }}
        >
          <Form.Item
            name="nom"
            label="Nom de la Machine"
            rules={[{ required: true, message: 'Veuillez entrer le nom de la machine!' }]}
          >
         <Input
           type="text"
           value={nommachine}
           onChange={(e) => setNommachine(e.target.value)}
          placeholder="Entrez la cadence horaire"
          />
          </Form.Item>
  
          <Form.Item
            name="reference"
            label="Référence"
            rules={[{ required: true, message: 'Veuillez entrer la référence!' }]}
          >
              <Input
           type="text"
           value={reference}
           onChange={(e) => setReferenece(e.target.value)}
          placeholder="Entrez la reference"
          />
          </Form.Item>
  
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: 'Veuillez sélectionner une date!' }]}
          >
            <Input type="text"  value={date} onChange={setDate} />
          </Form.Item>

  
          <Form.Item
            name="cadence_horaire"
            label="Cadence Horaire"
            rules={[{ required: true, message: 'Veuillez entrer la cadence horaire!' }]}
          >
           <Input
           type="number"
           value={cadence_horaire}
           onChange={(e) => setCadence_horaire(Number(e.target.value))}
          placeholder="Entrez la cadence horaire"
          />
          </Form.Item>
  
          <Form.Item
            name="cadence_horaire_cf"
            label="Cadence Horaire CF"
            rules={[{ required: true, message: 'Veuillez entrer la cadence horaire CF!' }]}
          >
              <Input
           type="number"
           value={cadence_horaire_cf}
           onChange={(e) => setCadence_horaire_cf(Number(e.target.value))}
          placeholder="Entrez la cadence horaire"
          />
          </Form.Item>
  
          <Form.Item
            name="cadence_horaire_csl"
            label="Cadence Horaire CSL"
            rules={[{ required: true, message: 'Veuillez entrer la cadence horaire CSL!' }]}
          >
          <Input
           type="number"
           value={cadence_horaire_csl}
           onChange={(e) => setCadence_horaire_csl(Number(e.target.value))}
          placeholder="Entrez la cadence horaire"
          />

          </Form.Item>
  
          {/* Add fields for all the phases */}
           
          <div className="input-field">
                       <label>Chargement</label>
                         <Checkbox.Group
                          style={{ width: '100%' }}
                          value={phase1chargement}
                          onChange={(value)=>setPhase1chargement(value)}
                        >
                          <Checkbox value="Chargement"></Checkbox>
                       
                        </Checkbox.Group>
                     </div>

                     {phase1chargement && (
                     <div className="input-field">
                          <label>Nombre d'opérateur chargement</label>
                          <Input type='text' value={nombre_operateur_chargement} onChange={(e)=>setNombre_operateur_chargement(e.target.value)} />
                     </div>
                     )
                     }

                <div className="input-field">
                       <label>Phase1: Roue d'avancement</label>
                         <Checkbox.Group
                          style={{ width: '100%' }}
                          value={phase1roueavancement}
                          onChange={(value)=>setphase1roueavancement(value)}
                        >
                          <Checkbox value="phase1roueavancement"></Checkbox>
                       
                        </Checkbox.Group>
                     </div>
                {phase1roueavancement && (
                  <div className='phase'>
                  <div className="input-field">
                  <label>Réf roues</label>
                  <Input type='text' value={refroueoutil} onChange={(e)=>setRefroueoutil(e.target.value)}/>
                  </div> 
              
                  <div className="input-field">
                   <label>Durée de vie</label>
                   <Input type='number' value={dureevierefroueoutil} onChange={(e)=>setDureevierefroueoutil(e.target.value)}/>
                   </div>
                 
               
                  </div>
                )

                }

              <div className="input-field">
                       <label>Phase 2: Usinage Hauteur</label>
                         <Checkbox.Group
                          style={{ width: '100%' }}
                          value={phase2usinagehauteur}
                          onChange={(value)=>setPhase2usinagehauteur(value)}
                        >
                          <Checkbox value="phase2usinagehauteur"></Checkbox>
                       
                        </Checkbox.Group>
                     </div>
                {phase2usinagehauteur && (
                  <div className='phase'>
                  <div className="input-field">
                  <label>Réf meule hauteur</label>
                  <Input type='text' value={refmeulehauteuroutil} onChange={(e)=>setRefmeulehauteuroutil(e.target.value)}/>
                  </div> 
              
                  <div className="input-field">
                   <label>Durée de vie</label>
                   <Input type='number' value={dureevierefmeulehauteuroutil} onChange={(e)=>setDureevierefmeulehauteuroutil(e.target.value)}/>
                   </div>
                 
               
                  </div>
                )

                }


         <div className="input-field">
                       <label>Phase 3: Usinage Largeur</label>
                         <Checkbox.Group
                          style={{ width: '100%' }}
                          value={phase3usinagelargeur}
                          onChange={(value)=>setPhase3usinagelargeur(value)}
                        >
                          <Checkbox value="phase3usinagelargeur"></Checkbox>
                       
                        </Checkbox.Group>
                     </div>
                {phase3usinagelargeur && (
                  <div className='phase'>
                  <div className="input-field">
                  <label>Réf meule hauteur</label>
                  <Input type='text' value={refmeulelargeuroutil} onChange={(e)=>setRefmeulelargeuroutil(e.target.value)}/>
                  </div> 
              
                  <div className="input-field">
                   <label>Durée de vie</label>
                   <Input type='number' value={dureevierefmeulelargeuroutil} onChange={(e)=>setDureevierefmeulelargeuroutil(e.target.value)}/>
                   </div>
                  </div>
                )

                }


         <div className="input-field">
                       <label>Phase 4: Usinage Chanfreins</label>
                         <Checkbox.Group
                          style={{ width: '100%' }}
                          value={phase4usinagechanfreins}
                          onChange={(value)=>setPhase4usinagechanfreins(value)}
                        >
                          <Checkbox value="phase4usinagechanfreins"></Checkbox>
                       
                        </Checkbox.Group>
                     </div>
                {phase4usinagechanfreins && (
                  <div className='phase'>
                  <div className="input-field">
                  <label>Réf meule Chanfreins</label>
                  <Input type='text' value={refmeulechanfreinsoutil} onChange={(e)=>setRefmeulechanfreinsoutil(e.target.value)}/>
                  </div> 
              
                  <div className="input-field">
                   <label>Durée de vie</label>
                   <Input type='number' value={dureevierefmeulerefmeulechanfreinsoutil} onChange={(e)=>setDureevierefmeulerefmeulechanfreinsoutil(e.target.value)}/>
                   </div>
                  </div>
                )

                }

      <div className="input-field">
                       <label>Phase 5: Usinage rainure</label>
                         <Checkbox.Group
                          style={{ width: '100%' }}
                          value={phase5usinagerainure}
                          onChange={(value)=>setPhase5usinagerainure(value)}
                        >
                          <Checkbox value="phase5usinagerainure"></Checkbox>
                       
                        </Checkbox.Group>
                     </div>
                {phase5usinagerainure && (
                  <div className='phase'>
                  <div className="input-field">
                  <label>Réf meule rainure</label>
                  <Input type='text' value={outillageusinagerainureoutil} onChange={(e)=>setOutillageusinagerainureoutil(e.target.value)}/>
                  </div> 
              
                  <div className="input-field">
                   <label>Durée de vie</label>
                   <Input type='number' value={dureevieoutillageusinagerainureoutil} onChange={(e)=>setDureevieoutillageusinagerainureoutil(e.target.value)}/>
                   </div>
                  </div>
                )

                }
         

         
      <div className="input-field">
                       <label>Phase 5: Usinage rayonnage</label>
                         <Checkbox.Group
                          style={{ width: '100%' }}
                          value={phase5usinagerayonnage}
                          onChange={(value)=>setPhase5usinagerayonnage(value)}
                        >
                          <Checkbox value="phase5usinagerayonnage"></Checkbox>
                       
                        </Checkbox.Group>
                     </div>
                {phase5usinagerayonnage && (
                  <div className='phase'>
                  <div className="input-field">
                  <label>Réf meule rayonnage</label>
                  <Input type='text' value={refmeulerayonnage} onChange={(e)=>setRefmeulerayonnage(e.target.value)}/>
                  </div> 
              
                  <div className="input-field">
                   <label>Durée de vie</label>
                   <Input type='number' value={dureevierefmeulerayonnageoutil} onChange={(e)=>setDureevierefmeulerayonnageoutil(e.target.value)}/>
                   </div>
                  </div>
                )

                }

                      
      <div className="input-field">
                       <label>Phase 5: Usinage tete</label>
                         <Checkbox.Group
                          style={{ width: '100%' }}
                          value={phase5usinagetete}
                          onChange={(value)=>setPhase5usinagetete(value)}
                        >
                          <Checkbox value="phase5usinagetete"></Checkbox>
                       
                        </Checkbox.Group>
                     </div>
                {phase5usinagetete && (
                  <div className='phase'>
                  <div className="input-field">
                  <label>Outillage usinage tete</label>
                  <Input type='text' value={outillageusinagetete} onChange={(e)=>setOutillageusinagetete(e.target.value)}/>
                  </div> 
              
                  <div className="input-field">
                   <label>Durée de vie</label>
                   <Input type='number' value={dureevieusinagetete} onChange={(e)=>setDureevieusinagetete(e.target.value)}/>
                   </div>
                  </div>
                )

                }
                
         


                           
      <div className="input-field">
                       <label>Phase 6: Inspection CF </label>
                         <Checkbox.Group
                          style={{ width: '100%' }}
                          value={phase6inspectioncf}
                          onChange={(value)=>setphase6inspectioncf(value)}
                        >
                          <Checkbox value="phase6inspectioncf"></Checkbox>
                       
                        </Checkbox.Group>
                     </div>
                {phase6inspectioncf && (
              
              
                  <div className="input-field">
                   <label>Nombre d'opérateur</label>
                   <Input type='number' value={nombre_operateur_cf} onChange={(e)=>setNombre_operateur_cf(e.target.value)}/>
                   </div>
              
                )

                }

<      div className="input-field">
                       <label>Phase 6: Inspection CSL </label>
                         <Checkbox.Group
                          style={{ width: '100%' }}
                          value={phase6inspectioncsl}
                          onChange={(value)=>setPhase6inspectioncslf(value)}
                        >
                          <Checkbox value="phase6inspectioncsl"></Checkbox>
                       
                        </Checkbox.Group>
                     </div>
                {phase6inspectioncsl && (
              
              
                  <div className="input-field">
                   <label>Nombre d'opérateur</label>
                   <Input type='number' value={nombre_operateur_csl} onChange={(e)=>setnombre_operateur_csl(e.target.value)}/>
                   </div>
              
                )

                }
  
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

export default Ajoutermachine;
