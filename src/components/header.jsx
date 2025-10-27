
import React from "react";
import { useNavigate } from "react-router-dom";
import '../style/header.css';
<<<<<<< HEAD

=======
import { FaPizzaSlice } from 'react-icons/fa';
import '../style/header.css';
>>>>>>> joao-frontend
export default function Header() {
  const navigate = useNavigate();

  return (
<<<<<<< HEAD
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

=======
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
>>>>>>> joao-frontend
