// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

import "hardhat/console.sol";

contract Library is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _bookIds;
    Counters.Counter private _booksSold;

    address payable owner;

    constructor(uint256 _royaltyFee) {
        owner = payable(msg.sender);
        royaltyFee = _royaltyFee;
    }

    struct Book {
        uint256 bookId;
        address nftContract;
        uint256 tokenId;
        uint256 amount;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    mapping(uint256 => Book) private idToBook;
    uint256 private royaltyFee;

    event BookCreated(
        uint256 indexed bookId,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 amount,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    /* Places a book for sale on the library */
    function createBook(
        address nftContract,
        uint256 tokenId,
        uint256 price,
        uint256 amount
    ) public payable nonReentrant {
        _bookIds.increment();
        uint256 bookId = _bookIds.current();
        idToBook[bookId] = Book(
            bookId,
            nftContract,
            tokenId,
            amount,
            payable(msg.sender),
            payable(address(0)),
            price,
            false
        );

        IERC1155(nftContract).safeTransferFrom(
            msg.sender,
            address(this),
            tokenId,
            amount,
            ""
        );

        emit BookCreated(
            bookId,
            nftContract,
            tokenId,
            amount,
            msg.sender,
            address(0),
            price,
            false
        );
    }

    /* Creates the sale of a library book */
    /* Transfers ownership of the book, as well as funds between parties */
    function createLibrarySale(
        address nftContract,
        uint256 bookId,
        uint256 amount
    ) public payable nonReentrant {
        uint256 price = idToBook[bookId].price;
        uint256 tokenId = idToBook[bookId].tokenId;
        require(
            msg.value == price * amount,
            "Please submit the asking price in order to complete the purchase"
        );

        idToBook[bookId].seller.transfer(msg.value * (1 - royaltyFee / 100));
        IERC1155(nftContract).safeTransferFrom(
            address(this),
            msg.sender,
            tokenId,
            amount,
            ""
        );
        idToBook[bookId].owner = payable(msg.sender);
        idToBook[bookId].sold = true;
        _booksSold.increment();
    }

    /* Returns all unsold library books */
    function fetchBooks() public view returns (Book[] memory) {
        uint256 bookCount = _bookIds.current();
        uint256 unsoldBookCount = _bookIds.current() - _booksSold.current();
        uint256 currentIndex = 0;

        Book[] memory books = new Book[](unsoldBookCount);
        for (uint256 i = 0; i < bookCount; i++) {
            if (idToBook[i + 1].owner == address(0)) {
                uint256 currentId = i + 1;
                Book storage currentBook = idToBook[currentId];
                books[currentIndex] = currentBook;
                currentIndex += 1;
            }
        }
        return books;
    }

    /* Returns only books that a user has purchased */
    function fetchMyNFTs() public view returns (Book[] memory) {
        uint256 totalBookCount = _bookIds.current();
        uint256 bookCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalBookCount; i++) {
            if (idToBook[i + 1].owner == msg.sender) {
                bookCount += 1;
            }
        }

        Book[] memory books = new Book[](bookCount);
        for (uint256 i = 0; i < totalBookCount; i++) {
            if (idToBook[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                Book storage currentBook = idToBook[currentId];
                books[currentIndex] = currentBook;
                currentIndex += 1;
            }
        }
        return books;
    }

    /* Returns only books a user has created */
    function fetchBooksCreated() public view returns (Book[] memory) {
        uint256 totalBookCount = _bookIds.current();
        uint256 bookCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalBookCount; i++) {
            if (idToBook[i + 1].seller == msg.sender) {
                bookCount += 1;
            }
        }

        Book[] memory books = new Book[](bookCount);
        for (uint256 i = 0; i < totalBookCount; i++) {
            if (idToBook[i + 1].seller == msg.sender) {
                uint256 currentId = i + 1;
                Book storage currentBook = idToBook[currentId];
                books[currentIndex] = currentBook;
                currentIndex += 1;
            }
        }
        return books;
    }
}
