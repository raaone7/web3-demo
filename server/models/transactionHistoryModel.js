const mongoose = require("mongoose");
const { Schema } = mongoose;

const TransactionHistorySchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  hash: {
    type: String,
    required: true,
    unique: true,
  },
  blockNumber: {
    type: String,
    required: true,
  },
  blockHash: {
    type: String,
    required: true,
  },
  nonce: {
    type: String,
    required: true,
  },
  transactionIndex: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  isError: {
    type: String,
    required: true,
  },
  contractAddress: {
    type: String,
    required: false,
  },
  toWalletAddress: {
    type: String,
    required: true,
  },
  fromWalletAddress: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("transactionHistory", TransactionHistorySchema);
