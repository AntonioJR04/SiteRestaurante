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
app.use(express.json());

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: { rejectUnauthorized: false }
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

    const cliente = await db.query(
      "SELECT id_cliente, nome_cliente FROM cliente WHERE id_usuario = $1",
      [user.id_usuario]
    );

    let idCliente = cliente.rows.length > 0 ? cliente.rows[0].id_cliente : null;
    let userName = cliente.rows.length > 0 ? cliente.rows[0].nome_cliente : null;

    return res.status(200).json({
      success: true,
      message: "Login realizado com sucesso!",
      userType: user.tipo_usuario,
      userId: user.id_usuario,
      idCliente,
      userName
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

    if (userPassword !== userConfirmPassword) {
      return res.status(400).json({ success: false, message: "As senhas não coincidem." });
    }

    const existingUser = await db.query(
      "SELECT 1 FROM usuario WHERE email_usuario = $1",
      [userEmail]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ success: false, message: "E-mail já cadastrado." });
    }

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
    res.status(500).json({ success: false });
  }
});

app.get("/bebidas", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM bebida");
    res.json({ success: true, produtos: result.rows });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});


app.post("/reservas", async (req, res) => {
  const { data_reserva, hora_reserva, mesa_numero, id_cliente } = req.body;

  if (!data_reserva || !hora_reserva || !mesa_numero || !id_cliente) {
    return res.status(400).json({ success: false, message: "Campos obrigatórios." });
  }

  try {
    const cliente = await db.query(
      "SELECT 1 FROM cliente WHERE id_cliente = $1",
      [id_cliente]
    );

    if (cliente.rows.length === 0) {
      return res.status(400).json({ success: false, message: "Cliente inválido. Faça o login." });
    }

    const existe = await db.query(
      "SELECT 1 FROM reserva WHERE data_reserva = $1 AND horario_reserva = $2 AND id_mesa = $3",
      [data_reserva, hora_reserva, mesa_numero]
    );

    if (existe.rows.length > 0) {
      return res.status(409).json({ success: false, message: "Mesa ocupada." });
    }

    const result = await db.query(
      "INSERT INTO reserva (data_reserva, horario_reserva, id_mesa, id_cliente) VALUES ($1, $2, $3, $4) RETURNING id_reserva",
      [data_reserva, hora_reserva, mesa_numero, id_cliente]
    );

    res.status(201).json({ success: true, id: result.rows[0].id_reserva });

  } catch (error) {
    res.status(500).json({ success: false });
  }
});


app.post("/reservas/disponibilidade", async (req, res) => {
  const { data_reserva, hora_reserva } = req.body;

  try {
    const result = await db.query(
      "SELECT id_mesa FROM reserva WHERE data_reserva = $1 AND horario_reserva = $2",
      [data_reserva, hora_reserva]
    );

    res.json({
      success: true,
      mesasOcupadas: result.rows.map(r => r.id_mesa)
    });

  } catch (error) {
    res.status(500).json({ success: false });
  }
});

app.listen(port, () => {
  console.log(`✅ Servidor rodando em http://localhost:${port}`);
});
