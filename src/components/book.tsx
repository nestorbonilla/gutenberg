import { useState } from "react";
import { nft_book } from "../types/mockMetadata";
import Link from "next/link";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { abi } from "../../artifacts/contracts/Library.sol/Library.json";
import axios from "axios";
import { LIBRARY_CONTRACT } from "../utils/addresses";

export enum Action {
  mintERC721 = "mintER721",
  buyERC721 = "buyER721",
  buyERC1155 = "buyERC1155",
  read = "read",
}

type Props = {
  book: any;
  action: Action;
};

const hexToDec = (hexString: string) => {
  return parseInt(hexString, 16);
};

const Book = ({ book, action }: Props) => {
  const { price, bookId, sales, tokenId, units } = book;

  const [meta, setMeta] = useState<any>();

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

  const call = async () => {
    console.log("Calling");

    const readOptions = {
      contractAddress: LIBRARY_CONTRACT,
      functionName: "fetchBook",
      abi,
      params: {
        bookId: hexToDec(bookId._hex),
      },
    };

    await Moralis.enableWeb3();
    const pinataLink = await Moralis.executeFunction(readOptions);

    console.log("executeFunction respone in book ?=>" + JSON.stringify(pinataLink));

    // let { data } = await axios.get(String(pinataLink));

    // console.log(data);

    // setMeta(data);
  };

  useEffect(() => {
    if (isInitialized && isAuthenticated && !isWeb3Enabled) {
      console.log("Getting -> " + bookId);
      call();
    }
  }, [isInitialized, isAuthenticated, isWeb3Enabled]);

  return (
    <div key={book.ipfs_url} className="group relative">
      <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
        {/* <img
          src={book.image}
          // alt={book.description}
          className="w-full h-full object-center object-cover lg:w-full lg:h-full"
        /> */}
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            {/* <Link href={}>
              <a>
                <span aria-hidden="true" className="absolute inset-0" />
                {book.name}
              </a>
            </Link> */}
          </h3>
          {/* <p className="mt-1 text-sm text-gray-500">{book.authors}</p> */}
        </div>
        {/* <p className="text-sm font-medium text-gray-900">{book.price}</p> */}
      </div>
    </div>
  );
};

export default Book;
