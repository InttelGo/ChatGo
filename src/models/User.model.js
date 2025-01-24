import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true }, // Referencia al modelo Role
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {
  timestamps: true
});

export default mongoose.model("User", UserSchema);
