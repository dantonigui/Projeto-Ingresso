const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  business: String,
  name: String,
  email: { type: String, unique: true },
  password: String,
  isAdmin: {type: Boolean}
});

module.exports = mongoose.model("Admin", adminSchema);
