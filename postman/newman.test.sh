# Installing newman cli for api testing
npm install -g newman newman-reporter-htmlextra

# Running newman tests with sample collection of data
newman run postman_collection.json --folder fetchNftMetadata -d data/nftMetadata.csv --reporters cli,htmlextra --reporter-htmlextra-export ./reports/fetchNftMetadata-report.html
newman run postman_collection.json --folder fetchTokenBalance -d data/tokenBalance.csv --reporters cli,htmlextra --reporter-htmlextra-export ./reports/fetchTokenBalance-report.html
newman run postman_collection.json --folder fetchTransactionsByWalletAddress -d data/transactionsByWalletAddress.csv --reporters cli,htmlextra --reporter-htmlextra-export ./reports/fetchTransactionsByWalletAddress-report.html
