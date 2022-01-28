import { useEffect, useState } from "react";
import { Action } from "../components/book";
import MarketingLayout from "../components/marketingLayout";
import ProductGrid from "../components/productGrid";
import { useMoralis } from "react-moralis";
import Library from "../../artifacts/contracts/Library.sol/Library.json";
import { LIBRARY_CONTRACT } from "../utils/addresses";

const Libarary = () => {
  //fetch books from blockchain
  const [bookIds, setBooksIds] = useState<any>([]);

  const { Moralis, isInitialized, isAuthenticated, isWeb3Enabled } =
    useMoralis();

  const fetchNFTS = async () => {
    await Moralis.enableWeb3();

    const libraryCall = {
      contractAddress: LIBRARY_CONTRACT,
      functionName: "fetchMyNFTs",
      abi: Library.abi,
    };

    const blob: any = await Moralis.executeFunction(libraryCall);

    console.log("Blob from fetchMyNFTS ?=> " + JSON.stringify(blob, null, 3));

    const data = JSON.stringify(blob);
    const parsedData = JSON.parse(data);

    let ids: number[] = [];

    parsedData.forEach((item: any) => {
      ids.push(Number(item[0].hex));
    });

    setBooksIds(ids);
  };

  useEffect(() => {
    if (isInitialized && isAuthenticated && !isWeb3Enabled) {
      fetchNFTS();
    }
  }, [isInitialized, isAuthenticated, isWeb3Enabled]);

  return (
    <MarketingLayout>
      {bookIds ? <ProductGrid books={bookIds} action={Action.read} /> : null}
    </MarketingLayout>
  );
};

export default Libarary;
