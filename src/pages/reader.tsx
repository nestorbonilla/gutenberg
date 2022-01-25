import type { NextPage } from "next";
import { ReactReader } from "react-reader";
import MarketingLayout from "../components/marketingLayout";
// import styles from '../styles/Home.module.css'

const Reader: NextPage = () => {
  return (
    <MarketingLayout>
      <div className="m">
        <ReactReader url="https://gerhardsletten.github.io/react-reader/files/alice.epub" />
      </div>
    </MarketingLayout>
  );
};

export default Reader;
