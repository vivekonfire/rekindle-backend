const mongoose = require("mongoose");
const User = require("./User");

const MemorySchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: User,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});
