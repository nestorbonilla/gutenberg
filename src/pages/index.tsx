import {useState } from 'react';
import ProdcutGrid from "../components/productGrid";
import MarketingLayout from "../components/marketingLayout";
import LandingHeader from "../components/landingHeader";
import { mockBooks } from "../types/mockMetadata";
import { Action } from '../components/book';


export default function Home() {
  return (
    <MarketingLayout>
      <LandingHeader />
      <ProdcutGrid books={mockBooks} action={Action.buyERC1155}/>
    </MarketingLayout>
  );
}
