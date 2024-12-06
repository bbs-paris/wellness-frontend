// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract WellnessChallenge {
    struct Challenge {
        uint256 id;
        address partner;
        string title;
        string description;
        string category;
        uint256 duration;
        uint256 maxWinners;
        string reward;
        uint256 createdAt;
        bool isActive;
    }

    struct Submission {
        uint256 id;
        uint256 challengeId;
        address participant;
        string mediaUrl;
        string comment;
        bool isApproved;
        uint256 submittedAt;
    }

    uint256 private challengeCounter;
    uint256 private submissionCounter;
    mapping(uint256 => Challenge) public challenges;
    mapping(uint256 => Submission[]) public challengeSubmissions;
    mapping(address => bool) public partners;

    event ChallengeCreated(uint256 indexed id, address indexed partner);
    event SubmissionCreated(uint256 indexed id, uint256 indexed challengeId, address indexed participant);
    event SubmissionApproved(uint256 indexed submissionId, uint256 indexed challengeId);

    modifier onlyPartner() {
        require(partners[msg.sender], "Only partners can perform this action");
        _;
    }

    function addPartner(address _partner) external {
        // Note: Dans une vraie application, ceci devrait être restreint à un admin
        partners[_partner] = true;
    }

    function createChallenge(
        string memory _title,
        string memory _description,
        string memory _category,
        uint256 _duration,
        uint256 _maxWinners,
        string memory _reward
    ) external onlyPartner returns (uint256) {
        challengeCounter++;
        challenges[challengeCounter] = Challenge({
            id: challengeCounter,
            partner: msg.sender,
            title: _title,
            description: _description,
            category: _category,
            duration: _duration,
            maxWinners: _maxWinners,
            reward: _reward,
            createdAt: block.timestamp,
            isActive: true
        });

        emit ChallengeCreated(challengeCounter, msg.sender);
        return challengeCounter;
    }

    function submitProof(
        uint256 _challengeId,
        string memory _mediaUrl,
        string memory _comment
    ) external returns (uint256) {
        require(challenges[_challengeId].isActive, "Challenge is not active");
        
        submissionCounter++;
        Submission memory newSubmission = Submission({
            id: submissionCounter,
            challengeId: _challengeId,
            participant: msg.sender,
            mediaUrl: _mediaUrl,
            comment: _comment,
            isApproved: false,
            submittedAt: block.timestamp
        });

        challengeSubmissions[_challengeId].push(newSubmission);
        emit SubmissionCreated(submissionCounter, _challengeId, msg.sender);
        return submissionCounter;
    }

    function approveSubmission(uint256 _challengeId, uint256 _submissionId) external onlyPartner {
        require(challenges[_challengeId].partner == msg.sender, "Only challenge partner can approve");
        
        Submission[] storage submissions = challengeSubmissions[_challengeId];
        for (uint i = 0; i < submissions.length; i++) {
            if (submissions[i].id == _submissionId) {
                submissions[i].isApproved = true;
                emit SubmissionApproved(_submissionId, _challengeId);
                break;
            }
        }
    }

    function getChallengeSubmissions(uint256 _challengeId) external view returns (Submission[] memory) {
        return challengeSubmissions[_challengeId];
    }
}