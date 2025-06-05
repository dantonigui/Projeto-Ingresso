const adminOnly = (req, res, next) => {
  console.log("Usuário autenticado:", req.user); // 👈 Verifique se tem isAdmin
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: "Acesso negado: apenas administradores" });
  }
  next();
};

module.exports = {adminOnly};
