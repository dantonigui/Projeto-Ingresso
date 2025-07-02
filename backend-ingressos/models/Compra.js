const mongoose = require("mongoose");

const compraSchema = new mongoose.Schema({
  pagamentoId: String,
  email: String,
  nome: String,
  status: String,
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Evento" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: () => {const dataHoraBR = new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }); return new Date(dataHoraBR);}}
});

module.exports = mongoose.model("Compra", compraSchema);
