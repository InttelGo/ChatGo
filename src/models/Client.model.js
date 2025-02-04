import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true},
  name: { type: String, required: true},
});

export default mongoose.model("client", ClientSchema);