import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import { Modal, Input, Select, message, Checkbox, Row, Col, DatePicker, InputNumber  } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { MultiSelect } from 'react-multi-select-component';
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
    const [operateurs, setOperateurs] = useState([]);
    const [shift, setShift] = useState('');
    const [shift2, setShift2] = useState('');
    const [phasechargement, setPhasechargement] = useState('');
    const [operateurchargement, setOperateurchargement] = useState(null);
    const [phasereguleur, setPhasereguleur] = useState('');
    const [operateurreguleur, setOperateurreguleur] = useState([]);
    const [operateurchargementshift1, setOperateurchargementshift1] = useState([]);
    const [operateurchargementshift2, setOperateurchargementshift2] = useState([]);
    const [operateurregleurshift1, setOperateurregleurshift1] = useState([]);
    const [operateurregleurshift2, setOperateurregleurshift2] = useState([]);
    const [operateurcfshift1, setOperateurcfshift1] = useState([]);
    const [operateurcfshift2, setOperateurcfshift2] = useState([]);
    const [operateurcslshift1, setOperateurcslshift1] = useState([]);
    const [operateurcslshift2, setOperateurcslshift2] = useState([]);
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
    const [phasereguleurshif2, setPhasereguleurshif2] = useState('');
    const [operateur_reguleurshif2, setOperateur_reguleurshif2] = useState(null);
    const [phasecslshift2, setPhasecslshift2] = useState('');
    const [phasecfshift2, setPhasecfshift2] = useState('');
    const [startDate, setStartDate] = useState(new Date('2024-12-31'));
    const [endDate, setEndDate] = useState(new Date(''));
    const [productionShift1, setproductionShift1] = useState(0);
    const [reguleurShift1, setReguleurShift1] = useState(0); // State for the first input
    const [cfShift1, setCfShift1] = useState(0); // State for the second input
    const [cslShift1, setCSLShift1] = useState(0); 
    const [productionShift2, setproductionShift2] = useState(0);
    const [reguleurShift2, setReguleurShift2] = useState(0); // State for the first input
    const [cfShift2, setCfShift2] = useState(0); // State for the second input
    const [cslShift2, setCSLShift2] = useState(0); 
    const [selectedDates, setSelectedDates] = useState([]);
    const [regleurs, setRegleurs]= useState([]);
    const [disabledRegleurs, setDisabledRegleurs] = useState([]); // Tracks disabled regleurs and their ranges
    const [manquechrgementshift1, setManquechargementshift1] = useState(0);
    const [manqueregleurshift1, setManqueregleurshift1] = useState(0);
    const [manquecfshift1, setManquecfshift1] = useState(0);
    const [manquecslshift1, setManquecslshift1] = useState(0);
    const [manquechargementshift2, setManquechargementshift2] = useState(0);
    const [manqueregleurshift2, setManqueregleurshift2] = useState(0);
    const [manquecfshift2, setManquecfshift2] = useState(0);
    const [manquecslshift2, setManquecslshift2] = useState(0);
    const [hasFetched, setHasFetched] = useState(false);
    const [shouldFetchEvents, setShouldFetchEvents] = useState(() => {
      const storedValue = localStorage.getItem("shouldevent1");
      return storedValue === null ? true : JSON.parse(storedValue); // Default to true if not found
    });
    
    


  

  const fetchMachines = async () => {
      try {
        const response = await axios.get('https://grinding-backend.azurewebsites.net/ajouter/machines', {
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
  // Fetch machines on mount
  useEffect(() => {


    fetchMachines();
    const fetchoperateur = async()=>{
      try {
        const response = await axios.get("https://grinding-backend.azurewebsites.net/ajouter/getoperateurs");
        setOperateurs(response.data.operateurs);
        console.log(response.data);

      } catch (error){
        console.error("Error fetching data:", error);

      }
    }


    const fetchregleur = async()=>{
      try{

        const response = await axios.get("https://grinding-backend.azurewebsites.net/ajouter/getregleur", {
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
        console.log(response.data.regleurs);
        setRegleurs(response.data.regleurs);

      } catch(error){
        console.error("Error fetching data:", error);
      }
    }
    fetchoperateur();
    fetchregleur();
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
         
          totalproduction = selectedMachine.cadence_horaire * nombre_heure_shift1;
         
         
          totalcf = selectedMachine.cadence_horaire_cf * nombre_heure_shift1;
         
        
          totalcsl = selectedMachine.cadence_horaire_csl * nombre_heure_shift1;
        
        
          totalproductionshift2 = selectedMachine.cadence_horaire * nombre_heure_shift2;
        
         
          totalcfshift2 = selectedMachine.cadence_horaire_cf * nombre_heure_shift2;
         
         
          totalcslshift2 = selectedMachine.cadence_horaire_csl * nombre_heure_shift2;
         
        
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
        const machinereponse = await axios.get("https://grinding-backend.azurewebsites.net/ajouter/machines");
        setMachines(machinereponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchoperateur = async()=>{
      try {
        const response = await axios.get("https://grinding-backend.azurewebsites.net/ajouter/getoperateurs");
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

  const totalmanqueoperateurshift1 = productionShift1 + reguleurShift1 + cfShift1 +cslShift1;
   const totalmanqueoperateurshift2 = productionShift2 + reguleurShift2 + cfShift2 +cslShift2;
  useEffect(()=>{

  },[productionShift1, reguleurShift1, cfShift1,cslShift1, productionShift2, reguleurShift2, cfShift2, cslShift2   ]);


  console.log(totalmanqueoperateurshift1);
  console.log(totalmanqueoperateurshift2);


  
 // Handling machine selection
const handleMachineSelect = (machine) => {
  setSelectedMachine(machine);
  console.log('Selected Machine:', machine); // Debugging
  setCurrentStep(2);
  fetchEvents(startDate, endDate, machine.id_machine);  // Fetch events for selected machine
};
 // Disable the dates that are already selected in the dropdown
 const disabledDate = (current) => {
  // Disable dates that are already selected in the dropdown
  return selectedDates.some(date => current.isSame(date, 'day'));
};
useEffect(() => {
  // Only fetch events if the machines are loaded and shouldFetchEvents is true
  if (isMachinesLoaded && shouldFetchEvents) {
    // Pass machineId to fetch one event, you can adjust this as needed
    const machineId = selectedMachine?.id || null;
    fetchEvents(startDate, endDate, machineId);  // Fetch events based on machineId and dates
    console.log("Fetching one event as shouldFetchEvents is ", shouldFetchEvents);
    
    // After fetching, set shouldFetchEvents to false to avoid repeated fetches
    setShouldFetchEvents(false);
  } else {
    console.log("Skipping fetch because shouldFetchEvents is false");
  }
}, [isMachinesLoaded, startDate, endDate, shouldFetchEvents]);
useEffect(() => {
  // Only fetch events if shouldFetchEvents is true
  if (shouldFetchEvents) {
    const fetchNewEvents = async () => {
      try {
        // Fetch events using the new start and end date
        await fetchEvents(new Date(startDate), new Date(endDate));
        setShouldFetchEvents(false); // Reset after fetching
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchNewEvents();
  }
}, [shouldFetchEvents]); // Trigger effect when shouldFetchEvents changes


const fetchEvents = async (startDate, endDate, machineId = null) => {
  try {
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    // If machineId is provided, fetch only events for that machine
    const response = await axios.get("https://grinding-backend.azurewebsites.net/ajouter/plannifications", {
      params: {
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        machine_id: machineId,  // This filters events based on the selected machine
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // Assuming the API returns an array of events for the specified machine and date range
    const eventsData = response.data.map((event) => ({
      id: event.id,
      title: event.machine_name || "Unknown Machine",
      referenceproduit: event.referenceproduit,
      start: formatDate(new Date(event.start_date)),
      end: formatDate(new Date(event.end_date)),
      extendedProps: {
        phasechargement: event.phasechargement,
        shift: event.shift,
        shift2: event.shift2,
      },
    }));

    // Assuming you want to update the calendar with only the new event(s)
    setEvents(eventsData);  // This will overwrite the existing events
    setShouldFetchEvents(true);
    console.log(eventsData);
    
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};


  const onclose = () => {
    setIsModalvisible(false);
  };

  const handleEventClick = (clickInfo) => {
    const { id, title } = clickInfo.event;
    const { referenceproduit } = clickInfo.event.extendedProps;

    setSelectedEvent({
      id,
      title,
      referenceproduit
    
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


 
  const handleAddEvent = async () => {
    console.log("handleAddEvent triggered");
  
    setLoading(true);
  
    if (!startDate || !endDate) {
      message.error("Please select a valid start and end date for plannification.");
      setLoading(false);
      return;
    }
  
    try {
      const plannificationData = {
        phase: phasechargement,
        id_machine: selectedMachine.id,
        id_operateur: operateurs.id,
        phasereguleur: phasereguleur,
        operateurs: operateurchargementshift1.join(', '),
        phasecsl: phasecsl,
        operateur_chargement: operateurchargement,
        totalplanifie: totalproduction,
        nombre_heure_shift1: nombre_heure_shift1,
        nombre_heure_shift2: nombre_heure_shift2,
        shift: shift,
        nombredemanqueoperateur: manquechrgementshift1,
        start_date: startDate,
        end_date: endDate,
        referenceproduit: selectedReference,
      };
  
      const response = await axios.post("https://grinding-backend.azurewebsites.net/ajouter/plannification", plannificationData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
  
      console.log("Event added successfully:", response.data);
  
      // Store the added event ID in localStorage to avoid fetching it again
      const eventId = selectedMachine.id;  // You can use the machine ID or any unique identifier for the event
      const addedEvents = JSON.parse(localStorage.getItem('addedEvents')) || [];
      addedEvents.push(eventId);
      localStorage.setItem('addedEvents', JSON.stringify(addedEvents));
  
      // Update state to stop fetching events
      setShouldFetchEvents(false);  // Stop fetching events
      setCurrentStep(3);  // Move to next step after adding event
      console.log("Event added successfully. No fetch triggered.");
  
    } catch (error) {
      message.error("Failed to add plannifications.");
      console.error("Error adding event:", error);
    } finally {
      setLoading(false);
      console.log("handleAddEvent finished.");
    }
  };
  
  
  const handleAddEvent2 = async () => {
    setLoading(true);
  
    if (!startDate || !endDate) {
      message.error("Please select a valid start and end date for plannification.");
      return;
    }
  
    try {
      const plannificationData = {
        phase: phasechargement,
        id_machine: selectedMachine.id,
        id_operateur: operateurs.id,
        phasereguleur: phasereguleur,
        operateurs: operateurregleurshift1.join(', '),
        phasecsl: phasecsl,
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
        objectivecf: totalcf,
        objectivecsl: totalcsl,
        nombredemanqueoperateur: manqueregleurshift1,
        start_date: startDate,
        end_date: endDate,
        referenceproduit: selectedReference,
      };
  
      await axios.post("https://grinding-backend.azurewebsites.net/ajouter/plannification", plannificationData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
  
      // Store the added event ID in localStorage to avoid fetching it again
      const eventId = selectedMachine.id;  // You can use the machine ID or any unique identifier for the event
      const addedEvents = JSON.parse(localStorage.getItem('addedEvents')) || [];
      addedEvents.push(eventId);
      localStorage.setItem('addedEvents', JSON.stringify(addedEvents));
  
      // Update disabled regleurs after successful submission
      const newDisabledEntries = operateurregleurshift1.map((regleur) => ({
        regleur,
        startDate,
        endDate,
      }));
      setDisabledRegleurs([...disabledRegleurs, ...newDisabledEntries]);
      setOperateurregleurshift1([]);
      setShouldFetchEvents(false);  // Stop fetching events
      setCurrentStep(4);
  
    } catch (error) {
      message.error("Failed to add plannifications.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleAddEvent3 = async () => {
    setLoading(true);
  
    // Ensure startDate and endDate are provided
    if (!startDate || !endDate) {
      message.error("Please select a valid start and end date for plannification.");
      return;
    }
  
    try {
  
      
      
        const plannificationData = {
          phase: phasechargement,
          id_machine: selectedMachine.id,
          id_operateur: operateurs.id,
          phasereguleur: phasereguleur,
          operateurs: operateurcfshift1.join(', '),
          phasecsl: phasecsl,
          operateur_csl: operateur_csl,
          phasecf: phasecf,
          operateur_cf: operateur_cf,
          operateur_chargement: operateurchargement,
          totalplanifie: totalcf,
          nombre_heure_shift1: nombre_heure_shift1,
          nombre_heure_shift2: nombre_heure_shift2,
          shift: shift,
          nombredemanqueoperateur: manquecfshift1,
          start_date: startDate,  // Add the plannification date here
          end_date: endDate,   // Add end_date field for duplication
          referenceproduit: selectedReference
        };
  
        // Send request for each weekly plannification
        await axios.post("https://grinding-backend.azurewebsites.net/ajouter/plannification", plannificationData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
      
      setShouldFetchEvents(false);
      setCurrentStep(5);
      
    } catch (error) {
      message.error("Failed to add plannifications.");
      console.error(error); // Log error for debugging
    } finally {
      setLoading(false);
    }
  };


  const handleAddEvent4 = async () => {
    setLoading(true);
  
    // Ensure startDate and endDate are provided
    if (!startDate || !endDate) {
      message.error("Please select a valid start and end date for plannification.");
      return;
    }
  
    try {
     
        const plannificationData = {
          phase: phasechargement,
          id_machine: selectedMachine.id,
          id_operateur: operateurs.id,
          phasereguleur: phasereguleur,
          operateurs: operateurcslshift1.join(', '),
          phasecsl: phasecsl,
          operateur_csl: operateur_csl,
          phasecf: phasecf,
          operateur_cf: operateur_cf,
          operateur_chargement: operateurchargement,
          totalplanifie: totalcsl,
          nombre_heure_shift1: nombre_heure_shift1,
          nombre_heure_shift2: nombre_heure_shift2,
          shift: shift,
          nombredemanqueoperateur: manquecslshift1,
          start_date: startDate,  // Add the plannification date here
          end_date: endDate,   // Add end_date field for duplication
          referenceproduit: selectedReference
        };
  
        // Send request for each weekly plannification
        await axios.post("https://grinding-backend.azurewebsites.net/ajouter/plannification", plannificationData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
      setShouldFetchEvents(false);
      setCurrentStep(6);
    
    } catch (error) {
      message.error("Failed to add plannifications.");
      console.error(error); // Log error for debugging
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent5 = async () => {
    setLoading(true);
  
    // Ensure startDate and endDate are provided
    if (!startDate || !endDate) {
      message.error("Please select a valid start and end date for plannification.");
      return;
    }
  
    try {

        const plannificationData = {
          phase: phasechargementshif2,
          id_machine: selectedMachine.id,
          id_operateur: operateurs.id,
          phasereguleur: phasereguleur,
          operateurs: operateurchargementshift2.join(', '),
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
          objectivecf: totalcf,
          objectivecsl: totalcsl,
          nombredemanqueoperateur: manquechargementshift2,
          start_date: startDate,  // Add the plannification date here
          end_date: endDate,   // Add end_date field for duplication
          referenceproduit: selectedReference
        };
  
        // Send request for each weekly plannification
        await axios.post("https://grinding-backend.azurewebsites.net/ajouter/plannification", plannificationData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
      setShouldFetchEvents(false);
      setCurrentStep(7);
   
    } catch (error) {
      message.error("Failed to add plannifications.");
      console.error(error); // Log error for debugging
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent6 = async () => {
    setLoading(true);
  
    // Ensure startDate and endDate are provided
    if (!startDate || !endDate) {
      message.error("Please select a valid start and end date for plannification.");
      return;
    }
  
    try {
   
        const plannificationData = {
          phase: phasereguleurshif2,
          id_machine: selectedMachine.id,
          id_operateur: operateurs.id,
          phasereguleur: phasereguleur,
          operateurs: operateurregleurshift2.join(', '),
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
          objectivecf: totalcf,
          objectivecsl: totalcsl,
          nombredemanqueoperateur: manqueregleurshift2,
          start_date: startDate,  // Add the plannification date here
          end_date: endDate,   // Add end_date field for duplication
          referenceproduit: selectedReference
        };
  
        // Send request for each weekly plannification
        await axios.post("https://grinding-backend.azurewebsites.net/ajouter/plannification", plannificationData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
      
      setShouldFetchEvents(false);
      setCurrentStep(8); // Adjust step after success
    } catch (error) {
      message.error("Failed to add plannifications.");
      console.error(error); // Log error for debugging
    } finally {
      setLoading(false);
    }
  };
  
  
  const handleAddEvent7 = async () => {
    setLoading(true);
  
    if (!startDate || !endDate) {
      message.error("Please select a valid start and end date for plannification.");
      setLoading(false);
      return;
    }
  
    try {
   
        const plannificationData = {
          phase: phasecfshift2,
          id_machine: selectedMachine.id,
          id_operateur: operateurs.id,
          phasereguleur: phasereguleur,
          operateurs: operateurcfshift2.join(', '),
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
          objectivecf: totalcf,
          objectivecsl: totalcsl,
          nombredemanqueoperateur: manquecfshift2,
          start_date: date,
          end_date: endDate,
          referenceproduit: selectedReference,
        };
  
        await axios.post("https://grinding-backend.azurewebsites.net/ajouter/plannification", plannificationData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
      setShouldFetchEvents(false);
      setCurrentStep(9);
    } catch (error) {
      message.error("Failed to add plannifications.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent8 = async () => {
    setLoading(true);
  
    if (!startDate || !endDate) {
      message.error("Please select a valid start and end date for plannification.");
      setLoading(false);
      return;
    }
  
    try {
      const generateWeeklyDates = (start, end) => {
        const dates = [];
        let currentDate = new Date(start);
        const finalEndDate = new Date(end);
  
        while (currentDate <= finalEndDate) {
          dates.push(currentDate.toISOString().split("T")[0]);
          currentDate.setDate(currentDate.getDate() + 7);
        }
  
        return dates;
      };
  
      const plannificationDates = generateWeeklyDates(startDate, endDate);
  
      // Add the new events to the backend
      for (const date of plannificationDates) {
        const plannificationData = {
          phase: phasecslshift2,
          id_machine: selectedMachine.id,
          id_operateur: operateurs.id,
          phasereguleur: phasereguleur,
          operateurs: operateurcslshift2.join(', '),
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
          objectivecf: totalcf,
          objectivecsl: totalcsl,
          nombredemanqueoperateur: manquecslshift2,
          start_date: date,
          end_date: endDate,
          referenceproduit: selectedReference,
        };
  
        await axios.post("https://grinding-backend.azurewebsites.net/ajouter/plannification", plannificationData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
      }
  
      message.success("Plannification added successfully.");
      setIsAddModalVisible(false);
      setShouldFetchEvents(true); // Trigger event fetch
      localStorage.setItem("shouldevent1", true); 
  
    } catch (error) {
      message.error("Failed to add plannifications.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  
  

  // Handle change event when date range is selected
  const handleDateRangeChange = (dates, dateStrings) => {
    if (dates) {
      // Filter out duplicate dates and update the state with unique dates
      const uniqueDates = Array.from(new Set([...selectedDates, dateStrings[0], dateStrings[1]]));
      setSelectedDates(uniqueDates); // Update the selected dates with unique values

      setStartDate(dateStrings[0]);
      setEndDate(dateStrings[1]);
    }
  };


    // Disable selected regleur in the same date range after submission
    useEffect(() => {
      const checkAllRegleurs = async () => {
        const unavailableRegleurs = [];
  
        for (let regleur of regleurs) {
          const isUnavailable = await checkRegleurAvailability(regleur.nom, startDate, endDate);
          if (isUnavailable) {
            unavailableRegleurs.push(regleur.nom);
          }
        }
  
        setDisabledRegleurs(unavailableRegleurs); // Set the list of unavailable regleurs
      };
  
      if (startDate && endDate) {
        checkAllRegleurs(); // Check all regleurs if dates are selected
      }
    }, [startDate, endDate, regleurs]); // Re-run when dates or regleurs change
    // Function to check if a regleur is available in the date range
    const checkRegleurAvailability = async (regleur, startDate, endDate) => {
      try {
        const response = await axios.get('https://grinding-backend.azurewebsites.net/ajouter/check/plannification', {
          params: {
            id_machine: selectedMachine.id, // Pass machine ID
            operateurs: regleur,
            start_date: startDate,
            end_date: endDate
          },
        });
  
        return response.data.exists; // True if unavailable (disabled)
      } catch (error) {
        console.error('Error checking regleur availability:', error);
        return false;
      }
    };

 // Handle regleur selection
 const handleRegleurChange = async (selectedValues) => {
  setOperateurregleurshift1(selectedValues);
};

 // Function to filter regleurs based on availability in the date range
 const isRegleurAvailable = (regleur) => {
  return !disabledRegleurs.includes(regleur);
};

  return (
  <div>
   <div className='navbar'>
        <ul className="navbar-links">
          <li><a href="/home">Acceuil</a></li>
          <li><a href="/form">Ajouter Production</a></li>
          <li><a href="/ajouternouvellemachine">Ajouter une machine</a></li>
          <li><a href="/ajouteroperateur">Ajouter des Opérateurs</a></li>
          <li><a href="/ajouterregleur">Ajouter des Régleurs</a></li>
          <li><a href="/details">Détails des machines</a></li>
          <li><a href="/calendar">Plannification</a></li>
       
        </ul>
      </div>
     <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
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
            <p><strong>referenceproduit:</strong> {selectedEvent.referenceproduit}</p>
         
           
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

<div>  

   {/* Plannification Date Range */}
   <div style={{ marginBottom: '20px' }}>
      <label style={{ fontWeight: 'bold' }}>Plannification Date Range:</label>
      <RangePicker
        onChange={handleDateRangeChange}
        format="YYYY-MM-DD"
        style={{ width: '100%' }}
        disabledDate={disabledDate} // Disable duplicate dates
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

  
<div className="form-container">

  {currentStep === 2 && (
    <div>

<h1 style={{fontSize:'20px', fontWeight:"bold", display:'flex', justifyContent:'center', alignItems:'center'}}>Shift 1 Plannification</h1>


<div className="input-field">
        <Checkbox.Group
         style={{ width: '100%' }}
         value={shift}
         onChange={(value)=>setShift(value[0])}
       >
         <Checkbox value="shift1">Shift1</Checkbox>
     
        
       </Checkbox.Group>
    </div>

{shift.includes("shift1") && (
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
)}

{shift.includes("shift1")  && (
  <div>
  <label>Nombre d'heure shift 1</label>
  <Input type='number' value={nombre_heure_shift1} onChange={(e)=> setNombre_heure_shift1(e.target.value)}></Input>
  </div>
   )}
   {shift.includes("shift1")  && (
     <div className="input-field">
    <label>Objective Production</label>
      <input type="number" value={totalproduction} readOnly />
    </div>
    )}
    
    {shift.includes("shift1")  && (
            <div className="input-field">
            <Checkbox.Group
                 style={{ width: '100%'}}
                 value={phasechargement}
                 onChange={(value)=>setPhasechargement(value[0])}
               >
                <Checkbox value="chargement">Sélectionner les opérateurs de production</Checkbox>
                 
                
               </Checkbox.Group>
           </div> 
      )}
    
    {phasechargement.includes("chargement") && (
    <div>
    <div className="operateur-select">
   
     
   <Select
    mode="multiple" // Enables multi-selection
    value={operateurchargementshift1} // Bind the state
    onChange={(selectedValues) => setOperateurchargementshift1(selectedValues)} // Update state on selection
    placeholder="Select Operateurs"
    style={{ width: '100%' }}
  >
    {operateurs.map((regleur) => (
      <Option key={regleur.id} value={regleur.nom}>
        {regleur.nom}
      </Option>
    ))}
  </Select>

<Checkbox.Group style={{ width: '100%' }}>
        <Row>
       
          <Col span={8}>
          Manque des opérateurs
            <InputNumber
              min={0}
              placeholder="Enter a number"
              style={{ marginLeft: 10 }}
              value={manquechrgementshift1}
              onChange={(value) => setManquechargementshift1(value)}
            />
          </Col>
        </Row>
 </Checkbox.Group>
    </div>
    </div>
    )}
    
  
    <div className="button-step1">
      <button className="custom-button" onClick={()=>handleAddEvent()}>Next </button>
    </div>
    
    </div>
  )}

  
  {currentStep === 3 && (
    <div>
         <div className="input-field">
            <Checkbox.Group
                 style={{ width: '100%'}}
                 value={phasechargement}
                 onChange={(value)=>setPhasechargement(value[0])}
               >
                <Checkbox value="regleur">Sélectionner les régleurs</Checkbox>
               </Checkbox.Group>
           </div> 
     {phasechargement.includes("regleur") && (
    <div>
     
    <Select
      mode="multiple"
      value={operateurregleurshift1}
      onChange={handleRegleurChange}
      placeholder="Select Regleurs"
      style={{ width: '100%' }}
    >
      {regleurs
        .filter((regleur) => isRegleurAvailable(regleur.nom)) // Filter out unavailable regleurs
        .map((regleur) => (
          <Option key={regleur.id} value={regleur.nom}>
            {regleur.nom}
          </Option>
        ))}
    </Select>


      <Checkbox.Group style={{ width: '100%' }}>
        <Row>
          <Col span={8}>
          Manque des régleurs
            <InputNumber
              min={0}
              placeholder="Enter a number"
              style={{ marginLeft: 10 }}
              value={manqueregleurshift1}
              onChange={(value) => setManqueregleurshift1(value)}
            />
          </Col>
        </Row>
      </Checkbox.Group>
    </div>
     )}

<div style={{ display: 'flex', justifyContent: 'center', gap: '40px', margin: '20px 0' }}>
  <button 
    style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }} 
    onClick={() => setCurrentStep(2)}
  >
    Back
  </button>
  <button 
    style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }} 
    onClick={() => handleAddEvent2()}
  >
    Next
  </button>
</div>

    </div>
  

    
  )}
       
   {currentStep === 4 && (
    <div>
          <div className="input-field">
           <Checkbox.Group
                style={{ width: '100%'}}
                value={phasechargement}
                onChange={(value)=>setPhasechargement(value[0])}
              >
               <Checkbox value="cf">Phase CF</Checkbox>
              </Checkbox.Group>
          </div> 

     
    {phasechargement.includes("cf") && (
      <div>
          <div className="input-field">
    <label>Objective CF</label>
      <input type="number" value={totalcf} readOnly />
    </div>
    <Select
    mode="multiple" // Enables multi-selection
    value={operateurcfshift1} // Bind the state
    onChange={(selectedValues) => setOperateurcfshift1(selectedValues)} // Update state on selection
    placeholder="Select Operateurs"
    style={{ width: '100%' }}
  >
    {operateurs.map((regleur) => (
      <Option key={regleur.id} value={regleur.nom}>
        {regleur.nom}
      </Option>
    ))}
  </Select>

 <Checkbox.Group style={{ width: '100%' }}>
        <Row>
       
          <Col span={8}>
          Manque des opérateurs
            <InputNumber
              min={0}
              placeholder="Enter a number"
              style={{ marginLeft: 10 }}
              value={manquecfshift1}
              onChange={(value) => setManquecfshift1(value)}
            />
          </Col>
        </Row>
      </Checkbox.Group>
      </div>
    )}                
   <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', margin: '20px 0' }}>
  <button 
    style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }} 
    onClick={() => setCurrentStep(3)}
  >
    Back
  </button>
  <button 
    style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }} 
    onClick={() => handleAddEvent3()}
  >
    Next
  </button>
</div>
    
    </div>
   )}  
      
  {currentStep === 5 && (
      <div>
         <div className="input-field">
        <Checkbox.Group
             style={{ width: '100%'}}
             value={phasechargement}
             onChange={(value)=>setPhasechargement(value[0])}
           >
            <Checkbox value="csl">Phase CSL</Checkbox>
           </Checkbox.Group>
       </div> 
    
        {phasechargement.includes("csl") && (
        <div>
       <div className="input-field">
      <label>Objective CSL</label>
      <input type="number" value={totalcsl} readOnly />
      </div>
 <Select
    mode="multiple" // Enables multi-selection
    value={operateurcslshift1} // Bind the state
    onChange={(selectedValues) => setOperateurcslshift1(selectedValues)} // Update state on selection
    placeholder="Select Operateurs"
    style={{ width: '100%' }}
  >
    {operateurs.map((regleur) => (
      <Option key={regleur.id} value={regleur.nom}>
        {regleur.nom}
      </Option>
    ))}
  </Select>

      
  <Checkbox.Group style={{ width: '100%' }}>
        <Row>
       
          <Col span={8}>
          Manque des opérateurs
            <InputNumber
              min={0}
              placeholder="Enter a number"
              style={{ marginLeft: 10 }}
              value={manquecslshift1}
              onChange={(value) => setManquecslshift1(value)}
            />
          </Col>
        </Row>
      </Checkbox.Group>
        </div>
        )}
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', margin: '20px 0' }}>
  <button 
    style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }} 
    onClick={() => setCurrentStep(4)}
  >
    Back
  </button>
  <button 
    style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }} 
    onClick={() => handleAddEvent4()}
  >
    Next To plannify shift 2
  </button>
</div>
      </div>
     )}
    </div>
    </div>
  </motion.div>



<motion.div
key="step3"
initial={{ opacity: 0, y: -20 }}
animate={{ opacity: 3, y: 0 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.5 }}
>        

<div className="form-container">

{ currentStep === 6 && (
 <div>
<h1 style={{fontSize: '20px',fontWeight:'bold', display:'flex', alignItems:'center', justifyContent:'center'}}>Shift 2 Plannification</h1> 

<div className="input-field">
        <Checkbox.Group
         style={{ width: '100%' }}
         value={shift}
         onChange={(value)=>setShift(value[0])}
       >
         <Checkbox value="shift2">Shift2</Checkbox>
     
        
       </Checkbox.Group>
    </div>

  {shift.includes("shift2") && (
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

<div>
<label>Nombre d'heure shift 2</label>
<Input type='number' value={nombre_heure_shift2} onChange={(e)=> setNombre_heure_shift2(e.target.value)}></Input>
</div>
<div className="input-field">
<label>Objective Production</label>
<input type="number" value={totalproductionshift2} readOnly />
</div>
<div className="input-field">
    <Checkbox.Group
         style={{ width: '100%'}}
         value={phasechargementshif2}
         onChange={(value)=>setPhasechargementshif2(value[0])}
       >
        <Checkbox value="chargement">Sélectionner les opérateurs</Checkbox> 
       </Checkbox.Group>
   </div> 

   </div>
  )}

{phasechargementshif2.includes("chargement") && (
  <div>
   <Select
    mode="multiple" // Enables multi-selection
    value={operateurchargementshift2} // Bind the state
    onChange={(selectedValues) => setOperateurchargementshift2(selectedValues)} // Update state on selection
    placeholder="Select Operateurs"
    style={{ width: '100%' }}
  >
    {operateurs.map((regleur) => (
      <Option key={regleur.id} value={regleur.nom}>
        {regleur.nom}
      </Option>
    ))}
  </Select>


      <Checkbox.Group style={{ width: '100%' }}>
        <Row>
          <Col span={8}>
          Manque des opérateurs
            <InputNumber
              min={0}
              placeholder="Enter a number"
              style={{ marginLeft: 10 }}
              value={manquechargementshift2}
              onChange={(value) => setManquechargementshift2(value)}
            />
          </Col>
        </Row>
      </Checkbox.Group>
  </div>
)}


<div style={{ display: 'flex', justifyContent: 'center', gap: '40px', margin: '20px 0' }}>
  <button 
    style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }} 
    onClick={() => setCurrentStep(5)}
  >
    Back
  </button>
  <button 
    style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }} 
    onClick={() => handleAddEvent5()}
  >
    Next
  </button>
</div>
 </div>

)}



{currentStep === 7 && (
  <div>
      <div className="input-field">
    <Checkbox.Group
         style={{ width: '100%'}}
         value={phasereguleurshif2} // Wrap single value in an array
         onChange={(value) => setPhasereguleurshif2(value[0])}
       >
        <Checkbox value="regleur">Sélectionner les régleurs</Checkbox>
       </Checkbox.Group>
   </div> 
{phasereguleurshif2.includes("regleur") && (
  <div>
   <Select
      mode="multiple"
      value={operateurregleurshift2}
      onChange={handleRegleurChange}
      placeholder="Select Regleurs"
      style={{ width: '100%' }}
    >
      {regleurs
        .filter((regleur) => isRegleurAvailable(regleur.nom)) // Filter out unavailable regleurs
        .map((regleur) => (
          <Option key={regleur.id} value={regleur.nom}>
            {regleur.nom}
          </Option>
        ))}
    </Select>
      <Checkbox.Group style={{ width: '100%' }}>
        <Row>
       
          <Col span={8}>
          Manque des régleurs
            <InputNumber
              min={0}
              placeholder="Enter a number"
              style={{ marginLeft: 10 }}
              value={manqueregleurshift2}
              onChange={(value) => setManqueregleurshift2(value)}
            />
          </Col>
        </Row>
      </Checkbox.Group>
  </div>
)}
  
  <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', margin: '20px 0' }}>
  <button 
    style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }} 
    onClick={() => setCurrentStep(6)}
  >
    Back
  </button>
  <button 
    style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }} 
    onClick={() => handleAddEvent6()}
  >
    Next
  </button>
</div>
  </div>
)}


   {currentStep === 8  && (
    <div>
       <div className="input-field">
   <Checkbox.Group
        style={{ width: '100%'}}
        value={phasecfshift2}
        onChange={(value)=>setPhasecfshift2(value[0])}
      >
       <Checkbox value="cf">Phase CF</Checkbox>
      </Checkbox.Group>
  </div> 

  {phasecfshift2.includes("cf") && (
  <div>
  <div className="input-field">
  <label>Objective CF</label>
  <input type="number" value={totalcfshift2} readOnly />
  </div>
  <Select
    mode="multiple" // Enables multi-selection
    value={operateurcfshift2} // Bind the state
    onChange={(selectedValues) => setOperateurcfshift2(selectedValues)} // Update state on selection
    placeholder="Select Operateurs"
    style={{ width: '100%' }}
  >
    {operateurs.map((regleur) => (
      <Option key={regleur.id} value={regleur.nom}>
        {regleur.nom}
      </Option>
    ))}
  </Select>

        <Checkbox.Group style={{ width: '100%' }}>
          <Row>
         
            <Col span={8}>
            Manque des opérateurs
              <InputNumber
                min={0}
                placeholder="Enter a number"
                style={{ marginLeft: 10 }}
                value={manquecfshift2}
                onChange={(value) => setManquecfshift2(value)}
              />
            </Col>
          </Row>
        </Checkbox.Group>
  
      </div>
  )}
  

  <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', margin: '20px 0' }}>
  <button 
    style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }} 
    onClick={() => setCurrentStep(7)}
  >
    Back
  </button>
  <button 
    style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }} 
    onClick={() => handleAddEvent7()}
  >
    Next
  </button>
</div>
    </div>
   )}  

 


{currentStep === 9 && (
  <div>
   <div className="input-field">
<Checkbox.Group
     style={{ width: '100%'}}
     value={phasecslshift2}
     onChange={(value)=>setPhasecslshift2(value[0])}
   >
    <Checkbox value="csl">Phase CSL</Checkbox>
   </Checkbox.Group>
</div> 
{phasecslshift2.includes("csl") && (
 <div>
 <div className="input-field">
 <label>Objective CSL</label>
 <input type="number" value={totalcslshift2} readOnly />
 </div>
 <Select
    mode="multiple" // Enables multi-selection
    value={operateurcslshift2} // Bind the state
    onChange={(selectedValues) => setOperateurcslshift2(selectedValues)} // Update state on selection
    placeholder="Select Operateurs"
    style={{ width: '100%' }}
  >
    {operateurs.map((regleur) => (
      <Option key={regleur.id} value={regleur.nom}>
        {regleur.nom}
      </Option>
    ))}
  </Select>

       <Checkbox.Group style={{ width: '100%' }}>
         <Row>
        
           <Col span={8}>
           Manque des opérateurs
             <InputNumber
               min={0}
               placeholder="Enter a number"
               style={{ marginLeft: 10 }}
               value={manquecslshift2}
               onChange={(value) => setManquecslshift2(value)}
             />
           </Col>
         </Row>
       </Checkbox.Group>
 
 </div>
)}
<div style={{ display: 'flex', justifyContent: 'center', gap: '40px', margin: '20px 0' }}>
  <button 
    style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }} 
    onClick={() => setCurrentStep(8)}
  >
    Back
  </button>
  <button 
    style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }} 
    onClick={() => handleAddEvent8()}
  >
    Submit
  </button>
</div>
</div>
)}
</div>
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
