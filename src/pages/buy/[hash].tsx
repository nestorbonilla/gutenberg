import ProductView from "../../components/productView";
import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";
import GenesisABI from "../../../artifacts/contracts/GenesisCollection.sol/GenesisCollection.json";


const BuyERC115 = () => {
  const router = useRouter();
  const { hash } = router.query;

  const buy = async () => {};

  return (
    <>
      {hash ? (
        <ProductView book_id={Number(hash)} erc721={false} callback={buy} />
      ) : null}
    </>
  );
};
export default BuyERC115;
