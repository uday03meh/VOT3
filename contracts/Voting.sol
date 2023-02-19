// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Voting {

    struct Candidate {
        string name;
        string party;
        string imageURL;
    }
    
    mapping(address => bool) public voted;
    mapping(uint256 => Candidate) public candidates;
    Candidate[] public candidateList;
    uint256 public candidateCount;

    address public owner;

    mapping(uint256 => uint256) public votes;
    uint256 public totalVotes;

    constructor() {
        owner = msg.sender;
    }

    function addCandidate(string calldata name, string calldata party, string calldata imageURL) public {
        require(owner == msg.sender, "Not the owner of the contract");
        candidateCount++;
        Candidate memory person = Candidate({ name: name, party: party, imageURL: imageURL });
        candidates[candidateCount] = person;
        candidateList.push(Candidate({ name: name, party: party, imageURL: imageURL }));
    }

    function vote(uint256 id) public {
        require(voted[msg.sender] == false, "You cannot vote again!");
        require(id > 0, "Candidate doesn't exist");
        require(id <= candidateCount, "Candidate doesn't exist");
        votes[id]++;
        voted[msg.sender] = true;
        totalVotes++;
    }
    function getCandidates() public view returns (Candidate[] memory) {
        return candidateList;
    }
    function getWinner() public view returns (Candidate memory) {
        require(owner == msg.sender, "Not the owner of the contract");
    uint256 maxVotes = 0;
    uint256 winnerId = 0;
    for (uint256 i = 1; i <= candidateCount; i++) {
        if (votes[i] > maxVotes) {
            maxVotes = votes[i];
            winnerId = i;
        }
    }
    return candidates[winnerId];
}

}
