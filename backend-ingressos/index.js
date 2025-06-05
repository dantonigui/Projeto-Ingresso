const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors')

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const webhookRoutes = require("./routes/webHookRoutes");
const authMiddlewares = require('./middleware/authMiddleware')

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // só permite o frontend acessar
    credentials: true
}))

// Usar rotas
app.use("/api/auth",  authRoutes);
app.use("/api/eventos", eventRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/webhook", webhookRoutes);

// Rotas de resposta do Mercado Pago (após redirecionamento)
app.get("/sucesso", (req, res) => res.json("Pagamento Recebido com Sucesso"));
app.get("/pendente", (req, res) => res.json("Pagamento Pendente"));
app.get("/erro", (req, res) => res.json("Pagamento não recebido"));

// Iniciar servidor
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URL)
  .then(() => app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`)))
  .catch((err) => console.log(err));
