import { GENESIS_ADDRESS } from "../utils/addresses";
import Book, { Action } from "./book";

type Props = {
  action: Action;
  books: { id: number; contract: string }[];
};

const ProductGrid = ({books, action }: Props) => {
  return (
    <div>
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {books.map((book: any) => (
            <Book key={book.id} book={book} action={book.contract === GENESIS_ADDRESS ? Action.buyERC1155 : Action.buyERC721} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
