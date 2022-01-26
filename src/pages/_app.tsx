import { useState } from "react";
import Moralis from "moralis";
import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [init, setInit] = useState(false);

  const initMoralis = async () => {
    if (!init) {
      console.log("Init Moralis");
      Moralis.start({
        serverUrl: "https://7fqgvttpqukt.usemoralis.com:2053/server",
        appId: "585mUNiZ538xo3FEY7lbXWFZjjFPNxKOvUstjfhc",
      });
      setInit(true);
    }
  };

  initMoralis();

  return <Component {...pageProps} />;
}

export default MyApp;
