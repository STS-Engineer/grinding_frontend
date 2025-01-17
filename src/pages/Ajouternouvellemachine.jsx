import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Outil.css';
import { Modal, Input, message, Select, Checkbox, Form, Button } from 'antd'; // Import Ant Design components
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

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
  const [dureevierefmeulechanfrein,setDureevierefmeulechanfrein]= useState('');
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
  const [currentstep, setCurrentstep] = useState(0);
  
  
  // Form data state
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const machinereponse = await axios.get("https://grinding-backend.azurewebsites.net/ajouter/machine");
        setMachines(machinereponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, []);

useEffect(() => {
    setReferenece('');
}, [reference]);

  const navigate = useNavigate();
  const userID = localStorage.getItem("userID")
  console.log(userID);

  const handleSubmit = async (values) => {
    // Prepare the tools array based on the form values
    const tools = [
      {
        phase: 'Chargement',
        nom_outil: refroueoutil,  // Replace with your actual form value
        dureedevie: dureevierefroueoutil, // Replace with your actual form value
      },
      {
        phase: 'Usinagehauteur',
        nom_outil: refmeulehauteuroutil,  // Replace with your actual form value
        dureedevie: dureevierefmeulehauteuroutil, // Replace with your actual form value
      },
      {
        phase: 'Usinagelargeur',
        nom_outil: refmeulelargeuroutil, // Replace with your actual form value
        dureedevie: dureevierefmeulelargeuroutil, // Replace with your actual form value
      },

      {
        phase: 'Usinagechanfreins',
        nom_outil: refmeulechanfreinsoutil,  // Replace with your actual form value
        dureedevie: dureevierefmeulechanfrein, // Replace with your actual form value
      },
      {
        phase: 'Usinagrainure',
        nom_outil: outillageusinagerainureoutil,  // Replace with your actual form value
        dureedevie: dureevieoutillageusinagerainureoutil, // Replace with your actual form value
      },
      {
        phase: 'Usinagerayonnage',
        nom_outil: refmeulerayonnage, // Replace with your actual form value
        dureedevie: dureevierefmeulerayonnageoutil, // Replace with your actual form value
      },
      {
        phase: 'Usinagetete',
        nom_outil: outillageusinagetete,  // Replace with your actual form value
        dureedevie: dureevieusinagetete, // Replace with your actual form value
      }
      
     
    ];
  
    try {
      // Sending the request with the correct body format
      await axios.post(
        "https://grinding-backend.azurewebsites.net/ajouter/machinee",
        {
          nom: nommachine, // Replace with actual value from the form
          referenceproduit: reference, // Replace with actual value from the form
          date: date, // Replace with actual value from the form
          cadence_horaire: cadence_horaire, // Replace with actual value from the form
          nombre_operateur_chargement: nombre_operateur_chargement || 0, // Replace with actual value from the form
          cadence_horaire_cf: cadence_horaire_cf, // Replace with actual value from the form
          cadence_horaire_csl: cadence_horaire_csl, // Replace with actual value from the form
          phase1chargement: phase1chargement, // Replace with actual value from the form
          tools: tools, // Send the tools array to the server
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is valid
            "Content-Type": "application/json",
          },
        }
      );
      
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to add machine.");
    }
  };



    const handleSubmitt = async (values) => {
    // Prepare the tools array based on the form values
    const tools = [
      {
        phase: 'Chargement',
        nom_outil: refroueoutil,  // Replace with your actual form value
        dureedevie: dureevierefroueoutil, // Replace with your actual form value
      },
      {
        phase: 'Usinagehauteur',
        nom_outil: refmeulehauteuroutil,  // Replace with your actual form value
        dureedevie: dureevierefmeulehauteuroutil, // Replace with your actual form value
      },
      {
        phase: 'Usinagelargeur',
        nom_outil: refmeulelargeuroutil, // Replace with your actual form value
        dureedevie: dureevierefmeulelargeuroutil, // Replace with your actual form value
      },

      {
        phase: 'Usinagechanfreins',
        nom_outil: refmeulechanfreinsoutil,  // Replace with your actual form value
        dureedevie: dureevierefmeulechanfrein, // Replace with your actual form value
      },
      {
        phase: 'Usinagrainure',
        nom_outil: outillageusinagerainureoutil,  // Replace with your actual form value
        dureedevie: dureevieoutillageusinagerainureoutil, // Replace with your actual form value
      },
      {
        phase: 'Usinagerayonnage',
        nom_outil: refmeulerayonnage, // Replace with your actual form value
        dureedevie: dureevierefmeulerayonnageoutil, // Replace with your actual form value
      },
      {
        phase: 'Usinagetete',
        nom_outil: outillageusinagetete,  // Replace with your actual form value
        dureedevie: dureevieusinagetete, // Replace with your actual form value
      }
      
     
    ];
  
    try {
      // Sending the request with the correct body format
      await axios.post(
        "https://grinding-backend.azurewebsites.net/ajouter/machinee",
        {
          nom: nommachine, // Replace with actual value from the form
          referenceproduit: reference, // Replace with actual value from the form
          date: date, // Replace with actual value from the form
          cadence_horaire: cadence_horaire, // Replace with actual value from the form
          nombre_operateur_chargement: nombre_operateur_chargement || 0, // Replace with actual value from the form
          cadence_horaire_cf: cadence_horaire_cf, // Replace with actual value from the form
          cadence_horaire_csl: cadence_horaire_csl, // Replace with actual value from the form
          phase1chargement: phase1chargement, // Replace with actual value from the form
          tools: tools, // Send the tools array to the server
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is valid
            "Content-Type": "application/json",
          },
        }
      );
       // Reset the reference state
       setReferenece('');  
    message.success("Machine Added Succesfully")
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to add machine.");
    }
  };
  

  const handleLogout = () => {
    navigate('/login');
  };

   return (
  <div className="body_container">
    <AnimatePresence mode="wait">
  
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
     <h2>Ajouter une Nouvelle Machine</h2>

  {currentstep === 1 && (
     <motion.div
     key="step1"
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     exit={{ opacity: 0, y: -20 }}
     transition={{ duration: 0.5 }}
   >
   <Form
   form={form}
   layout="vertical"
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
     <Input type="date"  value={date} onChange={(e)=>setDate(e.target.value)} />
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
            <Input type='text' value={dureevierefroueoutil} onChange={(e)=>setDureevierefroueoutil(e.target.value)}/>
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
            <Input type='text' value={dureevierefmeulehauteuroutil} onChange={(e)=>setDureevierefmeulehauteuroutil(e.target.value)}/>
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
            <Input type='text' value={dureevierefmeulelargeuroutil} onChange={(e)=>setDureevierefmeulelargeuroutil(e.target.value)}/>
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
            <Input type='text' value={dureevierefmeulechanfrein} onChange={(e)=>setDureevierefmeulechanfrein(e.target.value)}/>
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
            <Input type='text' value={dureevieoutillageusinagerainureoutil} onChange={(e)=>setDureevieoutillageusinagerainureoutil(e.target.value)}/>
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
            <Input type='text' value={dureevierefmeulerayonnageoutil} onChange={(e)=>setDureevierefmeulerayonnageoutil(e.target.value)}/>
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
            <Input type='text' value={dureevieusinagetete} onChange={(e)=>setDureevieusinagetete(e.target.value)}/>
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
            <Input type='text' value={nombre_operateur_csl} onChange={(e)=>setnombre_operateur_csl(e.target.value)}/>
            </div>
       
         )

         }

   <Form.Item>
  <div style={{display: "flex", gap: "20px", justifyContent: "center", alignItems: "center" }}>

   <Button type="primary" htmlType="submit" onClick={()=>handleSubmitt()} >
    Soumettre
   </Button>
   <Button type="primary" htmlType="submit"   onClick={async () => {
    await handleSubmit(); // Ensure the submission completes
    setReferenece(''); // Clear the local reference state
    form.resetFields(['reference']); // Clear the form field
    setCurrentstep(2); // Move to the next step
  }} >
    Add another reference
  </Button>

  </div>
   </Form.Item>
</Form>
</motion.div>
  )}
  
  
 {currentstep === 2 && (
          <motion.div
          key="step2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
        <Form
         form={form}
        layout="vertical"
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
   <Input type="date"  value={date} onChange={(e)=>setDate(e.target.value)} />
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
          <Input type='text' value={dureevierefroueoutil} onChange={(e)=>setDureevierefroueoutil(e.target.value)}/>
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
          <Input type='text' value={dureevierefmeulehauteuroutil} onChange={(e)=>setDureevierefmeulehauteuroutil(e.target.value)}/>
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
          <Input type='text' value={dureevierefmeulelargeuroutil} onChange={(e)=>setDureevierefmeulelargeuroutil(e.target.value)}/>
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
          <Input type='text' value={dureevierefmeulechanfrein} onChange={(e)=>setDureevierefmeulechanfrein(e.target.value)}/>
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
          <Input type='text' value={dureevieoutillageusinagerainureoutil} onChange={(e)=>setDureevieoutillageusinagerainureoutil(e.target.value)}/>
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
          <Input type='text' value={dureevierefmeulerayonnageoutil} onChange={(e)=>setDureevierefmeulerayonnageoutil(e.target.value)}/>
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
          <Input type='text' value={dureevieusinagetete} onChange={(e)=>setDureevieusinagetete(e.target.value)}/>
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
          <Input type='text' value={nombre_operateur_csl} onChange={(e)=>setnombre_operateur_csl(e.target.value)}/>
          </div>
     
       )

       }

 <Form.Item>
 <div style={{display: "flex", gap: "20px", justifyContent: "center", alignItems: "center" }}>
 <Button type="primary" htmlType="submit" onClick={()=>setCurrentstep(1)} >
    Back
   </Button>
   <Button type="primary" htmlType="submit" onClick={()=>handleSubmitt()} >
    Soumettre
   </Button>
   <Button type="primary" htmlType="submit"   onClick={() => {
    handleSubmit();
    form.resetFields(['reference']);
    setCurrentstep(3);
  
  }} >
    Add another reference
  </Button>
  </div>
 </Form.Item>
         </Form>
         </motion.div>
        )}

{currentstep === 3 && (
          <motion.div
          key="step2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
        <Form
         form={form}
        layout="vertical"
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
   <Input type="date"  value={date} onChange={(e)=>setDate(e.target.value)} />
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
          <Input type='text' value={dureevierefroueoutil} onChange={(e)=>setDureevierefroueoutil(e.target.value)}/>
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
          <Input type='text' value={dureevierefmeulehauteuroutil} onChange={(e)=>setDureevierefmeulehauteuroutil(e.target.value)}/>
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
          <Input type='text' value={dureevierefmeulelargeuroutil} onChange={(e)=>setDureevierefmeulelargeuroutil(e.target.value)}/>
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
          <Input type='text' value={dureevierefmeulechanfrein} onChange={(e)=>setDureevierefmeulechanfrein(e.target.value)}/>
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
          <Input type='text' value={dureevieoutillageusinagerainureoutil} onChange={(e)=>setDureevieoutillageusinagerainureoutil(e.target.value)}/>
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
          <Input type='text' value={dureevierefmeulerayonnageoutil} onChange={(e)=>setDureevierefmeulerayonnageoutil(e.target.value)}/>
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
          <Input type='text' value={dureevieusinagetete} onChange={(e)=>setDureevieusinagetete(e.target.value)}/>
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
          <Input type='text' value={nombre_operateur_csl} onChange={(e)=>setnombre_operateur_csl(e.target.value)}/>
          </div>
     
       )

       }

 <Form.Item>
 <Button type="primary" htmlType="submit" onClick={()=>setCurrentstep(2)} >
    Back
   </Button>
   <Button type="primary" htmlType="submit" onClick={()=>handleSubmitt()} >
     Soumettre
   </Button>
   <Button type="primary" htmlType="submit" onClick={()=>{setCurrentstep(4); form.resetFields(['reference']);  handleSubmit();}} >
     Add another reference
   </Button>
 </Form.Item>
         </Form>
         </motion.div>
        )}

{currentstep === 4 && (
          <motion.div
          key="step2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
  <Form
         form={form}
        layout="vertical"
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
   <Input type="date"  value={date} onChange={(e)=>setDate(e.target.value)} />
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
          <Input type='text' value={dureevierefroueoutil} onChange={(e)=>setDureevierefroueoutil(e.target.value)}/>
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
          <Input type='text' value={dureevierefmeulehauteuroutil} onChange={(e)=>setDureevierefmeulehauteuroutil(e.target.value)}/>
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
          <Input type='text' value={dureevierefmeulelargeuroutil} onChange={(e)=>setDureevierefmeulelargeuroutil(e.target.value)}/>
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
          <Input type='text' value={dureevierefmeulechanfrein} onChange={(e)=>setDureevierefmeulechanfrein(e.target.value)}/>
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
          <Input type='text' value={dureevieoutillageusinagerainureoutil} onChange={(e)=>setDureevieoutillageusinagerainureoutil(e.target.value)}/>
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
          <Input type='text' value={dureevierefmeulerayonnageoutil} onChange={(e)=>setDureevierefmeulerayonnageoutil(e.target.value)}/>
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
          <Input type='text' value={dureevieusinagetete} onChange={(e)=>setDureevieusinagetete(e.target.value)}/>
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
          <Input type='text' value={nombre_operateur_csl} onChange={(e)=>setnombre_operateur_csl(e.target.value)}/>
          </div>
     
       )

       }

 <Form.Item>
 <Button type="primary" htmlType="submit" onClick={()=>setCurrentstep(3)} >
    Back
   </Button>
   <Button type="primary" htmlType="submit" onClick={()=>handleSubmitt()} >
     Soumettre
   </Button>
   <Button type="primary" htmlType="submit" onClick={()=>{setCurrentstep(5); form.resetFields(['reference']);  handleSubmit();}} >
     Add another reference
   </Button>
 </Form.Item>
</Form>
</motion.div>
        )}


{currentstep === 5 && (
          <motion.div
          key="step2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
  <Form
         form={form}
        layout="vertical"
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
   <Input type="date"  value={date} onChange={(e)=>setDate(e.target.value)} />
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
          <Input type='text' value={dureevierefroueoutil} onChange={(e)=>setDureevierefroueoutil(e.target.value)}/>
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
          <Input type='text' value={dureevierefmeulehauteuroutil} onChange={(e)=>setDureevierefmeulehauteuroutil(e.target.value)}/>
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
          <Input type='text' value={dureevierefmeulelargeuroutil} onChange={(e)=>setDureevierefmeulelargeuroutil(e.target.value)}/>
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
          <Input type='text' value={dureevierefmeulechanfrein} onChange={(e)=>setDureevierefmeulechanfrein(e.target.value)}/>
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
          <Input type='text' value={dureevieoutillageusinagerainureoutil} onChange={(e)=>setDureevieoutillageusinagerainureoutil(e.target.value)}/>
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
          <Input type='text' value={dureevierefmeulerayonnageoutil} onChange={(e)=>setDureevierefmeulerayonnageoutil(e.target.value)}/>
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
          <Input type='text' value={dureevieusinagetete} onChange={(e)=>setDureevieusinagetete(e.target.value)}/>
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
          <Input type='text' value={nombre_operateur_csl} onChange={(e)=>setnombre_operateur_csl(e.target.value)}/>
          </div>
     
       )

       }

 <Form.Item>
 <Button type="primary" htmlType="submit" onClick={()=>setCurrentstep(3)} >
    Back
   </Button>
   <Button type="primary" htmlType="submit" onClick={()=>handleSubmitt()} >
     Soumettre
   </Button>
   <Button type="primary" htmlType="submit" onClick={()=>handleSubmit()} >
     Add another reference
   </Button>
 </Form.Item>
</Form>
</motion.div>
        )}
      </div>
      </AnimatePresence>
    </div>
  );
  
};

export default Ajoutermachine;
