const { Web3 } = require("web3");

// https://docs.openzeppelin.com/contracts/2.x/api/token/erc721#IERC721

// (balanceOf) Get number of tokens owned by an address inside a contract
const getContractBalanceOfOwner = {
  "constant": true,
  "inputs": [
    { "name": "owner", "type": "address" }
  ],
  "name": "balanceOf",
  "outputs": [
    { "name": "", "type": "uint256" }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}

// (ownerOf) Get the owner of a token by its ID inside a contract
const getContractOwnerOfTokenId = {
  "constant": true,
  "inputs": [
    { "name": "tokenId", "type": "uint256" }
    // tokenId starts from 0
  ],
  "name": "ownerOf",
  "outputs": [
    { "name": "", "type": "address" }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}

// https://docs.openzeppelin.com/contracts/2.x/api/token/erc721#ERC721
// https://docs.openzeppelin.com/contracts/2.x/api/token/erc721#IERC721Metadata

// (name) Get the name of the contract
const getContractName = {
  "constant": true,
  "inputs": [],
  "name": "name",
  "outputs": [
    { "name": "", "type": "string" }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}

// (symbol) Get the symbol of the contract
const getContractSymbol = {
  "constant": true,
  "inputs": [],
  "name": "symbol",
  "outputs": [
    { "name": "", "type": "string" }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}

// (tokenURI) Get the URI of a token by its ID inside a contract
// the returned url will give (description,symbol,image,name) of the contract
const getContractTokenUri = {
  "constant": true,
  "inputs": [
    {
      "name": "tokenId",
      "type": "uint256"
    }
  ],
  "name": "tokenURI",
  "outputs": [
    {
      "name": "",
      "type": "string"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}

// https://docs.openzeppelin.com/contracts/2.x/api/token/erc721#ERC721Enumerable

// (tokenOfOwnerByIndex) Get the token ID of a token owned by an address by its index inside a contract
const getContractTokenOfOwnerByIndex = {
  "constant": true,
  "inputs": [
    {
      "name": "owner",
      "type": "address"
    },
    {
      "name": "index",
      "type": "uint256"
    }
  ],
  "name": "tokenOfOwnerByIndex",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
} // not working for given contracts

const getContractTotalSupply = {
  "constant": true,
  "inputs": [],
  "name": "totalSupply",
  "outputs": [
    { "name": "", "type": "uint256" }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
} // works for some of given contracts

// these abi should be available along side contract on popular explorers
module.exports = {
  abi: {
    getContractName,
    getContractSymbol,
    getContractBalanceOfOwner,
    getContractTokenUri,
    getContractOwnerOfTokenId,
    getContractTokenOfOwnerByIndex,
    getContractTotalSupply
  },
  web3: new Web3("https://linea-sepolia.infura.io/v3/5f865e18c8514986b88a6fc82523f6d0"), // TODO: via secrets
  etherScanBaseUrl: "https://api-sepolia.etherscan.io/api",
  etherScanApiToken: "HKQ4YR1PGP61CQMVE2VXFX4BN1JRMGRJGP" // TODO: via secrets
}