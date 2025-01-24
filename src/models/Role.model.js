import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    descripcion: { type: String, required: true },
},{
  timestamps: true
});

export default mongoose.model("Role", RoleSchema);