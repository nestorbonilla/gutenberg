import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import Library from "../../artifacts/contracts/Library.sol/Library.json";
import { Action } from "../components/book";
import MarketingLayout from "../components/marketingLayout";
import ProductGrid from "../components/productGrid";
import { LIBRARY_CONTRACT } from "../utils/addresses";

const Libarary = () => {
  const [books, setBooks] = useState<any>([]);

  const { Moralis, isInitialized, isAuthenticated, isWeb3Enabled } =
    useMoralis();

  const fetchNFTS = async () => {
    await Moralis.enableWeb3();

    const libraryCall = {
      contractAddress: LIBRARY_CONTRACT,
      functionName: "fetchMyNFTs",
      abi: Library.abi,
    };
    const libraryCall2 = {
      contractAddress: LIBRARY_CONTRACT,
      functionName: "fetchBooksCreated",
      abi: Library.abi,
    };

    const blob: any = await Moralis.executeFunction(libraryCall);
    const blob2: any = await Moralis.executeFunction(libraryCall2);

    console.log("Blob from fetchMyNFTS ?=> " + JSON.stringify(blob, null, 3));
    console.log(
      "Blob from fetchBooksCreated ?=> " + JSON.stringify(blob2, null, 3)
    );

    const data = JSON.stringify(blob);
    const parsedData = JSON.parse(data);
    const parsedData2 = JSON.parse(JSON.stringify(blob2));

    let book_datas: any[] = [];

    parsedData.forEach((item: any) => {
      book_datas.push({ id: Number(item[2].hex), contract: item[1], book_id: Number(item[0].hex) });
    });
    parsedData2.forEach((item: any) => {
      book_datas.push({ id: Number(item[2].hex), contract: item[1], book_id: Number(item[0].hex)  });
    });

    setBooks(book_datas);
  };

  useEffect(() => {
    if (isInitialized && isAuthenticated && !isWeb3Enabled) {
      fetchNFTS();
    }
  }, [isInitialized, isAuthenticated, isWeb3Enabled]);

  return (
    <MarketingLayout>
      {books ? (
        <ProductGrid
          books={books}
          params={true}
          genesis_action="read"
          secondary_action="read"
        />
      ) : null}
    </MarketingLayout>
  );
};

export default Libarary;
