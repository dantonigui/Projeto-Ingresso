const { createPreference } = require('../services/mercadoPagoService')

exports.createCheckout = async (req,res) => {

  try {
    const { title, unit_price, quantity, name, email} = req.body;



    const preferenceUrl = await createPreference({ title, quantity, price: Number(unit_price), name, email});
    
    res.json({ id: preferenceUrl });
  } catch (error) {
    console.error('Erro ao processar o checkout:', error);
    res.status(500).send('Erro ao processar o checkout');
  }
}