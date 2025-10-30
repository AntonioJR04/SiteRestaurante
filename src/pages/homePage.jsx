import React from "react";
import CarouselComponent from "../components/carousel.jsx";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import "../style/homePage.css"

export default function HomePage() {
  return (
    <div>
      <Header />
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
              <h3 className="item-nome">Macarrão</h3>
              <p className="item-descricao">
                Delicioso macarrão com molho artesanal. <strong>R$ 30,90</strong>
              </p>
            </div>
            <div className="cardapio-item">
              <h3 className="item-nome">Pizza Margherita</h3>
              <p className="item-descricao">
                Tradicional pizza com tomate e manjericão. <strong>R$ 39,90</strong>
              </p>
            </div>

            <div className="cardapio-item">
              <h3 className="item-nome">Hambúrguer Artesanal</h3>
              <p className="item-descricao">
                Pão brioche, carne 180g e molho especial. <strong>R$ 24,90</strong>
              </p>
            </div>
          </div>
        </section>

        <section id="pedidos" className="sec-pedidos">
          <h2 className="sec-title">Faça seu pedido</h2>
          <p className="pedido-opcao">Escolha uma opção</p>
          <div className="pedido-btns">
            <button className="btn-pedido">Retirar</button>
            <button className="btn-pedido">Entrega</button>
          </div>

          <form className="form-pedidos">
            <label>Nome:</label><br />
            <input type="text" placeholder="Seu nome" className="input-text" /><br />

            <label>Endereço (caso entrega):</label><br />
            <input type="text" placeholder="Rua, número, bairro" className="input-text" /><br />

            <label>Pedido:</label><br />
            <textarea placeholder="Descreva seu pedido" className="input-textarea"></textarea><br />

            <button type="submit" className="btn-enviar">Enviar Pedido</button>
          </form>
        </section>

        <section id="avaliacoes" className="sec-avaliacoes">
          <h2 className="sec-title">Avalliações</h2>
          <div className="avaliacoes-list">
            <div className="avaliacao-item">
              <p><strong>Junior:</strong>Provei o macarrão e automaticamente comecei a falar italiano. Muito bom</p> </div>

            <div className="avaliacao-item">
              <p><strong>Anderson:</strong>Bom atendimento.</p> </div>

            <div className="avaliacao-item">
              <p><strong>João:</strong>A pizza estava maravilhosa</p></div>

            <div className="avaliacao-item">
              <p><strong>João:</strong>Ótimo atendimento! Recomendo</p></div>

          </div>
        </section>
      </div >
      <Footer />

    </div>

  );
}
