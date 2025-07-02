const express = require("express");
const router = express.Router();
const webhookController = require("../controllers/webHookController");

// Receber notificações do Mercado Pago
router.post("/", webhookController.handleWebhook);

module.exports = router;
