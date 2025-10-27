
import React from "react";
import { useNavigate } from "react-router-dom";
import '../style/header.css';
import { FaPizzaSlice } from 'react-icons/fa';
import '../style/header.css';
export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <h1 className="logo">ComandaPro</h1>
      <nav className="navbar">
        <ul className="navList">
          <li><a href="#cardapio" className="navLink" onClick={(e) => { e.preventDefault(); navigate("/"); }}>Home</a></li>
          <li><a href="#reservas" className="navLink" onClick={(e) => { e.preventDefault(); navigate("/reservas"); }}>Reservar</a></li>
          <li><a href="#pedidos" className="navLink" onClick={(e) => { e.preventDefault(); navigate("/pratos"); }}>Pratos</a></li>
          <li><a href="#avaliacoes" className="navLink" onClick={(e) => { e.preventDefault(); navigate("/bebidas"); }}>Bebidas</a></li>
        </ul>
      </nav>
    </header>
  );
}

