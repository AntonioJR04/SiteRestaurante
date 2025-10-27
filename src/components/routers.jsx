import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/homePage.jsx";
import Login from "../pages/login.jsx";
import SignUp from "../pages/signUp.jsx";
import Profile from "../pages/profile.jsx";
import Pratos from "../pages/prato.jsx";
import Bebidas from "../pages/drink.jsx";
import Reservas from "../pages/reserva.jsx";

export default function Routers() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/pratos" element={<Pratos />} />
          <Route path="/bebidas" element={<Bebidas />} />
          <Route path="/reservas" element={<Reservas />} />

        </Routes>
      </div>
    </>
  );
}
