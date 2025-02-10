import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    wmid: {
      type: String,
      required: true,
      unique: true,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    fromType: {
      type: String,
      enum: ["clients"],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("clientmessage", MessageSchema);
