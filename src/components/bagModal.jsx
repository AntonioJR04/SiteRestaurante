import React from "react";
import { FaTimes, FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import "../style/bagModal.css";

export default function BagModal({ isOpen, onClose, items, setItems }) {
  if (!isOpen) return null;

  function aumentar(item) {
    setItems((prev) =>
      prev.map((i) =>
        i.id === item.id ? { ...i, qtd: i.qtd + 1 } : i
      )
    );
  }

  function diminuir(item) {
    setItems((prev) =>
      prev.map((i) =>
        i.id === item.id ? { ...i, qtd: Math.max(1, i.qtd - 1) } : i
      )
    );
  }

  function remover(item) {
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  }

  const total = items.reduce((acc, i) => acc + i.preco * i.qtd, 0);

  return (
    <div className="bag-backdrop" onClick={onClose}>
      <div className="bag-modal" onClick={(e) => e.stopPropagation()}>
        
        <div className="bag-header">
          <h2>Sua Sacola</h2>
          <FaTimes className="close-icon" onClick={onClose} />
        </div>

        <div className="bag-items">
          {items.length === 0 ? (
            <p className="bag-empty">Sua sacola está vazia.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="bag-item">
                <img src={item.img} alt={item.nome} />

                <div className="bag-info">
                  <h4>{item.nome}</h4>
                  <p>R$ {item.preco.toFixed(2)}</p>

                  <div className="bag-qtd">
                    <FaMinus onClick={() => diminuir(item)} />
                    <span>{item.qtd}</span>
                    <FaPlus onClick={() => aumentar(item)} />
                  </div>
                </div>

                <FaTrash className="bag-trash" onClick={() => remover(item)} />
              </div>
            ))
          )}
        </div>

        <div className="bag-footer">
          <p>Total: <strong>R$ {total.toFixed(2)}</strong></p>
          <button className="bag-finalizar">Finalizar Pedido</button>
        </div>

      </div>
    </div>
  );
}
