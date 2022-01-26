import { useEffect, useState } from "react";
import { Action } from "../components/book";
import MarketingLayout from "../components/marketingLayout";
import ProductGrid from "../components/productGrid";
import { mockBooks } from "../types/mockMetadata";
import { useRouter } from "next/router";

const Profile = () => {
  //   let [user, setUser] = useState<string | undefined>();
  const router = useRouter();
  const { address } = router.query;

  //fetch books from blockchain

  useEffect(() => {
    if (!address) {
      return;
    }

    console.log("Fetch for Address?=>" + address);
  }, [address]);
  return (
    <MarketingLayout>
      <ProductGrid books={[mockBooks[0], mockBooks[2]]} action={Action.read} />
    </MarketingLayout>
  );
};

export default Profile;
