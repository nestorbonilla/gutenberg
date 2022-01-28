import { CurrencyDollarIcon, GlobeIcon } from "@heroicons/react/outline";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import Moralis from "moralis";
import { useMoralis } from "react-moralis";
import Genesis from "../../../artifacts/contracts/GenesisCollection.sol/GenesisCollection.json";
import Library from "../../../artifacts/contracts/Library.sol/Library.json";
import Secondary from "../../../artifacts/contracts/SecondaryCollection.sol/SecondaryCollection.json";
import MarketingLayout from "../../components/marketingLayout";
import { Highlight } from "../../components/rightSlider";
import {
  GENESIS_ADDRESS, LIBRARY_CONTRACT, SECONDARY_ADDRESS
} from "../../utils/addresses";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0" as any);
const policies = [
  {
    name: "Share with friends",
    icon: GlobeIcon,
    description: "Share your knowledge with others",
  },
  {
    name: "Get rewarded",
    icon: CurrencyDollarIcon,
    description: "Your notes are worth more",
  },
];

const MintERC721 = () => {
  const router = useRouter();
  const { tokenId } = router.query;
  const [mintBook, setMintBook] = useState<any>();
  const [address, setAddress] = useState<string>();
  const [metadata, setMetadata] = useState<any>();
  const [priceData, setPriceData] = useState<any>();

  // const { data, error, isLoading } = useMoralisQuery("GameScore");

  const { Moralis, isInitialized, isAuthenticated, isWeb3Enabled } =
    useMoralis();

  const [highlights, setHighlights] = useState<Highlight[]>();
  const MoralisHighlight = Moralis.Object.extend("Highlight");

  const mint = async () => {  
    const freshdata = { ...metadata, address, highlights };
    // upload to Pinata
    const metadataResult = await client.add(JSON.stringify(freshdata));
    const url = `https://ipfs.infura.io/ipfs/${metadataResult.path}`;
    console.log("info has been uploaded: ", url);

    const mintData = {
      contractAddress: SECONDARY_ADDRESS,
      functionName: "mint",
      abi: Secondary.abi,
      params: {
        _tokenURI: url,
      },
    };
    const transaction = await Moralis.executeFunction(mintData);
    // @ts-ignore
    const result = await transaction.wait();
    console.log(result, null, 3);

    let newBookId = Number(result?.events[0].args.tokenId["_hex"]);

    console.log(newBookId);

    const libraryData = {
      contractAddress: LIBRARY_CONTRACT,
      functionName: "createNonFungibleBook",
      abi: Library.abi,
      params: {
        nftContract: SECONDARY_ADDRESS,
        tokenId: newBookId,
        price: 10,
      },
    };
    const results = await Moralis.executeFunction(libraryData);

    console.log(results, null, 3);

    router.replace("/library");
  };

  const getAnnotations = async () => {
    //load personal highlights
    const user: any = Moralis.User.current();
    setAddress(user.get("ethAddress"));
    new Moralis.Query(MoralisHighlight)
      .equalTo("address", user.get("ethAddress"))
      .equalTo("bookId", tokenId)
      .find()
      .then((results) => {
        setHighlights(
          results.map((result) => result.toJSON() as unknown as Highlight)
        );
      });
  };

  const getMetaData = async () => {
    console.log("Calling");

    const getMetaData = {
      contractAddress: GENESIS_ADDRESS,
      functionName: "uri",
      abi: Genesis.abi,
      params: {
        _tokenId: tokenId,
      },
    };

    const pinataLink = await Moralis.executeFunction(getMetaData);

    let { data } = await axios.get(String(pinataLink));

    setMetadata(data);
  };

  const getLibraryData = async () => {
    // console.log("Calling");

    const libraryCall = {
      contractAddress: LIBRARY_CONTRACT,
      functionName: "fetchBook",
      abi: Library.abi,
      params: {
        bookId: tokenId,
      },
    };

    const blob = await Moralis.executeFunction(libraryCall);

    console.log(
      "executeFunction respone from library ?=>" + JSON.stringify(blob, null, 3)
    );

    setPriceData(blob);
  };

  const makeCalls = async () => {
    // console.log("Getting -> " + book_id);
    await Moralis.enableWeb3();
    getAnnotations();
    getMetaData();
    getLibraryData();
  };

  useEffect(() => {
    if (isInitialized && isAuthenticated && !isWeb3Enabled && tokenId) {
      makeCalls();
    }
  }, [isInitialized, isAuthenticated, isWeb3Enabled, tokenId]);

  return (
    <MarketingLayout>
      <div className="pt-6 pb-16 sm:pb-24">
        <div className="mt-8 max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
            <div className="lg:col-start-8 lg:col-span-5">
              <div className="flex justify-between">
                <h1 className="text-xl font-medium text-gray-200">
                  <div>{metadata?.name}</div>
                </h1>
                {/*<p className="text-xl font-medium rounded-full bg-green-100 text-green-800">
                  ${mintBook.price}
                </p>*/}
              </div>
            </div>

            <div className="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3">
              <h2 className="sr-only">Images</h2>
              <img
                src={metadata?.image}
                className={"lg:col-span-2 lg:row-span-2 rounded-lg"}
              />
            </div>

            <div className="mt-8 lg:col-span-5">
              <form>
                <div>
                  <h2 className="text-md font-medium text-gray-200 mb-5 ">
                    {highlights?.length}
                    {highlights?.length === 1 ? "Annotation" : "Annotations"}
                  </h2>
                  {/* My Annotations Meta data */}
                  {/* <Annotationer annotation={book.annotations} /> */}
                </div>
                {/* ) : null} */}

                <a
                  onClick={mint}
                  className="mt-8 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Mint Annotated NFT
                </a>
              </form>

              {/* book details */}
              {/* <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">
                  Description
                </h2> */}

              {/* <div
                  className="mt-4 prose prose-sm text-gray-500"
                  dangerouslySetInnerHTML={{ __html: book.description }}
                /> */}
              {/* </div> */}

              {/* <div className="mt-8 border-t border-gray-200 pt-8">
                <h2 className="text-sm font-medium text-gray-900">
                  Fabric &amp; Care
                </h2>

                <div className="mt-4 prose prose-sm text-gray-500">
                  <ul role="list">
                    {book.details.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div> */}

              {/* Policies */}
              <section aria-labelledby="policies-heading" className="mt-10">
                <h2 id="policies-heading" className="sr-only">
                  Our Policies
                </h2>

                <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {policies.map((policy) => (
                    <div
                      key={policy.name}
                      className="bg-black border border-indigo-600 rounded-lg p-6 text-center"
                    >
                      <dt>
                        <policy.icon
                          className="mx-auto h-6 w-6 flex-shrink-0 text-indigo-600"
                          aria-hidden="true"
                        />
                        <span className="mt-4 text-sm font-medium text-gray-200">
                          {policy.name}
                        </span>
                      </dt>
                      <dd className="mt-1 text-sm text-indigo-200">
                        {policy.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* </div> */}
      {/* <BookList hash={book.hash} /> */}
    </MarketingLayout>
  );
};

export default MintERC721;
