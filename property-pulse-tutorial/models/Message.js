import { Schema, model, models } from "mongoose";
import { userAgent } from "next/server";

const MessageSchema = new Schema(
  {
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String, 
        required: [true, 'Name is required']
    },
    email: {
        type: String, 
        required: [true, 'Email is required']
    },
    phone: String,
    body: String,
    read: {
        type: Boolean,
        default: false
    }

  },

  {
    timestamps: true,
  }
);

const Message = models.Message || model("Message", MessageSchema);

export default Message;
