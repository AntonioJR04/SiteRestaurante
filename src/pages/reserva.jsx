import React from 'react'
import Header from '../components/header.jsx'
import Footer from '../components/footer.jsx'
import '../style/reserva.css'
export default function reserva() {

  return (
    <div>
      <Header />
      <div className="homepage reserva-page">
        <section id="reservas" className="sec-reservas">
          <h2 className="sec-title">Reservas Online</h2>
          <form className="form-reservas">

            <label>Nome:</label><br />
            <input type="text" placeholder="Seu nome" className="input-text" /><br />
            <label>Quantidade:</label><br />
            <input type="number" placeholder="Quantas pessoas" className="input-text" /><br />
            <label>Data:</label><br />
            <input type="date" className="input-date" /><br />
            <label>Horário:</label><br />
            <input type="time" className="input-time" /><br />

            <button type=" submit" className="btn-reserva">Reservar</button>
          </form>
        </section>
      </div>
      <Footer/>

    </div>
  )
}
