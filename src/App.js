import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Form from './pages/productionform';
import AnimatedPage from './pages/Animatedpage';
import MachineDetails from './pages/machinedetails';
import MachineForm from './pages/MachineForm';
import Login from './pages/Login';
import PlannificationForm from './pages/Plannification';
import Ajoutermachine from './pages/Ajouternouvellemachine';
import Calendar from './pages/calendar';


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
      <Route path="/ajoutermachine" element={<Ajoutermachine />} />
      <Route path="/calendar" element={<Calendar />} />
    
      <Route path="/plannification" element={<PlannificationForm/>} />
      </Routes>
     </Router>
    </div>
  );
}

export default App;
