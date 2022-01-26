// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SecondaryCollection is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address public libraryAddress;

    constructor(
        string memory _name,
        string memory _symbol,
        address _libraryAddress
    ) ERC721(_name, _symbol) {
        libraryAddress = _libraryAddress;
    }

    function mint(string memory _tokenURI) public returns (uint256) {
        _tokenIds.increment();

        uint256 newBookId = _tokenIds.current();
        _mint(msg.sender, newBookId);
        _setTokenURI(newBookId, _tokenURI);
        setApprovalForAll(libraryAddress, true);

        return newBookId;
    }
}
