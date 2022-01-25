import Moralis from 'moralis';
import { useEffect, useState } from "react";
import Book from "./book";

const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  // More products...
];

const ProductGrid =  () => {

  const [nfts, setNfts] = useState<any>([]);

  const getBookMetadata = async () => {
    Moralis.start({
      serverUrl: "https://7fqgvttpqukt.usemoralis.com:2053/server",
      appId: "585mUNiZ538xo3FEY7lbXWFZjjFPNxKOvUstjfhc",
    });

    // BAYC
    const options: any = {
      address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
      chain: "eth",
    };
  
    const NFTs = await Moralis.Web3API.token.getAllTokenIds(options);
    setNfts(NFTs.result);

    console.log(NFTs);
  };

  useEffect(() => {
    getBookMetadata();
  }, []);

  
  return (
    <div className="">
      {/* <div className="bg-white"> */}
      <div>
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {nfts.map((book) => (
              <Book key={book.id} book={book} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
