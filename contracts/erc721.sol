pragma solidity ^0.4.24;

/// @title Football Exchange contract
/// @author Sixte de Maupeou

contract SimpleERC721 {
    // Functions
    function totalSupply() public pure returns (uint8 total);
    function balanceOf(address _owner) public view returns (uint8 balance);
    function ownerOf(uint8 _tokenId) public view returns (address owner);
    function putForSale(uint8 _tokenId, uint _price) external;
    function removeFromSale(uint8 _tokenId) external;
    function transfer(uint8 _tokenId) payable external;

    // Events
    event ForSale(address owner, uint8 tokenId, uint price);
    event NotForSale(address owner, uint8 tokenId);
    event Transfer(address from, address to, uint8 tokenId);
}

contract FootballPlayersContract is SimpleERC721 {

    mapping(uint8 => address) private playerToOwner;
    mapping(address => uint8) private playersCount;
    mapping(uint8 => bool) private playerSold;
    mapping(uint8 => uint) private playerPrice;
    mapping (address => uint) inGameBalance;

    event Withdraw(address from);

    // All players are free to get from address 0 at the beginning
    constructor() public {
        playersCount[address(0)] = totalSupply();
    }

    // Set number of players to 30
    function totalSupply() public pure returns (uint8 supply) {
        return 30;
    }

    // Get in game balance of player
    function balanceOf(address _owner) public view returns (uint8 balance) {
        return playersCount[_owner];
    }

    // Get owner of a specific token
    function ownerOf(uint8 _tokenId) public view returns (address owner) {
        require(_tokenId < totalSupply());

        return playerToOwner[_tokenId];
    }

    // Set token for sale at specific price
    function putForSale(uint8 _tokenId, uint _price) external {
        require(msg.sender == ownerOf(_tokenId));

        // Put on the market the FootballPlayer (available for sell at price)
        playerSold[_tokenId] = false;
        playerPrice[_tokenId] = _price;

        emit ForSale(msg.sender, _tokenId, _price);
    }

    // Remove token from sale so it cannot be acquired by other users
    function removeFromSale(uint8 _tokenId) external {
        require(msg.sender == ownerOf(_tokenId));

        // Tag player as sold (not for sale)
        playerSold[_tokenId] = true;

        emit NotForSale(msg.sender, _tokenId);
    }

    // Check if token can be acquired
    function isForSale(uint8 _tokenId) external view returns(bool forSale) {
        require(_tokenId <= totalSupply());
        return !playerSold[_tokenId];
    }

    // Get price of player with _tokenId
    function getPrice(uint8 _tokenId) external view returns(uint price) {
        require(_tokenId <= totalSupply());
        return playerPrice[_tokenId];
    }

    // transfer player with _tokenId to sender
    function transfer(uint8 _tokenId) payable external {
        require(_tokenId < totalSupply());
        require(!playerSold[_tokenId]);

        address oldOwner = ownerOf(_tokenId);
        address newOwner = msg.sender;

        require(newOwner != address(0));
        require(newOwner != oldOwner);

        // Ensure amount paid is at least player price
        require(msg.value >= playerPrice[_tokenId]);

        // Tag player as sold
        playerSold[_tokenId] = true;

        // Transfer the player to the sender
        playerToOwner[_tokenId] = newOwner;
        playersCount[oldOwner] -= 1;
        playersCount[newOwner] += 1;

        // Set player price to 0 as default for 
        playerPrice[_tokenId] = 0;

        // send paid amount to the previous owner
        inGameBalance[oldOwner] += msg.value;
        emit Transfer(oldOwner, newOwner, _tokenId);
    }

    function getOwnPlayers() external view returns(uint8[]) {
        uint8 currCount = 0;
        uint8[] memory ownedPlayers = new uint8[](balanceOf(msg.sender));

        for(uint8 i = 0; i < totalSupply(); i++) {
            if (playerToOwner[i] == msg.sender) {
                ownedPlayers[currCount] = i;
                currCount++;
            }
        }

        return ownedPlayers;
    }

    function getBalance() external view returns(uint balance) {
        return inGameBalance[msg.sender];
    }

    function withdraw() public {
        uint amount = inGameBalance[msg.sender];
        inGameBalance[msg.sender] = 0;

        msg.sender.transfer(amount);
        emit Withdraw(msg.sender);
    }
}