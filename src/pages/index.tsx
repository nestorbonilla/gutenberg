import { useState, useEffect } from "react";
import ProdcutGrid from "../components/productGrid";
import MarketingLayout from "../components/marketingLayout";
import LandingHeader from "../components/landingHeader";
import { Action } from "../components/book";
import { LIBRARY_CONTRACT } from "../utils/addresses";
import { abi } from "../../artifacts/contracts/Library.sol/Library.json";
import { useMoralis } from "react-moralis";

export default function Home() {
  const [books, setBooks] = useState<any>([]);

  const { Moralis, isInitialized, isAuthenticated, isWeb3Enabled } =
    useMoralis();

  const call = async () => {
    const readOptions = {
      contractAddress: LIBRARY_CONTRACT,
      functionName: "fetchBooks",
      abi,
    };

    await Moralis.enableWeb3();
    const originalData = await Moralis.executeFunction(readOptions);

    const data = JSON.stringify(originalData);
    const parsedData = JSON.parse(data);
    console.log("PARSED DATA");
    console.log(parsedData);

    let book_datas: any[] = [];

    parsedData.forEach((item: any) => {
      book_datas.push({ id: Number(item[0].hex), contract: item[1] });
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
        <ProdcutGrid books={books} action={Action.buyERC1155} />
      ) : null}
    </MarketingLayout>
  );
}
