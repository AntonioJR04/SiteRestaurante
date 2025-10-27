import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPizzaSlice } from "react-icons/fa";
import "../style/header.css";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="header-glass">
      <div className="logo-area" onClick={() => navigate("/")}>
        {/* <FaPizzaSlice size={26} color="#e60023" /> */}
        <h1>ComandaPro</h1>
      </div>

      <nav className="navbar">
        <ul className="nav-list">
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
              Home
            </a>
          </li>
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate("/reservas"); }}>
              Reservar
            </a>
          </li>
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate("/pratos"); }}>
              Pratos
            </a>
          </li>
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate("/bebidas"); }}>
              Bebidas
            </a>
          </li>
        </ul>
      </nav>

      <div className="profile-icon" onClick={() => navigate("/profile")}>
        <FaPizzaSlice size={24} color="#694100" />
      </div>
    </header>
  );
}
