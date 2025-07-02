require('dotenv').config();
const {MercadoPagoConfig, Payment} = require('mercadopago')

const mp = new MercadoPagoConfig({
    accessToken: process.env.TOKEN_MERCADO_PAGO
})

const payment = new Payment(mp)

module.exports = {mp, payment}