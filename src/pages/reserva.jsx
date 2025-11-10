import React, { useState, useEffect } from "react";
import Header from "../components/header.jsx";
import "../style/reserva.css";

export default function Reserva() {
  const [selectedMesa, setSelectedMesa] = useState(null);
  const [selectedData, setSelectedData] = useState("");
  const [selectedHorario, setSelectedHorario] = useState("");
  const [mesasOcupadas, setMesasOcupadas] = useState([]);

  const id_cliente = Number(localStorage.getItem("idCliente"));

  const mesas = [1,2,3,4,5,6,7,8,9,10];

  const gerarHorarios = () => {
    const horarios = [];
    let hora = 10;

    while (hora < 23) {
      horarios.push(`${String(hora).padStart(2,"0")}:00`);
      horarios.push(`${String(hora).padStart(2,"0")}:30`);
      hora++;
    }
    return horarios;
  };

  useEffect(() => {
    if (!selectedData || !selectedHorario) return;

    fetch("http://localhost:3000/reservas/disponibilidade", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data_reserva: selectedData,
        hora_reserva: selectedHorario
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMesasOcupadas(data.mesasOcupadas);
          setSelectedMesa(null);
        }
      });
  }, [selectedData, selectedHorario]);

  async function reservarMesa() {

    if (!id_cliente) {
      alert("Faça login primeiro!");
      window.location.href = "/login";
      return;
    }

    if (!selectedMesa || !selectedHorario || !selectedData) {
      alert("Preencha todos os campos.");
      return;
    }

    const response = await fetch("http://localhost:3000/reservas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data_reserva: selectedData,
        hora_reserva: selectedHorario,
        mesa_numero: selectedMesa,
        id_cliente
      }),
    });

    const data = await response.json();

    if (!data.success) {
      alert(data.message);
      return;
    }

    alert("Reserva confirmada!");
  }

  return (
    <div>
      <Header />
      <div className="reserva-container">

        <h2>Escolha a data e horário</h2>

        <input
          type="date"
          value={selectedData}
          onChange={(e) => setSelectedData(e.target.value)}
        />

        <select
          value={selectedHorario}
          onChange={(e) => setSelectedHorario(e.target.value)}
        >
          <option value="">Selecione</option>
          {gerarHorarios().map(h => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>

        <h3>Selecione sua mesa</h3>

        <div className="mesa-container">
          {mesas.map((mesa) => (
            <button
              key={mesa}
              disabled={mesasOcupadas.includes(mesa)}
              className={`mesa-btn ${selectedMesa === mesa ? "selecionada" : ""}`}
              onClick={() => setSelectedMesa(mesa)}
            >
              {mesa}
            </button>
          ))}
        </div>

        <button className="confirmar-btn" onClick={reservarMesa}>
          Reservar Mesa
        </button>

      </div>
    </div>
  );
}
