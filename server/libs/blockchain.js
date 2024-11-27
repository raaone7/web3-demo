const { web3, abi } = require("../libs/web3");

// tokenId should be in range of totalSupply
const getNftMetadata = async (contractAddress, tokenId) => {
  const metadataAbi = [abi.getContractTokenUri, abi.getContractName, abi.getContractSymbol];
  const contract = new web3.eth.Contract(metadataAbi, contractAddress);

  const name = await contract.methods.name().call();
  const symbol = await contract.methods.symbol().call();
  const tokenUri = await contract.methods.tokenURI(tokenId).call();
  const response = await fetch(tokenUri);
  const metadata = await response.json();

  return { contract: { name, symbol }, nftMetadata: metadata }
}

const getWalletTokens = async (contractAddress, walletAddress) => {
  const metadataAbi = [abi.getContractBalanceOfOwner];
  const contract = new web3.eth.Contract(metadataAbi, contractAddress);
  const numberOfTokens = await contract.methods.balanceOf(walletAddress).call();

  return { numberOfTokens: Number(numberOfTokens) }
}

// get apiKey from etherscan.io
const apiKeyToken = "HKQ4YR1PGP61CQMVE2VXFX4BN1JRMGRJGP"
const base = "https://api-sepolia.etherscan.io/api"

/**
 * https://docs.etherscan.io/sepolia-etherscan/api-endpoints/accounts#get-a-list-of-normal-transactions-by-address
 * @param {*} address
 * @param {{page?:number, perPage?:number, sortOrder?:"asc"|"desc"}} options
 * @returns
 */
const getTransactions = async (address, options = {}) => {
  const page = options.page ?? 1;
  const offset = options.perPage ?? 5;
  const sortOrder = options.sortOrder ?? 'asc';
  const url = `${base}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=${page}&offset=${offset}&sort=${sortOrder}&apikey=${apiKeyToken}`
  const response = await fetch(url, { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } });
  /** @type {any[]} */
  const data = await response.json();
  return data.result.map(i => {
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
  })
}

module.exports = { getNftMetadata, getWalletTokens, getTransactions };