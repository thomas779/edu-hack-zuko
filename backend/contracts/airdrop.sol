// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract CrossChainAirdrop {
    address public owner;
    IERC20 public token;
    uint256 public airdropAmount;
    
    mapping(bytes32 => bool) public processedEvents; // Prevent double processing of events

    // Events
    event TokensAirdropped(address indexed recipient, uint256 amount, bytes32 eventId);
    event AirdropAmountUpdated(uint256 newAmount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can execute");
        _;
    }

    constructor(address _tokenAddress, uint256 _airdropAmount) {
        owner = msg.sender;
        token = IERC20(_tokenAddress);
        airdropAmount = _airdropAmount;
    }

    // Update airdrop amount
    function updateAirdropAmount(uint256 newAmount) external onlyOwner {
        airdropAmount = newAmount;
        emit AirdropAmountUpdated(newAmount);
    }

    // Cross-chain airdrop function
    function airdropToRecipient(address recipient, bytes32 eventId) external {
        require(!processedEvents[eventId], "Event already processed");
        
        processedEvents[eventId] = true;
        require(token.transfer(recipient, airdropAmount), "Transfer failed");
        
        emit TokensAirdropped(recipient, airdropAmount, eventId);
    }
}
