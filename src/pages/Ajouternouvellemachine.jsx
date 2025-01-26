import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Outil.css';
import { Modal, Input, message, Select, Checkbox, Form, Button } from 'antd'; // Import Ant Design components
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const { Option } = Select;

const Ajouternouvellemachine = () => {
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
  const [tools, setTools] = useState([]);
  const [selectedTool, setSelectedTool] = useState('');
  const [selectedToolhauteur, setSelectedToolhauteur] = useState('');
  const [selectedToollargeur, setSelectedToollargeur] = useState('');
  const [selectedToolchanfreins, setSelectedToolselectedToolchanfreins] = useState('');
  const [selectedToolrainure, setSelectedToolrainure] = useState('');
  const [selectedToolrayonnage, setSelectedToolrayonnagel] = useState('');
  const [selectedTooltete, setSelectedTooltete] = useState('');


  // Form data state
  const [form] = Form.useForm();
  const selectedToolName = selectedTool?.name || selectedTool;  // Check if it's an object, then extract name
  const selectedToolNamehauteur = selectedToolhauteur?.name || selectedToolhauteur;  
  const selectedToolNamelargeur = selectedToollargeur?.name || selectedToollargeur; 
  const selectedToolNamechanfreins = selectedToolchanfreins?.name || selectedToolchanfreins; 
  const selectedToolNamerainure = selectedToolrainure?.name || selectedToolrainure; 
  const selectedToolNamerayonnage = selectedToolrayonnage?.name || selectedToolrayonnage; 
  const selectedToolNametete = selectedTooltete?.name || selectedTooltete; 
 



  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await axios.get('https://grinding-backend.azurewebsites.net/ajouter/tools', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setTools(response.data);
      } catch (error) {
        console.error('Error fetching tools:', error);
      }
    };

    fetchTools();
  }, []);


  
    // Static filter: Only show tools from a specific phase
    const filteredToolshauteur = tools.filter((outil) => outil.phase === "Usinagehauteur");
    const filteredToolslargeur = tools.filter((outil) => outil.phase === "Usinagelargeur");
    const filteredToolsrainure = tools.filter((outil) => outil.phase === "Usinagerainure");
    const filteredToolsrayonnage = tools.filter((outil) => outil.phase === "Usinagerayonnage");
    const filteredToolschanfreins = tools.filter((outil) => outil.phase === "Usinagechanfreins");
    const filteredToolstete = tools.filter((outil) => outil.phase === "Usinagetete");
    const filteredToolroueavancement = tools.filter((outil) => outil.phase === "roueavancement");
  
 const handleToolChange = (value) => {
    const tool = tools.find((t) => t.nom_outil === value);
    setSelectedTool(tool);
    setDureevierefroueoutil(tool ? tool.dureedevie : '');  // Update dureedevie
  };

  const handleToolChangehauteur = (value) => {
    const tool = filteredToolshauteur.find((t) => t.nom_outil === value);
    setSelectedToolhauteur(tool);
    setDureevierefmeulehauteuroutil(tool ? tool.dureedevie : '');  // Update dureedevie
  };
  const handleToolChangelargeur = (value) => {
    const tool = filteredToolslargeur.find((t) => t.nom_outil === value);
    setSelectedToollargeur(tool);
    setDureevierefmeulelargeuroutil(tool ? tool.dureedevie : '');  // Update dureedevie
  };
  const handleToolChangechanfreins = (value) => {
    const tool = filteredToolschanfreins.find((t) => t.nom_outil === value);
    setSelectedToolselectedToolchanfreins(tool);
    setDureevierefmeulechanfrein(tool ? tool.dureedevie : '');  // Update dureedevie
  };
  const handleToolChangerainure = (value) => {
    const tool = filteredToolsrainure.find((t) => t.nom_outil === value);
    setSelectedToolrainure(tool);
    setDureevieoutillageusinagerainureoutil(tool ? tool.dureedevie : '');  // Update dureedevie
  };
  const handleToolChangerayonnage = (value) => {
    const tool = filteredToolsrayonnage.find((t) => t.nom_outil === value);
    setSelectedToolrayonnagel(tool);
    setDureevierefmeulerayonnageoutil(tool ? tool.dureedevie : '');  // Update dureedevie
  };
  const handleToolChangetete = (value) => {
    const tool = filteredToolstete.find((t) => t.nom_outil === value);
    setSelectedTooltete(tool);
    setDureevieusinagetete(tool ? tool.dureedevie : '');  // Update dureedevie
  };


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


  const navigate = useNavigate();
  const userID = localStorage.getItem("userID")
  console.log(userID);


  const getToolName = (tool) => {
    if (typeof tool === 'object' && tool !== null) {
      // Assuming 'name' is the property that holds the string value
      return tool.nom_outil || '';  // Replace 'name' with the appropriate property if it's different
    }
    return tool || '';  // Return the tool as a string if it's already a string
  };
  
  const handleSubmit = async (values) => {
    // Prepare the tools array based on the form values
    const tools = [
      {
        phase: 'Chargement',
        nom_outil: getToolName(selectedToolName),  // Convert to string
        dureedevie: dureevierefroueoutil,
        referenceproduit: reference,
        dureedeviepointeur: dureevierefroueoutil
        
      },
      {
        phase: 'Usinagehauteur',
        nom_outil: getToolName(selectedToolNamehauteur),  // Convert to string
        dureedevie: dureevierefmeulehauteuroutil, // Replace with your actual form value
        referenceproduit: reference,
        dureedeviepointeur: dureevierefmeulehauteuroutil 
      },
      {
        phase: 'Usinagelargeur',
        nom_outil: getToolName(selectedToolNamelargeur), // Convert to string
        dureedevie: dureevierefmeulelargeuroutil, // Replace with your actual form value
        referenceproduit: reference,
        dureedeviepointeur: dureevierefmeulelargeuroutil  
      },
      {
        phase: 'Usinagechanfreins',
        nom_outil: getToolName(selectedToolNamechanfreins),  // Convert to string
        dureedevie: dureevierefmeulechanfrein, // Replace with your actual form value
        referenceproduit: reference,
        dureedeviepointeur: dureevierefmeulechanfrein   
      },
      {
        phase: 'Usinagrainure',
        nom_outil: getToolName(selectedToolNamerainure),  // Convert to string
        dureedevie: dureevieoutillageusinagerainureoutil, // Replace with your actual form value
        referenceproduit: reference,
        dureedeviepointeur: dureevieoutillageusinagerainureoutil 
      },
      {
        phase: 'Usinagerayonnage',
        nom_outil: getToolName(selectedToolNamerayonnage), // Convert to string
        dureedevie: dureevierefmeulerayonnageoutil, // Replace with your actual form value
        referenceproduit: reference,
        dureedeviepointeur: dureevierefmeulerayonnageoutil  
      },
      {
        phase: 'Usinagetete',
        nom_outil: getToolName(selectedToolNametete),  // Convert to string
        dureedevie: dureevieusinagetete, // Replace with your actual form value
        referenceproduit: reference,
        dureedeviepointeur: dureevieusinagetete   
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
       
        console.log("reference",reference);
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
        nom_outil: getToolName(selectedToolName),  // Convert to string
        dureedevie: dureevierefroueoutil,
        referenceproduit: reference,
        dureedeviepointeur: dureevierefroueoutil
        
      },
      {
        phase: 'Usinagehauteur',
        nom_outil: getToolName(selectedToolNamehauteur),  // Convert to string
        dureedevie: dureevierefmeulehauteuroutil, // Replace with your actual form value
        referenceproduit: reference,
        dureedeviepointeur: dureevierefmeulehauteuroutil 
      },
      {
        phase: 'Usinagelargeur',
        nom_outil: getToolName(selectedToolNamelargeur), // Convert to string
        dureedevie: dureevierefmeulelargeuroutil, // Replace with your actual form value
        referenceproduit: reference,
        dureedeviepointeur: dureevierefmeulelargeuroutil  
      },
      {
        phase: 'Usinagechanfreins',
        nom_outil: getToolName(selectedToolNamechanfreins),  // Convert to string
        dureedevie: dureevierefmeulechanfrein, // Replace with your actual form value
        referenceproduit: reference,
        dureedeviepointeur: dureevierefmeulechanfrein   
      },
      {
        phase: 'Usinagrainure',
        nom_outil: getToolName(selectedToolNamerainure),  // Convert to string
        dureedevie: dureevieoutillageusinagerainureoutil, // Replace with your actual form value
        referenceproduit: reference,
        dureedeviepointeur: dureevieoutillageusinagerainureoutil 
      },
      {
        phase: 'Usinagerayonnage',
        nom_outil: getToolName(selectedToolNamerayonnage), // Convert to string
        dureedevie: dureevierefmeulerayonnageoutil, // Replace with your actual form value
        referenceproduit: reference,
        dureedeviepointeur: dureevierefmeulerayonnageoutil  
      },
      {
        phase: 'Usinagetete',
        nom_outil: getToolName(selectedToolNametete),  // Convert to string
        dureedevie: dureevieusinagetete, // Replace with your actual form value
        referenceproduit: reference,
        dureedeviepointeur: dureevieusinagetete   
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
       
        console.log("reference",reference);
        message.success("Machine Added Successfully");
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to add machine.");
    }
  };
  

  const handleLogout = () => {
    navigate('/login');
  };
  useEffect(()=>{
    
    setCurrentstep(1);
  })

  return (
  <div className="body_container">
    <AnimatePresence mode="wait">
  
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
        <label htmlFor="nom_outil">Réf roue</label>
        <Select
          id="nom_outil"
          placeholder="Search and select a tool"
          style={{ width: "200px",height: "40px", color:"black" }}
          onChange={handleToolChange}
          value={selectedTool?.nom_outil || undefined}
          allowClear // Allows clearing the selected value
          showSearch // Enables search functionality within the dropdown
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {filteredToolroueavancement.map((outil) => (
            <Select.Option key={outil.id} value={outil.nom_outil}>
              {outil.nom_outil}
            </Select.Option>
          ))}
        </Select>
      </div>
    <div className="input-field">
     <label htmlFor="duree_de_vie">Durée de Vie</label>
     <Input
       id="duree_de_vie"
       type="text"
       value={dureevierefroueoutil}
       readOnly
       placeholder="Durée de vie will populate automatically"
     />
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
        <label htmlFor="nom_outil">Réf Meule Hauteur</label>
        <Select
          id="nom_outil"
          placeholder="Search and select a tool"
          style={{ width: "200px" , color:"black"}}
          onChange={handleToolChangehauteur}
          value={selectedToolhauteur ? selectedToolhauteur.nom_outil : '' || undefined}
          allowClear // Allows clearing the selected value
          showSearch // Enables search functionality within the dropdown
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {filteredToolshauteur.map((outil) => (
            <Select.Option key={outil.id} value={outil.nom_outil}>
              {outil.nom_outil}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div className="input-field">
      <label htmlFor="duree_de_vie">Durée de Vie</label>
     <Input
       id="duree_de_vie"
       type="text"
       value={dureevierefmeulehauteuroutil}
       readOnly
       placeholder="Durée de vie will populate automatically"
     />
     </div>
     </div>
         )}


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
          <label htmlFor="nom_outil">Réf Meule Largeur</label>
         <Select
          id="nom_outil"
          placeholder="Search and select a tool"
          style={{ width: "200px" }}
          onChange={handleToolChangelargeur}
          value={selectedToollargeur ? selectedToollargeur.nom_outil : '' || undefined}
          allowClear // Allows clearing the selected value
          showSearch // Enables search functionality within the dropdown
          filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {filteredToolslargeur.map((outil) => (
            <Select.Option key={outil.id} value={outil.nom_outil}>
              {outil.nom_outil}
            </Select.Option>
          ))}
        </Select>
        </div>
        <div className="input-field">
        <label htmlFor="duree_de_vie">Durée de Vie</label>
       <Input
        id="duree_de_vie"
        type="text"
        value={dureevierefmeulelargeuroutil}
        readOnly
        placeholder="Durée de vie will populate automatically"
       />
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
          <label htmlFor="nom_outil">Réf Meule Chanfreins</label>
         <Select
          id="nom_outil"
          placeholder="Search and select a tool"
          style={{ width: "200px" }}
          onChange={handleToolChangechanfreins}
          value={selectedToolchanfreins ? selectedToolchanfreins.nom_outil : '' || undefined}
          allowClear // Allows clearing the selected value
          showSearch // Enables search functionality within the dropdown
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {filteredToolschanfreins.map((outil) => (
            <Select.Option key={outil.id} value={outil.nom_outil}>
              {outil.nom_outil}
            </Select.Option>
          ))}
        </Select>
        </div>
        <div className="input-field">
        <label htmlFor="duree_de_vie">Durée de Vie</label>
         <Input
          id="duree_de_vie"
          type="text"
          value={dureevierefmeulechanfrein}
          readOnly
          placeholder="Durée de vie will populate automatically"
       />
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
          <label htmlFor="nom_outil">Réf Meule Rainure</label>
         <Select
          id="nom_outil"
          placeholder="Search and select a tool"
          style={{ width: "200px" }}
          onChange={handleToolChangerainure}
          value={selectedToolrainure ? selectedToolrainure.nom_outil : '' || undefined}
          allowClear // Allows clearing the selected value
          showSearch // Enables search functionality within the dropdown
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {filteredToolsrainure.map((outil) => (
            <Select.Option key={outil.id} value={outil.nom_outil}>
              {outil.nom_outil}
            </Select.Option>
          ))}
        </Select>
        </div>
        <div className="input-field">
        <label htmlFor="duree_de_vie">Durée de Vie</label>
         <Input
          id="duree_de_vie"
          type="text"
          value={dureevieoutillageusinagerainureoutil}
          readOnly
          placeholder="Durée de vie will populate automatically"
       />
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
          <label htmlFor="nom_outil">Réf Meule Rayonnage</label>
         <Select
          id="nom_outil"
          placeholder="Search and select a tool"
          style={{ width: "200px" }}
          onChange={handleToolChangerayonnage}
          value={selectedToolrayonnage ? selectedToolrayonnage.nom_outil : '' || undefined}
          allowClear // Allows clearing the selected value
          showSearch // Enables search functionality within the dropdown
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {filteredToolsrayonnage.map((outil) => (
            <Select.Option key={outil.id} value={outil.nom_outil}>
              {outil.nom_outil}
            </Select.Option>
          ))}
        </Select>
          </div>
          <div className="input-field">
        <label htmlFor="duree_de_vie">Durée de Vie</label>
         <Input
          id="duree_de_vie"
          type="text"
          value={dureevierefmeulerayonnageoutil}
          readOnly
          placeholder="Durée de vie will populate automatically"
       />
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
          <label htmlFor="nom_outil">Outillage Usinage Tete</label>
         <Select
          id="nom_outil"
          placeholder="Search and select a tool"
          style={{ width: "200px" }}
          onChange={handleToolChangetete}
          value={selectedTooltete ? selectedTooltete.nom_outil : '' || undefined}
          allowClear // Allows clearing the selected value
          showSearch // Enables search functionality within the dropdown
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          } // Advanced filtering logic
        >
          {filteredToolstete.map((outil) => (
            <Select.Option key={outil.id} value={outil.nom_outil}>
              {outil.nom_outil}
            </Select.Option>
          ))}
        </Select>
          </div>
          <div className="input-field">
        <label htmlFor="duree_de_vie">Durée de Vie</label>
         <Input
          id="duree_de_vie"
          type="text"
          value={dureevieusinagetete}
          readOnly
          placeholder="Durée de vie will populate automatically"
       />
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
                   style={{ width: '200px' }}
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
        <label htmlFor="nom_outil">Réf roue</label>
        <Select
          id="nom_outil"
          placeholder="Select a tool"
          style={{ width: "100%" }}
          onChange={handleToolChange}
          value={selectedTool ? selectedTool.nom_outil : ''}
        >
          {tools.map((outil) => (
            <Select.Option key={outil.id} value={outil.nom_outil}>
              {outil.nom_outil}
            </Select.Option>
          ))}
        </Select>
      </div>
    <div className="input-field">
     <label htmlFor="duree_de_vie">Durée de Vie</label>
     <Input
       id="duree_de_vie"
       type="text"
       value={dureevierefroueoutil}
       readOnly
       placeholder="Durée de vie will populate automatically"
     />
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
        <label htmlFor="nom_outil">Réf Meule Hauteur</label>
        <Select
          id="nom_outil"
          placeholder="Select a tool"
          style={{ width: "100%" }}
          onChange={handleToolChangehauteur}
          value={selectedToolhauteur ? selectedToolhauteur.nom_outil : ''}
        >
          {tools.map((outil) => (
            <Select.Option key={outil.id} value={outil.nom_outil}>
              {outil.nom_outil}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div className="input-field">
      <label htmlFor="duree_de_vie">Durée de Vie</label>
     <Input
       id="duree_de_vie"
       type="text"
       value={dureevierefmeulehauteuroutil}
       readOnly
       placeholder="Durée de vie will populate automatically"
     />
     </div>
     </div>
         )}


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
          <label htmlFor="nom_outil">Réf Meule Largeur</label>
         <Select
          id="nom_outil"
          placeholder="Select a tool"
          style={{ width: "100%" }}
          onChange={handleToolChangelargeur}
          value={selectedToollargeur ? selectedToollargeur.nom_outil : ''}
        >
          {tools.map((outil) => (
            <Select.Option key={outil.id} value={outil.nom_outil}>
              {outil.nom_outil}
            </Select.Option>
          ))}
        </Select>
        </div>
        <div className="input-field">
        <label htmlFor="duree_de_vie">Durée de Vie</label>
       <Input
        id="duree_de_vie"
        type="text"
        value={dureevierefmeulelargeuroutil}
        readOnly
        placeholder="Durée de vie will populate automatically"
       />
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
          <label htmlFor="nom_outil">Réf Meule Chanfreins</label>
         <Select
          id="nom_outil"
          placeholder="Select a tool"
          style={{ width: "100%" }}
          onChange={handleToolChangechanfreins}
          value={selectedToolchanfreins ? selectedToolchanfreins.nom_outil : ''}
        >
          {tools.map((outil) => (
            <Select.Option key={outil.id} value={outil.nom_outil}>
              {outil.nom_outil}
            </Select.Option>
          ))}
        </Select>
        </div>
        <div className="input-field">
        <label htmlFor="duree_de_vie">Durée de Vie</label>
         <Input
          id="duree_de_vie"
          type="text"
          value={dureevierefmeulechanfrein}
          readOnly
          placeholder="Durée de vie will populate automatically"
       />
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
          <label htmlFor="nom_outil">Réf Meule Rainure</label>
         <Select
          id="nom_outil"
          placeholder="Select a tool"
          style={{ width: "100%" }}
          onChange={handleToolChangerainure}
          value={selectedToolrainure ? selectedToolrainure.nom_outil : ''}
        >
          {filteredToolsrainure.map((outil) => (
            <Select.Option key={outil.id} value={outil.nom_outil}>
              {outil.nom_outil}
            </Select.Option>
          ))}
        </Select>
        </div>
        <div className="input-field">
        <label htmlFor="duree_de_vie">Durée de Vie</label>
         <Input
          id="duree_de_vie"
          type="text"
          value={dureevieoutillageusinagerainureoutil}
          readOnly
          placeholder="Durée de vie will populate automatically"
       />
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
          <label htmlFor="nom_outil">Réf Meule Rayonnage</label>
         <Select
          id="nom_outil"
          placeholder="Select a tool"
          style={{ width: "100%" }}
          onChange={handleToolChangerayonnage}
          value={selectedToolrayonnage ? selectedToolrayonnage.nom_outil : ''}
        >
          {tools.map((outil) => (
            <Select.Option key={outil.id} value={outil.nom_outil}>
              {outil.nom_outil}
            </Select.Option>
          ))}
        </Select>
          </div>
          <div className="input-field">
        <label htmlFor="duree_de_vie">Durée de Vie</label>
         <Input
          id="duree_de_vie"
          type="text"
          value={dureevierefmeulerayonnageoutil}
          readOnly
          placeholder="Durée de vie will populate automatically"
       />
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
          <label htmlFor="nom_outil">Outillage Usinage Tete</label>
         <Select
          id="nom_outil"
          placeholder="Select a tool"
          style={{ width: "100%" }}
          onChange={handleToolChangetete}
          value={selectedTooltete ? selectedTooltete.nom_outil : ''}
        >
          {tools.map((outil) => (
            <Select.Option key={outil.id} value={outil.nom_outil}>
              {outil.nom_outil}
            </Select.Option>
          ))}
        </Select>
          </div>
          <div className="input-field">
        <label htmlFor="duree_de_vie">Durée de Vie</label>
         <Input
          id="duree_de_vie"
          type="text"
          value={dureevieusinagetete}
          readOnly
          placeholder="Durée de vie will populate automatically"
       />
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
    setCurrentstep(3); // Move to the next step
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
        <label htmlFor="nom_outil">Réf roue</label>
        <Select
          id="nom_outil"
          placeholder="Select a tool"
          style={{ width: "100%" }}
          onChange={handleToolChange}
          value={selectedTool ? selectedTool.nom_outil : ''}
        >
          {tools.map((outil) => (
            <Select.Option key={outil.id} value={outil.nom_outil}>
              {outil.nom_outil}
            </Select.Option>
          ))}
        </Select>
      </div>
    <div className="input-field">
     <label htmlFor="duree_de_vie">Durée de Vie</label>
     <Input
       id="duree_de_vie"
       type="text"
       value={dureevierefroueoutil}
       readOnly
       placeholder="Durée de vie will populate automatically"
     />
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
        <label htmlFor="nom_outil">Réf Meule Hauteur</label>
        <Select
          id="nom_outil"
          placeholder="Select a tool"
          style={{ width: "100%" }}
          onChange={handleToolChangehauteur}
          value={selectedToolhauteur ? selectedToolhauteur.nom_outil : ''}
        >
          {tools.map((outil) => (
            <Select.Option key={outil.id} value={outil.nom_outil}>
              {outil.nom_outil}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div className="input-field">
      <label htmlFor="duree_de_vie">Durée de Vie</label>
     <Input
       id="duree_de_vie"
       type="text"
       value={dureevierefmeulehauteuroutil}
       readOnly
       placeholder="Durée de vie will populate automatically"
     />
     </div>
     </div>
         )}


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
          <label htmlFor="nom_outil">Réf Meule Largeur</label>
         <Select
          id="nom_outil"
          placeholder="Select a tool"
          style={{ width: "100%" }}
          onChange={handleToolChangelargeur}
          value={selectedToollargeur ? selectedToollargeur.nom_outil : ''}
        >
          {tools.map((outil) => (
            <Select.Option key={outil.id} value={outil.nom_outil}>
              {outil.nom_outil}
            </Select.Option>
          ))}
        </Select>
        </div>
        <div className="input-field">
        <label htmlFor="duree_de_vie">Durée de Vie</label>
       <Input
        id="duree_de_vie"
        type="text"
        value={dureevierefmeulelargeuroutil}
        readOnly
        placeholder="Durée de vie will populate automatically"
       />
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
          <label htmlFor="nom_outil">Réf Meule Chanfreins</label>
         <Select
          id="nom_outil"
          placeholder="Select a tool"
          style={{ width: "100%" }}
          onChange={handleToolChangechanfreins}
          value={selectedToolchanfreins ? selectedToolchanfreins.nom_outil : ''}
        >
          {tools.map((outil) => (
            <Select.Option key={outil.id} value={outil.nom_outil}>
              {outil.nom_outil}
            </Select.Option>
          ))}
        </Select>
        </div>
        <div className="input-field">
        <label htmlFor="duree_de_vie">Durée de Vie</label>
         <Input
          id="duree_de_vie"
          type="text"
          value={dureevierefmeulechanfrein}
          readOnly
          placeholder="Durée de vie will populate automatically"
       />
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
          <label htmlFor="nom_outil">Réf Meule Rainure</label>
         <Select
          id="nom_outil"
          placeholder="Select a tool"
          style={{ width: "100%" }}
          onChange={handleToolChangerainure}
          value={selectedToolrainure ? selectedToolrainure.nom_outil : ''}
        >
          {tools.map((outil) => (
            <Select.Option key={outil.id} value={outil.nom_outil}>
              {outil.nom_outil}
            </Select.Option>
          ))}
        </Select>
        </div>
        <div className="input-field">
        <label htmlFor="duree_de_vie">Durée de Vie</label>
         <Input
          id="duree_de_vie"
          type="text"
          value={dureevieoutillageusinagerainureoutil}
          readOnly
          placeholder="Durée de vie will populate automatically"
       />
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
          <label htmlFor="nom_outil">Réf Meule Rayonnage</label>
         <Select
          id="nom_outil"
          placeholder="Select a tool"
          style={{ width: "100%" }}
          onChange={handleToolChangerayonnage}
          value={selectedToolrayonnage ? selectedToolrayonnage.nom_outil : ''}
        >
          {tools.map((outil) => (
            <Select.Option key={outil.id} value={outil.nom_outil}>
              {outil.nom_outil}
            </Select.Option>
          ))}
        </Select>
          </div>
          <div className="input-field">
        <label htmlFor="duree_de_vie">Durée de Vie</label>
         <Input
          id="duree_de_vie"
          type="text"
          value={dureevierefmeulerayonnageoutil}
          readOnly
          placeholder="Durée de vie will populate automatically"
       />
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
          <label htmlFor="nom_outil">Outillage Usinage Tete</label>
         <Select
          id="nom_outil"
          placeholder="Select a tool"
          style={{ width: "100%" }}
          onChange={handleToolChangetete}
          value={selectedTooltete ? selectedTooltete.nom_outil : ''}
        >
          {tools.map((outil) => (
            <Select.Option key={outil.id} value={outil.nom_outil}>
              {outil.nom_outil}
            </Select.Option>
          ))}
        </Select>
          </div>
          <div className="input-field">
        <label htmlFor="duree_de_vie">Durée de Vie</label>
         <Input
          id="duree_de_vie"
          type="text"
          value={dureevieusinagetete}
          readOnly
          placeholder="Durée de vie will populate automatically"
       />
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
    setCurrentstep(4); // Move to the next step
  }} >
    Add another reference
  </Button>

  </div>
   </Form.Item>
</Form>
</motion.div>
  )}

{currentstep === 4 && (
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
        <label htmlFor="nom_outil">Réf roue</label>
        <Select
          id="nom_outil"
          placeholder="Select a tool"
          style={{ width: "100%" }}
          onChange={handleToolChange}
          value={selectedTool ? selectedTool.nom_outil : ''}
        >
          {tools.map((outil) => (
            <Select.Option key={outil.id} value={outil.nom_outil}>
              {outil.nom_outil}
            </Select.Option>
          ))}
        </Select>
      </div>
    <div className="input-field">
     <label htmlFor="duree_de_vie">Durée de Vie</label>
     <Input
       id="duree_de_vie"
       type="text"
       value={dureevierefroueoutil}
       readOnly
       placeholder="Durée de vie will populate automatically"
     />
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
        <label htmlFor="nom_outil">Réf Meule Hauteur</label>
        <Select
          id="nom_outil"
          placeholder="Select a tool"
          style={{ width: "100%" }}
          onChange={handleToolChangehauteur}
          value={selectedToolhauteur ? selectedToolhauteur.nom_outil : ''}
        >
          {tools.map((outil) => (
            <Select.Option key={outil.id} value={outil.nom_outil}>
              {outil.nom_outil}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div className="input-field">
      <label htmlFor="duree_de_vie">Durée de Vie</label>
     <Input
       id="duree_de_vie"
       type="text"
       value={dureevierefmeulehauteuroutil}
       readOnly
       placeholder="Durée de vie will populate automatically"
     />
     </div>
     </div>
         )}


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
          <label htmlFor="nom_outil">Réf Meule Largeur</label>
         <Select
          id="nom_outil"
          placeholder="Select a tool"
          style={{ width: "100%" }}
          onChange={handleToolChangelargeur}
          value={selectedToollargeur ? selectedToollargeur.nom_outil : ''}
        >
          {tools.map((outil) => (
            <Select.Option key={outil.id} value={outil.nom_outil}>
              {outil.nom_outil}
            </Select.Option>
          ))}
        </Select>
        </div>
        <div className="input-field">
        <label htmlFor="duree_de_vie">Durée de Vie</label>
       <Input
        id="duree_de_vie"
        type="text"
        value={dureevierefmeulelargeuroutil}
        readOnly
        placeholder="Durée de vie will populate automatically"
       />
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
          <label htmlFor="nom_outil">Réf Meule Chanfreins</label>
         <Select
          id="nom_outil"
          placeholder="Select a tool"
          style={{ width: "100%" }}
          onChange={handleToolChangechanfreins}
          value={selectedToolchanfreins ? selectedToolchanfreins.nom_outil : ''}
        >
          {tools.map((outil) => (
            <Select.Option key={outil.id} value={outil.nom_outil}>
              {outil.nom_outil}
            </Select.Option>
          ))}
        </Select>
        </div>
        <div className="input-field">
        <label htmlFor="duree_de_vie">Durée de Vie</label>
         <Input
          id="duree_de_vie"
          type="text"
          value={dureevierefmeulechanfrein}
          readOnly
          placeholder="Durée de vie will populate automatically"
       />
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
          <label htmlFor="nom_outil">Réf Meule Rainure</label>
         <Select
          id="nom_outil"
          placeholder="Select a tool"
          style={{ width: "100%" }}
          onChange={handleToolChangerainure}
          value={selectedToolrainure ? selectedToolrainure.nom_outil : ''}
        >
          {tools.map((outil) => (
            <Select.Option key={outil.id} value={outil.nom_outil}>
              {outil.nom_outil}
            </Select.Option>
          ))}
        </Select>
        </div>
        <div className="input-field">
        <label htmlFor="duree_de_vie">Durée de Vie</label>
         <Input
          id="duree_de_vie"
          type="text"
          value={dureevieoutillageusinagerainureoutil}
          readOnly
          placeholder="Durée de vie will populate automatically"
       />
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
          <label htmlFor="nom_outil">Réf Meule Rayonnage</label>
         <Select
          id="nom_outil"
          placeholder="Select a tool"
          style={{ width: "100%" }}
          onChange={handleToolChangerayonnage}
          value={selectedToolrayonnage ? selectedToolrayonnage.nom_outil : ''}
        >
          {tools.map((outil) => (
            <Select.Option key={outil.id} value={outil.nom_outil}>
              {outil.nom_outil}
            </Select.Option>
          ))}
        </Select>
          </div>
          <div className="input-field">
        <label htmlFor="duree_de_vie">Durée de Vie</label>
         <Input
          id="duree_de_vie"
          type="text"
          value={dureevierefmeulerayonnageoutil}
          readOnly
          placeholder="Durée de vie will populate automatically"
       />
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
          <label htmlFor="nom_outil">Outillage Usinage Tete</label>
         <Select
          id="nom_outil"
          placeholder="Select a tool"
          style={{ width: "100%" }}
          onChange={handleToolChangetete}
          value={selectedTooltete ? selectedTooltete.nom_outil : ''}
        >
          {tools.map((outil) => (
            <Select.Option key={outil.id} value={outil.nom_outil}>
              {outil.nom_outil}
            </Select.Option>
          ))}
        </Select>
          </div>
          <div className="input-field">
        <label htmlFor="duree_de_vie">Durée de Vie</label>
         <Input
          id="duree_de_vie"
          type="text"
          value={dureevieusinagetete}
          readOnly
          placeholder="Durée de vie will populate automatically"
       />
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
    setCurrentstep(5); // Move to the next step
  }} >
    Add another reference
  </Button>

  </div>
   </Form.Item>
</Form>
</motion.div>
  )}

{currentstep === 5 && (
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
        <label htmlFor="nom_outil">Réf roue</label>
        <Select
          id="nom_outil"
          placeholder="Select a tool"
          style={{ width: "100%" }}
          onChange={handleToolChange}
          value={selectedTool ? selectedTool.nom_outil : ''}
        >
          {tools.map((outil) => (
            <Select.Option key={outil.id} value={outil.nom_outil}>
              {outil.nom_outil}
            </Select.Option>
          ))}
        </Select>
      </div>
    <div className="input-field">
     <label htmlFor="duree_de_vie">Durée de Vie</label>
     <Input
       id="duree_de_vie"
       type="text"
       value={dureevierefroueoutil}
       readOnly
       placeholder="Durée de vie will populate automatically"
     />
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
        <label htmlFor="nom_outil">Réf Meule Hauteur</label>
        <Select
          id="nom_outil"
          placeholder="Select a tool"
          style={{ width: "100%" }}
          onChange={handleToolChangehauteur}
          value={selectedToolhauteur ? selectedToolhauteur.nom_outil : ''}
        >
          {tools.map((outil) => (
            <Select.Option key={outil.id} value={outil.nom_outil}>
              {outil.nom_outil}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div className="input-field">
      <label htmlFor="duree_de_vie">Durée de Vie</label>
     <Input
       id="duree_de_vie"
       type="text"
       value={dureevierefmeulehauteuroutil}
       readOnly
       placeholder="Durée de vie will populate automatically"
     />
     </div>
     </div>
         )}


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
          <label htmlFor="nom_outil">Réf Meule Largeur</label>
         <Select
          id="nom_outil"
          placeholder="Select a tool"
          style={{ width: "100%" }}
          onChange={handleToolChangelargeur}
          value={selectedToollargeur ? selectedToollargeur.nom_outil : ''}
        >
          {tools.map((outil) => (
            <Select.Option key={outil.id} value={outil.nom_outil}>
              {outil.nom_outil}
            </Select.Option>
          ))}
        </Select>
        </div>
        <div className="input-field">
        <label htmlFor="duree_de_vie">Durée de Vie</label>
       <Input
        id="duree_de_vie"
        type="text"
        value={dureevierefmeulelargeuroutil}
        readOnly
        placeholder="Durée de vie will populate automatically"
       />
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
          <label htmlFor="nom_outil">Réf Meule Chanfreins</label>
         <Select
          id="nom_outil"
          placeholder="Select a tool"
          style={{ width: "100%" }}
          onChange={handleToolChangechanfreins}
          value={selectedToolchanfreins ? selectedToolchanfreins.nom_outil : ''}
        >
          {tools.map((outil) => (
            <Select.Option key={outil.id} value={outil.nom_outil}>
              {outil.nom_outil}
            </Select.Option>
          ))}
        </Select>
        </div>
        <div className="input-field">
        <label htmlFor="duree_de_vie">Durée de Vie</label>
         <Input
          id="duree_de_vie"
          type="text"
          value={dureevierefmeulechanfrein}
          readOnly
          placeholder="Durée de vie will populate automatically"
       />
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
          <label htmlFor="nom_outil">Réf Meule Rainure</label>
         <Select
          id="nom_outil"
          placeholder="Select a tool"
          style={{ width: "100%" }}
          onChange={handleToolChangerainure}
          value={selectedToolrainure ? selectedToolrainure.nom_outil : ''}
        >
          {tools.map((outil) => (
            <Select.Option key={outil.id} value={outil.nom_outil}>
              {outil.nom_outil}
            </Select.Option>
          ))}
        </Select>
        </div>
        <div className="input-field">
        <label htmlFor="duree_de_vie">Durée de Vie</label>
         <Input
          id="duree_de_vie"
          type="text"
          value={dureevieoutillageusinagerainureoutil}
          readOnly
          placeholder="Durée de vie will populate automatically"
       />
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
          <label htmlFor="nom_outil">Réf Meule Rayonnage</label>
         <Select
          id="nom_outil"
          placeholder="Select a tool"
          style={{ width: "100%" }}
          onChange={handleToolChangerayonnage}
          value={selectedToolrayonnage ? selectedToolrayonnage.nom_outil : ''}
        >
          {tools.map((outil) => (
            <Select.Option key={outil.id} value={outil.nom_outil}>
              {outil.nom_outil}
            </Select.Option>
          ))}
        </Select>
          </div>
          <div className="input-field">
        <label htmlFor="duree_de_vie">Durée de Vie</label>
         <Input
          id="duree_de_vie"
          type="text"
          value={dureevierefmeulerayonnageoutil}
          readOnly
          placeholder="Durée de vie will populate automatically"
       />
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
          <label htmlFor="nom_outil">Outillage Usinage Tete</label>
         <Select
          id="nom_outil"
          placeholder="Select a tool"
          style={{ width: "100%" }}
          onChange={handleToolChangetete}
          value={selectedTooltete ? selectedTooltete.nom_outil : ''}
        >
          {tools.map((outil) => (
            <Select.Option key={outil.id} value={outil.nom_outil}>
              {outil.nom_outil}
            </Select.Option>
          ))}
        </Select>
          </div>
          <div className="input-field">
        <label htmlFor="duree_de_vie">Durée de Vie</label>
         <Input
          id="duree_de_vie"
          type="text"
          value={dureevieusinagetete}
          readOnly
          placeholder="Durée de vie will populate automatically"
       />
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
  </div>
   </Form.Item>
</Form>
</motion.div>
  )}
      </div>
      </AnimatePresence>
    </div>
  );
  
};

export default Ajouternouvellemachine; 
