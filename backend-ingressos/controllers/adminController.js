const Admin = require('../models/Admin')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET;

exports.registerAdmin = async (req, res) => {
  try {
    const { business, name, email, password, phone, adress } = req.body;

    const existingUser = await Admin.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "Email já está em uso." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({ business, name, email, password: hashedPassword, isAdmin: true, phone, adress });
    await newAdmin.save();

    res.status(201).json({ msg: "Usuário registrado com sucesso." });
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor.", error: err.message });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Admin.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Usuário não encontrado." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Senha incorreta." });

    const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: "1d" });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin },
    });
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor.", error: err.message });

  }
};
