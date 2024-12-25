import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import { Modal, Input, Select, message, Checkbox, Row, Col, DatePicker, InputNumber  } from 'antd';
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
    const [operateurs, setOperateurs] = useState([]);
    const [shift, setShift] = useState('');
    const [shift2, setShift2] = useState('');
    const [phasechargement, setPhasechargement] = useState('');
    const [operateurchargement, setOperateurchargement] = useState(null);
    const [phasereguleur, setPhasereguleur] = useState('');
    const [operateurreguleur, setOperateurreguleur] = useState([]);
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
    const [startDate, setStartDate] = useState(new Date('2024-12-01'));
    const [endDate, setEndDate] = useState(new Date('2024-12-31'));
    const [productionShift1, setproductionShift1] = useState(0);
    const [reguleurShift1, setReguleurShift1] = useState(0); // State for the first input
    const [cfShift1, setCfShift1] = useState(0); // State for the second input
    const [cslShift1, setCSLShift1] = useState(0); 
    const [productionShift2, setproductionShift2] = useState(0);
    const [reguleurShift2, setReguleurShift2] = useState(0); // State for the first input
    const [cfShift2, setCfShift2] = useState(0); // State for the second input
    const [cslShift2, setCSLShift2] = useState(0); 
    const [nombremanque,setNombremanque] = useState(0);

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
// Fetch events based on the selected machine
  const fetchEvents = async (startDate, endDate, machineId = null) => {
    try {
      const formattedStartDate = startDate.toISOString().split("T")[0];
      const formattedEndDate = endDate.toISOString().split("T")[0];
      const today = new Date();
      const formattedToday = today.toISOString().split("T")[0]; // Format today's date
  
      const response = await axios.get("https://grinding-backend.azurewebsites.net/ajouter/plannifications", {
        params: {
          start_date: formattedStartDate,
          end_date: formattedEndDate,
          machine_id: machineId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      const eventsData = [];
  
      response.data.forEach((event) => {
        const eventStartDate = new Date(event.start_date).toISOString().split("T")[0];
        const eventEndDate = new Date(event.end_date).toISOString().split("T")[0];
  
        // Skip events occurring on the current date
        if (eventStartDate === formattedToday || eventEndDate === formattedToday) {
          return;
        }
  
        const machine = machines.find((m) => m.id_machine === event.id_machine);
  
        if (
          (eventStartDate >= formattedStartDate && eventStartDate <= formattedEndDate) ||
          (eventEndDate >= formattedStartDate && eventEndDate <= formattedEndDate)
        ) {
          eventsData.push({
            id: event.id,
            title: event.machine_name || "Unknown Machine",
            start: event.start_date,
            end: event.end_date,
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
  
      setEvents(eventsData);
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
     
 
      
        const plannificationData = {
          phase: phasechargement,
          id_machine: selectedMachine.id,
          id_operateur: operateurs.id,
          phasereguleur: phasereguleur,
          operateurs: operateurreguleur,
          phasecsl: phasecsl,
          operateur_chargement: operateurchargement,
          totalplanifie: totalproduction,
          nombre_heure_shift1: nombre_heure_shift1,
          nombre_heure_shift2: nombre_heure_shift2,
          shift: shift,
          nombredemanqueoperateur: nombremanque,
          start_date: date,  // Add the plannification date here
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
      

      setCurrentStep(3);
    
    } catch (error) {
      message.error("Failed to add plannifications.");
      console.error(error); // Log error for debugging
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent2 = async () => {
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
          operateurs: operateurreguleur,
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
          nombredemanqueoperateur: nombremanque,
          start_date: date,  // Add the plannification date here
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
      
      setCurrentStep(4);

    } catch (error) {
      message.error("Failed to add plannifications.");
      console.error(error); // Log error for debugging
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
          operateurs: operateurreguleur,
          phasecsl: phasecsl,
          operateur_csl: operateur_csl,
          phasecf: phasecf,
          operateur_cf: operateur_cf,
          operateur_chargement: operateurchargement,
          totalplanifie: totalcf,
          nombre_heure_shift1: nombre_heure_shift1,
          nombre_heure_shift2: nombre_heure_shift2,
          shift: shift,
          nombredemanqueoperateur: nombremanque,
          start_date: date,  // Add the plannification date here
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
          operateurs: operateurreguleur,
          phasecsl: phasecsl,
          operateur_csl: operateur_csl,
          phasecf: phasecf,
          operateur_cf: operateur_cf,
          operateur_chargement: operateurchargement,
          totalplanifie: totalcsl,
          nombre_heure_shift1: nombre_heure_shift1,
          nombre_heure_shift2: nombre_heure_shift2,
          shift: shift,
          nombredemanqueoperateur: nombremanque,
          start_date: date,  // Add the plannification date here
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
          phase: phasechargement,
          id_machine: selectedMachine.id,
          id_operateur: operateurs.id,
          phasereguleur: phasereguleur,
          operateurs: operateurreguleur,
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
          nombredemanqueoperateur: nombremanque,
          start_date: date,  // Add the plannification date here
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
          phase: phasechargement,
          id_machine: selectedMachine.id,
          id_operateur: operateurs.id,
          phasereguleur: phasereguleur,
          operateurs: operateurreguleur,
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
          nombredemanqueoperateur: nombremanque,
          start_date: date,  // Add the plannification date here
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
      

      setCurrentStep(8);

    } catch (error) {
      message.error("Failed to add plannifications.");
      console.error(error); // Log error for debugging
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent7 = async () => {
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
      
        // Ensure the loop includes the end date exactly as selected
        const finalEndDate = new Date(end);
      
        while (currentDate <= finalEndDate) {
          // Add the current date in YYYY-MM-DD format
          dates.push(currentDate.toISOString().split("T")[0]);
      
          // Increment by 7 days (next week)
          currentDate.setDate(currentDate.getDate() + 7);
        }
      
        return dates;
      };
      
      
  
      // Generate all weekly dates within the range
      const plannificationDates = generateWeeklyDates(startDate, endDate);
  
      // Loop through the dates and send plannification requests
      for (const date of plannificationDates) {
        const plannificationData = {
          phase: phasechargement,
          id_machine: selectedMachine.id,
          id_operateur: operateurs.id,
          phasereguleur: phasereguleur,
          operateurs: operateurreguleur,
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
          nombredemanqueoperateur: nombremanque,
          start_date: date,  // Add the plannification date here
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
      }
      message.success("plannification added succesfully")
      setCurrentStep(9);
      setIsAddModalVisible(false);
    } catch (error) {
      message.error("Failed to add plannifications.");
      console.error(error); // Log error for debugging
    } finally {
      setLoading(false);
    }
  };


  const handleDateRangeChange = (dates, dateStrings) => {
    setStartDate(dateStrings[0]);
    setEndDate(dateStrings[1]);
  };

 
  



  return (
    <div>

<div className='navbar'>
        <ul className="navbar-links">
          <li><a href="/home">Acceuil</a></li>
          <li><a href="/form">Ajouter Production</a></li>
          <li><a href="/ajouternouvellemachine">Ajouter un machine</a></li>
          <li><a href="/details">Détails des machines</a></li>
          <li><a href="/calendar">Plannification</a></li>
       
        </ul>
      </div>
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
                <Checkbox value="chargement">Phase Chargement</Checkbox>
                 
                
               </Checkbox.Group>
           </div> 
      )}
    
    {phasechargement.includes("chargement") && (
    <div>
    <div className="operateur-select">
      <h3>Select Operators</h3>
     
      <Checkbox.Group
        value={operateurreguleur} // Wrap single value in an array
        onChange={(value) => setOperateurreguleur(value)} // Persist only the first selected value
        style={{ width: '100%' }}
>
  {operateurs.map((operateur) => (
    <Row key={operateur.id}>
      <Col span={8}>
        <Checkbox value={operateur.nom}>{operateur.nom}</Checkbox>
      </Col>
    </Row>
  ))}
     </Checkbox.Group>


      <Checkbox.Group style={{ width: '100%' }}>
        <Row>
       
          <Col span={8}>
          Manque(phase chargement)
            <InputNumber
              min={0}
              placeholder="Enter a number"
              style={{ marginLeft: 10 }}
              value={nombremanque}
              onChange={(value) => setNombremanque(value)}
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
                <Checkbox value="reguleur">Phase Reguleur</Checkbox>
               </Checkbox.Group>
           </div> 
     {phasechargement.includes("reguleur") && (
    <div>
    <div className="input-field">
    <label>Objective Reguleur</label>
      <input type="number" value={totalproduction} readOnly />
    </div>
             
  <Checkbox.Group
        value={operateurreguleur} // Wrap single value in an array
        onChange={(value) => setOperateurreguleur(value)} // Persist only the first selected value
        style={{ width: '100%' }}
             >
  {operateurs.map((operateur) => (
    <Row key={operateur.id}>
      <Col span={8}>
        <Checkbox value={operateur.nom}>{operateur.nom}</Checkbox>
      </Col>
    </Row>
  ))}
  </Checkbox.Group>

   
      <Checkbox.Group style={{ width: '100%' }}>
        <Row>
          <Col span={8}>
          Manque(phase reguleur)
            <InputNumber
              min={0}
              placeholder="Enter a number"
              style={{ marginLeft: 10 }}
              value={nombremanque}
              onChange={(value) => setNombremanque(value)}
            />
          </Col>
        </Row>
      </Checkbox.Group>
    </div>
     )}
  
    <div className="button-step1">
      <button className="custom-button" onClick={()=>handleAddEvent2()}>Next </button>
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
    <Checkbox.Group
        value={operateurreguleur} // Wrap single value in an array
        onChange={(value) => setOperateurreguleur(value)} // Persist only the first selected value
        style={{ width: '100%' }}
>
  {operateurs.map((operateur) => (
    <Row key={operateur.id}>
      <Col span={8}>
        <Checkbox value={operateur.nom}>{operateur.nom}</Checkbox>
      </Col>
    </Row>
  ))}
    </Checkbox.Group>

      <Checkbox.Group style={{ width: '100%' }}>
        <Row>
       
          <Col span={8}>
          Manque(phase CF)
            <InputNumber
              min={0}
              placeholder="Enter a number"
              style={{ marginLeft: 10 }}
              value={nombremanque}
              onChange={(value) => setNombremanque(value)}
            />
          </Col>
        </Row>
      </Checkbox.Group>
      </div>
    )}                
 
     
      <div className="button-step1">
      <button className="custom-button" onClick={()=>handleAddEvent3()}>Next </button>
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
      <Checkbox.Group
        value={operateurreguleur} // Wrap single value in an array
        onChange={(value) => setOperateurreguleur(value)} // Persist only the first selected value
        style={{ width: '100%' }}
>
  {operateurs.map((operateur) => (
    <Row key={operateur.id}>
      <Col span={8}>
        <Checkbox value={operateur.nom}>{operateur.nom}</Checkbox>
      </Col>
    </Row>
  ))}
     </Checkbox.Group>
      
      <Checkbox.Group style={{ width: '100%' }}>
        <Row>
       
          <Col span={8}>
          Manque(phase CSL)
            <InputNumber
              min={0}
              placeholder="Enter a number"
              style={{ marginLeft: 10 }}
              value={nombremanque}
              onChange={(value) => setNombremanque(value)}
            />
          </Col>
        </Row>
      </Checkbox.Group>
        </div>
        )}
      
      
      <div className="button-step1">
      <button className="custom-button" onClick={()=>handleAddEvent4()}>Next to plannify shift 2 </button>
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
         onChange={(value)=>setPhasechargementshif2(value)}
       >
        <Checkbox value="Chargementshift2">Phase Chargement</Checkbox> 
       </Checkbox.Group>
   </div> 


<Checkbox.Group
        value={operateurreguleur} // Wrap single value in an array
        onChange={(value) => setOperateurreguleur(value)} // Persist only the first selected value
        style={{ width: '100%' }}
>
  {operateurs.map((operateur) => (
    <Row key={operateur.id}>
      <Col span={8}>
        <Checkbox value={operateur.nom}>{operateur.nom}</Checkbox>
      </Col>
    </Row>
  ))}
</Checkbox.Group>

      <Checkbox.Group style={{ width: '100%' }}>
        <Row>
          <Col span={8}>
          Manque(phase Chargement)
            <InputNumber
              min={0}
              placeholder="Enter a number"
              style={{ marginLeft: 10 }}
              value={nombremanque}
              onChange={(value) => setNombremanque(value)}
            />
          </Col>
        </Row>
      </Checkbox.Group>
   </div>
  )}



<div className="button-step1">
      <button className="custom-button" onClick={()=>handleAddEvent5()}>Next </button>
      </div>
 </div>

)}



{currentStep === 7 && (
  <div>
      <div className="input-field">
    <Checkbox.Group
         style={{ width: '100%'}}
         value={phasereguleurshif2} // Wrap single value in an array
         onChange={(value) => setPhasereguleurshif2(value)}
       >
        <Checkbox value="reguleur">Phase Reguleur</Checkbox>
       </Checkbox.Group>
   </div> 
{phasereguleurshif2.includes("reguleur") && (
  <div>
    <Checkbox.Group
        value={operateurreguleur} // Wrap single value in an array
        onChange={(value) => setOperateurreguleur(value)} // Persist only the first selected value
        style={{ width: '100%' }}
>
  {operateurs.map((operateur) => (
    <Row key={operateur.id}>
      <Col span={8}>
        <Checkbox value={operateur.nom}>{operateur.nom}</Checkbox>
      </Col>
    </Row>
  ))}
     </Checkbox.Group>
      <Checkbox.Group style={{ width: '100%' }}>
        <Row>
       
          <Col span={8}>
          Manque(phase reguleur)
            <InputNumber
              min={0}
              placeholder="Enter a number"
              style={{ marginLeft: 10 }}
              value={nombremanque}
              onChange={(value) => setNombremanque(value)}
            />
          </Col>
        </Row>
      </Checkbox.Group>
  </div>
)}
  

      <div className="button-step1">
      <button className="custom-button" onClick={()=>handleAddEvent6()}>Next </button>
      </div>
  </div>
)}


   {currentStep === 8  && (
    <div>
       <div className="input-field">
   <Checkbox.Group
        style={{ width: '100%'}}
        value={phasecfshift2}
        onChange={(value)=>setPhasecfshift2(value)}
      >
       <Checkbox value="cfshift2">Phase CF</Checkbox>
      </Checkbox.Group>
  </div> 

  {phasecfshift2.includes("cfshift2") && (
  <div>
  <div className="input-field">
  <label>Objective CF</label>
  <input type="number" value={totalcfshift2} readOnly />
  </div>
  <Checkbox.Group
          value={operateurreguleur} // Wrap single value in an array
          onChange={(value) => setOperateurreguleur(value)} // Persist only the first selected value
          style={{ width: '100%' }}
  >
    {operateurs.map((operateur) => (
      <Row key={operateur.id}>
        <Col span={8}>
          <Checkbox value={operateur.nom}>{operateur.nom}</Checkbox>
        </Col>
      </Row>
    ))}
       </Checkbox.Group>
        <Checkbox.Group style={{ width: '100%' }}>
          <Row>
         
            <Col span={8}>
            Manque(phase CF)
              <InputNumber
                min={0}
                placeholder="Enter a number"
                style={{ marginLeft: 10 }}
                value={nombremanque}
                onChange={(value) => setNombremanque(value)}
              />
            </Col>
          </Row>
        </Checkbox.Group>
  
      </div>
  )}


    <div className="button-step1">
      <button className="custom-button" onClick={()=>handleAddEvent7()}>Next </button>
      </div>
    </div>
   )}  

 


{currentStep === 9 && (
  <div>
   <div className="input-field">
<Checkbox.Group
     style={{ width: '100%'}}
     value={phasecslshift2}
     onChange={(value)=>setPhasecslshift2(value)}
   >
    <Checkbox value="cslshift2">Phase CSL</Checkbox>
   </Checkbox.Group>
</div> 
{phasecslshift2.includes("cslshift2") && (
 <div>
 <div className="input-field">
 <label>Objective CSL</label>
 <input type="number" value={totalcslshift2} readOnly />
 </div>
 <Checkbox.Group
         value={operateurreguleur} // Wrap single value in an array
         onChange={(value) => setOperateurreguleur(value)} // Persist only the first selected value
         style={{ width: '100%' }}
 >
 <Checkbox.Group
         value={operateurreguleur} // Wrap single value in an array
         onChange={(value) => setOperateurreguleur(value)} // Persist only the first selected value
         style={{ width: '100%' }}
 >
   {operateurs.map((operateur) => (
     <Row key={operateur.id}>
       <Col span={8}>
         <Checkbox value={operateur.nom}>{operateur.nom}</Checkbox>
       </Col>
     </Row>
   ))}
      </Checkbox.Group>
 </Checkbox.Group>
       <Checkbox.Group style={{ width: '100%' }}>
         <Row>
        
           <Col span={8}>
           Manque(phase CSL)
             <InputNumber
               min={0}
               placeholder="Enter a number"
               style={{ marginLeft: 10 }}
               value={nombremanque}
               onChange={(value) => setNombremanque(value)}
             />
           </Col>
         </Row>
       </Checkbox.Group>
 
 </div>
)}

<div className="button-step1">
      <button className="custom-button" onClick={()=>handleAddEvent7()}>Submit </button>
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
