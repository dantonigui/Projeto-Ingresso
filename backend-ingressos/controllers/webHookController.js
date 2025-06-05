const { payment } = require('../config/mercadopago');
const PixPayment = require('../models/PixPayment');
const CardPayment = require('../models/CardPayment');
const MoneyPayment = require('../models/MoneyPayment');
const Compra = require('../models/Compra'); // modelo de compras
const { sendConfirmationEmail } = require('../utils/email'); // função de envio de e-mail


exports.handleWebhook = async (req, res) => {
  try {
    const id = req.body?.data?.id || req.body?.id;
    const topic = req.body?.type || req.body?.topic;

    if (topic === 'payment'){
    const pagamento = await payment.get({ id: Number(id) });

    console.log(pagamento)

  const baseData = {
    pagamentoId: pagamento.id || '',
    email: pagamento.payer?.email || '',
    nome: pagamento.payer?.first_name || '', // padroniza com seu schema
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
    console.log('Pagamento salvo com sucesso:', modelo);

      if (pagamento.status === "approved") {
    // Cria ou atualiza uma compra
    const compra = await Compra.findOneAndUpdate(
      { pagamentoId: pagamento.id },
      {
        pagamentoId: pagamento.id,
        email: pagamento.payer.email,
        nome: pagamento.payer.first_name,
        status: "approved"
        // você pode adicionar eventId e userId se tiver essa info via `external_reference`
      },
      { upsert: true, new: true }
    );
    emailtest = "dantoniguilherme@gmail.com"
    // Envia email
    await sendConfirmationEmail(emailtest, pagamento.id, pagamento.description);
  }

    res.sendStatus(200);
    }
  } catch (err) {
    console.error('Erro ao processar webhook:', err.message);
    res.sendStatus(500);
  }
};
