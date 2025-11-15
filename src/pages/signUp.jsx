import { useState } from "react";
import "../style/signUp.css";
import axios from 'axios';


export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");

  const id_cliente = Number(localStorage.getItem("userId"));

  async function trySignUp(event) {
    event.preventDefault();

    if (userPassword !== userConfirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    try{
      const response = await axios.post("http://localhost:3000/signup", {
      userEmail,
      userName,
      userPhone,
      userPassword,
      userConfirmPassword
    });
 
    if (response.data.success) {
        alert(response.data.message);
        window.location.href = "/login";
      }
    }
    catch(error){
      if(error.response){
        const { status, data } = error.response;

        if(status === 409){
          window.location.href = "/login";
        }
        else if(data?.message){
          alert(data.message);
        }
        else{
          alert("Erro desconhecido ao tentar cadastrar.");
        }
      }
    }
  }

  return (
    <div className="signup-container">


      <form className="signup-card" onSubmit={trySignUp}>
        <h2>Crie sua conta</h2>

        <div className="input-group">
          <label>E-mail</label>
          <input type="email" 
          placeholder="Digite seu e-mail" 
          id="userEmail"
          value={userEmail}
          onChange={(event) => setUserEmail(event.target.value)}
          required />
        </div>

        <div className="input-group">
          <label>Nome completo</label>
          <input type="text" 
          placeholder="Digite seu nome completo"
          id="userName"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          required />
        </div>

        <div className="input-group">
          <label>Telefone</label>
          <input type="tel" 
          placeholder="Digite seu telefone" 
          id="userPhone"
          value={userPhone}
          onChange={(event) => setUserPhone(event.target.value)}
          required />
        </div>

        <div className="input-group password-field">
          <label>Senha</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Digite sua senha"
            id="userPassword"
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

        <div className="input-group password-field">
          <label>Confirmar senha</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirme sua senha"
            id="userConfirmPassword"
            value={userConfirmPassword}
            onChange={(event) => setUserConfirmPassword(event.target.value)}
            required
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <button type="submit" className="btn-primary">
          Cadastrar
        </button>

        <p className="login-text">
          Já tem uma conta? <a href="/login">Entrar</a>
        </p>
      </form>
      <div className="login-image"></div>
    </div>
  );
}
