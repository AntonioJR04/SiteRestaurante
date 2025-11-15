import React from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import "../style/header.css";

export default function Header({ onOpenBag }) {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");

  return (
    <header className="header-glass">
      <div className="logo-area" onClick={() => navigate("/")}>
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
        </ul>
      </nav>

      <div className="profile-container">
        <p onClick={()=> navigate("/profile")}>Olá, {userName || "Visitante"} </p>

        <button className="sacola-btn" onClick={onOpenBag}>
          <FaShoppingBag size={22} />
        </button>
      </div>
    </header>
  );
}
