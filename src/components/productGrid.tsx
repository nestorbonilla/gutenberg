import { useEffect, useState } from "react";
import Book from "./book";
import { nft_book } from "../types/mockMetadata";
import { Action } from "./book";
import { LIBRARY_CONTRACT } from '../utils/addresses';
import { abi } from "../../artifacts/contracts/Library.sol/Library.json";
import { useMoralis } from 'react-moralis';

type Props = {
  action: Action;
  books: number[];
};

const ProductGrid = ({books, action }: Props) => {

  return (
    <div>
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {books.map((book_id: any, index: number) => (
            <Book key={book_id} book_id={book_id} action={action} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
