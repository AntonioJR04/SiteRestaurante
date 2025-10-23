import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/homePage.jsx";
import Login from "../pages/login.jsx";
import SignUp from "../pages/signUp.jsx";

export default function Routers() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

        </Routes>
      </div>
    </>
  );
}
