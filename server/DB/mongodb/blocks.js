const mongoose = require("mongoose");

const blocksSchema = new mongoose.Schema({
  name: { type: String },
  solution: { type: String },
  title: { type: String },
  code: { type: String },
});

const Block = mongoose.model("block", blocksSchema);


module.exports = Block;
