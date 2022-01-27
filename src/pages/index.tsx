import { useState, useEffect } from "react";
import ProdcutGrid from "../components/productGrid";
import MarketingLayout from "../components/marketingLayout";
import LandingHeader from "../components/landingHeader";
import { Action } from "../components/book";
import { LIBRARY_CONTRACT } from "../utils/addresses";
import { abi } from "../../artifacts/contracts/Library.sol/Library.json";
import { useMoralis } from "react-moralis";

const hexToDec = (hexString: string) => {
  return parseInt(hexString, 16);
};

export default function Home() {
  const [bookIds, setBooksIds] = useState<any>([]);

  const { Moralis, isInitialized, isAuthenticated, isWeb3Enabled } =
    useMoralis();

  const call = async () => {
    console.log("Calling");

    const readOptions = {
      contractAddress: LIBRARY_CONTRACT,
      functionName: "fetchBooks",
      abi,
    };

    await Moralis.enableWeb3();
    const originalData = await Moralis.executeFunction(readOptions);

    const data = JSON.stringify(originalData);
    const parsedData = JSON.parse(data);

    let ids: number[] = [];

    parsedData.forEach((item: any) => {
      console.log("Item ?=>" + JSON.stringify(item, null, 3));
      ids.push(hexToDec(item[0].hex));
    });

    setBooksIds(ids);
  };

  useEffect(() => {
    if (isInitialized && isAuthenticated && !isWeb3Enabled) {
      call();
    }
  }, [isInitialized, isAuthenticated, isWeb3Enabled]);

  return (
    <MarketingLayout>
      <LandingHeader />
      {bookIds ? (
        <ProdcutGrid books={bookIds} action={Action.buyERC1155} />
      ) : null}
    </MarketingLayout>
  );
}
