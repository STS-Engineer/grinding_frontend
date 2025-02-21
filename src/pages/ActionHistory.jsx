import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { RoleContext } from "./RoleContext";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";

const ActionHistory = () => {
  const [historique, setHistorique] = useState([]);
  const [filteredHistorique, setFilteredHistorique] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchHistorique();
  }, []);

  const fetchHistorique = async () => {
    try {
      const response = await axios.get("https://grinding-backend.azurewebsites.net/ajouter/historique");
      setHistorique(response.data.historiques);
      setFilteredHistorique(response.data.historiques);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const user = localStorage.getItem("userEmail");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return {
      date: `${year}-${month}-${day}`,
      time: `${hours}:${minutes}:${seconds}`,
    };
  };

  const getShift = (time) => {
    const [hours] = time.split(":").map(Number);
    if (hours >= 6 && hours < 14) {
      return "Shift1";
    } else if (hours >= 14 && hours < 22) {
      return "Shift2";
    } else {
      return "Shift3";
    }
  };

  const handleDateChange = (event) => {
    const selected = event.target.value;
    setSelectedDate(selected);

    if (!selected) {
      setFilteredHistorique(historique);
    } else {
      const filteredData = historique.filter((entry) => {
        const { date } = formatDate(entry.created_at);
        return date === selected;
      });
      setFilteredHistorique(filteredData);
    }
  };

  
const handleDownloadPDF = () => {
  const doc = new jsPDF();

  // Set document title and add content (this could be dynamic, for example using your filtered data)
  doc.setFontSize(18);
  doc.text("Action History Report", 20, 20);
  
  doc.setFontSize(12);
  doc.text("Generated Data:", 20, 30);

  // Sample content: You can customize this based on your data
  filteredHistorique.forEach((entry, index) => {
    const { date, time } = formatDate(entry.created_at);
    const shift = getShift(time);
    const rowData = `${date} ${time} - ${entry.text} - ${shift}`;
    doc.text(rowData, 20, 40 + index * 10); // Adjust position based on number of rows
  });

  // Save the generated PDF
  doc.save("ActionHistoryReport.pdf");
};

  const handleDownloadExcel = () => {
    const data = filteredHistorique.map((entry) => {
      const { date, time } = formatDate(entry.created_at);
      return {
        Date: date,
        Time: time,
        Action: entry.text,
        Shift: getShift(time),
        User: user,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Historique");

    XLSX.writeFile(workbook, "Historique.xlsx");
  };


  const { role } = useContext(RoleContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };

  
const linkStyle = {
  textDecoration: 'none',
  color: 'white',
  fontWeight: 'bold',
  display: 'block',
  padding: '5px 2px',
  borderRadius: '5px',
  transition: '0.3s',
};
  return (
    <div>
      {/* Navbar */}
       <div
        style={{
          width: '100%',
          background: '#1b1b1b',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
       <img 
  style={{ width: '150px', height: '40px' }} 
  src="/images/machines/logo-avocarbon.png" 
  alt="Logo" 
     />


        <div
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: 'flex',
            flexDirection: 'column',    
            cursor: 'pointer',
            padding: '10px',
          }}
        >
          <div
            style={{
              width: '30px',
              height: '5px',
              backgroundColor: '#fff',
              margin: '5px 0',
              transition: '0.3s',
              transform: isOpen
                ? 'rotate(45deg) translate(5px, 5px)'
                : 'none',
            }}
          ></div>
          <div
            style={{
              width: '30px',
              height: '4px',
              backgroundColor: '#fff',
              margin: '5px 0',
              opacity: isOpen ? 0 : 1,
              transition: '0.3s',
            }}
          ></div>
          <div
            style={{
              width: '30px',
              height: '4px',
              backgroundColor: '#fff',
              margin: '5px 0',
              transition: '0.3s',
              transform: isOpen
                ? 'rotate(-45deg) translate(5px, -5px)'
                : 'none',
            }}
          ></div>
        </div>

        {/* Sidebar Navigation */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: isOpen ? '0' : '-250px',
            width: '250px',
            height: '100vh',
            background: '#282828',
            padding: '20px',
            transition: 'left 0.4s ease-in-out',
            boxShadow: isOpen ? '4px 0 10px rgba(0, 0, 0, 0.2)' : 'none',
          }}
        >
  <h1 style={{ 
  color: 'white', 
  fontSize: '30px', 
  fontWeight: 'bold', 
  borderBottom: '3px solid #87CEEB', 
  marginBottom: "25px", 

}}>
  Sidebar
</h1>


          <ul style={{ listStyle: 'none', padding: 0 }}>
          {(role === 'ADMIN' || role === 'REGLEUR') && (
              <li style={{ padding: '10px 0' }}>
                <a href="/dashboard" style={linkStyle}>
                Dashboard
                </a>
              </li>
            )}
            {(role === 'ADMIN' || role === 'REGLEUR') && (
              <li style={{ padding: '10px 0' }}>
                <a href="/form" style={linkStyle}>
                  Ajouter Production
                </a>
              </li>
            )}
            {role === 'ADMIN' && (
              <>
                <li style={{ padding: '10px 0' }}>
                  <a href="/calendar" style={linkStyle}>
                    Plannification
                  </a>
                </li>
                <li style={{ padding: '10px 0' }}>
                  <a href="/history" style={linkStyle}>
                    Historique
                  </a>
                </li>
                <li style={{ padding: '10px 0' }}>
                  <a href="/ajouternouvellemachine" style={linkStyle}>
                    Ajouter une machine
                  </a>
                </li>
                <li style={{ padding: '10px 0' }}>
                  <a href="/listregleur" style={linkStyle}>
                    List des régleurs
                  </a>
                </li>
                <li style={{ padding: '10px 0' }}>
                  <a href="/detailoutil" style={linkStyle}>
                    List des outils
                  </a>
                </li>
                <li style={{ padding: '10px 0' }}>
                  <a href="/listoperateur" style={linkStyle}>
                    List des Opérateurs
                  </a>
                </li>
                <li style={{ padding: '10px 0' }}>
                  <a href="/ajouterdefaut" style={linkStyle}>
                    List des défauts
                  </a>
                </li>
                <li style={{ padding: '10px 0' }}>
                  <a href="/details" style={linkStyle}>
                    Détails des machines
                  </a>
                </li>
              </>
            )}
            {(role === 'ADMIN' || role === 'REGLEUR') && (
              <li style={{ padding: '10px 0' }}>
                <a href="/changementmeules" style={linkStyle}>
                  Changement  meules
                </a>
              </li>
            )}
              {(role === 'ADMIN' || role === 'REGLEUR') && (
              <li style={{ padding: '10px 0' }}>
                <a href="/updatereference" style={linkStyle}>
                  Changement  réferences
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Historique Container */}
      <div className="history-container">
  

        {/* Date Filter */}
        <div className="date-filter" style={{paddingTop: '50px'}}>
         
          <label htmlFor="date">Filtrer par date :</label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={handleDateChange}
          />
          <button
       className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-2 rounded-lg shadow-md flex items-center gap-2 transition-all duration-300"
       onClick={handleDownloadExcel}
        >
       📥 Download Excel
      </button>

     {/* PDF Download Button */}
     <button
      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-2 rounded-lg shadow-md flex items-center gap-2 transition-all duration-300"
      onClick={handleDownloadPDF}
      >
     📄 Download PDF
     </button>
        </div>

        {/* Table Display */}
        <table className="history-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
              <th>Shift</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistorique.length > 0 ? (
              filteredHistorique.map((entry, index) => {
                const { date, time } = formatDate(entry.created_at);
                const shift = getShift(time);
                return (
                  <tr key={index}>
                    <td>{date}</td>
                    <td>{time}</td>
                    <td>{entry.text}</td>
                    <td>{shift}</td>
                    <td>{user}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="no-data">Aucun historique disponible.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* CSS Styles */}
      <style>
        {`
          .history-container {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
            margin: 20px auto;
            max-width: 800px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }

          .history-title {
            font-size: 28px;
            font-weight: 600;
            color: #333;
            text-align: center;
            margin-bottom: 20px;
          }

          .date-filter {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;
          }

          .date-filter label {
            margin-right: 10px;
            font-size: 16px;
            color: #555;
          }

          .date-filter input {
            padding: 8px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 6px;
          }

          .history-table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
          }

          .history-table th, .history-table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }

          .history-table th {
            background-color: #007bff;
            color: white;
          }

          .history-table tbody tr:hover {
            background-color: #f1f1f1;
          }

          .no-data {
            text-align: center;
            font-weight: bold;
            color: #777;
            padding: 12px;
          }
        `}
      </style>
    </div>
  );
};

export default ActionHistory;
