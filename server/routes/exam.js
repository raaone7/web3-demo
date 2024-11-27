const express = require("express");
const { fetchNftMetadata, fetchTransactions, fetchTokenBalance } = require("../controllers/examController.js");

const router = express.Router();

router.get("/metadata/:contractAddress/:tokenId", fetchNftMetadata);
router.get("/transactions/:walletAddress", fetchTransactions);
router.get("/token-balance/:contractAddress/:walletAddress", fetchTokenBalance);

module.exports = router;
