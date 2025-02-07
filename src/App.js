import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { RoleProvider } from './pages/RoleContext';
import ProtectedRoute from './pages/ProtectedRoute';
import Form from './pages/productionform';
import AnimatedPage from './pages/Animatedpage';
import MachineDetails from './pages/machinedetails';
import MachineForm from './pages/MachineForm';
import Login from './pages/Login';
import PlannificationForm from './pages/Plannification';
import Ajoutermachine from './pages/Ajouternouvellemachine';
import Calendar from './pages/calendar';
import Ajouternouvellemachine from './pages/Ajouternouvellemachine';
import Ajouterregleur from './pages/Ajouterregleur';
import Ajouteroperateur from './pages/Ajouteroperateur';
import Ajouterprobleme from './pages/ajouterprobleme';
import Ajouterdefaut from './pages/Ajouterdefaut';
import Listoperateur from './pages/Listoperateurs';
import Listregleur from './pages/List de regleurs';
import Ajouterposte from './pages/Ajouter poste de controle';
import Ajouteroutil from './pages/Ajouter outil';
import ActionHistory from './pages/ActionHistory';
import Actualisationoutil from './pages/Actualisationoutil';
import Ajouterdefautinspection from './pages/Ajouterinspectiondefaut';
import ToolDetails from './pages/detailstool';
import Listeproblemecontrole from './pages/Listproblemecontrole';
import Listeplannification from './pages/Listplannification';


function App() {
  return (     
    <RoleProvider>
      <div className="App">
        <Router>
          <Routes>
            {/* Redirect to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Public Routes */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes - Role Based Access */}
            <Route path="/home" element={<ProtectedRoute allowedRoles={['REGLEUR','ADMIN']}><AnimatedPage /></ProtectedRoute>} />
            <Route path="/details" element={<ProtectedRoute allowedRoles={['ADMIN']}><MachineDetails /></ProtectedRoute>} />
            <Route path="/machineform" element={<ProtectedRoute allowedRoles={['ADMIN']}><MachineForm /></ProtectedRoute>} />
            <Route path="/ajoutermachine" element={<ProtectedRoute allowedRoles={['ADMIN']}><Ajoutermachine /></ProtectedRoute>} />
            <Route path="/calendar" element={<ProtectedRoute allowedRoles={['ADMIN']}><Calendar /></ProtectedRoute>} />
            <Route path="/ajouternouvellemachine" element={<ProtectedRoute allowedRoles={['REGLEUR','ADMIN']}><Ajouternouvellemachine /></ProtectedRoute>} />
            <Route path="/ajouterregleur" element={<ProtectedRoute allowedRoles={['ADMIN']}><Ajouterregleur /></ProtectedRoute>} />
            <Route path="/ajouteroperateur" element={<ProtectedRoute allowedRoles={['ADMIN']}><Ajouteroperateur /></ProtectedRoute>} />
            <Route path="/ajouterprobleme" element={<ProtectedRoute allowedRoles={['REGLEUR']}><Ajouterprobleme /></ProtectedRoute>} />
            <Route path="/ajouterdefaut" element={<ProtectedRoute allowedRoles={['ADMIN']}><Ajouterdefaut /></ProtectedRoute>} />
            <Route path="/listoperateur" element={<ProtectedRoute allowedRoles={['ADMIN']}><Listoperateur /></ProtectedRoute>} />
            <Route path="/listregleur" element={<ProtectedRoute allowedRoles={['ADMIN']}><Listregleur /></ProtectedRoute>} />
            <Route path="/Ajouterproblemepostedecontrole" element={<ProtectedRoute allowedRoles={['REGLEUR','ADMIN']}><Ajouterposte /></ProtectedRoute>} />
            <Route path="/Listproblemecontrole" element={<ProtectedRoute allowedRoles={['REGLEUR','ADMIN']}><Listeproblemecontrole /></ProtectedRoute>} />
            <Route path="/Ajouteroutil" element={<ProtectedRoute allowedRoles={['REGLEUR','ADMIN']}><Ajouteroutil /></ProtectedRoute>} />
            <Route path="/history" element={<ProtectedRoute allowedRoles={['ADMIN']}><ActionHistory /></ProtectedRoute>} />
            <Route path="/changementmeules" element={<ProtectedRoute allowedRoles={['REGLEUR','ADMIN']}><Actualisationoutil /></ProtectedRoute>} />
            <Route path="/ajouterdefautinspection" element={<ProtectedRoute allowedRoles={['REGLEUR']}><Ajouterdefautinspection /></ProtectedRoute>} />
            <Route path="/listplannification" element={<ProtectedRoute allowedRoles={['ADMIN']}><Listeplannification /></ProtectedRoute>} />
           

            {/* Specific Role-Based Access */}    
            <Route path="/form" element={<ProtectedRoute allowedRoles={['ADMIN','REGLEUR']}><Form /></ProtectedRoute>} />
            <Route path="/detailoutil" element={<ProtectedRoute allowedRoles={['REGLEUR','ADMIN']}><ToolDetails /></ProtectedRoute>} />
          </Routes>
        </Router>
      </div>
    </RoleProvider>
  );
}

export default App;
