
const { ethers } = require("hardhat");

async function main() {

  const Library = await ethers.getContractFactory("Library");
  const library = await Library.deploy(15); // royaltyFee
  await library.deployed();

  console.log("Library contract was deployed to: ", library.address);

  const GenesisCollection = await ethers.getContractFactory("GenesisCollection");
  const genesisCollection = await GenesisCollection.deploy("Genesis", "BOOK", "https://gateway.pinata.cloud/ipfs/", "QmfLvZMG4myTDdMQ6LTFobuY5HUyZRGYn2s4mC5ouYLZuo", library.address); // name, symbol, baseUri, ipfsFolderHash, libraryAddress
  await genesisCollection.deployed();

  console.log("Genesis Collection contract was deployed to: ", genesisCollection.address);

  await genesisCollection.mint(10);

  console.log("Genesis Collection successfully minted");

  await library.createBook(genesisCollection.address, 1, 0, 10); // nftContract, tokenId, price, amount

  console.log("Book created at Library");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
