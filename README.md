## Web3 demo completed task
- Exam Tasks 1, 2 & 4 are done 
- Integrated in Frontend and made the UI for testing 
- Manual postman collection being shared 
- Automated postman testing and reporting
- Own mongodb is being used, since the shared one is not working

## How to run

1. run `pnpm i` or `npm i`
2. run `pnpm dev` or `npm start`
  - Frontend is available at `http://localhost:5173/`
  - Backend is available at `http://localhost:5001/` (or process.env.PORT) - 5000 has been inuse in local, changed to 5001

# How to run the postman test 
- `cd postman`
- `sh newman.test.sh`
- please check for results in the `postman/reports` folder
  
## How to get contractAddress and walletAddress
1. Visit `https://sepolia.lineascan.build/nft-transfers`
2. Look for ERC-721 type transfers
3. Click on transfer and then in transfer detail check ERC-721 tokens transferred section
  - click on tokenId or token or contract or sender or receiver

## Notes 
- tested in local 
- recording the session on 27/Nov 4PM AEST