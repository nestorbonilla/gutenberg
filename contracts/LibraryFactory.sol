// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import "./Library.sol";
import "./GenesisCollection.sol";
import "./SecondaryCollection.sol";

// inspired from: https://solidity-by-example.org/app/create2/
contract LibraryFactory {
    event Deployed(address addr, uint256 salt);

    // 1. Get bytecode of contract to be deployed
    // NOTE: _royaltyFee is an argument of the Library's constructor
    function getLibraryBytecode(uint256 royaltyFee)
        public
        pure
        returns (bytes memory)
    {
        bytes memory bytecode = type(Library).creationCode;
        return abi.encodePacked(bytecode, abi.encode(royaltyFee)); // library royaltyFee as argument
    }

    function getGenesisBytecode(
        string memory name,
        string memory symbol,
        string memory baseUri,
        string memory ipfsFolderHash,
        address libraryAddress
    ) public pure returns (bytes memory) {
        bytes memory bytecode = type(GenesisCollection).creationCode;
        return
            abi.encodePacked(
                bytecode,
                abi.encode(name),
                abi.encode(symbol),
                abi.encode(baseUri),
                abi.encode(ipfsFolderHash),
                abi.encode(libraryAddress)
            );
    }

    // 2. Compute the address of the contract to be deployed
    // NOTE: _salt is a random number used to create an address
    function getAddress(bytes memory bytecode, uint256 _salt)
        public
        view
        returns (address)
    {
        bytes32 hash = keccak256(
            abi.encodePacked(
                bytes1(0xff),
                address(this),
                _salt,
                keccak256(bytecode)
            )
        );

        // NOTE: cast last 20 bytes of hash to address
        return address(uint160(uint256(hash)));
    }

    // 2.5 Compute address from already hashed bytecode and factory address(used for testing)
    function getAddress_(
        bytes memory hashedBytecode,
        address factoryAddy,
        uint256 _salt
    ) public view returns (address) {
        bytes32 hash = keccak256(
            abi.encodePacked(bytes1(0xff), factoryAddy, _salt, hashedBytecode)
        );

        // NOTE: cast last 20 bytes of hash to address
        return address(uint160(uint256(hash)));
    }

    // 3. Deploy the contract
    // NOTE:
    // Check the event log Deployed which contains the address of the deployed library contract.
    // The address in the log should equal the address computed from above.
    function deploy(
        bytes memory libBytecode,
        string memory name,
        string memory symbol,
        string memory baseUri,
        string memory ipfsFolderHash,
        uint256 libSalt,
        uint256 genSalt
    ) public payable {
        address libraryAddress;
        address genesisCollectionAddress;

        assembly {
            libraryAddress := create2(
                0, // wei sent with current call
                // Actual code starts after skipping the first 32 bytes
                add(libBytecode, 0x20),
                mload(libBytecode), // Load the size of code contained in the first 32 bytes
                libSalt // Salt from function arguments
            )

            if iszero(extcodesize(libraryAddress)) {
                revert(0, 0)
            }
        }

        bytes memory genesisBytecode = getGenesisBytecode(
            name,
            symbol,
            baseUri,
            ipfsFolderHash,
            libraryAddress
        );

        assembly {
            genesisCollectionAddress := create2(
                0, // wei sent with current call
                // Actual code starts after skipping the first 32 bytes
                add(genesisBytecode, 0x20),
                mload(genesisBytecode), // Load the size of code contained in the first 32 bytes
                genSalt // Salt from function arguments
            )

            if iszero(extcodesize(genesisCollectionAddress)) {
                revert(0, 0)
            }
        }
    }
}
