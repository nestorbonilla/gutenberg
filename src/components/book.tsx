import { useState } from "react";
import Link from "next/link";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import Genesis from "../../artifacts/contracts/GenesisCollection.sol/GenesisCollection.json";
import Library from "../../artifacts/contracts/Library.sol/Library.json";

import axios from "axios";
import { GENESIS_ADDRESS, LIBRARY_CONTRACT } from "../utils/addresses";

export enum Action {
  mintERC721 = "mintER721",
  buyERC721 = "buyER721",
  buyERC1155 = "buyERC1155",
  read = "read",
}

type Props = {
  book_id: number; 
  action: Action;
};

const Book = ({ book_id, action }: Props) => {
  // console.log("Book id in book -> " + book_id);
  const [metadata, setMetadata] = useState<any>();
  const [priceData, setPriceData] = useState<any>();

  const link = (link: string) => {
    switch (action) {
      case Action.mintERC721:
        return `/mint/${link}`;
      case Action.buyERC721:
        return `/buy/${link}`;
      case Action.buyERC1155:
        return `/buy/${link}`;
      case Action.read:
        return `/read/${link}`;
    }
  };

  const { Moralis, isInitialized, isAuthenticated, isWeb3Enabled } =
    useMoralis();

  const getMetaData = async () => {
    console.log("Calling");

    const getMetaData = {
      contractAddress: GENESIS_ADDRESS,
      functionName: "uri",
      abi: Genesis.abi,
      params: {
        _tokenId: book_id,
      },
    };

    const pinataLink = await Moralis.executeFunction(getMetaData);

    // console.log(
    //   "executeFunction response in book ?=>" +
    //     JSON.stringify(pinataLink, null, 3)
    // );

    let { data } = await axios.get(String(pinataLink));

    // console.log(data);

    setMetadata(data);
  };

  const getLibraryData = async () => {
    // console.log("Calling");

    const libraryCall = {
      contractAddress: LIBRARY_CONTRACT,
      functionName: "fetchBook",
      abi: Library.abi,
      params: {
        bookId: book_id,
      },
    };

   
    const blob = await Moralis.executeFunction(libraryCall);

    console.log(
      "executeFunction respone from library ?=>" +
        JSON.stringify(blob, null, 3)
    );

    setPriceData(blob);
  };

  const makeCalls = async () => {
    console.log("Getting -> " + book_id);
    
    getMetaData();
    getLibraryData(); 
  }

  useEffect(() => {
    if (isInitialized && isAuthenticated && !isWeb3Enabled) {
      makeCalls();
    }
  }, [isInitialized, isAuthenticated, isWeb3Enabled]);

  return (
    <div key={metadata?.ipfs_url} className="group relative">
      <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
        <img
          src={metadata?.image}
          // alt={book.description}
          className="w-full h-full object-center object-cover lg:w-full lg:h-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link href={link(String(book_id))}>
              <a>
                <span aria-hidden="true" className="absolute inset-0" />
                {metadata?.name}
              </a>
            </Link>
          </h3>
          {/* <p className="mt-1 text-sm text-gray-500">{book.authors}</p> */}
        </div>
        {/* <p className="text-sm font-medium text-gray-900">{book.price}</p> */}
      </div>
    </div>
  );
};

export default Book;
