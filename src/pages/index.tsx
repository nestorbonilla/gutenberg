import { useEffect } from 'react';
import ProdcutGrid from "../components/productGrid";
import MarketingLayout from "../components/marketingLayout";
import LandingHeader from "../components/landingHeader";
import Moralis from "moralis";

export default function Home() {
  useEffect(() => {

    async function getBookMetadata() {
      Moralis.enableWeb3();
      Moralis.start({ serverUrl: "https://7fqgvttpqukt.usemoralis.com:2053/server", appId: "585mUNiZ538xo3FEY7lbXWFZjjFPNxKOvUstjfhc" });
      // BAYC
      const options = { address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d", chain: "eth" };
      // @ts-ignore
      const NFTs = await Moralis.Web3API.token.getAllTokenIds(options);
      console.log(NFTs);
    }

    getBookMetadata();
  }, []);

  return (
    <MarketingLayout>
      <LandingHeader />
      <ProdcutGrid />
    </MarketingLayout>
  );
}
