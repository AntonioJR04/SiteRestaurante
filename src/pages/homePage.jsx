import React from "react";
import CarouselComponent from "../components/carousel.jsx";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";

export default function HomePage() {
  return (
    <div>
      <Header />
      <CarouselComponent />
      <div className="text-center mt-5">
        <h1>Bem-vindo ao Restaurante Sabor & Arte</h1>
        <p>Experimente o melhor da gastronomia com ingredientes frescos e locais.</p>
      </div>

      
    </div>
  );
}
