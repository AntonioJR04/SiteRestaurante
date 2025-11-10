import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPizzaSlice } from 'react-icons/fa';
import '../style/header.css';

export default function Header() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");

  return (
    <header className="cabecalho">
      <a href="#" onClick={(e) => { e.preventDefault(); navigate("/"); }}><p>Home</p></a>
      <a href="#" onClick={(e) => { e.preventDefault(); navigate("/reservas"); }}><p>Reservar</p></a>
      <a href="#" onClick={(e) => { e.preventDefault(); navigate("/pratos"); }}><p>Pratos</p></a>
      <a href="#" onClick={(e) => { e.preventDefault(); navigate("/bebidas"); }}><p>Bebidas</p></a>

      <div className="profile-container" onClick={() => navigate("/profile")}>
        <FaPizzaSlice className="icone-profile" size={30} color="#E60023"/>
        <p>Olá, {userName || "Visitante"}</p>
      </div>
    </header>
  );
}
