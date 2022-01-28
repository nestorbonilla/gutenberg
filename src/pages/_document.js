import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* Umami Analytics */}
          {/* https://mariestarck.com/add-google-analytics-to-your-next-js-application-in-5-easy-steps/ */}
          {/* <script
            async
            defer
            data-website-id="e476c3d7-5004-4a71-872a-b265dfcbbfcf"
            src="https://kernel-labs-umami.vercel.app/umami.js"
            data-domains="worldli.me"
          ></script> */}
          {/* Favicons */}
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          {/*<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
          <link rel="manifest" href="/favicon/site.webmanifest" />
          <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" /> */}
          {/* <meta name="theme-color" content="#ffffff" /> */}
        </Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
