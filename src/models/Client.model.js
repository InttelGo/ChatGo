import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true, match: /^\d+$/},
  foto: { type: String },
  description: { type: String },
});

export default mongoose.model("client", ClientSchema);