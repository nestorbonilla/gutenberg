
const { ethers } = require("hardhat");

async function main() {

  let [libraryAdmin, author] = ['', ''];
  [libraryAdmin, author] = await ethers.getSigners();

  const Library = await ethers.getContractFactory("Library");
  const library = await Library.connect(libraryAdmin).deploy(15); // royaltyFee
  await library.deployed();

  console.log("Library contract was deployed to: ", library.address);

  const GenesisCollection = await ethers.getContractFactory("GenesisCollection");
  const genesisCollection = await GenesisCollection.connect(author).deploy("Genesis", "BOOK", "https://gateway.pinata.cloud/ipfs/", "QmR8ZZkbFgpSMRSB28NCPEscWujnaWwj4MZEqGmjZXDUqw", library.address); // name, symbol, baseUri, ipfsFolderHash, libraryAddress
  await genesisCollection.deployed();

  console.log("Genesis Collection contract was deployed to: ", genesisCollection.address);

  await genesisCollection.connect(author).mint(1000);
  await genesisCollection.connect(author).mint(200);
  await genesisCollection.connect(author).mint(500);
  await genesisCollection.connect(author).mint(700);
  await genesisCollection.connect(author).mint(350);
  await genesisCollection.connect(author).mint(800);

  console.log("Genesis Collection successfully minted");

  await library.connect(author).createSemiFungibleBook(genesisCollection.address, 1, 0, 1000); // nftContract, tokenId, price, amount
  await library.connect(author).createSemiFungibleBook(genesisCollection.address, 2, 0, 200);
  await library.connect(author).createSemiFungibleBook(genesisCollection.address, 3, 0, 500);
  await library.connect(author).createSemiFungibleBook(genesisCollection.address, 4, 0, 700);
  await library.connect(author).createSemiFungibleBook(genesisCollection.address, 5, 0, 350);
  await library.connect(author).createSemiFungibleBook(genesisCollection.address, 6, 0, 800);

  console.log("Book created at Library");

  const SecondaryCollection = await ethers.getContractFactory("SecondaryCollection");
  const secondaryCollection = await SecondaryCollection.deploy("Secondary", "BOOK", library.address); // name, symbol, libraryAddress
  await secondaryCollection.deployed();

  console.log("Secondary Collection contract was deployed to: ", secondaryCollection.address);
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
