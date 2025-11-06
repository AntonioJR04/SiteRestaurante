import React from "react";
import "../style/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-logo">
          <h2>ComandaPro</h2>
          <p>Gerencie pedidos com eficiência e estilo.</p>
        </div>

        <div className="footer-links">
          <a href="/">Início</a>
          <a href="/sobre">Sobre</a>
          <a href="/contato">Contato</a>
          <a href="/login">Login</a>
        </div>

        <div className="footer-socials">
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="https://x.com" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-x-twitter"></i>
          </a>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} ComandaPro. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
