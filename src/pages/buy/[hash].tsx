import ProductView from "../../components/productView";
import { mockBooks } from "../../types/mockMetadata";
import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";
import GenesisABI from "../../../artifacts/contracts/GenesisCollection.sol/GenesisCollection.json";

const BuyERC115 = () => {
  const router = useRouter();
  const { hash } = router.query;
  const { Moralis } = useMoralis();

  const buy = async () => {
    const readOptions = {
      contractAddress: "0x762901CA5eE5ee185A2E1Cf41Ea850bC9CE28401",
      functionName: "mint",
      abi: GenesisABI,
      chain: "mumbai",
      params: {
        _amount: 1,
      },
    };

    await Moralis.enableWeb3();
    const message = await Moralis.executeFunction(readOptions);
    console.log(message);
      
    const options = {
        chain: "mumbai",
        transaction_hash: "0x52dbc421f1f173dc0ff4238d54fe68466408223f472ba7e628b98ff4586c4269"
    };
      
      const transaction = await Moralis.Web3API.native.getTransaction(options);

      console.log(transaction);
    
  };

  return <ProductView book={mockBooks[0]} erc721={false} callback={buy} />;
};
export default BuyERC115;
