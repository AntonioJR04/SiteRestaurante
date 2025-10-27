import '../style/login.css'

export default function Login() {

  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Cadastrar</h2>

        <label>
          Usuário:
          <input 
            placeholder="Digite seu e-mail" 
            type="email" 
            name="userEmail" 
            required 
          />
        </label>

        <label>
          Usuário:
          <input 
            placeholder="Digite seu telefone" 
            type="text" 
            name="userTelephone" 
            required 
          />
        </label>

        <label>
          Nome:
          <input 
            placeholder="Digite seu nome completo" 
            type="text" 
            name="username" 
            required 
          />
        </label>

        <label>
          Senha:
          <input 
            placeholder="Digite sua senha" 
            type="password" 
            name="password" 
            required 
          />
        </label>

        <div className="lembrar">
          <input className="checkbox-lembrarme" type="checkbox" id="lembrar" />
          <label htmlFor="lembrar">Lembrar-me</label>
        </div>

        <button type="submit">Login</button>

        <div className="signup-text">
          <h6>Já possui conta?</h6>
          <a href="/login">Login</a>
        </div>
      </form>
      <div className="login-image"></div>
    </div>
  )
}