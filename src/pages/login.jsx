import '../style/login.css'

export default function Login() {

  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Entrar</h2>

        <label>
          Usuário:
          <input 
            placeholder="Digite seu e-mail ou telefone" 
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
          <h6>Não possui conta?</h6>
          <a href="/signup">Cadastre-se</a>
        </div>
      </form>
      <div className="login-image"></div>
    </div>
  )
}