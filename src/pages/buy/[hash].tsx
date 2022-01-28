import ProductView from "../../components/productView";
import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";
import GenesisABI from "../../../artifacts/contracts/GenesisCollection.sol/GenesisCollection.json";
import Library from "../../../artifacts/contracts/Library.sol/Library.json";
import { GENESIS_ADDRESS, LIBRARY_CONTRACT } from "../../utils/addresses";

const BuyERC115 = () => {
  const router = useRouter();
  const { hash } = router.query;

  const { Moralis, isInitialized, isAuthenticated, isWeb3Enabled } =
    useMoralis();

  const buy  = async () => {

    console.log("FUCK Calling Buy");

    // if (isAuthenticated) {
      // const libraryCall = {
      //   contractAddress: LIBRARY_CONTRACT,
      //   functionName: "createLibrarySale",
      //   abi: Library.abi,
      //   params: {
      //     bookId: hash,
      //     nftContract: GENESIS_ADDRESS,
      //     amount: 1,
      //   },
      // };

    //   console.log("THe Call => " + JSON.stringify(libraryCall));

    //   const blob: any = await Moralis.executeFunction(libraryCall);

    //   console.log("Blob from mint ?=> " + JSON.stringify(blob, null, 3));
    // } else {
    //   console.log("Not authed");
    // }
  };

  return (
    <>
      {hash ? (
        <ProductView book_id={Number(hash)} erc721={false} callback={() => buy()} />
      ) : null}
    </>
  );
};
export default BuyERC115;
