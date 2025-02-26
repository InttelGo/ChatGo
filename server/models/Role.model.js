import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
    descripcion: { type: String, required: true },
},{
  timestamps: true
});

export default mongoose.model("Role", RoleSchema);