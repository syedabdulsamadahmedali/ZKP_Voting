# ZKP-Based Secure Voting System

This project demonstrates a **Zero-Knowledge Proof (ZKP)** based privacy-preserving voting system built using **ZoKrates**, **Solidity**, and a simple web frontend. It allows users to cast binary votes (Yes/No or 1/0) without revealing their choice, ensuring **confidentiality, verifiability, and transparency**.

---

## Project Structure

### `remix_workspace_files/`
- `vote.zok`: ZoKrates circuit defining voting constraints (vote must be 0 or 1).
- `proof_0.json`, `proof_1.json`: Precomputed ZK-SNARK proofs for valid vote values.
- `verification_key.json`: Generated verification key from ZoKrates.
- `verifier.sol`: Solidity smart contract (auto-generated) to verify zk-SNARK proofs.
- `ZKPVoting.sol`: Custom Solidity contract for voter registration, vote casting, and result tallying.

### `zkp-voting-ui/`
- `index.html`: User interface for casting votes and viewing results.
- `script.js`: Web3.js logic for interacting with smart contracts.
- `styles.css`: UI styling.

---

## Tech Stack

- **ZoKrates** – Generates zk-SNARKs, verification keys, and smart contracts.
- **Solidity** – Smart contracts for proof verification and vote management.
- **Ganache** – Local Ethereum blockchain for development/testing.
- **Web3.js** – Connects frontend with blockchain.
- **HTML/CSS/JS** – Minimal user interface for vote interaction.

---

## How it Works

1. **Circuit Logic (`vote.zok`)**  
   Ensures vote ∈ {0,1} using:  

Compiles into an arithmetic circuit and generates cryptographic proof.

2. **Proof Generation (ZoKrates CLI)**  
- Compile: `zokrates compile -i vote.zok`
- Setup: `zokrates setup`
- Generate witness: `zokrates compute-witness -a <vote>`
- Generate proof: `zokrates generate-proof`
- Export verifier: `zokrates export-verifier`

3. **Smart Contracts**  
- `Verifier.sol` verifies the zk-SNARK proof on-chain.
- `ZKPVoting.sol` records valid votes, prevents double-voting, and tallies results.

4. **Frontend**  
Users connect via Web3-enabled browser and:
- Select their vote (0/1).
- Submit precomputed proof and public input.
- View live results.

# Demo Screenshots

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/0163fb40-60a2-4354-8c75-8a456f3966d7" width="400"/></td>
    <td><img src="https://github.com/user-attachments/assets/477b1ee6-de6a-449c-aedc-ecafba9e2db2" width="400"/></td>
  </tr>
  <tr>
    <td align="center"><b>Casting a Vote</b></td>
    <td align="center"><b>Double Voting Blocked</b></td>
  </tr>
</table>



---

## Running the Project

1. **Start Ganache** (local blockchain).
2. **Deploy Contracts**  
Use Remix IDE or Hardhat to deploy `Verifier.sol` and `ZKPVoting.sol`.
3. **Serve the Web UI**  
Open `zkp-voting-ui/index.html` in a Web3-enabled browser like MetaMask + Brave/Chrome.
4. **Cast Vote**  
- Register as a voter.
- Choose a vote.
- Submit corresponding proof (loaded from `proof_0.json` or `proof_1.json`).
- See updated results.

---

## Features

- 🛡️ Privacy: Vote without revealing your choice.
- 🔍 Verifiability: Proofs are verified on-chain.
- 🚫 Double Voting: Prevented by tracking registered voters.
- 📊 Live Tally: Vote counts updated on frontend.

---

## 📈 Future Enhancements

- Voter authentication and login.
- Support for multi-candidate/ranked-choice voting.
- UI/UX improvements.
- Deployment to a public Ethereum testnet.
- Migration from zk-SNARKs to zk-STARKs for transparency and scalability.

---

## Authors

- Syed Abdul Samad Ahmed Ali  
- Mohammed Ghayasuddin  
- Joshua Wiggins  
- Thirunavukarasu MV  
CS6413 – Foundations of Privacy, University of New Brunswick

---

## References

- [ZoKrates](https://zokrates.github.io/)
- [Ganache](https://trufflesuite.com/ganache/)
- [zk-SNARKs Paper – Ben-Sasson et al. (2013)](https://doi.org/10.1007/978-3-642-38348-9_12)

---

## License

This project is for educational purposes under the UNB CS6413 course. For other use cases, please contact the authors for licensing terms.

