const blockchain = require("../libs/blockchain")
const Nft = require("../models/nftsModel.js");
const TransactionHistory = require("../models/transactionHistoryModel.js");

// Task 1
const fetchNftMetadata = async (req, res) => {
  const { contractAddress } = req.params;
  const tokenId = Number(req.params.tokenId);
  try {

    // Check if the NFT is already in the database
    const currentNft = await Nft.findOne({ contractAddress, tokenId });
    if (currentNft) return res.status(200).json(currentNft);

    const nftMetadataResponse = await blockchain.getNftMetadata(contractAddress, tokenId);
    const __nftMetadata = {
      contractAddress,
      tokenId,
      ...nftMetadataResponse.nftMetadata,
      contractName: nftMetadataResponse.contract.name,
      contractSymbol: nftMetadataResponse.contract.symbol,
    };

    // Create a new entry in database
    const newNft = new Nft(__nftMetadata);
    await newNft.save();

    res.status(200).json(__nftMetadata);
  } catch (error) {
    console.error("Error fetching metadata:", error);
    res.status(400).json({ error: error.message });
  }
}

// Task 4
const fetchTokenBalance = async (req, res) => {
  const { contractAddress, walletAddress } = req.params;
  try {
    const response = await blockchain.getWalletTokens(contractAddress, walletAddress);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching token balance:", error);
    res.status(400).json({ error: error.message });
  }
}

// Task 2
const fetchTransactions = async (req, res) => {
  const { walletAddress } = req.params;
  const { startDate, endDate } = req.query;
  try {

    console.log("Fetching transactions for:", walletAddress, startDate, endDate);
    if (walletAddress && startDate && endDate) {
      console.log("Fetching transactions from DB :", walletAddress, startDate, endDate);
      const start = new Date(startDate);
      const end = new Date(endDate);
      const transactions = await TransactionHistory.find({
        timestamp: {
          $gte: start,
          $lte: end,
        },
      });
      return res.status(200).json(transactions);
    }

    const networkTransactions = await blockchain.getTransactions(walletAddress, req.query ?? {});
    const convertedTransactions = networkTransactions.map(i => {
      return {
        blockNumber: i.blockNumber, // '4202477',
        timeStamp: i.timeStamp, // '1693549440',
        hash: i.hash, // '0x85dc648d386236a7ee248d4849a9dd2a9949a88e7160ee0e735508273de45bc9',
        nonce: i.nonce, // '224287',
        blockHash: i.blockHash, // '0x7cdcd2e7f4823893f4a11ae35f4b00c64bc60019c6e15b43aaa94f8fc7537b7d',
        transactionIndex: i.transactionIndex, // '3',
        from: i.from, // '0xedaf4083f29753753d0cd6c3c50aceb08c87b5bd',
        to: i.to, // '0x00e39304c139ebc5b03576da1359eb2ecff07e75',
        value: i.value, // '500000000000000000',
        gas: i.gas, // '63000',
        gasPrice: i.gasPrice, // '17557354857',
        isError: i.isError, // '0',
        txreceipt_status: i.txreceipt_status, // '1',
        input: i.input, // '0x',
        contractAddress: i.contractAddress, // '',
        cumulativeGasUsed: i.cumulativeGasUsed, // '84000',
        gasUsed: i.gasUsed, // '21000',
        confirmations: i.confirmations, // '2955328',
        methodId: i.methodId, // '0x',
        functionName: i.functionName, // ''
      }
    });

    const createdTransactions = await Promise.all(convertedTransactions.map(async transaction => {
      const existingTransaction = await TransactionHistory.findOne({ id: transaction.hash });
      if (existingTransaction) return existingTransaction;
      return await TransactionHistory.create({
        id: transaction.hash,
        hash: transaction.hash,
        blockNumber: transaction.blockNumber,
        blockHash: transaction.blockHash,
        nonce: transaction.nonce,
        transactionIndex: transaction.transactionIndex,
        value: transaction.value,
        isError: transaction.isError,
        contractAddress: transaction.contractAddress,
        toWalletAddress: transaction.to,
        fromWalletAddress: transaction.from,
        timestamp: new Date(+transaction.timeStamp),
      });
    }));

    res.status(200).json(createdTransactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(400).json({ error: error.message });
  }
}

module.exports = { fetchNftMetadata, fetchTransactions, fetchTokenBalance };
