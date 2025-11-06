import { useState } from "react";
import "../style/login.css";
import axios from 'axios';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  async function tryLogin(event) {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", {
        userEmail,
        userPassword
      });

      // Se o status for 200, deu certo
      if (response.data.success) {
        alert(response.data.message);
        // Aqui você pode redirecionar, ex:
        // window.location.href = "/dashboard";
      }

    } catch (error) {
      // 👇 Axios joga erros 4xx/5xx aqui
      if (error.response) {
        const { status, data } = error.response;

        if (status === 401 || status === 404) {
          alert("Tente novamente.");
        } else if (data?.message) {
          alert(data.message);
        } else {
          alert("Erro desconhecido ao tentar fazer login.");
        }
      } else {
        console.error("Erro de conexão com o servidor:", error);
        alert("Erro ao tentar fazer login. Verifique a conexão com o servidor.");
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
            type="text"
            placeholder="Digite seu e-mail"
            id="userEmail"
            value={userEmail}
            onChange={(event) => setUserEmail(event.target.value)}
            required
          />
        </div>

        <div className="input-group password-field">
          <label>Senha</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Digite sua senha"
            id="password"
            value={userPassword}
            onChange={(event) => setUserPassword(event.target.value)}
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

        <div className="remember">
          <input type="checkbox" id="lembrar" />
          <label htmlFor="lembrar">Lembrar-me</label>
          <a href="#">Esqueceu a senha?</a>
        </div>

        <button type="submit" className="btn-primary">
          Entrar
        </button>

        <p className="signup-text">
          Não possui conta? <a href="/signup">Cadastre-se</a>
        </p>
      </form>
    </div>
  );
}
