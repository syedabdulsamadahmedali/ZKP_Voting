const web3 = new Web3("http://127.0.0.1:7545");
const contractAddress = "0x924CB30189E704A0A2204d9F597E12e0D3bD1515";
const contractABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_verifier",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "voter",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "vote",
                "type": "uint256"
            }
        ],
        "name": "VoteCast",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256[2]",
                "name": "a",
                "type": "uint256[2]"
            },
            {
                "internalType": "uint256[2][2]",
                "name": "b",
                "type": "uint256[2][2]"
            },
            {
                "internalType": "uint256[2]",
                "name": "c",
                "type": "uint256[2]"
            },
            {
                "internalType": "uint256[1]",
                "name": "input",
                "type": "uint256[1]"
            }
        ],
        "name": "castVote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getVoteCounts",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "zeroVotes",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "oneVotes",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getWinner",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "hasVoted",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "voter",
                "type": "address"
            }
        ],
        "name": "registerVoter",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "voters",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "votesForOne",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "votesForZero",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const votingContract = new web3.eth.Contract(contractABI, contractAddress);

const proofs = {
    0: {
        a: [
            "0x1cff5d199c5369767f50c9f98bd6c80a3da1a029fbae608131990db221132a49",
            "0x209e572ddff166093673df265a8b702921d125a069a4668032403ec9a3cd4702"
        ],
        b: [
            [
                "0x1d165ec3a915788a27da19a72223e9bc1e9a6986dd6cc4c6d25477d60b15f8df",
                "0x2cd731201828b73e534487ac4e748698594d8e075c23293ec46e3cbe1fb165ae"
            ],
            [
                "0x17b4a1b5fb6dcb69555d9840f8cf77beff7b3576b657a628acde84b57c797bb8",
                "0x0763211b581d77a5c014d044d7f4c6cebbb5e8d171969ca8f989f0ff07bbdf03"
            ]
        ],
        c: [
            "0x0b8da11c3cb840830d66feab0b4ccf50e090771723c2c85ccacf332925993754",
            "0x03f2cafcd41938d395ca8d27e9a4af36250bd628e0225c9ce3347c9287037220"
        ]
    },
    1: {
        a: ["0x2a4d1f3c0159571e12703fc64f459da8ffdc68b896a31c450e01987ed8ba779c", "0x01bd5a92465c3eb496b3e4d32c1fb099d250f89e643ac6518eaab814be4f0d13"],
        b: [
            [
                "0x183b53a9b5c04ecf97fc3358f89bdb011d9eafb1bfc8659bd573e34fc602f601",
                "0x0f724783b56c0c9e2208f5d54761d245295de624f89303d4500eada75be17de2"
            ],
            [
                "0x12259e7b9c14031823fffbf12a58f87c0d369bbe390b651c82615de8df4e10b6",
                "0x091cbb665265edd2cfc788f5e11d8f2ea9e28997030af3ab07fa05fe5e32473d"
            ]
        ],
        c: [
            "0x28636abd6f14b716a7d60cfc04a99db469e598e6fa3b9a7a263ba9c7158418e0",
            "0x226ba00fd11602709ef4a551198cf5298239858240cfcae4c0fa0f51b29dcc6a"
        ]
    }
};

window.addEventListener("load", async () => {
    const accounts = await web3.eth.getAccounts();
    const select = document.getElementById("voterSelect");
    if (select) {
        accounts.forEach((account, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.text = `Voter ${index + 1} (${account.slice(0, 8)}...)`;
            select.appendChild(option);
        });
    } else {
        console.error("Dropdown not found!");
    }
    updateVoteCounts();
});

async function vote(choice) {
    const status = document.getElementById("status");
    const visual = document.getElementById("voteVisual");
    status.innerText = `Status: Voting ${choice === 0 ? "No" : "Yes"}...`;
    status.className = "";
    visual.className = "vote-visual";

    const proof = proofs[choice];
    const input = [choice];

    try {
        const accounts = await web3.eth.getAccounts();
        const voterIndex = document.getElementById("voterSelect").value;
        const voter = accounts[voterIndex];

        const isRegistered = await votingContract.methods.voters(voter).call();
        if (!isRegistered) {
            await votingContract.methods.registerVoter(voter).send({ from: voter, gas: 5000000 });
            status.innerText = `Status: Voter registered, casting vote ${choice}...`;
        }

        await votingContract.methods.castVote(proof.a, proof.b, proof.c, input)
            .send({ from: voter, gas: 5000000 });

        status.innerText = `Status: Vote ${choice === 0 ? "No" : "Yes"} counted!`;
        status.className = "success";
        visual.className = "vote-visual active";

        updateVoteCounts();
    } catch (error) {
        status.innerText = `Status: Error - ${error.message}`;
        status.className = "error";
    }
}

async function updateVoteCounts() {
    try {
        const counts = await votingContract.methods.getVoteCounts().call();
        const voteCounts = document.getElementById("voteCounts");
        voteCounts.innerText = `Votes - No: ${counts[0]}, Yes: ${counts[1]}`;
    } catch (error) {
        console.error("Failed to update vote counts:", error);
    }
}