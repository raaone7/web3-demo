const mongoose = require("mongoose");
const { Schema } = mongoose;

const NftSchema = new Schema({
  contractAddress: {
    type: String,
    required: true
  },
  tokenId: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
});


module.exports = mongoose.model("nfts", NftSchema);
