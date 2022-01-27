// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

import "hardhat/console.sol";

contract Library is ReentrancyGuard, ERC721Holder, ERC1155Holder {
    using Counters for Counters.Counter;
    Counters.Counter private _bookIds;
    Counters.Counter private _booksFullySold;

    uint256 private bookSales;
    address payable owner;

    constructor(uint256 _royaltyFee) {
        owner = payable(msg.sender);
        royaltyFee = _royaltyFee;
    }

    struct Book {
        uint256 bookId;
        address nftContract;
        uint256 tokenId;
        uint256 units;
        address payable seller;
        address payable owner;
        uint256 price;
        uint256 sales;
    }

    mapping(uint256 => Book) private idToBook;
    mapping(uint256 => uint256) private salesByIdBook;
    uint256 private royaltyFee;

    event SemiFungibleBookCreated(
        uint256 indexed bookId,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 units,
        address seller,
        address owner,
        uint256 price,
        uint256 sales
    );

    event NonFungibleBookCreated(
        uint256 indexed bookId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        uint256 sales
    );

    /* Places a semi fungible book for sale on the library ~ ERC1155*/
    function createSemiFungibleBook(
        address nftContract,
        uint256 tokenId,
        uint256 price,
        uint256 units
    ) public payable nonReentrant {
        _bookIds.increment();
        uint256 bookId = _bookIds.current();
        idToBook[bookId] = Book(
            bookId,
            nftContract,
            tokenId,
            units,
            payable(msg.sender),
            payable(address(0)),
            price,
            0
        );

        IERC1155(nftContract).safeTransferFrom(
            msg.sender,
            address(this),
            tokenId,
            units,
            ""
        );

        emit SemiFungibleBookCreated(
            bookId,
            nftContract,
            tokenId,
            units,
            msg.sender,
            address(0),
            price,
            0
        );
    }

    /* Places a semi fungible book for sale on the library ~ ERC1155*/
    function createNonFungibleBook(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant {
        _bookIds.increment();
        uint256 bookId = _bookIds.current();
        idToBook[bookId] = Book(
            bookId,
            nftContract,
            tokenId,
            1,
            payable(msg.sender),
            payable(address(0)),
            price,
            0
        );

        IERC721(nftContract).safeTransferFrom(
            msg.sender,
            address(this),
            tokenId,
            ""
        );

        emit NonFungibleBookCreated(
            bookId,
            nftContract,
            tokenId,
            msg.sender,
            address(0),
            price,
            0
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
        require(
            idToBook[bookId].units >= amount,
            "Amount not available for sale"
        );

        if (price > 0) {
            idToBook[bookId].seller.transfer(
                msg.value * (1 - royaltyFee / 100)
            );
        }

        IERC1155(nftContract).safeTransferFrom(
            address(this),
            msg.sender,
            tokenId,
            amount,
            ""
        );
        idToBook[bookId].owner = payable(msg.sender);
        idToBook[bookId].sales += amount;
        bookSales += amount;

        if (idToBook[bookId].units == idToBook[bookId].sales) {
            _booksFullySold.increment();
        }
    }

    /* Returns a specific library book */
    function fetchBook(uint256 bookId) public view returns (Book memory) {
        return idToBook[bookId];
    }

    /* Returns all unsold library books */
    function fetchBooks() public view returns (Book[] memory) {
        uint256 bookCount = _bookIds.current();
        uint256 unsoldBookCount = _bookIds.current() -
            _booksFullySold.current();
        uint256 currentIndex = 0;

        Book[] memory books = new Book[](unsoldBookCount);
        for (uint256 i = 0; i < bookCount; i++) {
            if (idToBook[i + 1].units > idToBook[i + 1].sales) {
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
