import { nft_book } from "../types/mockMetadata";
import Link from "next/link";

export enum Action {
  mintERC721 = "mintER721",
  buyERC721 = "buyER721",
  buyERC1155 = "buyERC1155",
  read = "read",
}

type Props = {
  book: nft_book;
  action: Action;
};


const Book = ({ book, action }: Props) => {

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
  }

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
            <Link href={link(book.hash)}>
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
