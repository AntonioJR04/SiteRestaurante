import React, { useState } from "react";
import CarouselComponent from "../components/carousel.jsx";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import "../style/homePage.css"
import Produto from "../components/produto.jsx";
import BagModal from "../components/bagModal.jsx";


export default function HomePage() {
  const [typeFood, setTypeFood] = useState("todos");
  const [bagIsOpen, setBagIsOpen] = useState(false);
  const [bagItems, setBagItems] = useState([]);
  const [msg, setMsg] = useState("");
  function Message({ text }) {
    if (!text) return null;

    return (
      <div className="msg-sucesso">
        {text}
      </div>
    );
  }


  return (
    <div>
      <Header onOpenBag={() => setBagIsOpen(true)} />
      <Message text={msg} />
      <CarouselComponent />
      <div className="text-center mt-5">
        <h1>Bem-vindo ao Restaurante Sabor & Arte</h1>
        <p>Experimente o melhor da gastronomia com ingredientes frescos e locais.</p>
      </div>
      <div className="homepage">

        <section id="cardapio" className="sec-cardapio">
          <h2 className="sec-title">Cardápio Digital</h2>
          <div className="cardapio-list">
            <div className="cardapio-item">
              <div className="btn-cardapio">
                <button className="produto-botao-comprar" onClick={() => setTypeFood("todos")}>Pratos</button>
                <button className="produto-botao-comprar" onClick={() => setTypeFood("bebidas")}>Bebidas</button>
              </div>

              {typeFood === "todos" ? (
                <Produto
                  addToBag={(item) => {
                    setBagItems(prev => {
                      const existe = prev.find(i => i.id === item.id);
                      if (existe) {
                        return prev.map(i => i.id === item.id ? { ...i, qtd: i.qtd + 1 } : i);
                      }
                      return [...prev, item];
                    });
                    setMsg("Item adicionado!");
                    setTimeout(() => setMsg(""), 2500);
                  }}
                />

              ) : (<Produto
                categoria={typeFood}
                addToBag={(item) => {
                  setBagItems(prev => {
                    const existe = prev.find(i => i.id === item.id);
                    if (existe) {
                      return prev.map(i => i.id === item.id ? { ...i, qtd: i.qtd + 1 } : i);
                    }
                    return [...prev, item];
                  });
                  setMsg("Item adicionado!");
                  setTimeout(() => setMsg(""), 2500);

                }}
              />
              )}
            </div>
          </div>
        </section>

        <section id="pedidos" className="sec-pedidos">
          <h2 className="sec-title">Faça seu pedido</h2>

          <p className="pedido-opcao">Escolha uma opção</p>

          <div className="btn-cardapio">
            <button className="produto-botao-comprar">Retirar</button>
            <button className="produto-botao-comprar">Entrega</button>
          </div>

          <form className="form-pedidos">
            <div className="floating-label">
              <input type="text" placeholder=" " required />
              <label>Seu nome</label>
            </div>

            <div className="floating-label">
              <input type="text" placeholder=" " />
              <label>Endereço (caso entrega)</label>
            </div>

            <div className="floating-label">
              <textarea placeholder=" " required />
              <label>Descreva seu pedido</label>
            </div>

            <button type="submit" className="produto-botao-comprar">Enviar Pedido</button>
          </form>
        </section>



        <section id="avaliacoes" className="sec-avaliacoes">
          <h2 className="sec-title">Avaliações</h2>

          <div className="avaliacoes-container">

            <div className="avaliacao-card">
              <div className="avaliacao-estrelas">⭐⭐⭐⭐⭐</div>
              <p className="avaliacao-nome">Junior</p>
              <p className="avaliacao-texto">
                Provei o macarrão e automaticamente comecei a falar italiano. Muito bom!
              </p>
            </div>

            <div className="avaliacao-card">
              <div className="avaliacao-estrelas">⭐⭐⭐⭐</div>
              <p className="avaliacao-nome">Anderson</p>
              <p className="avaliacao-texto">Bom atendimento.</p>
            </div>

            <div className="avaliacao-card">
              <div className="avaliacao-estrelas">⭐⭐⭐⭐⭐</div>
              <p className="avaliacao-nome">João</p>
              <p className="avaliacao-texto">A pizza estava maravilhosa!</p>
            </div>

            <div className="avaliacao-card">
              <div className="avaliacao-estrelas">⭐⭐⭐⭐</div>
              <p className="avaliacao-nome">Eduarda</p>
              <p className="avaliacao-texto">Ambiente excelente e comida deliciosa.</p>
            </div>

            <div className="avaliacao-card">
              <div className="avaliacao-estrelas">⭐⭐⭐⭐⭐</div>
              <p className="avaliacao-nome">Marcelo</p>
              <p className="avaliacao-texto">Melhor restaurante da cidade!</p>
            </div>

          </div>
        </section>

      </div >
      <Footer />
      <BagModal
        isOpen={bagIsOpen}
        onClose={() => setBagIsOpen(false)}
        items={bagItems}
        setItems={setBagItems}
      />

    </div>

  );
}
