import React, { useState, useEffect } from "react";
import Header from "../components/header.jsx";
import "../style/reserva.css";

export default function Reserva() {
  const [selectedMesa, setSelectedMesa] = useState(null);
  const [selectedData, setSelectedData] = useState("");
  const [selectedHorario, setSelectedHorario] = useState("");
  const [mesasOcupadas, setMesasOcupadas] = useState([]);

  const mesas = [1,2,3,4,5,6,7,8,9,10];
  //intervalo de 1h30 em 1h30
  const gerarHorarios = () => {
    const horarios = [];
    let hora = 10;
    let minuto = 0;

    while (hora < 24) {
      horarios.push(`${String(hora).padStart(2,"0")}:${String(minuto).padStart(2,"0")}`);

      minuto += 30;
      if (minuto >= 60) {
        minuto = 0;
        hora++;
      }
      hora++;
    }

    return horarios;
  };

  const horariosDisponiveis = gerarHorarios();


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
    const id_cliente = Number(localStorage.getItem("userId"));

    if (!id_cliente) {
      alert("Faça login primeiro.");
      return;
    }

    if (!selectedMesa || !selectedHorario || !selectedData) {
      alert("Preencha todos os campos.");
      return;
    }

    const reserva = {
      data_reserva: selectedData,
      hora_reserva: selectedHorario,
      mesa_numero: selectedMesa,
      id_cliente
    };

    const response = await fetch("http://localhost:3000/reservas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reserva),
    });

    const data = await response.json();

    if (!data.success) {
      alert(data.message);
      return;
    }

    alert("Reserva confirmada!");
    //console.log("id", id_cliente);
  }

  


  return (
    <div>
      <Header />

      <div className="reserva-container">

        <h2>Escolha a data e horário:</h2>

        <input
          type="date"
          className="data-input"
          value={selectedData}
          onChange={(e) => setSelectedData(e.target.value)}
        />

        <select
          className="hora-input"
          value={selectedHorario}
          onChange={(e) => setSelectedHorario(e.target.value)}
        >
          <option value="">Selecione o horário</option>
          {horariosDisponiveis.map(h => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>

        <h3>Selecione sua mesa</h3>

        <div className="mesa-container">
          {mesas.map((mesa) => {
            const ocupado = mesasOcupadas.includes(mesa);

            return (
              <button
                key={mesa}
                disabled={ocupado}
                className={`mesa-btn 
                  ${selectedMesa === mesa ? "selecionada" : ""} 
                  ${ocupado ? "ocupada" : ""}
                `}
                onClick={() => setSelectedMesa(mesa)}
              >
                {mesa}
              </button>
            );
          })}
        </div>

        <button className="confirmar-btn" onClick={reservarMesa}>
          Reservar Mesa
        </button>
      </div>
    </div>
  );
}
