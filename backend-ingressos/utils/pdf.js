const PDFDocument = require('pdfkit');
const axios = require('axios');
const fs = require('fs'); // opcional, só se for salvar localmente

async function gerarPDF(event, pagamento) {
  const doc = new PDFDocument();
  const buffers = [];

  // Armazena os dados do PDF em buffer (em vez de salvar em disco)
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {});

  // Título
  doc.fontSize(20).text(`Confirmação de Ingresso`, { align: 'center' });
  doc.moveDown();

  // Dados do evento
  doc.fontSize(14).text(`Evento: ${event.title}`);
  doc.text(`Data: ${new Date(event.date).toLocaleDateString()}`);
  doc.text(`Preço: R$ ${parseFloat(event.price).toFixed(2)}`);
  doc.text(`ID Pagamento: ${pagamento.id}`)
  doc.moveDown();

  // Buscar imagem do Cloudinary como buffer
  const response = await axios.get(event.image, { responseType: 'arraybuffer' });
  const imageBuffer = Buffer.from(response.data, 'base64');

  // Adicionar imagem ao PDF
  doc.image(imageBuffer, {
    fit: [300, 300],
    align: 'center',
    valign: 'center',
  });

  doc.end();

  return new Promise((resolve) => {
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });
  });
}

module.exports = {
    gerarPDF
}
