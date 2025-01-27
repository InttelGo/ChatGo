import mongoose from "mongoose";

const RedirectionSchema = new mongoose.Schema(
  {
    to: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: false 
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    reason: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("redirection", RedirectionSchema);
