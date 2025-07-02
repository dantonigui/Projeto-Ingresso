const { payment } = require('../config/mercadopago');
const PixPayment = require('../models/PixPayment');
const CardPayment = require('../models/CardPayment');
const MoneyPayment = require('../models/MoneyPayment');
const Compra = require('../models/Compra');
const { sendConfirmationEmail } = require('../utils/email');
const Event = require('../models/Event') 


exports.handleWebhook = async (req, res) => {
  try {
    const id = req.body?.data?.id || req.body?.id;
    const topic = req.body?.type || req.body?.topic;

    if (topic === 'payment'){
    const pagamento = await payment.get({ id: Number(id) });

  const baseData = {
    pagamentoId: pagamento.id || '',
    email: pagamento.payer?.email || '',
    nome: pagamento.payer?.first_name || '', 
    payerId: pagamento.payer?.id || '',
    identificacao: {
      tipo: pagamento.payer?.identification?.type || '',
      numero: pagamento.payer?.identification?.number || ''
    },
    telefone: {
      ddd: pagamento.payer?.phone?.area_code || '',
      numero: pagamento.payer?.phone?.number || ''
    },
    descricao: pagamento.description,
    status: pagamento.status || '',
    metodo: pagamento.payment_method_id || '',
    data: new Date()
  };


    let modelo;

    switch (pagamento.payment_method_id) {
      case 'pix':
        modelo = new PixPayment(baseData);
        break;
      case 'account_money':
        modelo = new MoneyPayment(baseData);
        break;
      default:
        modelo = new CardPayment(baseData);
    }

    await modelo.save();
    //Tudo certo até aqui


      if (pagamento.status === "approved") {
    const compra = await Compra.findOneAndUpdate(
      { pagamentoId: pagamento.id },
      {
        pagamentoId: pagamento.id,
        email: pagamento.payer.email,
        nome: pagamento.payer.first_name,
        status: "approved"
      },
      { upsert: true, new: true }
    );
    
    
    let event = await Event.findOne({title:pagamento.description})

    emailtest = "fariasmarianadepaula@gmail.com"

    await sendConfirmationEmail(emailtest, pagamento, event);
    
  }

    res.sendStatus(200);
    }
  } catch (err) {
    console.error('Erro ao processar webhook:', err.message);
    res.sendStatus(500);
  }
};
