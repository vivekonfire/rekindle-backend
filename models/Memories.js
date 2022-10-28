const mongoose = require("mongoose");
const User = require("./User");

const MemorySchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: User,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  description: String,
});

module.exports = mongoose.model("Memory", MemorySchema);
