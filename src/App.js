import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Form from './pages/productionform';
import AnimatedPage from './pages/Animatedpage';
import MachineDetails from './pages/machinedetails';
import MachineForm from './pages/MachineForm';
import Login from './pages/Login';
import PlannificationForm from './pages/Plannification';
import Ajouternouvellemachine from './pages/Ajouternouvellemachine';
import Calendar from './pages/calendar';
import Ajouterregleur from './pages/Ajouterregleur';  
import Ajouteroperateur from './pages/Ajouteroperateur';  
import Ajouterprobleme from './pages/ajouterprobleme';
import Ajouterdefaut from './pages/Ajouterdefaut';
import Listregleur from './pages/List de regleurs';
import Listoperateur from './pages/Listoperateurs';
import Ajouterposte from './pages/Ajouter poste de controle';
import Ajouteroutil from './pages/Ajouter outil';
import ActionHistory from './pages/ActionHistory ';


function App() {    
  return (
    <div className="App">
     <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/form" element={<Form />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<AnimatedPage />} />
      <Route path="/details" element={<MachineDetails />} />
      <Route path="/machineform" element={<MachineForm />} />
      <Route path="/ajouternouvellemachine" element={<Ajouternouvellemachine />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/ajouterregleur" element={<Ajouterregleur />} />
      <Route path="/ajouteroperateur" element={<Ajouteroperateur />} />
      <Route path="/plannification" element={<PlannificationForm/>} />
      <Route path="/ajouterprobleme" element={<Ajouterprobleme/>} />
      <Route path="/ajouterdefaut" element={<Ajouterdefaut/>} />
      <Route path="/listoperateur" element={<Listoperateur/>} />
      <Route path="/listregleur" element={<Listregleur/>} />
      <Route path="/Ajouterproblemepostedecontrole" element={<Ajouterposte/>} />
      <Route path="/Ajouteroutil" element={<Ajouteroutil/>} />
     <Route path="/history" element={<ActionHistory/>} />
      </Routes>
     </Router>
    </div>
  );
}

export default App;
