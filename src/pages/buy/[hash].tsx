import { CurrencyDollarIcon, GlobeIcon } from "@heroicons/react/outline";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import Genesis from "../../../artifacts/contracts/GenesisCollection.sol/GenesisCollection.json";
import Library from "../../../artifacts/contracts/Library.sol/Library.json";
import MarketingLayout from "../../components/marketingLayout";
import { GENESIS_ADDRESS, LIBRARY_CONTRACT } from "../../utils/addresses";

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

type Props = {
  // book_id: number;
  erc721: boolean;
  parentCall: () => void;
};

const ProductView = ({ erc721, parentCall }: Props) => {
  const [metadata, setMetadata] = useState<any>();
  const [priceData, setPriceData] = useState<any>();
  const router = useRouter();
  const { hash } = router.query;
  const [loading, setLoading] = useState(false);

  const { Moralis, isInitialized, isAuthenticated, isWeb3Enabled } =
    useMoralis();

  const buy = async () => {
    setLoading(true);
    const libraryCall = {
      contractAddress: LIBRARY_CONTRACT,
      functionName: "createLibrarySale",
      abi: Library.abi,
      params: {
        bookId: hash,
        nftContract: GENESIS_ADDRESS,
        amount: 1,
      },
    };

    console.log("THe Call => " + JSON.stringify(libraryCall));

    const blob: any = await Moralis.executeFunction(libraryCall);

    console.log("Blob from mint ?=> " + JSON.stringify(blob, null, 3));

    setLoading(false);

    router.push("/library");
  };

  const getMetaData = async () => {
    console.log("Calling");

    const getMetaData = {
      contractAddress: GENESIS_ADDRESS,
      functionName: "uri",
      abi: Genesis.abi,
      params: {
        _tokenId: hash,
      },
    };

    const pinataLink = await Moralis.executeFunction(getMetaData);

    console.log(
      "executeFunction response in book ?=>" +
        JSON.stringify(pinataLink, null, 3)
    );

    let { data } = await axios.get(String(pinataLink));

    console.log(data);

    setMetadata(data);
  };

  const getLibraryData = async () => {
    console.log("Calling");

    const libraryCall = {
      contractAddress: LIBRARY_CONTRACT,
      functionName: "fetchBook",
      abi: Library.abi,
      params: {
        bookId: hash,
      },
    };

    const blob: any = await Moralis.executeFunction(libraryCall);

    console.log("blob in productView ?=>" + JSON.stringify(blob, null, 3));

    let data = JSON.stringify(blob);
    let parsedData = JSON.parse(data);
    console.log(parsedData);

    setPriceData({
      price: Number(blob[6]),
      units: Number(blob[3]),
      sales: Number(blob[7]),
    });
  };

  const makeCalls = async () => {
    console.log("Getting -> " + hash);
    await Moralis.enableWeb3();
    getMetaData();
    getLibraryData();
  };

  useEffect(() => {
    if (isInitialized && isAuthenticated && !isWeb3Enabled && hash) {
      makeCalls();
    }
  }, [isInitialized, isAuthenticated, isWeb3Enabled, hash]);

  return (
    <MarketingLayout>
      <div className="pt-6 pb-16 sm:pb-24">
        {/* <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> */}
        {/* <ol role="list" className="flex items-center space-x-4"> */}
        {/* {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a href={breadcrumb.href} className="mr-4 text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </a>
                  <svg
                    viewBox="0 0 6 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="h-5 w-auto text-gray-300"
                  >
                    <path d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z" fill="currentColor" />
                  </svg>
                </div>
              </li>
            ))} */}
        {/* <li className="text-sm">
              <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {product.name}
              </a>
            </li> */}
        {/* </ol> */}
        {/* </nav> */}
        <div className="mt-8 max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
            <div className="lg:col-start-8 lg:col-span-5">
              <div className="flex justify-between">
                <h1 className="text-xl font-medium text-gray-200">
                  {metadata?.name}
                </h1>
                <p className="text-xl font-medium rounded-full bg-green-600 text-green-200 px-5">
                  ${priceData?.price}
                  {/* {JSON.stringify(priceData)} */}
                </p>
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
                {/* Annotations */}
                {erc721 ? (
                  <div>
                    <h2 className="text-md font-medium text-gray-900 mb-5 ">
                      Annotated By:{" "}
                    </h2>
                    {/* <Annotationer annotation={book.annotations} /> */}
                  </div>
                ) : null}
                {/* description */}
                <div className="flex justify-between">
                  <p className="text-md text-gray-200">
                    {metadata?.description}
                  </p>
                </div>
                <a
                  onClick={buy}
                  className="mt-8 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {`Buy ${priceData?.sales + 1} / ${priceData?.units} Genesis`}
                  {loading && (
                    <div
                      style={{ borderTopColor: "transparent" }}
                      className="ml-2 w-6 h-6 border-2 border-white border-solid rounded-full animate-spin"
                    />
                  )}
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
      {/* <BookList hash={book.hash} /> */}
    </MarketingLayout>
  );
};

export default ProductView;
