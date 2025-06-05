const { Preference } = require('mercadopago');
const { mp } = require('../config/mercadopago');

async function createPreference({ title, quantity, price, name, email }) {
  const preference = new Preference(mp);



  const body = {
    items: [
      {
        title,
        quantity: Number(quantity), 
        unit_price: parseFloat(price), 
        currency_id: 'BRL',
      }
    ],
    payer: {
      name,
      email,
    },
    back_urls: {
      success: 'https://cd6e-2804-4b0-1183-ca00-ac3b-3fcc-2701-84b9.ngrok-free.app/sucesso',
      failure: 'https://cd6e-2804-4b0-1183-ca00-ac3b-3fcc-2701-84b9.ngrok-free.app/erro',
      pending: 'https://cd6e-2804-4b0-1183-ca00-ac3b-3fcc-2701-84b9.ngrok-free.app/pendente',
    },
    auto_return: 'approved',
    notification_url: 'https://cd6e-2804-4b0-1183-ca00-ac3b-3fcc-2701-84b9.ngrok-free.app/api/webhook',
  };

  try {
    const response = await preference.create({ body });
    console.log('Preferência criada com sucesso:', response.init_point);
    return response.init_point;
  } catch (error) {
    console.error('Erro ao criar preferência de pagamento:', error.response?.data || error.message);
    throw error;  
  }
}

module.exports = {
  createPreference
};
