import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/carousel.css";

export default function CarouselComponent() {
  return (
    <div className="carousel-wrapper">
      <Carousel fade interval={3000} pause="hover" indicators={true}>
        <Carousel.Item>
          <img
            className="carousel-image"
            src="/pizza.jpg"
            alt="Pizzas artesanais"
          />
          <Carousel.Caption className="carousel-caption">
            <h3>Pizzas Artesanais</h3>
            <p>Feitas no forno à lenha, com ingredientes selecionados.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="carousel-image"
            src="/petit.jpg"
            alt="Pratos especiais"
          />
          <Carousel.Caption className="carousel-caption">
            <h3>Pratos Especiais</h3>
            <p>Sabores únicos preparados pelos nossos chefs.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="carousel-image"
            src="/drink.jpg"
            alt="Bebidas e coquetéis"
          />
          <Carousel.Caption className="carousel-caption">
            <h3>Bebidas e Coquetéis</h3>
            <p>Para harmonizar com o melhor do nosso cardápio.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}