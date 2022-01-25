import { nft_book } from "../types/mockMetadata";
import Link from "next/link";

type Props = {
  book: nft_book;
};

const Book = ({ book }: Props) => {
  // let meta = book.metadata;

  // console.log(meta);

  return (
    <div key={book.ipfs_url} className="group relative">
      <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
        <img
          src={book.image}
          // alt={book.description}
          className="w-full h-full object-center object-cover lg:w-full lg:h-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link href={`buy/${book.hash}`}>
              <a>
                <span aria-hidden="true" className="absolute inset-0" />
                {book.name}
              </a>
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{book.authors}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{book.price}</p>
      </div>
    </div>
  );
};

export default Book;
