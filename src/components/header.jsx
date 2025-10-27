
import React from "react";
import { useNavigate } from "react-router-dom";
import '../style/header.css';
import { FaPizzaSlice } from 'react-icons/fa';
import '../style/header.css';
export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="cabecalho">
      <a href="#" onClick={(e) => { e.preventDefault(); navigate("/"); }}><p>Home</p></a>
      <a href="#" onClick={(e) => { e.preventDefault(); navigate("/reservas"); }}><p>Reservar</p></a>
      <a href="#" onClick={(e) => { e.preventDefault(); navigate("/pratos"); }}><p>Pratos</p></a>
      <a href="#" onClick={(e) => { e.preventDefault(); navigate("/bebidas"); }}><p>Bebidas</p></a>

      <FaPizzaSlice className="icone-profile" onClick={(e) => 
        { e.preventDefault(); navigate("/profile"); }} size={30} color="#E60023"/>



    </header>
  );
}
