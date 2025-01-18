const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true},
  name: { type: String, required: true },
  rol: {
    id: { type: Number, required: true },
    descripcion: { type: String, required: true },
  },
  username: { type: String, required: true, unique: true},
  password: { type: String, required: true },
});

// Encriptar contraseña antes de guardar
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });

module.exports = mongoose.model("user", UserSchema);