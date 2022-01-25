import ProdcutGrid from "../components/productGrid";
import MarketingLayout from "../components/marketingLayout";
import LandingHeader from "../components/landingHeader";
import Moralis from "moralis";

export default function Home() {
  return (
    <MarketingLayout>
      <LandingHeader />
      <ProdcutGrid />
    </MarketingLayout>
  );
}
