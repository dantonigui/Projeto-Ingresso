const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/checkoutController");

// Criar preferência de pagamento (Mercado Pago)
router.post("/", checkoutController.createCheckout);

module.exports = router;
