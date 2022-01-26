
const { ethers } = require("hardhat");

async function main() {

  let [libraryAdmin, author] = ['', ''];
  [libraryAdmin, author] = await ethers.getSigners();

  const Library = await ethers.getContractFactory("Library");
  const library = await Library.connect(libraryAdmin).deploy(15); // royaltyFee
  await library.deployed();

  console.log("Library contract was deployed to: ", library.address);

  const GenesisCollection = await ethers.getContractFactory("GenesisCollection");
  const genesisCollection = await GenesisCollection.connect(author).deploy("Genesis", "BOOK", "https://gateway.pinata.cloud/ipfs/", "QmfLvZMG4myTDdMQ6LTFobuY5HUyZRGYn2s4mC5ouYLZuo", library.address); // name, symbol, baseUri, ipfsFolderHash, libraryAddress
  await genesisCollection.deployed();

  console.log("Genesis Collection contract was deployed to: ", genesisCollection.address);

  await genesisCollection.mint(10);

  console.log("Genesis Collection successfully minted");

  await library.connect(author).createSemiFungibleBook(genesisCollection.address, 1, 0, 10); // nftContract, tokenId, price, amount

  console.log("Book created at Library");




  // const SecondaryCollection = await ethers.getContractFactory("SecondaryCollection");
  // const secondaryCollection = await SecondaryCollection.deploy("Secondary", "BOOK", library.address); // name, symbol, libraryAddress
  // await secondaryCollection.deployed();

  // const new721BookId = await secondaryCollection.mint(""); //tokenUri

  // console.log("Book with standard 721 minted");

  // await library.createSemiFungibleBook(genesisCollection.address, 1, 0, 10); // nftContract, tokenId, price, units

  // console.log("Book 721 created at Library");

  // console.log("Book with standard 721 created at Library");

  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
