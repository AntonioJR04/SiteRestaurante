import express from 'express';
import pg from 'pg';
import env from 'dotenv';
import cors from 'cors';
import bcrypt from "bcrypt";

env.config();
const app = express();
const port = 3000;
const saltRounds = parseInt(process.env.SALT_ROUNDS);

app.use(cors());
app.use(express.json()); // Permite receber JSON do body

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: {
    rejectUnauthorized: false
  }
});

db.connect()
  .then(() => console.log("✅ Conectado ao PostgreSQL"))
  .catch(err => console.error("❌ Erro ao conectar no banco:", err));

app.get("/", (req, res) => {
  res.send("Servidor rodando!");
});

app.post("/login", async (req, res) => {
  const { userEmail, userPassword } = req.body;

  try {
    if (!userEmail || !userPassword) {
      return res.status(400).json({ success: false, message: "Todos os campos são obrigatórios." });
    }

    if (!userEmail.includes("@")) {
      return res.status(400).json({ success: false, message: "E-mail inválido." });
    }

    const userCheck = await db.query(
      "SELECT * FROM usuario WHERE email_usuario = $1",
      [userEmail]
    );

    if (userCheck.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Usuário não encontrado." });
    }

    const user = userCheck.rows[0];
    const senhaCorreta = await bcrypt.compare(userPassword, user.senha_hash);

    if (!senhaCorreta) {
      return res.status(401).json({ success: false, message: "Senha incorreta." });
    }

    return res.status(200).json({
      success: true,
      message: "Login realizado com sucesso!",
      userType: user.tipo_usuario,
      userId: user.id_usuario
    });

  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return res.status(500).json({ success: false, message: "Erro interno do servidor." });
  }
});

app.post("/signup", async (req, res) => {
  const { userEmail, userName, userPhone, userPassword, userConfirmPassword } = req.body;

  try {
    if (!userEmail || !userName || !userPhone || !userPassword || !userConfirmPassword) {
      return res.status(400).json({ success: false, message: "Todos os campos são obrigatórios." });
    }

    if (!userEmail.includes("@")) {
      return res.status(400).json({ success: false, message: "E-mail inválido." });
    }

    if (userPassword !== userConfirmPassword) {
      return res.status(400).json({ success: false, message: "As senhas não coincidem." });
    }

    const existingUser = await db.query(
      "SELECT * FROM usuario WHERE email_usuario = $1",
      [userEmail]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ success: false, message: "E-mail já cadastrado." });
    } else {
      const hash = await bcrypt.hash(userPassword, saltRounds);

      const result = await db.query(
        "INSERT INTO usuario (email_usuario, senha_hash, tipo_usuario) VALUES ($1, $2, $3) RETURNING id_usuario",
        [userEmail, hash, "cliente"]
      );

      const userId = result.rows[0].id_usuario;

      await db.query(
        "INSERT INTO cliente (nome_cliente, telefone_cliente, id_usuario) VALUES ($1, $2, $3)",
        [userName, userPhone, userId]
      );

      return res.status(201).json({ success: true, message: "Usuário cadastrado com sucesso!" });
    }

  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    return res.status(500).json({ success: false, message: "Erro interno do servidor." });
  }
});

app.get("/pratos", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM prato");
    res.json({ success: true, produtos: result.rows });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res.status(500).json({ success: false, message: "Erro interno do servidor." });
  }
});

app.get("/bebidas", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM bebida");
    res.json({ success: true, produtos: result.rows });
  } catch (error) {
    console.error("Erro ao buscar bebidas:", error);
    res.status(500).json({ success: false, message: "Erro interno do servidor." });
  }
});

app.get("/reservas", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM reserva");
    res.json({ success: true, produtos: result.rows });
  } catch (error) {
    console.error("Erro ao buscar reservas:", error);
    res.status(500).json({ success: false, message: "Erro interno do servidor." });
  }
});



app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
