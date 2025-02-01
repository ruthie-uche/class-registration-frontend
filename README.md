Class Registration DApp

This is a Class Registration System app implemented using React for the frontend and Solidity in building the smart contract. It allows registering students and fetching student information by ID on the blockchain.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Smart Contract](#smart-contract)
- [Frontend](#frontend)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This DApp helps in giving the interface for a simple registering and fetching name through ID for some students, via a smart contract deployed over Goerli or any other Sepolia blockchain. Connection of a wallet using MetaMask is a mandate to use it.

## Features

- **Connect Wallet:** Connect the DApp to MetaMask of users.
- **Register Student:** A form asking for a roll number ID along with their particular name is included for a fresh registration of that student.
- **Find Student:** Given the ID, it fetches the name of a student.
- **Displays Network and Account:** Lists the network connected to and the user's wallet address.
- **Error Handling:** Errors due to invalid inputs or failure in connecting pop up with a user-friendly message.

## Technologies Used

- **Frontend:** React, ethers.js
- **Smart Contract:** Solidity
- **Wallet Integration:** MetaMask

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/class-registration-dapp.git
   cd class-registration-dapp
``` 

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

## Usage

1. **Click 'Connect Wallet'** to connect your MetaMask wallet.
2. **Register a student** by entering an **ID** and **Name**, then click **Register**.
3. **Retrieve student details** by entering an **ID** and clicking **Get Student**.

