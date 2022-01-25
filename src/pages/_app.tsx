import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import Moralis from "moralis";

function MyApp({ Component, pageProps }: AppProps) {
  // const initMoralis = async () => {
  //   console.log("Init Moralis");
  //   Moralis.start({
  //     serverUrl: "https://7fqgvttpqukt.usemoralis.com:2053/server",
  //     appId: "585mUNiZ538xo3FEY7lbXWFZjjFPNxKOvUstjfhc",
  //   });
  // };

  // useEffect(() => {
  //   initMoralis();
  // }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
