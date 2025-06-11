const nodemailer = require("nodemailer");
const {gerarPDF} = require('../utils/pdf')

exports.sendConfirmationEmail = async (email, pagamento, event) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // seu e-mail
      pass: process.env.EMAIL_PASS, // senha ou app password
    },
  });

  const pdfBuffer = await gerarPDF(event)

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Confirmação de Compra - ${event.title} - ${pagamento.id}`,
      attachments: [
    {
      filename: `Ingresso-${event.title}.pdf`,
      content: pdfBuffer,
      contentType: 'application/pdf',
    },
  ],
  };

  await transporter.sendMail(mailOptions);
};
