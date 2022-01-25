import { useEffect, useState } from "react";
import Moralis from "moralis";
import Book from "./book";
import { nft_book } from "../types/mockMetadata";
import { Action } from "./book";

type Props = {
  books: nft_book[]
  action: Action
}

const ProductGrid = ({ books, action } : Props) => {
  const [nfts, setNfts] = useState<any>(books);

  // const getBookMetadata = async () => {
  //   Moralis.start({
  //     serverUrl: "https://7fqgvttpqukt.usemoralis.com:2053/server",
  //     appId: "585mUNiZ538xo3FEY7lbXWFZjjFPNxKOvUstjfhc",
  //   });

  //   // BAYC
  //   const options: any = {
  //     address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
  //     chain: "eth",
  //   };

  //   const NFTs = await Moralis.Web3API.token.getAllTokenIds(options);
  //   setNfts(NFTs.result);

  //   console.log(NFTs);
  // };

  // useEffect(() => {
  //   getBookMetadata();
  // }, []);

  return (
    <div className="">
      {/* <div className="bg-white"> */}
      <div>
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {nfts.map((nft: any) => (
              <Book key={nft.id} book={nft} action={action} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
