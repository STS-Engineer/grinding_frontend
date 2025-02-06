import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { RoleContext } from "./RoleContext";
import { useNavigate } from "react-router-dom";

const ActionHistory = () => {
  const [historique, setHistorique] = useState([]);

  useEffect(() => {
    fetchHistorique();
  }, []);

  const fetchHistorique = async () => {
    try {
      const response = await axios.get("https://grinding-backend.azurewebsites.net/ajouter/historique");
      setHistorique(response.data.historiques);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const user = localStorage.getItem("userEmail");

  // Function to format date and time separately
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return {
      date: `${year}-${month}-${day}`,
      time: `${hours}:${minutes}:${seconds}`,
    };
  };
const {role} = useContext(RoleContext);
const navigate = useNavigate();
const handleLogout = () => {
  navigate('/login');
};
  return (
    <div>
       <div className='navbar'>
        <ul className="navbar-links">
        {(role === 'ADMIN' || role=== 'REGLEUR' ) && <li><a href="/calendar">Plannification</a></li>}
       {(role === 'ADMIN' || role=== 'REGLEUR' ) && <li><a href="/changementmeules">Changement des meules</a></li>}
        {role === 'ADMIN' && <li><a href="/ajouternouvellemachine">Ajouter une machine</a></li>}
        {role === 'ADMIN' &&  <li><a href="/listregleur">List des régleurs</a></li>}
        {role === 'ADMIN' &&  <li><a href="/detailoutil">List des outils</a></li>}
        {role === 'ADMIN' &&  <li><a href="/listoperateur">List des Opérateurs</a></li>}
        {role === 'ADMIN' &&  <li><a href="/ajouterdefaut">List des defauts</a></li>}
        {role === 'ADMIN' &&  <li><a href="/details">Détails des machines</a></li>}
        <button className='logout-button' onClick={handleLogout}>Logout</button>  
        </ul>
      </div>

      <div
        style={{
          backgroundColor: "#f9f9f9",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          margin: "20px auto",
          maxWidth: "600px",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "600",
            color: "#333",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          L'historique des actions
        </h1>

        <div>
          {historique.length > 0 ? (
            historique.map((entry, index) => {
              const { date, time } = formatDate(entry.created_at);
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: "#fff",
                    padding: "15px",
                    borderRadius: "8px",
                    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                    marginBottom: "10px",
                  }}
                >
                  <p style={{ fontWeight: "bold", color: "#007bff" }}>
             
                  </p>
                  <p style={{ fontWeight: "normal", color: "#555" }}>
                    <span style={{ fontWeight: "bold" }}>Date:</span> {date}
                  </p>
                  <p style={{ fontWeight: "normal", color: "#555" }}>
                    <span style={{ fontWeight: "bold" }}>Time:</span> {time}
                  </p>
                  <p style={{ color: "#555" }}>
                    {entry.text} By {user}
                  </p>
                </div>
              );
            })
          ) : (
            <p style={{ textAlign: "center", color: "#777" }}>
              Aucun historique disponible.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActionHistory;
