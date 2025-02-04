import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    wmid: {
      type:String,
      required: true,
      unique: true,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    fromType: {  
      type: String,
      enum: ['clients', 'users'], 
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

export default mongoose.model("message", MessageSchema);