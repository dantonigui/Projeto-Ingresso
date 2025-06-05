const mongoose = require('mongoose');

const CardPaymentSchema = new mongoose.Schema({
  pagamentoId: String,
  email: String,
  first_name: String,
  payer_id: String,
  identification: {
    type: {
      type: String,
    },
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

module.exports = mongoose.model('CardPayment', CardPaymentSchema);
