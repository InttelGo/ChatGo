import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    fromType: {  
      type: String,
      enum: ['users'], 
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

export default mongoose.model("usermessage", MessageSchema);