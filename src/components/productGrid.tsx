import { GENESIS_ADDRESS } from "../utils/addresses";
import Book, { Action } from "./book";

type Props = {
  genesis_action: string;
  secondary_action: string;
  books: { id: number; contract: string; book_id?: number }[];
  params?: boolean;
};

const ProductGrid = ({
  books,
  genesis_action,
  secondary_action,
  params = false,
}: Props) => {
  return (
    <div>
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {books.map((book: any) => (
            <Book
              key={book.id}
              book={book}
              params={params}
              genesis_action={genesis_action}
              secondary_action={secondary_action}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
