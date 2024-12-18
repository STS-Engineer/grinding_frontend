import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import { Modal, Input, Select, message, Checkbox, Row, Col, DatePicker  } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import {moment} from 'moment';
import './calendar.css'

const { Option } = Select;

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const { RangePicker } = DatePicker;
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalVisible, setIsModalvisible] = useState(false);
  const [machines, setMachines] = useState([]);
  const [isMachinesLoaded, setIsMachinesLoaded] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false); // Modal for adding events
  const [newEventData, setNewEventData] = useState({
    id_machine: '',
    date_creation: '',
    phasechargement: '',
    shift: '',
    shift2: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
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
    const [selectedOperators, setSelectedOperators] = useState([]);
    const [compteur,setCompteur] = useState([]);
    const [startDate, setStartDate] = useState(new Date('2024-12-01'));
    const [endDate, setEndDate] = useState(new Date('2024-12-31'));
    const [plannifications, setPlannifications] = useState([]);



  // Fetch machines on mount
  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await axios.get('http://localhost:4000/ajouter/machines', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setMachines(response.data);
        setIsMachinesLoaded(true);
      } catch (error) {
        console.error('Error fetching machines:', error);
      }
    };

    fetchMachines();
    const fetchoperateur = async()=>{
      try {
        const response = await axios.get("http://localhost:4000/ajouter/getoperateurs");
        setOperateurs(response.data.operateurs);
        console.log(response.data);

      } catch (error){
        console.error("Error fetching data:", error);

      }
    }
    fetchoperateur();
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


  
  const handleMachineSelect = (machine) => {
    setSelectedMachine(machine);
    console.log('Selected Machine:', machine); // Debugg
    setCurrentStep(2);
  };

  const handleCheckboxChange = (checkedvalues) => {
    

    if (checkedvalues.includes("-1")){
      setCompteur(compteur+1);
    }
  // Update the selected operators (excluding -1)
  setSelectedOperators(checkedvalues.filter(value=>value !== "-1"));

    
  };

  const getNotAffectedOperators = () => {
    // If all operators are selected, show -1
    if (selectedOperators.length === operateurs.length) {
      return '-1';
    }

    // Otherwise, return the names of operators that are not affected
    return operateurs
      .filter((operator) => !selectedOperators.includes(operator.id))
      .map((operator) => operator.prenom)
      .join(', ');
  };


  // Fetch events whenever the start date, end date, or machines change
  useEffect(() => {
    if (isMachinesLoaded) {
      fetchEvents(startDate, endDate);
    }
  }, [isMachinesLoaded, startDate, endDate]);
 // Function to fetch events based on the selected date range
 const fetchEvents = async (startDate, endDate) => {
  try {
    // Format dates to match your backend format (YYYY-MM-DD)
    const formattedStartDate = startDate.toISOString().split('T')[0]; 
    const formattedEndDate = endDate.toISOString().split('T')[0];

    // Send the start_date and end_date as query parameters
    const response = await axios.get("http://localhost:4000/ajouter/plannifications", {
      params: {
        start_date: formattedStartDate,
        end_date: formattedEndDate,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const eventsData = [];
    
    // Log machines and events for debugging
    console.log('Machines:', machines); 
    console.log('Fetched Events:', response.data);

    // Loop through the fetched events and add them to eventsData
    response.data.forEach((event) => {
      // Find the machine using id_machine from the event
      const machine = machines.find((m) => m.id_machine === event.id_machine);
      console.log('machinenom',machine.nom);
      
      // Log machine and event data for debugging
      console.log(`Event ID: ${event.id}, Machine ID: ${machine.id}, Machine:`, machine);

      const eventStartDate = new Date(event.start_date);
      const eventEndDate = new Date(event.end_date);
      
      if (isNaN(eventStartDate.getTime()) || isNaN(eventEndDate.getTime())) {
        console.error('Invalid event date:', event);
        return;
      }

      // Check if the event is within the selected date range
      if (
        (eventStartDate >= startDate && eventStartDate <= endDate) || 
        (eventEndDate >= startDate && eventEndDate <= endDate)
      ) {
        eventsData.push({
          id: event.id,
          title: machine ? machine.nom : "Unknown Machine", // Check if machine is found
          start: event.start_date, // Use event's start date
          end: event.end_date, // Use event's end date
          extendedProps: {
            phasechargement: event.phasechargement,
            shift: event.shift,
            shift2: event.shift2,
            start_date: event.start_date,
            end_date: event.end_date,
          },
        });
      }
    });

    // Set the events data after filtering
    setEvents(eventsData);
    console.log('Processed Events:', eventsData); // Log the processed events data for verification
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};


// Fetch events when the component mounts or when the date range changes
useEffect(() => {
  fetchEvents(startDate, endDate);
}, [startDate, endDate]); // Re-run when startDate or endDate changes

  
  
  
  
  
  
  

  
  

  const onclose = () => {
    setIsModalvisible(false);
  };

  const handleEventClick = (clickInfo) => {
    const { id, title, extendedProps } = clickInfo.event;

    setSelectedEvent({
      id,
      title,
      phasechargement: extendedProps.phasechargement,
      id_operateur: extendedProps.id_operateur,
      shift: extendedProps.shift,
      shift2: extendedProps.shift2,
    });
    setIsModalvisible(true);
  };

  // Open modal to add a new plannification
  const handleDateClick = (info) => {
    setNewEventData((prev) => ({ ...prev, date_creation: info.dateStr }));
    setIsAddModalVisible(true);
  };

   // Handle reference selection
   const handleReferenceSelect = (value) => {
    setSelectedReference(value);
  };

  // Submit new plannification
  const handleAddEvent = async () => {
    setLoading(true);
  
    // Ensure startDate and endDate are provided
    if (!startDate || !endDate) {
      message.error("Please select a valid start and end date for plannification.");
      return;
    }
  
    try {
      // Function to generate plannification dates (weekly)
      const generateWeeklyDates = (start, end) => {
        const dates = [];
        let currentDate = new Date(start);
  
        while (currentDate <= new Date(end)) {
          dates.push(new Date(currentDate).toISOString().split("T")[0]); // Format as YYYY-MM-DD
          currentDate.setDate(currentDate.getDate() + 7); // Move to next week
        }
  
        return dates;
      };
  
      // Generate all weekly dates within the range
      const plannificationDates = generateWeeklyDates(startDate, endDate);
  
      // Loop through the dates and send plannification requests
      for (const date of plannificationDates) {
        const plannificationData = {
          phasechargement: phasechargement,
          id_machine: selectedMachine.id,
          id_operateur: operateurs.id,
          phasereguleur: phasereguleur,
          operateur_reguleur: operateurreguleur,
          phasecsl: phasecsl,
          operateur_csl: operateur_csl,
          phasecf: phasecf,
          operateur_cf: operateur_cf,
          operateur_chargement: operateurchargement,
          totalplanifie: totalproduction,
          nombre_heure_shift1: nombre_heure_shift1,
          nombre_heure_shift2: nombre_heure_shift2,
          shift: shift,
          shift2: shift2,
          phasechargementshif2: phasechargementshif2,
          operateurchargementshift2: operateurchargementshift2,
          phasereguleurshif2: phasereguleurshif2,
          operateur_reguleurshif2: operateur_reguleurshif2,
          phasecslshift2: phasecslshift2,
          operateurcslshift2: operateurcslshift2,
          phasecfshift2: phasecfshift2,
          operateurcfshift2: operateurcfshift2,
          objectiveproductionshift2: totalproductionshift2,
          objectivecslshift2: totalcslshift2,
          objectivecfshift2: totalcfshift2,
          totalproduction: totalproduction,
          objectivecf: totalcf,
          objectivecsl: totalcsl,
          nombredemanqueoperateur: compteur,
          start_date: date,  // Add the plannification date here
          end_date: endDate,   // Add end_date field for duplication
        };
  
        // Send request for each weekly plannification
        await axios.post("http://localhost:4000/ajouter/plannification", plannificationData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
      }
  
      message.success("Plannifications added successfully!");
      setIsModalvisible(false);
    } catch (error) {
      message.error("Failed to add plannifications.");
      console.error(error); // Log error for debugging
    } finally {
      setLoading(false);
    }
  };
  // Function to generate the date range
  const generateDateRange = (start, end) => {
    let dates = [];
    let currentDate = moment(start);
    const endDateObj = moment(end);

    while (currentDate <= endDateObj) {
      dates.push(currentDate.format('YYYY-MM-DD'));
      currentDate = currentDate.add(1, 'days');
    }

    return dates;
  };

  const handleDateRangeChange = (dates, dateStrings) => {
    setStartDate(dateStrings[0]);
    setEndDate(dateStrings[1]);
  };

  const handleDuplicatePlannifications = () => {
    const datesInRange = generateDateRange(startDate, endDate);
    const newPlannifications = datesInRange.map(date => ({
      date,
      // Other data that you want to associate with each planning entry
      shift1: nombre_heure_shift1,
      shift2: nombre_heure_shift2,
      // Add any other necessary fields here
    }));

    // Save all duplicated plannifications
    setPlannifications(newPlannifications);
  };
  



  return (
    <div>
     <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        editable={true}
        selectable={true}
        eventClick={handleEventClick}
        dateClick={handleDateClick} // Open modal on date click
      />
      {/* Event Details Modal */}
      <Modal visible={isModalVisible} onOk={onclose} onCancel={onclose}>
        {selectedEvent && (
          <div>
            <h3>Event Details</h3>
            <p><strong>Title:</strong> {selectedEvent.title}</p>
            <p><strong>Phase Chargement:</strong> {selectedEvent.phasechargement}</p>
            <p><strong>ID Operateur:</strong> {selectedEvent.id_operateur || 'N/A'}</p>
            <p><strong>Shift:</strong> {selectedEvent.shift}</p>
            <p><strong>Shift 2:</strong> {selectedEvent.shift2}</p>
          </div>
        )}
      </Modal>

      {/* Add Plannification Modal */}
      <Modal
      title="Add Plannification"
      visible={isAddModalVisible}  // Make sure this is the correct state
      confirmLoading={loading}
      onCancel={() => setIsAddModalVisible(false)} // Ensure this matches the correct state setter
      footer={null}  // This removes the OK and Cancel buttons
      >

<motion.div
key="step1"
initial={{ opacity: 0, y: -20 }}
animate={{ opacity: 3, y: 0 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.5 }}
>
  {currentStep === 1 && (
 <div className="machine-buttons">
{machines.map((machine)=>(
  <button key={machine.id_machine} onClick={() => handleMachineSelect(machine)}>
  {machine.nom}
</button>
))}
  

</div> 

  )}
  
</motion.div>



{selectedMachine && (

<AnimatePresence mode="wait">
<motion.div
key="step2"
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.5 }}
>  
{currentStep === 2 && (  
<div>  

   {/* Plannification Date Range */}
   <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontWeight: 'bold' }}>Plannification Date Range:</label>
                    <RangePicker
                      onChange={handleDateRangeChange}
                      format="YYYY-MM-DD"
                      style={{ width: '100%' }}
                    />
                  </div>

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


      <div className="input-field">
        <Checkbox.Group
         style={{ width: '100%' }}
         value={shift}
         onChange={(value)=>setShift(value)}
       >
         <Checkbox value="shift1">Shift1</Checkbox>
     
        
       </Checkbox.Group>
    </div>
  
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

    <div>
    <div className="input-field">
    <label>Objective Production</label>
      <input type="number" value={totalproduction} readOnly />
    </div>
    <div className="operateur-select">
      <h3>Select Operators</h3>
     
      <Checkbox.Group   value={selectedOperators}
        onChange={handleCheckboxChange}
        style={{ width: '100%' }}>
      {operateurs.map((operateur)=>(
         <Row>
           <Col span={8}>
             <Checkbox key={operateur.id} value={operateur.nom}>{operateur.nom}</Checkbox>
        
           </Col>
          
         </Row>
       
      ))}
      </Checkbox.Group>

       <Checkbox.Group style={{ width: '100%' }}>
         <Row>
           <Col span={8}>
             <Checkbox >-1</Checkbox>
           </Col>
          
         </Row>
       </Checkbox.Group>
     

      {/* Display selected operators */}
      <div>
        {/* Display the names of unaffected operators or -1 if all are affected */}
        <p>Not Affected: {getNotAffectedOperators()}</p>
      </div>

    </div>
    </div>
  
       
     
           <div className="input-field">
            <Checkbox.Group
                 style={{ width: '100%'}}
                 value={phasereguleur}
                 onChange={(value)=>setPhasereguleur(value)}
               >
                <Checkbox value="reguleur">Phase Reguleur</Checkbox>
               </Checkbox.Group>
           </div> 
     
  
       
     <Checkbox.Group   value={selectedOperators}
        onChange={handleCheckboxChange}
        style={{ width: '100%' }}>
      {operateurs.map((operateur)=>(
         <Row>
           <Col span={8}>
             <Checkbox key={operateur.id} value={operateur.nom}>{operateur.nom}</Checkbox>
        
           </Col>
          
         </Row>
       
      ))}
      </Checkbox.Group>

       <Checkbox.Group style={{ width: '100%' }}>
         <Row>
           <Col span={8}>
             <Checkbox >-1</Checkbox>
           </Col>
          
         </Row>
       </Checkbox.Group>
     
            
    
        
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
  
 
      <div>
                    
    <div className="input-field">
    <label>Objective CF</label>
      <input type="number" value={totalcf} readOnly />
    </div>
    <Checkbox.Group   value={selectedOperators}
        onChange={handleCheckboxChange}
        style={{ width: '100%' }}>
      {operateurs.map((operateur)=>(
         <Row>
           <Col span={8}>
             <Checkbox key={operateur.id} value={operateur.nom}>{operateur.nom}</Checkbox>
        
           </Col>
          
         </Row>
       
      ))}
      </Checkbox.Group>

       <Checkbox.Group style={{ width: '100%' }}>
         <Row>
           <Col span={8}>
             <Checkbox >-1</Checkbox>
           </Col>
          
         </Row>
       </Checkbox.Group>
      </div>
 
  
        <div className="input-field">
        <Checkbox.Group
             style={{ width: '100%'}}
             value={phasecsl}
             onChange={(value)=>setPhasecsl(value)}
           >
            <Checkbox value="csl">Phase CSL</Checkbox>
           </Checkbox.Group>
       </div> 
    

  
  

      <div>
      <div className="input-field">
      <label>Objective CSL</label>
      <input type="number" value={totalcsl} readOnly />
      </div>
      <Checkbox.Group   value={selectedOperators}
        onChange={handleCheckboxChange}
        style={{ width: '100%' }}>
      {operateurs.map((operateur)=>(
         <Row>
           <Col span={8}>
             <Checkbox key={operateur.id} value={operateur.nom}>{operateur.nom}</Checkbox>
        
           </Col>
          
         </Row>
       
      ))}
      </Checkbox.Group>

       <Checkbox.Group style={{ width: '100%' }}>
         <Row>
           <Col span={8}>
             <Checkbox >-1</Checkbox>
           </Col>
          
         </Row>
       </Checkbox.Group>
      </div>
           
   




    <div className="button-step1">
      <button className="custom-button" onClick={()=>setCurrentStep(3)}>Next To plannify shift 2</button>
    </div>
    </div>
    </div>
 
  )}
  </motion.div>


<motion.div
key="step3"
initial={{ opacity: 0, y: -20 }}
animate={{ opacity: 3, y: 0 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.5 }}
>        
{currentStep === 3 && (  

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



    <div className="input-field">
    <Checkbox.Group
         style={{ width: '100%'}}
         value={phasechargementshif2}
         onChange={(value)=>setPhasechargementshif2(value)}
       >
        <Checkbox value="Chargementshift2">Phase Chargement</Checkbox>
         
        
       </Checkbox.Group>
   </div> 



<div>
<div className="input-field">
<label>Objective Production</label>
<input type="number" value={totalproductionshift2} readOnly />
</div>
<Checkbox.Group   value={selectedOperators}
        onChange={handleCheckboxChange}
        style={{ width: '100%' }}>
      {operateurs.map((operateur)=>(
         <Row>
           <Col span={8}>
             <Checkbox key={operateur.id} value={operateur.nom}>{operateur.nom}</Checkbox>
        
           </Col>
          
         </Row>
       
      ))}
      </Checkbox.Group>

       <Checkbox.Group style={{ width: '100%' }}>
         <Row>
           <Col span={8}>
             <Checkbox >-1</Checkbox>
           </Col>
          
         </Row>
       </Checkbox.Group>
</div>



   <div className="input-field">
    <Checkbox.Group
         style={{ width: '100%'}}
         value={phasereguleurshif2}
         onChange={(value)=>setPhasereguleurshif2(value)}
       >
        <Checkbox value="reguleur">Phase Reguleur</Checkbox>
       </Checkbox.Group>
   </div> 




   <Checkbox.Group   value={selectedOperators}
        onChange={handleCheckboxChange}
        style={{ width: '100%' }}>
      {operateurs.map((operateur)=>(
         <Row>
           <Col span={8}>
             <Checkbox key={operateur.id} value={operateur.nom}>{operateur.nom}</Checkbox>
        
           </Col>
          
         </Row>
       
      ))}
      </Checkbox.Group>

       <Checkbox.Group style={{ width: '100%' }}>
         <Row>
           <Col span={8}>
             <Checkbox >-1</Checkbox>
           </Col>
          
         </Row>
       </Checkbox.Group>

     

   <div className="input-field">
   <Checkbox.Group
        style={{ width: '100%'}}
        value={phasecfshift2}
        onChange={(value)=>setPhasecfshift2(value)}
      >
       <Checkbox value="cfshift2">Phase CF</Checkbox>
      </Checkbox.Group>
  </div> 



<div>
<div className="input-field">
<label>Objective CF</label>
<input type="number" value={totalcfshift2} readOnly />
</div>
<Checkbox.Group   value={selectedOperators}
        onChange={handleCheckboxChange}
        style={{ width: '100%' }}>
      {operateurs.map((operateur)=>(
         <Row>
           <Col span={8}>
             <Checkbox key={operateur.id} value={operateur.nom}>{operateur.nom}</Checkbox>
        
           </Col>
          
         </Row>
       
      ))}
      </Checkbox.Group>

       <Checkbox.Group style={{ width: '100%' }}>
         <Row>
           <Col span={8}>
             <Checkbox >-1</Checkbox>
           </Col>
          
         </Row>
       </Checkbox.Group>
</div>



<div className="input-field">
<Checkbox.Group
     style={{ width: '100%'}}
     value={phasecslshift2}
     onChange={(value)=>setPhasecslshift2(value)}
   >
    <Checkbox value="cslshift2">Phase CSL</Checkbox>
   </Checkbox.Group>
</div> 




<div>

<div className="input-field">
<label>Objective CSL</label>
<input type="number" value={totalcslshift2} readOnly />
</div>
<Checkbox.Group   value={selectedOperators}
        onChange={handleCheckboxChange}
        style={{ width: '100%' }}>
      {operateurs.map((operateur)=>(
         <Row>
           <Col span={8}>
             <Checkbox key={operateur.id} value={operateur.nom}>{operateur.nom}</Checkbox>
        
           </Col>
          
         </Row>
       
      ))}
      </Checkbox.Group>

       <Checkbox.Group style={{ width: '100%' }}>
         <Row>
           <Col span={8}>
             <Checkbox >-1</Checkbox>
           </Col>
          
         </Row>
       </Checkbox.Group>
</div>


<div className="button-container">
<button className="custom-button" onClick={()=>handleAddEvent()}>Submit</button>
<button className="custom-button" onClick={()=>onclose}>Back</button>
</div>
</div>
  </div>
  )}
  </motion.div>
  </AnimatePresence>  
  )} 
       
         <div>
       </div>
        </Modal>
    </div>
  );
};

export default Calendar;
