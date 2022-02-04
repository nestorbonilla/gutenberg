import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import Library from "../../artifacts/contracts/Library.sol/Library.json";
import { Action } from "../components/book";
import LandingHeader from "../components/landingHeader";
import MarketingLayout from "../components/marketingLayout";
import ProductGrid from "../components/productGrid";
import { GENESIS_ADDRESS, SECONDARY_ADDRESS, LIBRARY_CONTRACT } from "../utils/addresses";

export default function Home() {
  const [books, setBooks] = useState<any>([]);

  const { Moralis, isInitialized, isAuthenticated, isWeb3Enabled } =
    useMoralis();

  const call = async () => {
    const readOptions = {
      contractAddress: LIBRARY_CONTRACT,
      functionName: "fetchBooks",
      abi: Library.abi,
    };

    await Moralis.enableWeb3();
    const originalData = await Moralis.executeFunction(readOptions);

    const data = JSON.stringify(originalData);
    const parsedData = JSON.parse(data);
    console.log("PARSED DATA");
    console.log(parsedData);

    let book_datas: any[] = [];

    parsedData.forEach((item: any) => {
      //only show genesis erc721 on home page for now.
      if (item[1] === GENESIS_ADDRESS) {
        book_datas.push({ id: Number(item[2].hex), contract: item[1], book_id: Number(item[0].hex) });
      }

      // ERC721 <- this is funny nestor
      if (item[1] === SECONDARY_ADDRESS) {
        book_datas.push({ id: Number(item[2].hex), contract: item[1], book_id: Number(item[0].hex) });
      }
    });

    console.log("book_datas => " + JSON.stringify(book_datas, null, 3));

    setBooks(book_datas);
  };

  useEffect(() => {
    if (isInitialized && isAuthenticated && !isWeb3Enabled) {
      call();
    }
  }, [isInitialized, isAuthenticated, isWeb3Enabled]);

  return (
    <MarketingLayout>
      <LandingHeader />
      {books ? (
        <ProductGrid books={books} genesis_action="buy" secondary_action="mint" />
      ) : null}
    </MarketingLayout>
  );
}
