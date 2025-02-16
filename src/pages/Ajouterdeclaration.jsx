import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RoleContext } from "./RoleContext";
import { message, Select, Form, Button, Input } from "antd";

const { Option } = Select;

const AjouterDeclaration = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { role } = useContext(RoleContext);

  const [form] = Form.useForm();
  const userID = localStorage.getItem("userEmail");

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "https://grinding-backend.azurewebsites.net/ajouter/ajouterdeclaration",
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        message.success("Outil ajouté avec succès !");
        form.resetFields();
      } else {
        message.error("Échec de l'ajout de l'outil.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      message.error("Une erreur s'est produite.");
    }
  };

  const linkStyle = {
    textDecoration: "none",
    color: "white",
    fontWeight: "bold",
    display: "block",
    padding: "12px 8px",
    borderRadius: "5px",
    transition: "0.3s",
  };

  return (
    <div>
      <h1 style={{ fontWeight: "bold", textAlign: "center", fontSize: "40px", marginTop: "20px" }}>
        Ajouter Outil
      </h1>

      {/* Navbar */}
      <div style={styles.navbar}>
        <img style={{ width: "150px", height: "40px" }} src="/images/machines/logo-avocarbon.png" alt="Logo" />
        <div onClick={() => setIsOpen(!isOpen)} style={styles.menuIcon}>
          <div style={{ ...styles.bar, transform: isOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }}></div>
          <div style={{ ...styles.bar, opacity: isOpen ? 0 : 1 }}></div>
          <div style={{ ...styles.bar, transform: isOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }}></div>
        </div>

        {/* Sidebar */}
        <div style={{ ...styles.sidebar, left: isOpen ? "0" : "-250px" }}>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {(role === "ADMIN" || role === "REGLEUR") && (
              <li>
                <a href="/form" style={linkStyle}>Ajouter Production</a>
              </li>
            )}
            {role === "ADMIN" && (
              <>
                <li><a href="/calendar" style={linkStyle}>Plannification</a></li>
                <li><a href="/history" style={linkStyle}>Historique</a></li>
                <li><a href="/ajouternouvellemachine" style={linkStyle}>Ajouter une machine</a></li>
                <li><a href="/listregleur" style={linkStyle}>Liste des régleurs</a></li>
                <li><a href="/detailoutil" style={linkStyle}>Liste des outils</a></li>
                <li><a href="/listoperateur" style={linkStyle}>Liste des opérateurs</a></li>
                <li><a href="/ajouterdefaut" style={linkStyle}>Liste des défauts</a></li>
                <li><a href="/details" style={linkStyle}>Détails des machines</a></li>
              </>
            )}
            {(role === "ADMIN" || role === "REGLEUR") && (
              <li>
                <a href="/changementmeules" style={linkStyle}>Changement des meules</a>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Form */}
      <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item label="Nom de machine" name="nom_machine" >
            <Input placeholder="Entrez le nom de la machine" />
          </Form.Item>

          <Form.Item label="Référence" name="reference">
            <Input placeholder="Entrez la référence" />
          </Form.Item>

          <Form.Item label="Outil" name="outil" >
            <Input placeholder="Entrez l'outil" />
          </Form.Item>

          <Form.Item label="Durée de vie" name="dureedevie" >
            <Input placeholder="Entrez la durée de vie" />
          </Form.Item>

          <Form.Item label="Phase" name="phase">
            <Select placeholder="Sélectionnez la phase">
              <Option value="roueavancement">Roue d'avancement</Option>
              <Option value="Usinagehauteur">Usinage Hauteur</Option>
              <Option value="Usinagelargeur">Usinage Largeur</Option>
              <Option value="Usinagechanfreins">Usinage Chanfreins</Option>
              <Option value="Usinagerainure">Usinage Rainure</Option>
              <Option value="Usinagerayonnage">Usinage Rayonnage</Option>
              <Option value="Usinagetete">Usinage Tête</Option>
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit" style={styles.button}>
            Ajouter
          </Button>
        </Form>
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    width: "100%",
    background: "#1b1b1b",
    padding: "10px",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuIcon: {
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    padding: "10px",
  },
  bar: {
    width: "30px",
    height: "4px",
    backgroundColor: "#fff",
    margin: "5px 0",
    transition: "0.3s",
  },
  sidebar: {
    position: "fixed",
    top: 0,
    width: "250px",
    height: "100vh",
    background: "#282828",
    padding: "20px",
    transition: "left 0.4s ease-in-out",
  },
  button: {
    width: "100%",
    marginTop: "10px",
  },
};

export default AjouterDeclaration;
