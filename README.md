# 📝 CRUD App

A lightweight full-stack demo combining Solana smart contracts (Anchor) and a React frontend for performing Create, Read, Update, Delete operations on-chain.

---

## 🚀 Project Overview

This project demonstrates:

- **Solana smart contract** (Anchor) for managing data (e.g., tasks or notes)
- **React + TypeScript frontend** to interact with the contract
- Use of **@solana/web3.js** and **@solana/wallet-adapter** for wallet connection and transactions

It was built as part of my learning journey from QA Engineer → Web3 Security enthusiast, showcasing both development and security-aware coding practices.

---

## 🧩 Features

- Create, Read, Update, Delete items on Solana
- PDA-based account management per user
- Client-side form validation and error handling
- Anchor testing suite (optional)
- Integrated “mini audit” notes per smart contract function in `audit-notes.md`

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 16+
- Rust v1.70.0 or higher
- Anchor CLI 0.29.0 or higher
- Solana CLI 1.17.0 or higher
- A Solana wallet (e.g., Phantom extension)

---

### Installation

#### Clone repo

```bash
git clone <repo-url>
cd <repo-name>
```

#### Install Dependencies

```bash
npm install
```

---

### Apps

### Anchor

This is a Solana program written in Rust using the Anchor framework.

Note: The solana program code for the journal dapp can be found in `anchor/programs/crud-app/src/lib.rs`

#### Commands

Move to the `anchor` directory and run the following commands

#### Build the program:

```bash
anchor build
```

#### Sync the program id:

Running this command will create a new keypair in the `anchor/target/deploy` directory and save the address to the Anchor config file and update the `declare_id!` macro in the `./src/lib.rs` file of the program.

You will manually need to update the constant in `anchor/src/counter-exports.ts` to match the new program id.

```bash
anchor keys sync
```

#### Start the test validator with the program deployed:

In a separate terminal start the solana-test validator

```bash
solana-test-validator
```

#### Deploy to localnet

```bash
anchor deploy --provider.cluster localnet
```

### Web

This is a React app that uses the Anchor generated client to interact with the Solana program.

Navigate to where the front end is from the root of the project by

```bash
cd src
```

#### Commands

Build the web app

```bash
npm run build
```

Start the web app

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser, connect your wallet, and try the CRUD UI.

## ✅ Testing

To run Anchor tests:

```bash
anchor test
```

---

## 📂 Project Structure

```
/
├── programs/crud_app/     # Anchor smart contract code (Rust)
├── src/                   # React frontend (TypeScript)
└── README.md              # This documentation
```

---

## 📘 What's Next

- Add automated test suite for the frontend
- Add role-based access control (e.g., only owner can update)
- Write a standalone blog post walkthrough of the codebase

---

## 🔗 [Demo Video](https://youtu.be/Uf5sASy8diA)

### 📫 Contact

Built by **Temi W** — transitioning from QA automation to smart contract security auditing.  
Feel free to [connect with me on Twitter](#) or check out my other work in my GitHub profile.

---
