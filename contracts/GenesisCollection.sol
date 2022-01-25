// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "hardhat/console.sol";

contract GenesisCollection is ERC1155, Ownable {
    constructor(
        string memory _name,
        string memory _symbol,
        string memory _baseUri,
        string memory _ipfsFolderHash,
        address _libraryAddress
    ) ERC1155(_baseUri) {
        name = _name;
        symbol = _symbol;
        baseUri = _baseUri;
        ipfsFolderHash = _ipfsFolderHash;
        libraryAddress = _libraryAddress;
    }

    string public name;
    string public symbol;
    uint256 public tokenCount;
    string public baseUri;
    string public ipfsFolderHash;
    address public libraryAddress;

    function mint(uint256 amount) public onlyOwner {
        tokenCount += 1;
        _mint(msg.sender, tokenCount, amount, "");
        _setApprovalForAll(msg.sender, libraryAddress, true);
    }

    function uri(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(baseUri, Strings.toString(_tokenId), ".json")
            );
    }
}
