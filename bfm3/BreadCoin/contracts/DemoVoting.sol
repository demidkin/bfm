pragma solidity ^0.4.22;

/**
 * @title Simple Ballot
 */
contract SimpleBallot {

    string public ballotName;

    string[] public variants;

    mapping (uint=>uint) votesCount;
    mapping (address=>bool) public isVoted;

    mapping (bytes32=>uint) variantIds;

    constructor() public payable {
        ballotName = 'test?';

        variants.push(''); // for starting variants from 1 (non-programmers oriented)

        
        variants.push('variant 1');variantIds[sha256('variant 1')] = 1;
            
        variants.push('variant 2');variantIds[sha256('variant 2')] = 2;
            
        variants.push('variant 3');variantIds[sha256('variant 3')] = 3;
            

        assert(variants.length <= 100);
        
        
    }

    modifier hasNotVoted() {
        require(!isVoted[msg.sender]);

        _;
    }

    modifier validVariantId(uint _variantId) {
        require(_variantId>=1 && _variantId<variants.length);

        _;
    }

    /**
     * Vote by variant id
     */
    function vote(uint _variantId)
        public
        validVariantId(_variantId)
        hasNotVoted
    {
        votesCount[_variantId]++;
        isVoted[msg.sender] = true;
    }

    /**
     * Vote by variant name
     */
    function voteByName(string _variantName)
        public
        hasNotVoted
    {
        uint variantId = variantIds[ sha256(_variantName) ];
        require(variantId!=0);

        votesCount[variantId]++;
        isVoted[msg.sender] = true;
    }

    /**
     * Get votes count of variant (by id)
     */
    function getVotesCount(uint _variantId)
        public
        view
        validVariantId(_variantId)
        returns (uint)
    {

        return votesCount[_variantId];
    }

    /**
     * Get votes count of variant (by name)
     */
    function getVotesCountByName(string _variantName) public view returns (uint) {
        uint variantId = variantIds[ sha256(_variantName) ];
        require(variantId!=0);

        return votesCount[variantId];
    }

    /**
     * Get winning variant ID
     */
    function getWinningVariantId() public view returns (uint id) {
        uint maxVotes = votesCount[1];
        id = 1;
        for (uint i=2; i<variants.length; ++i) {
            if (votesCount[i] > maxVotes) {
                maxVotes = votesCount[i];
                id = i;
            }
        }
    }

    /**
     * Get winning variant name
     */
    function getWinningVariantName() public view returns (string) {
        return variants[ getWinningVariantId() ];
    }

    /**
     * Get winning variant name
     */
    function getWinningVariantVotesCount() public view returns (uint) {
        return votesCount[ getWinningVariantId() ];
    }
}