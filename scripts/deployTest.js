
const { ethers } = require("hardhat");

async function main() {

  // const Library = await ethers.getContractFactory("LibraryFactory");
  // const library = await Library.deploy();
  // await library.deployed();

  // console.log("factory address:", library.address);

  // const libBytecode = await library.getLibraryBytecode(15);
  // const libAddress = await library.getAddress(libBytecode, 1500);
  
  // console.log("libByteCode: ", libBytecode);
  // console.log("libAddress:", libAddress);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
