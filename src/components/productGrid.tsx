import { useEffect, useState } from "react";
import Book from "./book";
import { nft_book } from "../types/mockMetadata";
import { Action } from "./book";
import { LIBRARY_CONTRACT } from '../utils/addresses';
import { abi } from "../../artifacts/contracts/Library.sol/Library.json";
import { useMoralis } from 'react-moralis';

type Props = {
  books: nft_book[];
  action: Action;
};

const ProductGrid = ({ books, action }: Props) => {
  const [meta, setMeta] = useState<any>([]);
  const { Moralis, isInitialized, isAuthenticated, isWeb3Enabled } = useMoralis();
  
  const call = async () => {

    console.log("Calling");

    const readOptions = {
      contractAddress: LIBRARY_CONTRACT,
      functionName: "fetchBooks",
      abi,
    };

    await Moralis.enableWeb3();
    const data = await Moralis.executeFunction(readOptions);

    console.log("executeFunction respone ?=>" + JSON.stringify(data));

    console.log(data);

    setMeta(data);
  };

  useEffect(() => {
    if (isInitialized && isAuthenticated && !isWeb3Enabled) {
      call();
    }
  }, [isInitialized, isAuthenticated, isWeb3Enabled]);

 

  return (
    <div>
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {meta.map((nft: any, index: number) => (
            <Book key={index} book={nft} action={action} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
