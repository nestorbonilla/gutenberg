import { MoralisProvider } from "react-moralis";
import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider
      appId={"585mUNiZ538xo3FEY7lbXWFZjjFPNxKOvUstjfhc"}
      serverUrl={"https://7fqgvttpqukt.usemoralis.com:2053/server"}
    >
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;
