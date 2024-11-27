## How to run

1. run `pnpm i`
2. run `pnpm dev`
  - Frontend is available at `http://localhost:5173/`
  - Backend is available at `http://localhost:5001/` (or process.env.PORT) - 5000 has been inuse in local


## How to get contractAddress and walletAddress
1. Visit `https://sepolia.lineascan.build/nft-transfers`
2. Look for ERC-721 type transfers
3. Click on transfer and then in transfer detail check ERC-721 tokens transferred section
  - click on tokenId or token or contract or sender or receiver

# How to run the postman test 
- `cd postman`
- `sh newman.test.sh`
- please check for results in the `postman/reports` folder