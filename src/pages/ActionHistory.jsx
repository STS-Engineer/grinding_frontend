import React, { useEffect, useState } from "react";

const ActionHistory = () => {
  const [user, setUser] = useState("");
  const [action, setAction] = useState("");
  const [item, setItem] = useState("");
  const [userpostecontrole, setUserpostecontrole] = useState("");
  const [actionpostecontrole, setActionpostecontrole] = useState("");
  const [itempostecontrole, setItempostecontrole] = useState("");

  useEffect(() => {
    // Retrieve values from local storage when the component mounts
    const storedUser = localStorage.getItem("user");
    const storedAction = localStorage.getItem("action");
    const storedItem = localStorage.getItem("item");
    const storedUserpostecontrole = localStorage.getItem("userpostecontrole");
    const storedActionpostecontrole = localStorage.getItem("actionpostecontrole");
    const storedItempostecontrole = localStorage.getItem("itempostecontrole");

    setUser(storedUser || ""); // Default to empty string if not found
    setAction(storedAction || "");
    setItem(storedItem || "");
    setUserpostecontrole(storedUserpostecontrole || ""); // Default to empty string if not found
    setActionpostecontrole(storedActionpostecontrole || "");
    setItempostecontrole(storedItempostecontrole || "");
  }, []);

  return (
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
      <div>
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
      </div>

      {user && action && item ? (
        <p
          style={{
            fontSize: "18px",
            color: "#555",
            lineHeight: "1.6",
            textAlign: "center",
            margin: "15px 0",
          }}
        >
          <span
            style={{
              fontSize: "20px",
              color: "#333",
              fontWeight: "600",
            }}
          >
            L'utilisateur:
          </span>
          <span
            style={{
              color: "#333",
            }}
          >
            {user}
          </span>{" "}
          a{" "}
          <span
            style={{
              color: "#333",
            }}
          >
            {action}
          </span>{" "}
          l'outil{" "}
          <span
            style={{
              fontWeight: "bold",
              color: "#4CAF50",
            }}
          >
            {item}
          </span>
          .
        </p>
      ) : (
        <p
          style={{
            fontSize: "16px",
            color: "#777",
            textAlign: "center",
            marginTop: "10px",
          }}
        >
          Aucune action récente enregistrée.
        </p>
      )}

      {userpostecontrole && actionpostecontrole && itempostecontrole ? (
        <p
          style={{
            fontSize: "18px",
            color: "#555",
            lineHeight: "1.6",
            textAlign: "center",
            margin: "15px 0",
          }}
        >
          <span
            style={{
              fontSize: "20px",
              color: "#333",
              fontWeight: "600",
            }}
          >
            L'utilisateur:
          </span>
          <span
            style={{
              color: "#333",
            }}
          >
            {userpostecontrole}
          </span>{" "}
          a{" "}
          <span
            style={{
              color: "#333",
            }}
          >
            {actionpostecontrole}
          </span>{" "}
          le problème poste de contrôle{" "}
          <span
            style={{
              fontWeight: "bold",
              color: "#4CAF50",
            }}
          >
            {itempostecontrole}
          </span>
          .
        </p>
      ) : (
        <p
          style={{
            fontSize: "16px",
            color: "#777",
            textAlign: "center",
            marginTop: "10px",
          }}
        >
          Aucune action récente enregistrée.
        </p>
      )}
    </div>
  );
};

export default ActionHistory;
