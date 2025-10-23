import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CarouselComponent() {
  return (
    <Carousel fade interval={2500} pause="hover">
      <Carousel.Item>
        <img
          className="d-block w-100 h-50"
          src="/pizza.jpg"
          alt="Prato principal"
        />
        <Carousel.Caption>
          <h3>Pizzas Artesanais</h3>
          <p>Feitas no forno à lenha, com ingredientes selecionados.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/petit.jpg"
          alt="Pizzas artesanais"
        />
        <Carousel.Caption>
          <h3>Pratos Especiais</h3>
          <p>Sabores únicos preparados pelos nossos chefs.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/drink.jpg"
          alt="Bebidas e coquetéis"
        />
        <Carousel.Caption>
          <h3>Bebidas e Coquetéis</h3>
          <p>Para harmonizar com o melhor do nosso cardápio.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
