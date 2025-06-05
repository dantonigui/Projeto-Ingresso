const nodemailer = require("nodemailer");

exports.sendConfirmationEmail = async (email, pagamentoId, titleEvent) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // seu e-mail
      pass: process.env.EMAIL_PASS, // senha ou app password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Confirmação de Compra - ${titleEvent}`,
    text: `Sua compra foi confirmada com sucesso! Código do pagamento: ${pagamentoId}`,
  };

  await transporter.sendMail(mailOptions);
};
