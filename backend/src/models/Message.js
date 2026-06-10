import express from "express";
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      require: true,
      index: true,
    },

    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },

    content: {
      type: String,
      trim: true,
    },
    attachment: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

messageSchema.index({conversationId:1,createdAt: -1});

 const Message = mongoose.model("Message", messageSchema);
    export default Message;
