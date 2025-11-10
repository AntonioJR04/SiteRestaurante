import { useState } from "react";
import axios from "axios";
import "../style/login.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const BE_PORT = import.meta.env.VITE_BE_PORT;

  async function tryLogin(event) {
    event.preventDefault();

    try {
      const response = await axios.post(`${BE_PORT}/login`, {
        userEmail,
        userPassword,
      });

      if (response.data.success) {
        localStorage.setItem("idCliente", response.data.idCliente);
        localStorage.setItem("userName", response.data.userName);
        localStorage.setItem("userType", response.data.userType);

        window.location.href = "/";
      } else {
        alert(response.data.message || "Falha no login.");
      }

    } catch (error) {
      console.error("Erro ao fazer login:", error);

      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Erro ao tentar fazer login.");
      }
    }
  }

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={tryLogin}>
        <h2>Entrar</h2>

        <div className="input-group">
          <label>E-mail</label>
          <input
          placeholder="Digite seu e-mail"
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group password-field">
          <label>Senha</label>
          <input
          placeholder="Digite sua senha"
            type={showPassword ? "text" : "password"}
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            required
          />

          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <button type="submit" className="btn-primary">Entrar</button>

        <p className="signup-text">
          Não possui conta? <a href="/signup">Cadastre-se</a>
        </p>
      </form>
    </div>
  );
}
