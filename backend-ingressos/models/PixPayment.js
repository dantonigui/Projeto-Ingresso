const mongoose = require('mongoose');

const PixPaymentSchema = new mongoose.Schema({
  pagamentoId: String,
  email: String,
  first_name: String,
  payer_id: String,
  identification: {
    type: String,
    number: String
  },
  phone: {
    area_code: String,
    number: String
  },
  description: String,
  status: String,
  metodo: String,
  data: Date
});

module.exports = mongoose.model('PixPayment', PixPaymentSchema);
