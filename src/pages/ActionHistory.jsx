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

  

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <ul className="navbar-links">
         {(role === 'ADMIN' || role === 'REGLEUR') && <li><a href="/form">Ajouter Production</a></li>}
          {role === "ADMIN" && <li><a href="/calendar">Plannification</a></li>}
          {(role === "ADMIN" || role === "REGLEUR") && <li><a href="/changementmeules">Changement des meules</a></li>}
          {role === "ADMIN" && <li><a href="/ajouternouvellemachine">Ajouter une machine</a></li>}
          {role === "ADMIN" && <li><a href="/listregleur">List des régleurs</a></li>}
          {role === "ADMIN" && <li><a href="/detailoutil">List des outils</a></li>}
          {role === "ADMIN" && <li><a href="/listoperateur">List des Opérateurs</a></li>}
          {role === "ADMIN" && <li><a href="/ajouterdefaut">List des defauts</a></li>}
          {role === "ADMIN" && <li><a href="/details">Détails des machines</a></li>}
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </ul>
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
