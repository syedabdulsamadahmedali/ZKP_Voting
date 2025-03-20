// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;
pragma abicoder v2;

import "./verifier.sol";

contract ZKPVoting {
    Verifier verifier; // Reference to the deployed Verifier contract
    mapping(address => bool) public voters; // Tracks registered voters
    mapping(address => bool) public hasVoted; // Prevents double voting
    uint256 public votesForZero; // Tally for option 0
    uint256 public votesForOne; // Tally for option 1

    // Event to log each vote for debugging
    event VoteCast(address voter, uint vote);

    // Constructor sets the Verifier contract address
    constructor(address _verifier) {
        verifier = Verifier(_verifier);
    }

    // Register a voter (currently unrestricted, could add access control)
    function registerVoter(address voter) external {
        voters[voter] = true;
    }

    // Cast a vote using a zero-knowledge proof
    function castVote(
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[1] memory input
    ) external {
        // Check if voter is registered
        if (!voters[msg.sender]) revert("Not registered");
        // Check if voter has already voted
        if (hasVoted[msg.sender]) revert("Already voted");

        // Construct the proof struct from inputs
        Verifier.Proof memory proof = Verifier.Proof({
            a: Pairing.G1Point(a[0], a[1]),
            b: Pairing.G2Point([b[0][0], b[0][1]], [b[1][0], b[1][1]]),
            c: Pairing.G1Point(c[0], c[1])
        });

        // Verify the proof with the Verifier contract
        if (!verifier.verifyTx(proof, input)) revert("Invalid proof");

        // Log the vote
        emit VoteCast(msg.sender, input[0]);

        // Tally the vote
        if (input[0] == 0) {
            votesForZero++;
        } else if (input[0] == 1) {
            votesForOne++;
        } else {
            revert("Invalid vote value");
        }

        // Mark voter as having voted
        hasVoted[msg.sender] = true;
    }

    // Get the current vote counts
    function getVoteCounts() external view returns (uint256 zeroVotes, uint256 oneVotes) {
        return (votesForZero, votesForOne);
    }

    // Determine the winner based on vote counts
    function getWinner() external view returns (string memory) {
        uint256 totalVotes = votesForZero + votesForOne;
        if (totalVotes == 0) {
            return "No votes yet";
        } else if (votesForZero > votesForOne) {
            return "Option 0 wins";
        } else if (votesForOne > votesForZero) {
            return "Option 1 wins";
        } else {
            return "Tie";
        }
    }
}